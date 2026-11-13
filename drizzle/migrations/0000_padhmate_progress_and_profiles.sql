-- Learning progress (was Firestore users/{uid}.progress)
CREATE TABLE public.user_progress (
  user_id uuid PRIMARY KEY,
  progress jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_progress TO authenticated;
GRANT ALL ON public.user_progress TO service_role;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners read their progress" ON public.user_progress FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Owners insert their progress" ON public.user_progress FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners update their progress" ON public.user_progress FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners delete their progress" ON public.user_progress FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Learning-profile survey (was Firestore users/{uid}/profile/personalization)
CREATE TABLE public.learning_profiles (
  user_id uuid PRIMARY KEY,
  status text NOT NULL DEFAULT 'in_progress',
  current_step integer NOT NULL DEFAULT 0,
  document jsonb NOT NULL DEFAULT '{}'::jsonb,
  completed_at timestamptz,
  skipped_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.learning_profiles TO authenticated;
GRANT ALL ON public.learning_profiles TO service_role;
ALTER TABLE public.learning_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners read their learning profile" ON public.learning_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Owners insert their learning profile" ON public.learning_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners update their learning profile" ON public.learning_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners delete their learning profile" ON public.learning_profiles FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.validate_learning_profile_status()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status NOT IN ('in_progress', 'skipped', 'completed') THEN
    RAISE EXCEPTION 'Invalid learning profile status: %', NEW.status;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER learning_profiles_validate_status BEFORE INSERT OR UPDATE ON public.learning_profiles
FOR EACH ROW EXECUTE FUNCTION public.validate_learning_profile_status();

-- Imported accounts from the previous app. Server-only: no client grants, no policies.
CREATE TABLE public.legacy_accounts (
  firebase_uid text PRIMARY KEY,
  email text,
  display_name text,
  progress jsonb,
  personalization jsonb,
  claimed_by uuid UNIQUE,
  claimed_at timestamptz,
  imported_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.legacy_accounts TO service_role;
ALTER TABLE public.legacy_accounts ENABLE ROW LEVEL SECURITY;
CREATE INDEX legacy_accounts_email_idx ON public.legacy_accounts (lower(email));

-- Links an imported account to the signed-in user only when their email is verified
-- and matches exactly one unclaimed imported account. Identity comes from auth.uid().
CREATE OR REPLACE FUNCTION public.claim_legacy_account()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid uuid := auth.uid();
  v_email text;
  v_confirmed timestamptz;
  v_anon boolean;
  v_matches integer;
  v_row public.legacy_accounts%ROWTYPE;
  v_current jsonb;
BEGIN
  IF v_uid IS NULL THEN RETURN 'signed_out'; END IF;

  IF EXISTS (SELECT 1 FROM public.legacy_accounts WHERE claimed_by = v_uid) THEN
    RETURN 'already_claimed';
  END IF;

  SELECT email, email_confirmed_at, COALESCE(is_anonymous, false)
    INTO v_email, v_confirmed, v_anon
  FROM auth.users WHERE id = v_uid;

  IF v_anon OR v_email IS NULL OR v_confirmed IS NULL THEN RETURN 'not_eligible'; END IF;

  SELECT count(*) INTO v_matches FROM public.legacy_accounts
  WHERE lower(email) = lower(v_email) AND claimed_by IS NULL;

  IF v_matches = 0 THEN RETURN 'none'; END IF;
  IF v_matches > 1 THEN RETURN 'ambiguous'; END IF;

  SELECT * INTO v_row FROM public.legacy_accounts
  WHERE lower(email) = lower(v_email) AND claimed_by IS NULL
  FOR UPDATE;

  IF v_row.progress IS NOT NULL THEN
    SELECT progress INTO v_current FROM public.user_progress WHERE user_id = v_uid;
    IF v_current IS NULL
       OR (COALESCE(jsonb_array_length(v_current->'attempts'), 0) = 0
           AND COALESCE(jsonb_array_length(v_current->'completedLessons'), 0) = 0) THEN
      INSERT INTO public.user_progress (user_id, progress, updated_at)
      VALUES (v_uid, v_row.progress, now())
      ON CONFLICT (user_id) DO UPDATE SET progress = EXCLUDED.progress, updated_at = now();
    END IF;
  END IF;

  IF v_row.personalization IS NOT NULL
     AND NOT EXISTS (SELECT 1 FROM public.learning_profiles WHERE user_id = v_uid) THEN
    INSERT INTO public.learning_profiles (user_id, status, current_step, document)
    VALUES (
      v_uid,
      CASE WHEN v_row.personalization->>'status' IN ('in_progress','skipped','completed')
           THEN v_row.personalization->>'status' ELSE 'in_progress' END,
      COALESCE((v_row.personalization->>'currentStep')::int, 0),
      v_row.personalization
    );
  END IF;

  UPDATE public.legacy_accounts SET claimed_by = v_uid, claimed_at = now()
  WHERE firebase_uid = v_row.firebase_uid;

  RETURN 'claimed';
END;
$$;
REVOKE ALL ON FUNCTION public.claim_legacy_account() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_legacy_account() TO authenticated;
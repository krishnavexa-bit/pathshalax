-- Student preferences: name, avatar, class, subjects, daily goal, colour theme
CREATE TABLE public.student_settings (
  user_id uuid PRIMARY KEY,
  display_name text NOT NULL DEFAULT '',
  avatar text NOT NULL DEFAULT '🦉',
  class_level integer NOT NULL DEFAULT 10,
  subjects text[] NOT NULL DEFAULT '{}',
  daily_goal integer NOT NULL DEFAULT 30,
  theme text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_settings TO authenticated;
GRANT ALL ON public.student_settings TO service_role;
ALTER TABLE public.student_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Owners read their settings" ON public.student_settings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Owners insert their settings" ON public.student_settings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners update their settings" ON public.student_settings FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners delete their settings" ON public.student_settings FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.validate_student_settings()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.class_level < 6 OR NEW.class_level > 12 THEN
    RAISE EXCEPTION 'Class must be between 6 and 12';
  END IF;
  IF NEW.daily_goal < 5 OR NEW.daily_goal > 500 THEN
    RAISE EXCEPTION 'Daily goal must be between 5 and 500 points';
  END IF;
  IF length(NEW.display_name) > 40 THEN
    RAISE EXCEPTION 'Name is too long';
  END IF;
  IF NEW.theme IS NOT NULL AND NEW.theme NOT IN ('light', 'dark', 'pastel', 'colourful') THEN
    RAISE EXCEPTION 'Unknown theme';
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER student_settings_validate BEFORE INSERT OR UPDATE ON public.student_settings
FOR EACH ROW EXECUTE FUNCTION public.validate_student_settings();

-- Shared chapter lessons (notes + quiz) written once, then read by every student.
-- Only the server writes here.
CREATE TABLE public.chapter_lessons (
  chapter_key text PRIMARY KEY,
  class_level integer NOT NULL,
  subject text NOT NULL,
  chapter_title text NOT NULL,
  content jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.chapter_lessons TO authenticated;
GRANT ALL ON public.chapter_lessons TO service_role;
ALTER TABLE public.chapter_lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed-in students read chapter lessons" ON public.chapter_lessons FOR SELECT TO authenticated USING (true);
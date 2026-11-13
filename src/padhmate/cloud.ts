// Lovable Cloud adapter for PADHMATE (replaces the original Firebase setup).
// Sign-in: Google and guest (anonymous) accounts. Data: user_progress and learning_profiles,
// each readable and writable only by its owner.
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export type AppUser = {
  uid: string;
  isAnonymous: boolean;
  displayName: string | null;
  email: string | null;
};

export function toAppUser(user: User | null | undefined): AppUser | null {
  if (!user) return null;
  const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
  const name = (meta["full_name"] ?? meta["name"]) as string | undefined;
  return {
    uid: user.id,
    isAnonymous: Boolean(user.is_anonymous),
    displayName: name || null,
    email: user.email || null,
  };
}

export function sameUser(a: AppUser | null, b: AppUser | null) {
  if (a === b) return true;
  if (!a || !b) return false;
  return (
    a.uid === b.uid &&
    a.isAnonymous === b.isAnonymous &&
    a.displayName === b.displayName &&
    a.email === b.email
  );
}

export async function signInAsGuest() {
  const { error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
}

export async function signInWithGoogle() {
  const result = await lovable.auth.signInWithOAuth("google", {
    redirect_uri: window.location.origin,
    extraParams: { prompt: "select_account" },
  });
  if (result.error) throw result.error;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/** Links an imported account from the previous app when the verified email matches. Never throws. */
export async function claimImportedAccount() {
  try {
    const { data, error } = await supabase.rpc("claim_legacy_account");
    if (error) throw error;
    return data as string;
  } catch (error) {
    console.error("Could not check for an imported PADHMATE account:", error);
    return "error";
  }
}

export async function loadProgress(uid: string) {
  const { data, error } = await supabase
    .from("user_progress")
    .select("progress")
    .eq("user_id", uid)
    .maybeSingle();
  if (error) throw error;
  return (data?.progress as Record<string, unknown> | null) ?? null;
}

export async function saveProgress(uid: string, progress: unknown) {
  const { error } = await supabase.from("user_progress").upsert(
    { user_id: uid, progress: progress as never, updated_at: new Date().toISOString() },
    { onConflict: "user_id" },
  );
  if (error) throw error;
}

export async function loadLearningProfile(uid: string) {
  const { data, error } = await supabase
    .from("learning_profiles")
    .select("status, current_step, document")
    .eq("user_id", uid)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveLearningProfile(
  uid: string,
  row: { status: string; current_step: number; document: unknown },
) {
  const now = new Date().toISOString();
  const payload: Record<string, unknown> = {
    user_id: uid,
    status: row.status,
    current_step: row.current_step,
    document: row.document,
    updated_at: now,
  };
  if (row.status === "completed") payload["completed_at"] = now;
  if (row.status === "skipped") payload["skipped_at"] = now;
  const { error } = await supabase
    .from("learning_profiles")
    .upsert(payload as never, { onConflict: "user_id" });
  if (error) throw error;
}

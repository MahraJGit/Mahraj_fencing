import type { User } from "@supabase/supabase-js";
import { getAdminEmail, getSupabaseClient } from "@/lib/supabase/client";

function isAdmin(user: User) {
  return user.email?.toLowerCase() === getAdminEmail();
}

export async function getAdminSession(): Promise<User | null> {
  const client = getSupabaseClient();
  const {
    data: { session },
    error: sessionError,
  } = await client.auth.getSession();

  if (sessionError) throw sessionError;
  if (!session) return null;

  const { data, error } = await client.auth.getUser();
  if (error) throw error;
  if (!data.user) return null;
  if (isAdmin(data.user)) return data.user;

  const { error: signOutError } = await client.auth.signOut();
  if (signOutError) throw signOutError;
  return null;
}

export async function signInAdmin(email: string, password: string) {
  const { data, error } = await getSupabaseClient().auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) throw error;
  if (isAdmin(data.user)) return data.user;

  const { error: signOutError } = await getSupabaseClient().auth.signOut();
  if (signOutError) throw signOutError;
  throw new Error("This account is not authorized to access the admin panel.");
}

export async function signOutAdmin() {
  const { error } = await getSupabaseClient().auth.signOut();
  if (error) throw error;
}

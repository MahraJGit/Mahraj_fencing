const STORAGE_KEY = "mahraj-admin-session";

export const DEMO_ADMIN = {
  email: "admin@mahrajfencing.com",
  password: "admin123",
  name: "Admin",
} as const;

export type AdminSession = {
  email: string;
  name: string;
  signedInAt: string;
};

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function signInAdmin(email: string, password: string): AdminSession | null {
  if (
    email.trim().toLowerCase() !== DEMO_ADMIN.email ||
    password !== DEMO_ADMIN.password
  ) {
    return null;
  }
  const session: AdminSession = {
    email: DEMO_ADMIN.email,
    name: DEMO_ADMIN.name,
    signedInAt: new Date().toISOString(),
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  return session;
}

export function signOutAdmin() {
  window.localStorage.removeItem(STORAGE_KEY);
}

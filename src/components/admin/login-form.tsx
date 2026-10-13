"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DEMO_ADMIN, getAdminSession, signInAdmin } from "@/lib/admin/auth";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>(DEMO_ADMIN.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (getAdminSession()) router.replace("/admin");
  }, [router]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const session = signInAdmin(email, password);
    setPending(false);
    if (!session) {
      setError("Invalid email or password.");
      return;
    }
    router.replace("/admin");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-white/85"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex h-11 w-full rounded-md border border-white/15 bg-ink/60 px-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-white/85"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="flex h-11 w-full rounded-md border border-white/15 bg-ink/60 px-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand focus:ring-2 focus:ring-brand/30"
        />
      </div>
      {error ? (
        <p className="text-sm text-red-300" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" className="h-11 w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
      <p className="rounded-lg border border-white/10 bg-ink/50 px-3 py-3 text-xs leading-relaxed text-white/60">
        Demo access (frontend only):{" "}
        <span className="font-semibold text-white">{DEMO_ADMIN.email}</span>
        {" / "}
        <span className="font-semibold text-white">{DEMO_ADMIN.password}</span>
      </p>
    </form>
  );
}

import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/layout/logo";

export const metadata = {
  title: "Admin sign in | Mahraj Fencing",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-svh overflow-hidden bg-ink text-white">
      <Image
        src="/images/profile/site-compound-fencing.jpg"
        alt=""
        fill
        priority
        className="object-cover opacity-35"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/92 to-brand-dark/70" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent" />

      <div className="relative z-10 flex w-full flex-col justify-center px-4 py-12 sm:px-6">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 flex flex-col items-start gap-5">
            <Logo className="h-auto" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Mahraj Fencing
              </p>
              <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Admin sign in
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                Manage products, services, and blogs for the Mahraj Fencing
                website.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-charcoal/80 p-6 shadow-2xl backdrop-blur-md sm:p-7">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

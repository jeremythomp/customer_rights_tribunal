import type { Metadata } from "next";

import { AuthHeader } from "@/components/auth/auth-header";
import { RegisterHero } from "@/components/auth/register-hero";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create Account - Customer Rights Tribunal",
  description:
    "Register for a Customer Rights Tribunal consumer account to submit complaints, track cases, and communicate securely.",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid overflow-hidden rounded-2xl border border-border bg-background shadow-xl md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <RegisterHero />
            <div className="flex items-center justify-center bg-background p-6 sm:p-8 md:p-12">
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}





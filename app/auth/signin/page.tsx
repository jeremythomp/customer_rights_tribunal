import type { Metadata } from "next";

import { AuthHeader } from "@/components/auth/auth-header";
import { LoginHero } from "@/components/auth/login-hero";
import { SignInForm } from "@/components/auth/signin-form";

export const metadata: Metadata = {
  title: "Sign In - Customer Rights Tribunal",
  description:
    "Access your Customer Rights Tribunal account to manage cases, upload documents, and communicate securely.",
};

const authErrorMessages: Record<string, string> = {
  CredentialsSignin: "Invalid email or password. Please try again.",
  AccessDenied:
    "You do not have access to sign in with these credentials. Contact support if you believe this is a mistake.",
  Configuration:
    "A configuration error occurred. Please try again later or contact support.",
  Default:
    "Something went wrong while attempting to sign you in. Please try again.",
};

type SignInPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function resolveErrorMessage(error?: string | string[]) {
  if (!error) return undefined;
  const value = Array.isArray(error) ? error[0] : error;
  return authErrorMessages[value] ?? authErrorMessages.Default;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const resolvedSearchParams = await searchParams;
  const callbackUrlParam = resolvedSearchParams?.callbackUrl;
  const callbackUrl =
    typeof callbackUrlParam === "string" ? callbackUrlParam : undefined;

  const initialError = resolveErrorMessage(resolvedSearchParams?.error);
  const registeredParam = resolvedSearchParams?.registered;
  const initialSuccess =
    typeof registeredParam === "string" && registeredParam !== ""
      ? "Account created successfully. Please sign in with your new credentials."
      : undefined;

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <AuthHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid overflow-hidden rounded-2xl border border-border bg-background shadow-xl md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <LoginHero />
            <div className="flex items-center justify-center bg-background p-6 sm:p-8 md:p-12">
              <SignInForm
                defaultCallbackUrl={callbackUrl}
                initialError={initialError}
                initialSuccess={initialSuccess}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


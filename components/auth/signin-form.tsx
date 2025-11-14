"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInValues = z.infer<typeof signInSchema>;

interface SignInFormProps {
  defaultCallbackUrl?: string;
  initialError?: string;
  initialSuccess?: string;
}

const DEFAULT_REDIRECT = "/dashboard"; // Middleware will redirect to role-specific dashboard

export function SignInForm({
  defaultCallbackUrl,
  initialError,
  initialSuccess,
}: SignInFormProps) {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState(
    initialError ?? "",
  );
  const [successMessage, setSuccessMessage] = React.useState(
    initialSuccess ?? "",
  );

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: SignInValues) => {
    setErrorMessage("");
    setSuccessMessage("");

    const callbackUrl = defaultCallbackUrl || DEFAULT_REDIRECT;

    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    });

    if (result?.error) {
      setErrorMessage(result.error);
      return;
    }

    if (result?.ok) {
      setSuccessMessage("Signed in successfully. Redirecting…");

      // NextAuth may provide a URL; fall back to callbackUrl if not present.
      const targetUrl = result.url ?? callbackUrl;

      router.push(targetUrl);
      router.refresh();
    } else {
      setErrorMessage(
        "Unable to sign in. Please try again or contact support if the issue persists.",
      );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="gap-4">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </CardTitle>
        <CardDescription className="text-base">
          Welcome back. Please enter your details to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {errorMessage ? (
          <Alert variant="destructive">
            <AlertTitle>Unable to sign in</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : null}
        {successMessage ? (
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        ) : null}
        <Form {...form}>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>
                  <div className="flex justify-end">
                    <Button variant="link" size="sm" asChild>
                      <Link href="/auth/forgot-password">Forgot password?</Link>
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Button variant="link" size="sm" asChild>
            <Link href="/register">Register here</Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}


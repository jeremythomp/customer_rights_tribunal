"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";

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
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name should be less than 100 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name should be less than 100 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .optional()
    .transform((value) => {
      const trimmed = value?.trim();
      return trimmed ? trimmed : undefined;
    })
    .refine(
      (value) =>
        value === undefined ||
        (value.length >= 7 && value.length <= 20),
      {
        message: "Enter a valid phone number",
      },
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
  confirmPassword: z
    .string()
    .min(8, "Confirm password must be at least 8 characters")
    .max(100, "Confirm password must be less than 100 characters"),
  terms: z
    .boolean()
    .refine((value) => value, {
      message: "You must accept the Terms of Service and Privacy Policy",
    }),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmPassword"],
      message: "Passwords must match",
    });
  }
});

type RegisterValues = z.infer<typeof registerSchema>;

type ApiError =
  | string
  | {
      error?: string;
      details?: { message: string }[];
    };

export function RegisterForm() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const mapErrorResponse = (error: ApiError) => {
    if (typeof error === "string") return error;

    if (error.details?.length) {
      return error.details[0]?.message ?? "Validation error. Please try again.";
    }

    if (error.error) return error.error;

    return "Unable to register. Please try again.";
  };

  const onSubmit = async ({
    terms: _termsAccepted,
    confirmPassword: _confirmPassword,
    ...values
  }: RegisterValues) => {
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          role: "consumer",
        }),
      });

      const data = (await response.json()) as ApiError;

      if (!response.ok) {
        setErrorMessage(mapErrorResponse(data));
        return;
      }

      setSuccessMessage(
        "Account created successfully. Redirecting you to sign in…",
      );
      reset();

      setTimeout(() => {
        router.push("/auth/signin?registered=1");
      }, 1500);
    } catch (error) {
      console.error("Registration error", error);
      setErrorMessage(
        "Something went wrong while creating your account. Please try again.",
      );
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="gap-4">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
          Create your account
        </CardTitle>
        <CardDescription className="text-base">
          Complete the form to access the Customer Rights Tribunal portal.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        {errorMessage ? (
          <Alert variant="destructive">
            <AlertTitle>Registration failed</AlertTitle>
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
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="given-name"
                        placeholder="Jane"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="family-name"
                        placeholder="Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone number{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 123-4567"
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
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={passwordVisible ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Create a strong password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition hover:text-foreground"
                      aria-label={passwordVisible ? "Hide password" : "Show password"}
                    >
                      {passwordVisible ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <FormDescription>Must be at least 8 characters long.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={confirmPasswordVisible ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Re-enter your password"
                        {...field}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition hover:text-foreground"
                      aria-label={
                        confirmPasswordVisible ? "Hide password" : "Show password"
                      }
                    >
                      {confirmPasswordVisible ? (
                        <EyeOff className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  <FormDescription>Enter the same password as above.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-3 rounded-md border border-border/60 bg-muted/30 p-4">
                    <FormControl>
                      <input
                        type="checkbox"
                        className={cn(
                          "mt-1 h-4 w-4 rounded border border-input text-primary",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          "disabled:cursor-not-allowed disabled:opacity-50",
                        )}
                        checked={field.value}
                        onChange={(event) => field.onChange(event.target.checked)}
                        onBlur={field.onBlur}
                        ref={field.ref}
                      />
                    </FormControl>
                    <div>
                      <FormLabel className="text-sm font-normal leading-relaxed">
                        I agree to the{" "}
                        <Link
                          href="/legal/terms"
                          className="font-semibold text-primary underline-offset-4 hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/legal/privacy"
                          className="font-semibold text-primary underline-offset-4 hover:underline"
                        >
                          Privacy Policy
                        </Link>
                        .
                      </FormLabel>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" size="sm" asChild>
            <Link href="/auth/signin">Sign in</Link>
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}



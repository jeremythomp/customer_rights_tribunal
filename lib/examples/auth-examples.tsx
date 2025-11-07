/**
 * Authentication Usage Examples
 * These examples demonstrate how to use the authentication system
 */

// ============================================================================
// CLIENT-SIDE EXAMPLES (use in client components with "use client" directive)
// ============================================================================

/**
 * Example 1: Using useSession hook in a client component
 */
/*
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export function ProfileButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <button onClick={() => signIn("credentials")}>Sign In</button>;
  }

  return (
    <div>
      <p>Signed in as {session.user.email}</p>
      <p>Role: {session.user.role}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
*/

/**
 * Example 2: Login form component
 */
/*
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Sign In</button>
    </form>
  );
}
*/

/**
 * Example 3: Registration form component
 */
/*
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "consumer",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // Registration successful - redirect to login
      router.push("/auth/signin");
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
        required
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
      >
        <option value="consumer">Consumer</option>
        <option value="business">Business</option>
      </select>
      <input
        type="text"
        value={formData.firstName}
        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        placeholder="First Name"
      />
      <input
        type="text"
        value={formData.lastName}
        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        placeholder="Last Name"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}
*/

// ============================================================================
// SERVER-SIDE EXAMPLES (use in server components and API routes)
// ============================================================================

/**
 * Example 4: Protected page with server component
 */
/*
import { requireAuth } from "@/lib/auth-helpers";

export default async function DashboardPage() {
  const user = await requireAuth();

  return (
    <div>
      <h1>Welcome, {user.firstName || user.email}!</h1>
      <p>Your role: {user.role}</p>
    </div>
  );
}
*/

/**
 * Example 5: Role-based page protection
 */
/*
import { requireRole } from "@/lib/auth-helpers";
import { UserRole } from "@/lib/generated/prisma/enums";

export default async function AdminPage() {
  const user = await requireRole([UserRole.admin]);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.email}</p>
    </div>
  );
}
*/

/**
 * Example 6: Adjudicator-only page
 */
/*
import { requireAdjudicator } from "@/lib/auth-helpers";

export default async function AdjudicatorDashboard() {
  const user = await requireAdjudicator();

  return (
    <div>
      <h1>Adjudicator Dashboard</h1>
      <p>Welcome, {user.firstName} {user.lastName}</p>
    </div>
  );
}
*/

/**
 * Example 7: Conditional rendering based on authentication
 */
/*
import { getSession } from "@/lib/auth-helpers";

export default async function HomePage() {
  const session = await getSession();

  return (
    <div>
      {session ? (
        <div>
          <h1>Welcome back, {session.user.email}!</h1>
          <a href="/dashboard">Go to Dashboard</a>
        </div>
      ) : (
        <div>
          <h1>Welcome to Customer Rights Tribunal</h1>
          <a href="/api/auth/signin">Sign In</a>
          <a href="/register">Register</a>
        </div>
      )}
    </div>
  );
}
*/

/**
 * Example 8: Protected API route
 */
/*
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // API logic here
  return NextResponse.json({ data: "Protected data", user: session.user });
}
*/

/**
 * Example 9: Role-based API route
 */
/*
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserRole } from "@/lib/generated/prisma/enums";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check if user is admin
  if (session.user.role !== UserRole.admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Admin-only logic here
  return NextResponse.json({ message: "Admin action completed" });
}
*/

/**
 * Example 10: Checking user role in server component
 */
/*
import { getCurrentUser, hasRole } from "@/lib/auth-helpers";
import { UserRole } from "@/lib/generated/prisma/enums";

export default async function ConditionalContent() {
  const user = await getCurrentUser();
  const isAdmin = await hasRole(UserRole.admin);

  return (
    <div>
      {user && <p>User: {user.email}</p>}
      {isAdmin && <button>Admin Action</button>}
    </div>
  );
}
*/

export {};


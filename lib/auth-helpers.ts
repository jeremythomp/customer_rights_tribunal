import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";
import { UserRole } from "./generated/prisma/enums";

/**
 * Get the current session on the server
 * @returns Session or null
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Get the current user from session
 * @returns User or null
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Require authentication - redirects to signin if not authenticated
 * @param redirectTo - Optional redirect path after signin
 * @returns User
 */
export async function requireAuth(redirectTo?: string) {
  const session = await getSession();
  
  if (!session?.user) {
    const callbackUrl = redirectTo || "/";
    redirect(`/api/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  
  return session.user;
}

/**
 * Require specific role - redirects to signin or unauthorized page
 * @param allowedRoles - Array of allowed roles
 * @param redirectTo - Optional redirect path
 * @returns User
 */
export async function requireRole(
  allowedRoles: UserRole[],
  redirectTo?: string
) {
  const user = await requireAuth(redirectTo);
  
  if (!allowedRoles.includes(user.role)) {
    redirect("/unauthorized");
  }
  
  return user;
}

/**
 * Check if user has a specific role
 * @param role - Role to check
 * @returns True if user has role, false otherwise
 */
export async function hasRole(role: UserRole): Promise<boolean> {
  const session = await getSession();
  return session?.user?.role === role;
}

/**
 * Check if user is authenticated
 * @returns True if authenticated, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Require admin role
 */
export async function requireAdmin() {
  return await requireRole([UserRole.admin]);
}

/**
 * Require adjudicator role
 */
export async function requireAdjudicator() {
  return await requireRole([UserRole.adjudicator, UserRole.admin]);
}


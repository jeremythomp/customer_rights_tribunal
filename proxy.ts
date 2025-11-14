import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export const proxy = withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Role-based dashboard routing
    // If user accesses /dashboard, redirect to their role-specific dashboard
    if (path === "/dashboard" && token?.role) {
      return NextResponse.redirect(
        new URL(`/dashboard/${token.role}`, req.url)
      );
    }

    // If user tries to access a dashboard that doesn't match their role, redirect to their correct dashboard
    if (path.startsWith("/dashboard/") && token?.role) {
      const requestedRole = path.split("/")[2]; // Extract role from path
      if (requestedRole && requestedRole !== token.role) {
        return NextResponse.redirect(
          new URL(`/dashboard/${token.role}`, req.url)
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/cases/:path*",
    // Add other protected routes as needed
  ],
};


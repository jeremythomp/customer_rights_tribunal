import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./generated/prisma/client";
import { verifyPassword, getUserByEmail } from "./auth-utils";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { 
          label: "Email", 
          type: "email",
          placeholder: "email@example.com" 
        },
        password: { 
          label: "Password", 
          type: "password" 
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await getUserByEmail(credentials.email);

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValidPassword = await verifyPassword(
          credentials.password,
          user.passwordHash
        );

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        // Check if user account is active
        if (user.status === "suspended") {
          throw new Error("Your account has been suspended");
        }

        // Return user object that will be stored in session
        return {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          status: user.status,
          verified: user.verified,
        };
      },
    }),
  ],

  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },

  callbacks: {
    async session({ session, user }) {
      // Add custom user fields to session
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.firstName = user.firstName;
        session.user.lastName = user.lastName;
        session.user.status = user.status;
        session.user.verified = user.verified;
      }
      return session;
    },

    async signIn({ user, account }) {
      // Allow sign in if user exists
      if (user?.id) {
        return true;
      }
      return false;
    },
  },

  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User signed in: ${user.email}`);
    },
    async signOut({ session, token }) {
      console.log(`User signed out`);
    },
  },

  debug: process.env.NODE_ENV === "development",
};


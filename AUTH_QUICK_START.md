# Authentication Quick Start

## ✅ What's Been Configured

Your application now has a complete authentication system configured with:

- ✅ **NextAuth v4** with database sessions (via Prisma)
- ✅ **Credentials provider** for email/password login
- ✅ **User registration API** with validation
- ✅ **Password hashing** using bcryptjs (12 rounds)
- ✅ **Database models** for sessions, accounts, and verification tokens
- ✅ **TypeScript types** for NextAuth session data
- ✅ **Helper functions** for server-side auth checks
- ✅ **SessionProvider** configured in root layout

## 🚀 Quick Setup (3 steps)

### 1. Set Environment Variables

Create a `.env` file in the project root:

```bash
# Copy these values
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/customer_rights_tribunal"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NODE_ENV=development
```

### 2. Start Database

```bash
docker-compose up -d
```

### 3. Verify Setup

The database schema is already synced and Prisma client is generated!

## 📁 Files Created

### Core Authentication Files
- `lib/auth.ts` - NextAuth configuration
- `lib/auth-utils.ts` - Password hashing & user management
- `lib/auth-helpers.ts` - Server-side auth helpers
- `lib/providers/session-provider.tsx` - Client session provider
- `types/next-auth.d.ts` - TypeScript augmentation

### API Routes
- `app/api/auth/[...nextauth]/route.ts` - NextAuth handler
- `app/api/auth/register/route.ts` - User registration

### Documentation
- `AUTH_SETUP.md` - Complete setup guide
- `lib/examples/auth-examples.tsx` - Usage examples

### Database
- Updated `prisma/schema.prisma` with NextAuth models
- Added: `Session`, `Account`, `VerificationToken` models
- Added: `emailVerified` field to User model

## 🎯 Common Use Cases

### Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePass123!",
    "role": "consumer",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Sign In (Client Component)

```typescript
"use client";
import { signIn } from "next-auth/react";

await signIn("credentials", {
  email: "test@example.com",
  password: "SecurePass123!",
  callbackUrl: "/dashboard"
});
```

### Get Session (Server Component)

```typescript
import { requireAuth } from "@/lib/auth-helpers";

export default async function ProtectedPage() {
  const user = await requireAuth();
  return <div>Welcome, {user.email}!</div>;
}
```

### Get Session (Client Component)

```typescript
"use client";
import { useSession } from "next-auth/react";

export function Profile() {
  const { data: session } = useSession();
  return <div>{session?.user.email}</div>;
}
```

### Protect API Routes

```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }
  // ... protected logic
}
```

## 🔐 Security Features

- ✅ Passwords hashed with bcryptjs (12 rounds)
- ✅ Database sessions (30-day expiry)
- ✅ CSRF protection (built into NextAuth)
- ✅ Secure cookies (httpOnly, sameSite)
- ✅ Email uniqueness enforced
- ✅ Suspended users blocked from login
- ✅ Input validation with Zod

## 👥 User Roles

The system supports 4 user roles:

- `consumer` - Individuals filing claims
- `business` - Businesses responding to claims
- `adjudicator` - Tribunal adjudicators
- `admin` - System administrators

### Role-Based Protection

```typescript
import { requireRole } from "@/lib/auth-helpers";
import { UserRole } from "@/lib/generated/prisma/enums";

// Admin only
await requireRole([UserRole.admin]);

// Adjudicator or admin
await requireAdjudicator();
```

## 🔄 Session Management

- **Duration**: 30 days
- **Update**: Every 24 hours
- **Storage**: PostgreSQL database
- **Strategy**: Database sessions (not JWT)

## 📖 Full Documentation

See `AUTH_SETUP.md` for complete documentation including:
- Detailed API reference
- Error handling
- Custom auth pages
- Testing procedures
- Troubleshooting

See `lib/examples/auth-examples.tsx` for code examples.

## ⚠️ Before Going to Production

1. Generate a strong `NEXTAUTH_SECRET`
2. Set `NEXTAUTH_URL` to your production domain
3. Use environment-specific database credentials
4. Enable HTTPS
5. Review and configure custom auth pages
6. Set up email verification (optional)
7. Configure rate limiting on auth endpoints
8. Review session duration settings

## 🐛 Troubleshooting

**Can't connect to database?**
- Run: `docker-compose ps` to check if PostgreSQL is running
- Verify `DATABASE_URL` in `.env`

**Session not persisting?**
- Check `NEXTAUTH_SECRET` is set
- Verify `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

**Type errors?**
- Run: `npx prisma generate`
- Restart TypeScript server in VS Code

## 🎉 You're Ready!

Your authentication system is fully configured and ready to use. No UI has been built yet, but all the backend infrastructure is in place.

Next steps:
1. Create auth pages (signin, signup, etc.)
2. Build dashboard layouts
3. Add role-specific features
4. Implement email verification (optional)


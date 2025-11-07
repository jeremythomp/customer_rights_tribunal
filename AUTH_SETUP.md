# Authentication Setup Guide

This document explains how to configure and use the authentication system.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/customer_rights_tribunal"

# PostgreSQL Configuration (for Docker)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=customer_rights_tribunal
POSTGRES_PORT=5432

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-min-32-characters-long-replace-this

# Node Environment
NODE_ENV=development
```

### Generating NEXTAUTH_SECRET

You can generate a secure secret using one of these methods:

**Option 1: Using OpenSSL**
```bash
openssl rand -base64 32
```

**Option 2: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Database Setup

1. **Start the PostgreSQL database:**
   ```bash
   docker-compose up -d
   ```

2. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev --name add_nextauth_tables
   ```

3. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

## Authentication Features

### Registration Endpoint

**POST** `/api/auth/register`

Register a new user with credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "consumer",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**For business users, include:**
```json
{
  "email": "business@example.com",
  "password": "securePassword123",
  "role": "business",
  "firstName": "Jane",
  "lastName": "Smith",
  "businessName": "ABC Corporation",
  "businessNumber": "123456789"
}
```

**User Roles:**
- `consumer` - Individual filing a claim
- `business` - Business entity responding to claims
- `adjudicator` - Tribunal adjudicator
- `admin` - System administrator

**Response (Success - 201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "consumer",
    "firstName": "John",
    "lastName": "Doe",
    "status": "pending"
  }
}
```

**Response (Error - 400):**
```json
{
  "error": "A user with this email already exists"
}
```

### Login

NextAuth handles login through the credentials provider at `/api/auth/signin`.

**Using NextAuth Client (in React components):**
```typescript
import { signIn } from "next-auth/react";

const result = await signIn("credentials", {
  email: "user@example.com",
  password: "securePassword123",
  redirect: false,
});

if (result?.error) {
  console.error("Login failed:", result.error);
} else {
  console.log("Login successful");
}
```

### Session Management

NextAuth uses database sessions with the following configuration:
- **Session Duration:** 30 days
- **Session Update:** Every 24 hours
- **Storage:** PostgreSQL via Prisma

**Get current session (in Server Components):**
```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const session = await getServerSession(authOptions);
if (session?.user) {
  console.log("User:", session.user.email);
}
```

**Get current session (in Client Components):**
```typescript
import { useSession } from "next-auth/react";

const { data: session, status } = useSession();
if (status === "authenticated") {
  console.log("User:", session.user.email);
}
```

### Logout

```typescript
import { signOut } from "next-auth/react";

await signOut({ callbackUrl: "/" });
```

## Session Data Structure

The session includes the following user data:

```typescript
{
  user: {
    id: string;
    email: string;
    role: "consumer" | "business" | "adjudicator" | "admin";
    firstName?: string;
    lastName?: string;
    status: "active" | "suspended" | "pending";
    verified: boolean;
  }
}
```

## Security Features

- Passwords are hashed using bcryptjs with 12 salt rounds
- Database session storage for enhanced security
- Suspended users are blocked from signing in
- Email uniqueness is enforced
- Input validation using Zod schemas

## Custom Auth Pages

The following custom auth pages are configured (to be implemented):
- `/auth/signin` - Sign in page
- `/auth/signout` - Sign out confirmation
- `/auth/error` - Error page
- `/auth/verify-request` - Email verification request
- `/auth/new-user` - New user onboarding

## Testing Authentication

1. **Register a test user:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "testPassword123",
       "role": "consumer",
       "firstName": "Test",
       "lastName": "User"
     }'
   ```

2. **Sign in:**
   Use the NextAuth signIn function or the default sign-in page at `/api/auth/signin`

3. **Check session:**
   Access any protected route or use the session hooks to verify authentication

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running: `docker-compose ps`
- Check DATABASE_URL in .env matches your setup
- Run migrations: `npx prisma migrate dev`

### NextAuth Errors
- Verify NEXTAUTH_SECRET is set and is at least 32 characters
- Check NEXTAUTH_URL matches your application URL
- Ensure all environment variables are loaded

### Session Not Persisting
- Check database sessions table exists
- Verify cookies are enabled in browser
- Check NEXTAUTH_URL matches the domain you're accessing


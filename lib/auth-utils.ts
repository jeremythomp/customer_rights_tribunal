import { hash, compare } from "bcryptjs";
import { prisma } from "./generated/prisma/client";
import { UserRole, UserStatus } from "./generated/prisma/enums";

/**
 * Hash a plain text password using bcryptjs
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

/**
 * Verify a plain text password against a hash
 * @param password - Plain text password
 * @param hashedPassword - Hashed password to compare against
 * @returns True if password matches, false otherwise
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await compare(password, hashedPassword);
}

/**
 * Create a new user with hashed password
 * @param data - User data including plain text password
 * @returns Created user (without password hash)
 */
export async function createUser(data: {
  email: string;
  password: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  phone?: string;
  businessName?: string;
  businessNumber?: string;
}) {
  const passwordHash = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      businessName: data.businessName,
      businessNumber: data.businessNumber,
      verified: false,
      status: UserStatus.pending,
    },
    select: {
      id: true,
      email: true,
      role: true,
      firstName: true,
      lastName: true,
      phone: true,
      businessName: true,
      businessNumber: true,
      verified: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}

/**
 * Find user by email
 * @param email - User email
 * @returns User or null
 */
export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: { email },
  });
}

/**
 * Find user by id
 * @param id - User id
 * @returns User or null
 */
export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
  });
}


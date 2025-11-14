"use client";

import Link from "next/link";
import { Gavel, ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  };
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || user?.email || "User";

  const initials = user?.firstName && user?.lastName
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : user?.firstName
    ? user.firstName[0].toUpperCase()
    : user?.email
    ? user.email[0].toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between whitespace-nowrap h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard/consumer"
              className="flex items-center gap-3 text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
            >
              <Gavel className="h-8 w-8" />
              <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
                Customer Rights Tribunal
              </h2>
            </Link>
          </div>
          <div className="flex flex-1 justify-end items-center gap-2">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={displayName} />
                    <AvatarFallback className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-400">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {displayName}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400 hidden md:inline" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard/consumer/profile"
                    className="cursor-pointer"
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile & Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="cursor-pointer text-red-600 dark:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}


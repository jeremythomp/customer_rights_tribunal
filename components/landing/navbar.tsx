"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Gavel, Menu, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#", label: "File a Complaint" },
  { href: "/rulings", label: "Rulings" },
  { href: "/process", label: "How it Works" },
  { href: "#", label: "About Us" },
];

function getInitials(user: { firstName?: string | null; lastName?: string | null; email?: string | null }) {
  if (user.firstName && user.lastName) {
    return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  }
  if (user.firstName) return user.firstName[0].toUpperCase();
  if (user.email) return user.email[0].toUpperCase();
  return "U";
}

function getName(user: { firstName?: string | null; lastName?: string | null; email?: string | null }) {
  if (user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  }
  if (user.firstName) return user.firstName;
  return user.email || "User";
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between whitespace-nowrap h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity">
              <Gavel className="h-8 w-8" />
              <h2 className="text-xl font-bold leading-tight tracking-[-0.015em]">
                Customer Rights Tribunal
              </h2>
            </Link>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map(({ href, label }) => {
                const isActive =
                  href !== "#" &&
                  (href === "/" ? pathname === "/" : pathname.startsWith(href));

                return (
                  <Link
                    key={href + label}
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative text-base font-medium leading-normal text-gray-600 transition-colors hover:text-primary dark:text-gray-300",
                      "after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:opacity-0 after:transition-transform after:duration-200 after:ease-out",
                      isActive && "text-primary after:scale-x-100 after:opacity-100",
                      !isActive && "hover:after:scale-x-100 hover:after:opacity-100",
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              {status === "loading" ? (
                <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md" />
              ) : session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-400">
                          {getInitials(session.user)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden lg:inline text-sm font-semibold">
                        {getName(session.user)}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/${session.user.role}`} className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
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
              ) : (
                <>
                  <Button variant="ghost" size="default" asChild>
                    <Link href="/auth/signin">Login</Link>
                  </Button>
                  <Button size="default" asChild>
                    <Link href="/register">Register</Link>
                  </Button>
                </>
              )}
            </div>
            <ModeToggle />
            
            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-md"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-primary">
                    <Gavel className="h-6 w-6" />
                    <span className="text-lg font-bold">Menu</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8 px-2">
                  <nav className="flex flex-col gap-4">
                    {navLinks.map(({ href, label }) => {
                      const isActive =
                        href !== "#" &&
                        (href === "/" ? pathname === "/" : pathname.startsWith(href));

                      return (
                        <Link
                          key={href + label}
                          href={href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "text-lg font-medium py-2 px-4 rounded-md transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary"
                          )}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </nav>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col gap-3">
                    {session?.user ? (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                          Signed in as <span className="font-semibold">{session.user.email}</span>
                        </div>
                        <Button variant="outline" size="lg" asChild className="w-full">
                          <Link href={`/dashboard/${session.user.role}`} onClick={() => setIsOpen(false)}>
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Go to Dashboard
                          </Link>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="lg" 
                          className="w-full text-red-600 dark:text-red-400" 
                          onClick={() => {
                            setIsOpen(false);
                            signOut({ callbackUrl: "/" });
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="outline" size="lg" asChild className="w-full">
                          <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                            Login
                          </Link>
                        </Button>
                        <Button size="lg" asChild className="w-full">
                          <Link href="/register" onClick={() => setIsOpen(false)}>
                            Register
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}


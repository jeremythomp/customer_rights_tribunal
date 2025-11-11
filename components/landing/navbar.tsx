"use client";

import Link from "next/link";
import { Gavel, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

export function Navbar() {
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
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-primary text-base font-medium leading-normal transition-colors"
              >
                File a Complaint
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-primary text-base font-medium leading-normal transition-colors"
              >
                Rulings
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-primary text-base font-medium leading-normal transition-colors"
              >
                How it Works
              </Link>
              <Link
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-primary text-base font-medium leading-normal transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="default" asChild>
                <Link href="#">Login</Link>
              </Button>
              <Button size="default" asChild>
                <Link href="#">Register</Link>
              </Button>
            </div>
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-md"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}


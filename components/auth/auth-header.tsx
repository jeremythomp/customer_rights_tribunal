import Link from "next/link";
import { Gavel } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export function AuthHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-primary">
          <Link
            href="/"
            className="flex items-center gap-3 text-primary transition-opacity hover:opacity-80"
            aria-label="Return to home"
          >
            <Gavel className="h-7 w-7" />
            <span className="text-lg font-bold tracking-tight sm:text-xl">
              Customer Rights Tribunal
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/rulings">Rulings</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/how-it-works">How it Works</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/about">About</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}




import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { RulingFilters } from "@/components/rulings/ruling-filters";
import { RulingList } from "@/components/rulings/ruling-list";
import { RulingsHero } from "@/components/rulings/rulings-hero";
import { getPublicRulings } from "@/lib/data/rulings";

export const metadata = {
  title: "Recent Rulings | Customer Rights Tribunal",
  description:
    "Browse recent anonymized decisions issued by the Customer Rights Tribunal, including outcomes, parties, and summaries.",
};

export default async function RulingsPage() {
  const rulings = await getPublicRulings();

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Navbar />
      <main className="grow">
        <RulingsHero />
        <section className="pb-16 md:pb-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
            <RulingFilters />
            <RulingList rulings={rulings} />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button variant="outline" disabled size="sm">
                Previous
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Page 1 of 1</span>
                <span className="hidden sm:inline">•</span>
                <span>{rulings.length} decisions</span>
              </div>
              <Button disabled size="sm">
                Next
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-6 py-8 text-center">
              <p className="text-sm font-medium text-primary">
                Looking for a specific decision?
              </p>
              <Button variant="link" className="px-0" asChild>
                <Link href="#">Request archived rulings</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


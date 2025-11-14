import { Gavel } from "lucide-react";

export function RulingsHero() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 text-center">
        <span className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          <Gavel className="h-4 w-4" aria-hidden />
          Public decisions
        </span>
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Recent rulings from the tribunal
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
            Explore anonymized decisions issued by the Customer Rights Tribunal.
            These rulings highlight our commitment to transparency and fair,
            efficient dispute resolution for consumers and businesses.
          </p>
        </div>
      </div>
    </section>
  );
}


import { Separator } from "@/components/ui/separator";
import type { PublicRulingListItem } from "@/lib/data/rulings";

import { RulingListItem } from "./ruling-list-item";

interface RulingListProps {
  rulings: PublicRulingListItem[];
}

export function RulingList({ rulings }: RulingListProps) {
  if (rulings.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-muted-foreground/40 bg-muted/40 px-6 py-12 text-center">
        <p className="text-lg font-semibold text-foreground">
          No rulings published yet
        </p>
        <p className="max-w-xl text-sm text-muted-foreground">
          Decisions will appear here once final orders have been issued. Check
          back soon or subscribe to updates from the Tribunal.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border/60 bg-card px-6 sm:px-10">
      {rulings.map((ruling, index) => (
        <div key={ruling.orderNumber}>
          <RulingListItem ruling={ruling} />
          {index < rulings.length - 1 ? <Separator /> : null}
        </div>
      ))}
    </div>
  );
}


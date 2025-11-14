import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PublicRulingListItem } from "@/lib/data/rulings";

const statusVariantMap: Record<string, Parameters<typeof Badge>[0]["variant"]> = {
  decided: "success",
  closed: "secondary",
};

const formatCurrency = (value: number | null) => {
  if (value == null || Number.isNaN(value)) {
    return null;
  }

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);
};

interface RulingListItemProps {
  ruling: PublicRulingListItem;
}

export function RulingListItem({ ruling }: RulingListItemProps) {
  const issuedDate = format(ruling.issuedDate, "MMMM d, yyyy");
  const claimAmount = formatCurrency(ruling.claimAmount);
  const statusVariant = statusVariantMap[ruling.status] ?? "outline";

  return (
    <article className="flex flex-col gap-4 py-8">
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span>Case {ruling.caseNumber}</span>
        <span className="hidden sm:block">•</span>
        <span>Issued {issuedDate}</span>
        {ruling.category ? (
          <>
            <span className="hidden sm:block">•</span>
            <span>{ruling.category}</span>
          </>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-semibold tracking-tight text-foreground">
            {ruling.title}
          </h3>
          <Badge variant={statusVariant}>
            {ruling.status.replaceAll("_", " ")}
          </Badge>
          {ruling.adjudicatorName ? (
            <span className="text-sm text-muted-foreground">
              Adjudicator: {ruling.adjudicatorName}
            </span>
          ) : null}
        </div>
        <p className="text-base text-muted-foreground leading-relaxed">
          {ruling.summary}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        {claimAmount ? (
          <span className="text-sm font-medium text-foreground/80">
            Claim amount: {claimAmount}
          </span>
        ) : null}
        <Button variant="link" className="px-0" asChild>
          <Link
            href={`/rulings/${ruling.orderNumber}`}
            className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-primary/80"
          >
            Read full decision
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}


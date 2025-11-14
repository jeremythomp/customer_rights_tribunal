import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PublicRulingDetail } from "@/lib/data/rulings";

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
  }).format(value);
};

interface RulingDetailProps {
  ruling: PublicRulingDetail;
}

export function RulingDetail({ ruling }: RulingDetailProps) {
  const filedDate = format(ruling.filedDate, "MMMM d, yyyy");
  const issuedDate = format(ruling.issuedDate, "MMMM d, yyyy");
  const claimAmount = formatCurrency(ruling.claimAmount);
  const statusVariant = statusVariantMap[ruling.status] ?? "outline";

  return (
    <div className="flex flex-col gap-10">
      <Link
        href="/rulings"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to rulings
      </Link>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-start gap-3">
          <Badge variant={statusVariant} className="uppercase tracking-wide">
            {ruling.status.replaceAll("_", " ")}
          </Badge>
          <span className="text-sm text-muted-foreground">
            Order {ruling.orderNumber}
          </span>
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            {ruling.title}
          </h1>
          <p className="text-base text-muted-foreground">
            Case {ruling.caseNumber} • Issued {issuedDate}
          </p>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <article className="flex flex-col gap-8 text-base leading-relaxed text-muted-foreground">
          {ruling.caseDescription ? (
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">
                Case overview
              </h2>
              <p className="whitespace-pre-line">{ruling.caseDescription}</p>
            </section>
          ) : null}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Final order
            </h2>
            <p className="whitespace-pre-line">{ruling.content}</p>
          </section>
          <Separator />
          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">
              What happens next
            </h2>
            <p>
              Parties receive automatic notification of this decision. Any
              additional compliance requirements or deadlines will be visible in
              their secure case portal. For clarification or to request a copy
              of the signed order, contact the Tribunal registry.
            </p>
          </section>
        </article>

        <aside className="space-y-6">
          <Card>
            <CardHeader className="gap-1">
              <CardTitle className="text-lg font-semibold">
                Case details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="space-y-1">
                <p className="font-medium text-foreground">Case number</p>
                <p>{ruling.caseNumber}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Filed</p>
                <p>{filedDate}</p>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-foreground">Issued</p>
                <p>{issuedDate}</p>
              </div>
              {ruling.category ? (
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Category</p>
                  <p className="capitalize">{ruling.category}</p>
                </div>
              ) : null}
              {claimAmount ? (
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Claim amount</p>
                  <p>{claimAmount}</p>
                </div>
              ) : null}
              {ruling.adjudicatorName ? (
                <div className="space-y-1">
                  <p className="font-medium text-foreground">Adjudicator</p>
                  <p>{ruling.adjudicatorName}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="gap-1">
              <CardTitle className="text-lg font-semibold">
                Related resources
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button variant="secondary" disabled>
                View timeline
              </Button>
              <Button variant="outline" disabled>
                Case documents (coming soon)
              </Button>
              {ruling.pdfPath ? (
                <Button asChild>
                  <Link href={ruling.pdfPath} target="_blank">
                    <Download className="mr-2 h-4 w-4" />
                    Download decision
                  </Link>
                </Button>
              ) : (
                <Button variant="ghost" disabled>
                  <Download className="mr-2 h-4 w-4" />
                  Download not available
                </Button>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}


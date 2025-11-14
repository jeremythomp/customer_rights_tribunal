import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

const categories = [
  { value: "", label: "All categories" },
  { value: "product_defect", label: "Product defect" },
  { value: "service_issue", label: "Service issue" },
  { value: "billing_dispute", label: "Billing dispute" },
  { value: "refund", label: "Refund" },
];

const outcomes = [
  { value: "", label: "All outcomes" },
  { value: "upheld", label: "Upheld" },
  { value: "partially_upheld", label: "Partially upheld" },
  { value: "dismissed", label: "Dismissed" },
];

const years = [
  { value: "", label: "All years" },
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
];

export function RulingFilters() {
  return (
    <Card className="border-muted">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className="uppercase tracking-wide">
            Beta
          </Badge>
          <CardTitle className="text-lg font-semibold">
            Search &amp; filters
          </CardTitle>
        </div>
        <CardDescription>
          Search rulings and narrow results by category, outcome, or year.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          role="search"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="ruling-search">Keyword</Label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="ruling-search"
                placeholder="e.g., defective product"
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ruling-category">Category</Label>
            <Select id="ruling-category" defaultValue="">
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ruling-outcome">Outcome</Label>
            <Select id="ruling-outcome" defaultValue="">
              {outcomes.map((outcome) => (
                <option key={outcome.value} value={outcome.value}>
                  {outcome.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="ruling-year">Year</Label>
            <Select id="ruling-year" defaultValue="">
              {years.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </Select>
          </div>
          <div className="sm:col-span-2 lg:col-span-4 flex flex-wrap gap-3">
            <Button type="submit" disabled>
              Apply filters
            </Button>
            <Button type="reset" variant="outline" disabled>
              Reset
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}


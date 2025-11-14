import * as React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive";
}

const badgeVariants: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-input text-foreground hover:bg-accent hover:text-accent-foreground",
  success: "bg-green-500 text-white hover:bg-green-500/90",
  warning: "bg-amber-500 text-white hover:bg-amber-500/90",
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors",
          badgeVariants[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

export { Badge };


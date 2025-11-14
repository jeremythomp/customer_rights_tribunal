import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  variant?: "primary" | "secondary";
}

export function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  variant = "secondary",
}: QuickActionCardProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={cn(
        "block p-8 rounded-lg shadow-lg transition-colors duration-300",
        isPrimary
          ? "bg-teal-600 dark:bg-teal-700 hover:bg-teal-700 dark:hover:bg-teal-800 text-white"
          : "bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/50 border border-gray-200 dark:border-gray-700"
      )}
    >
      <div className="flex items-center gap-4">
        <Icon
          className={cn(
            "h-12 w-12",
            isPrimary ? "text-white" : "text-teal-700 dark:text-teal-400"
          )}
        />
        <div>
          <h2
            className={cn(
              "text-2xl font-bold",
              isPrimary ? "text-white" : "text-gray-900 dark:text-white"
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "mt-1",
              isPrimary ? "text-white" : "text-gray-600 dark:text-gray-300"
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}


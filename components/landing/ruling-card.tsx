import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RulingCardProps {
  caseNumber: string;
  title: string;
  description: string;
  href?: string;
}

export function RulingCard({ caseNumber, title, description, href = "#" }: RulingCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-2">
        <p className="text-gray-500 dark:text-gray-400 text-sm">{caseNumber}</p>
        <h3 className="text-gray-900 dark:text-white text-xl font-bold">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-base line-clamp-3">
          {description}
        </p>
      </div>
      <Link
        href={href}
        className="flex items-center gap-2 text-primary text-base font-semibold hover:underline mt-auto group"
      >
        Read Full Decision
        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}


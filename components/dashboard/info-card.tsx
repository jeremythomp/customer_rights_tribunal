import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface InfoCardProps {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

export function InfoCard({
  title,
  description,
  linkText,
  linkHref,
}: InfoCardProps) {
  return (
    <div className="bg-teal-50 dark:bg-teal-900/30 p-6 sm:p-8 rounded-lg">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{description}</p>
      <Link
        href={linkHref}
        className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300 transition-colors"
      >
        {linkText} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}


import Link from "next/link";
import { QuickLink } from "@/types/dashboard";

interface QuickLinksSidebarProps {
  links: QuickLink[];
}

export function QuickLinksSidebar({ links }: QuickLinksSidebarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Quick Links
      </h3>
      <ul className="space-y-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.id}>
              <Link
                href={link.href}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


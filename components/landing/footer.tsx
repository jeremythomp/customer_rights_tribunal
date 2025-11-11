import Link from "next/link";
import { Gavel } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          <Link href="/" className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity">
            <Gavel className="h-8 w-8" />
            <h2 className="text-xl font-bold leading-tight">Customer Rights Tribunal</h2>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-base font-normal leading-normal transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-base font-normal leading-normal transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-base font-normal leading-normal transition-colors"
            >
              Accessibility
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-base font-normal leading-normal transition-colors"
            >
              Site Map
            </Link>
            <Link
              href="#"
              className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-base font-normal leading-normal transition-colors"
            >
              Contact Us
            </Link>
          </div>
          <p className="text-gray-500 dark:text-gray-500 text-sm font-normal leading-normal">
            © 2024 Customer Rights Tribunal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


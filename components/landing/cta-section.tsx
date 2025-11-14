import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Ready to Start?
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            If you have a dispute that needs resolving, our dedicated team is here to help you navigate the process. File your complaint today to take the first step towards a fair resolution.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" className="shadow-md" asChild>
              <Link href="#">
                <span className="truncate">File a Complaint Now</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


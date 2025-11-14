import { getServerSession } from "next-auth";
import Link from "next/link";
import { FileText, Search } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardFooter } from "@/components/dashboard/dashboard-footer";
import { QuickActionCard } from "@/components/dashboard/quick-action-card";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { QuickLinksSidebar } from "@/components/dashboard/quick-links-sidebar";
import { InfoCard } from "@/components/dashboard/info-card";
import {
  getPlaceholderActivities,
  getPlaceholderQuickLinks,
  getWelcomeMessage,
} from "@/lib/data/dashboard-placeholders";

export default async function ConsumerDashboardPage() {
  const session = await getServerSession(authOptions);

  // If no session, this will be caught by middleware
  // But we add this check for type safety
  if (!session?.user) {
    return null;
  }

  const user = session.user;
  const welcomeMessage = getWelcomeMessage(user.firstName);
  const activities = getPlaceholderActivities(user.firstName || undefined);
  const quickLinks = getPlaceholderQuickLinks();

  return (
    <DashboardShell>
      <DashboardHeader user={user} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-900 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tighter">
              {welcomeMessage}
            </h1>
            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
              Here you can manage your complaints and access tribunal resources.
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Actions and Activity */}
              <div className="lg:col-span-2">
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <QuickActionCard
                    title="File a Complaint"
                    description="Start a new case with our easy-to-use online form."
                    icon={FileText}
                    href="/dashboard/consumer/file-complaint"
                    variant="primary"
                  />
                  <QuickActionCard
                    title="View Complaint Status"
                    description="Check the progress of your active complaints."
                    icon={Search}
                    href="/dashboard/consumer/cases"
                    variant="secondary"
                  />
                </div>

                {/* Recent Activity */}
                <div className="mt-12 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Recent Activity
                  </h3>
                  <ActivityTimeline activities={activities} />
                  <div className="mt-6 text-center">
                    <Link
                      href="/dashboard/consumer/activity"
                      className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
                    >
                      View all activity
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column - Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                <QuickLinksSidebar links={quickLinks} />
                <InfoCard
                  title="Understand the Process"
                  description="Familiarize yourself with the steps involved in resolving a dispute through our tribunal."
                  linkText="Learn How It Works"
                  linkHref="/process"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <DashboardFooter />
    </DashboardShell>
  );
}


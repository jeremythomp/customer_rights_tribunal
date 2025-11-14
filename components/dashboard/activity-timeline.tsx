import Link from "next/link";
import { ActivityItem } from "@/types/dashboard";
import { formatRelativeTime } from "@/lib/data/dashboard-placeholders";

interface ActivityTimelineProps {
  activities: ActivityItem[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8" role="list">
        {activities.map((activity, activityIdx) => {
          const Icon = activity.icon;
          const isLast = activityIdx === activities.length - 1;

          return (
            <li key={activity.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${
                        activity.type === "status_update" || activity.type === "filed"
                          ? "bg-teal-100 dark:bg-teal-900"
                          : "bg-gray-100 dark:bg-gray-700"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          activity.type === "status_update" || activity.type === "filed"
                            ? "text-teal-700 dark:text-teal-400"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.description.includes("#") ? (
                          <>
                            {activity.description.split("#")[0]}
                            {activity.href ? (
                              <Link
                                href={activity.href}
                                className="font-medium text-gray-900 dark:text-white hover:underline"
                              >
                                #{activity.caseNumber}
                              </Link>
                            ) : (
                              <span className="font-medium text-gray-900 dark:text-white">
                                #{activity.caseNumber}
                              </span>
                            )}
                            {activity.description.split(activity.caseNumber)[1]}
                          </>
                        ) : (
                          activity.description
                        )}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={activity.timestamp.toISOString()}>
                        {formatRelativeTime(activity.timestamp)}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


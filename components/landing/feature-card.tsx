import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-white dark:bg-gray-900 p-8 text-center items-center shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 dark:bg-primary/20">
        <Icon className="h-10 w-10 text-primary" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-gray-900 dark:text-white text-xl font-bold leading-tight">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
          {description}
        </p>
      </div>
    </div>
  );
}


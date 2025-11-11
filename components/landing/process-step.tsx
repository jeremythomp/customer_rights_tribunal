import { LucideIcon } from "lucide-react";

interface ProcessStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isLast?: boolean;
}

export function ProcessStep({ icon: Icon, title, description, isLast = false }: ProcessStepProps) {
  return (
    <>
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="bg-primary text-primary-foreground p-3 rounded-full flex items-center justify-center shadow-md">
          <Icon className="h-8 w-8" />
        </div>
      </div>
      <div className={`flex flex-1 flex-col ${!isLast ? 'pb-12' : ''}`}>
        <p className="text-gray-900 dark:text-white text-xl font-bold">{title}</p>
        <p className="text-gray-500 dark:text-gray-400 text-base">{description}</p>
      </div>
    </>
  );
}


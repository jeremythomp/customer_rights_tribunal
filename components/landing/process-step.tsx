'use client';

import {
  Upload,
  Search,
  MessageSquare,
  Gavel,
  type LucideIcon,
} from "lucide-react";
import { motion, type MotionProps, useReducedMotion } from "framer-motion";

const ICONS = {
  upload: Upload,
  search: Search,
  messageSquare: MessageSquare,
  gavel: Gavel,
} satisfies Record<string, LucideIcon>;

type ProcessStepIcon = keyof typeof ICONS;

interface ProcessStepProps {
  icon: ProcessStepIcon;
  title: string;
  description: string;
  isLast?: boolean;
  iconMotionProps?: MotionProps;
  contentMotionProps?: MotionProps;
}

export function ProcessStep({
  icon,
  title,
  description,
  isLast = false,
  iconMotionProps,
  contentMotionProps,
}: ProcessStepProps) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = ICONS[icon];

  const { className: iconClassName = "", ...iconRest } = iconMotionProps ?? {};
  const { className: contentClassName = "", ...contentRest } = contentMotionProps ?? {};

  return (
    <>
      <motion.div
        className={`relative z-10 flex flex-col items-center gap-2 ${iconClassName}`}
        {...(prefersReducedMotion ? {} : iconRest)}
      >
        <div className="bg-primary text-primary-foreground p-3 rounded-full flex items-center justify-center shadow-md">
          <Icon className="h-8 w-8" />
        </div>
      </motion.div>
      <motion.div
        className={`flex flex-1 flex-col ${!isLast ? "pb-12" : ""} ${contentClassName}`}
        {...(prefersReducedMotion ? {} : contentRest)}
      >
        <p className="text-gray-900 dark:text-white text-xl font-bold">{title}</p>
        <p className="text-gray-500 dark:text-gray-400 text-base">{description}</p>
      </motion.div>
    </>
  );
}


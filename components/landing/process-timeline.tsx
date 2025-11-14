'use client';

import { useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ProcessStep } from "./process-step";

const STEPS = [
  {
    icon: "upload",
    title: "Step 1: Submit Your Complaint",
    description:
      "Fill out the online form with all the necessary details and documentation.",
  },
  {
    icon: "search",
    title: "Step 2: Initial Review",
    description:
      "Our team reviews your submission to ensure it falls within our jurisdiction.",
  },
  {
    icon: "messageSquare",
    title: "Step 3: Mediation & Negotiation",
    description:
      "We facilitate a discussion between parties to reach a mutually agreeable solution.",
  },
  {
    icon: "gavel",
    title: "Step 4: Tribunal Hearing",
    description:
      "If mediation fails, the case proceeds to a formal hearing for a binding decision.",
  },
] as const;

export function ProcessTimeline() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    amount: 0.35,
    margin: "-10% 0px",
  });

  const iconVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: 18, scale: 0.94 },
      visible: (index: number) => {
        const delay = 0.3 + index * 0.35;

        if (prefersReducedMotion) {
          return {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              opacity: { duration: 0.3, ease: "easeOut", delay },
              y: { duration: 0.3, ease: "easeOut", delay },
            },
          };
        }

        return {
          opacity: 1,
          y: [18, 0],
          scale: [0.94, 1.05, 1],
          transition: {
            opacity: { duration: 0.35, ease: "easeOut", delay },
            y: { duration: 0.6 + index * 0.15, ease: "easeOut", delay },
            scale: {
              times: [0, 0.6, 1],
              duration: 0.8 + index * 0.2,
              ease: "easeInOut",
              delay,
            },
          },
        };
      },
    }),
    [prefersReducedMotion]
  );

  const contentVariants = useMemo<Variants>(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: (index: number) => {
        const delay = 0.45 + index * 0.45;

        if (prefersReducedMotion) {
          return {
            opacity: 1,
            y: 0,
            transition: {
              opacity: { duration: 0.3, ease: "easeOut", delay },
              y: { duration: 0.3, ease: "easeOut", delay },
            },
          };
        }

        return {
          opacity: [0, 1],
          y: [20, 0],
          transition: {
            opacity: { duration: 0.45, ease: "easeOut", delay },
            y: { duration: 0.7 + index * 0.2, ease: "easeOut", delay },
          },
        };
      },
    }),
    [prefersReducedMotion]
  );

  const lineVariants = useMemo<Variants>(
    () => ({
      hidden: { scaleY: prefersReducedMotion ? 1 : 0 },
      visible: prefersReducedMotion
        ? { scaleY: 1 }
        : {
            scaleY: [0, 1],
            transition: {
              duration: 1.8 + STEPS.length * 0.35,
              ease: "easeInOut",
            },
          },
    }),
    [prefersReducedMotion]
  );

  const playState = isInView ? "visible" : "hidden";

  return (
    <div ref={containerRef} className="relative grid grid-cols-[auto_1fr] gap-x-6">
      <motion.div
        className="absolute left-[23px] top-12 bottom-12 w-1 origin-top bg-gray-200 dark:bg-gray-700"
        variants={lineVariants}
        initial="hidden"
        animate={playState}
      />
      {STEPS.map((step, index) => (
        <ProcessStep
          key={step.title}
          icon={step.icon}
          title={step.title}
          description={step.description}
          isLast={index === STEPS.length - 1}
          iconMotionProps={{
            custom: index,
            initial: "hidden",
            animate: playState,
            variants: iconVariants,
            whileHover: prefersReducedMotion
              ? { scale: 1.04 }
              : { scale: 1.06 },
            transition: prefersReducedMotion
              ? { type: "spring", stiffness: 260, damping: 20 }
              : undefined,
          }}
          contentMotionProps={{
            custom: index,
            initial: "hidden",
            animate: playState,
            variants: contentVariants,
          }}
        />
      ))}
    </div>
  );
}



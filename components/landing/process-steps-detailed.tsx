"use client";

import {
  FileText,
  ClipboardCheck,
  Scale,
  FileUp,
  Video,
  FileCheck,
  type LucideIcon,
} from "lucide-react";

interface ProcessStep {
  icon: LucideIcon;
  stepNumber: number;
  title: string;
  description: string;
}

const STEPS: ProcessStep[] = [
  {
    icon: FileText,
    stepNumber: 1,
    title: "Complaint Submission (Consumer)",
    description:
      "The consumer visits the public portal and completes an online complaint form. They provide their contact information, details of the issue, and upload any relevant documents (receipts, correspondence, etc.). Once submitted, the system generates a unique case number or reference code, which the consumer can use to track progress. No login account is required — consumers use the case number (and possibly an OTP) to check their status securely.",
  },
  {
    icon: ClipboardCheck,
    stepNumber: 2,
    title: "Complaint Intake & Review (Office of the Public Counsel)",
    description:
      "The OPC staff receive a notification of the new submission and review it for completeness and validity. If additional information is needed, they contact the consumer via the system (email or portal message). The OPC assigns an officer to the case and sets it to an initial review or investigation status.",
  },
  {
    icon: Scale,
    stepNumber: 3,
    title: "Investigation & Mediation (OPC)",
    description:
      "The assigned officer investigates the complaint by contacting the supplier/business and gathering evidence. If possible, the OPC facilitates mediation between the consumer and supplier to reach an informal resolution. All communications and updates are recorded in the internal system. If mediation is successful, the complaint is marked as resolved by OPC and closed.",
  },
  {
    icon: FileUp,
    stepNumber: 4,
    title: "Escalation to Tribunal (CCT)",
    description:
      "If mediation fails or the matter requires a formal decision, OPC prepares the tribunal complaint documentation. The officer drafts the complaint, obtains the consumer's digital sign-off, and files it with the Consumer Claims Tribunal (CCT) through the internal system. A tribunal reference number is assigned once the filing is received and acknowledged by the Registry.",
  },
  {
    icon: Video,
    stepNumber: 5,
    title: "Tribunal Management & Hearing (CCT)",
    description:
      "The Tribunal Registry reviews the case filing, confirms completeness, and schedules a hearing date. The hearing may be virtual (Teams/Zoom link) or in-person. Notices of hearing and updates are automatically sent to both the consumer and supplier. Participants (complainant, respondent, legal reps) attend the hearing as scheduled.",
  },
  {
    icon: FileCheck,
    stepNumber: 6,
    title: "Decision Drafting & Publication",
    description:
      "After the hearing, Tribunal Members review the evidence and issue a written decision. The decision is shared with both parties via email or portal notice. Certain decisions (those appropriate for public reference) are published online for transparency and public learning.",
  },
];

export function ProcessStepsDetailed() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Center vertical line - hidden on mobile, visible on md+ */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 hidden md:block -ml-px w-0.5 h-full bg-gray-300 dark:bg-gray-600"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 1;

              return (
                <div
                  key={step.stepNumber}
                  className={`flex flex-col md:flex-row items-start gap-8 ${
                    isEven ? "md:self-end md:text-right md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Icon Container */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 border-4 border-white dark:border-gray-800">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`pt-2 ${
                      isEven
                        ? "md:pr-8 md:border-r-8 border-transparent md:border-r-primary md:pl-16"
                        : "md:pl-8 md:border-l-8 border-transparent md:border-l-primary md:pr-16"
                    }`}
                  >
                    <p className="text-sm font-semibold text-primary tracking-wide uppercase">
                      Step {step.stepNumber}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-base text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}


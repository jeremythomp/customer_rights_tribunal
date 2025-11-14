import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ProcessHero } from "@/components/landing/process-hero";
import { ProcessStepsDetailed } from "@/components/landing/process-steps-detailed";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works - Customer Rights Tribunal",
  description:
    "Learn about our tribunal process from complaint submission to final decision. Our clear, fair, and accessible process ensures justice for all consumers.",
};

export default function ProcessPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <Navbar />

      <main className="grow">
        <ProcessHero />
        <ProcessStepsDetailed />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}


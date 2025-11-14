import Image from "next/image";
import Link from "next/link";
import { Rocket, Shield, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { FeatureCard } from "@/components/landing/feature-card";
import { RulingCard } from "@/components/landing/ruling-card";
import { ProcessTimeline } from "@/components/landing/process-timeline";

export default function Home() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col">
      <Navbar />
      
      <main className="grow">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col gap-6 text-left">
                <h1 className="text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter">
                  Fair and Impartial Dispute Resolution for Consumers
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-normal leading-relaxed">
                  The Customer Rights Tribunal is an independent body established to resolve disputes between consumers and businesses, ensuring your rights are protected.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Button size="lg" className="shadow-md" asChild>
                    <Link href="#">File a Complaint Online</Link>
                  </Button>
                  <Button size="lg" variant="secondary" className="shadow-md bg-sky-500 hover:bg-sky-600 text-white" asChild>
                    <Link href="#">Check Your Case Status</Link>
                  </Button>
                </div>
              </div>
              <div className="w-full h-full min-h-[300px] flex items-center justify-center">
                <div className="relative w-full h-[400px]">
                  <Image
                    alt="A gavel resting on a law book, symbolizing justice and fairness."
                    className="object-cover rounded-lg shadow-xl"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkrvmWvJhODDUp8xb_Dw3mRHmda-XtlAgDMsacaXz088ElCX_BF1--0GLaT5R5B8Zj_4tEDYwg7AnlArKTMdTZy7pXRE_NId-jU3wgrMWbgbNsL-y5WjFUK938ecIP0QoRqKMCBSZ0dNiC4JhvSvsDvsak5P2gNXl6zNfdPlrRdsu0GUMHmhvtDq3NejETyi89b8U9XxjI4W7fhZvU4vwDovvbrYElXS6ulZCx2msqZLGrtfaNWK3bRATXyBazaFYc7B6eW_v3tK4"
                    fill
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Features Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4 text-center">
                <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tighter max-w-2xl mx-auto">
                  A Fair Process You Can Trust
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-normal leading-relaxed max-w-3xl mx-auto">
                  We are committed to providing a dispute resolution service that is accessible, efficient, and impartial for all parties involved.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={Rocket}
                  title="Fast"
                  description="Our streamlined online process is optimized for speed, ensuring your case moves from submission to review without unnecessary delays. We leverage technology to process information efficiently, so you receive timely updates and resolutions."
                />
                <FeatureCard
                  icon={Shield}
                  title="Secure"
                  description="Your privacy is paramount. All submitted data, from personal information to case details, is encrypted and stored in compliance with top-tier security standards. Access is strictly controlled to maintain confidentiality."
                />
                <FeatureCard
                  icon={Eye}
                  title="Transparent"
                  description="We believe in an open process. Our secure portal allows you to track your case status, view all relevant documents, and access communications in real-time. You are always informed of where your case stands."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Recent Rulings Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tighter">
                    Recent Rulings
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-normal leading-relaxed">
                    Explore the outcomes of recent cases handled by the tribunal.
                  </p>
                </div>
                <Button size="lg" variant="secondary" className="w-full md:w-auto shadow-sm bg-primary/10 text-primary hover:bg-primary/20" asChild>
                  <Link href="/rulings">View All Rulings</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RulingCard
                  caseNumber="Case #2024-0182"
                  title="Defective Product Claim vs. Electronics Inc."
                  description="The tribunal ruled in favor of the consumer, ordering a full refund and compensation for damages caused by a faulty appliance. The ruling emphasized the manufacturer's responsibility for product safety."
                />
                <RulingCard
                  caseNumber="Case #2024-0175"
                  title="Unfair Billing Practices by a Utility Provider"
                  description="A consumer challenged inconsistent and unexplained charges. The tribunal found billing errors and ordered the provider to issue corrected invoices, waive late fees, and improve billing transparency."
                />
                <RulingCard
                  caseNumber="Case #2024-0169"
                  title="Dispute Over Service Quality with a Telecom Co."
                  description="Ruling mandated the telecom company to provide a partial refund for a period of service disruption and to implement measures to ensure network reliability as per their service agreement."
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <div className="w-full md:w-1/2 flex flex-col gap-4">
                <h2 className="text-gray-900 dark:text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tighter">
                  How It Works
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl font-normal leading-relaxed">
                  Our process is designed to be straightforward and fair, ensuring every case is heard impartially. Here is a simplified overview of the steps involved.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <ProcessTimeline />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

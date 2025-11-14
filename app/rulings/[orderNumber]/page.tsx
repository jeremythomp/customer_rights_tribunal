import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { RulingDetail } from "@/components/rulings/ruling-detail";
import { getPublicRuling } from "@/lib/data/rulings";

interface RulingDetailPageProps {
  params: {
    orderNumber: string;
  };
}

export async function generateMetadata(
  { params }: RulingDetailPageProps,
): Promise<Metadata> {
  const ruling = await getPublicRuling(params.orderNumber);

  if (!ruling) {
    return {
      title: "Ruling not found | Customer Rights Tribunal",
    };
  }

  return {
    title: `${ruling.title} | Customer Rights Tribunal`,
    description: `Read the final decision for case ${ruling.caseNumber}, order ${ruling.orderNumber}.`,
  };
}

export default async function RulingDetailPage({
  params,
}: RulingDetailPageProps) {
  const ruling = await getPublicRuling(params.orderNumber);

  if (!ruling) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Navbar />
      <main className="grow py-16 md:py-24">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <RulingDetail ruling={ruling} />
        </div>
      </main>
      <Footer />
    </div>
  );
}


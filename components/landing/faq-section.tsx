import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "What types of complaints does the tribunal handle?",
    answer:
      "We handle a wide range of consumer disputes, including issues with faulty products, poor service, misleading advertising, and unfair contract terms. Please refer to our jurisdiction page for a detailed list of case types we can and cannot review.",
  },
  {
    question: "Is there a fee for filing a complaint?",
    answer:
      "No, there is no fee to file a complaint with the Customer Rights Tribunal. Our services are provided free of charge to ensure that everyone has access to justice, regardless of their financial situation.",
  },
  {
    question: "How long does the process take?",
    answer:
      "The duration of the process can vary depending on the complexity of the case and the cooperation of both parties. Most cases that are resolved through mediation are concluded within 60-90 days. Cases that proceed to a formal hearing may take longer.",
  },
  {
    question: "Are the tribunal's rulings legally binding?",
    answer:
      "Yes, decisions made by our adjudicators following a formal hearing are legally binding and enforceable by law. Both parties are required to comply with the final ruling.",
  },
  {
    question: "How do I check the status of my complaint?",
    answer:
      "You can check the status of your complaint at any time by using your unique case number on our website. The portal provides real-time updates on your case's progress through each stage of the tribunal process. No login is required—simply enter your case number and verification code.",
  },
  {
    question: "What happens if the business doesn't respond to my complaint?",
    answer:
      "If the respondent (business/supplier) fails to respond within the specified timeframe, the Office of the Public Counsel will document this non-compliance. The case may proceed to the tribunal hearing stage where a decision can be made based on the available evidence, even in the absence of the respondent's participation.",
  },
];

export function FAQSection() {
  return (
    <section className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Find answers to common questions about our process, your account, and how we handle complaints.
          </p>
        </div>
        <div className="mt-12">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg bg-gray-50 dark:bg-gray-800 px-6 border-0"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-2">
                  <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}


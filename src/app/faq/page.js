"use client";

import { useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const faqs = [
  {
    question: "Who can benefit from the US-HABSCTI clearinghouse?",
    answer:
      "The platform serves researchers, policymakers, local governments, environmental nonprofits, and the public. Key tools include risk maps for residents, funding guides for agencies, technical datasets for scientists, and mitigation strategies for water managers.",
  },
  {
    question: "What aspects of the website help track HABs in real time?",
    answer:
      "The platform serves researchers, policymakers, local governments, environmental nonprofits, and the public. Key tools include risk maps for residents, funding guides for agencies, technical datasets for scientists, and mitigation strategies for water managers.",
  },
  {
    question:
      "How often is the information updated, and what sources are used?",
    answer:
      "The platform serves researchers, policymakers, local governments, environmental nonprofits, and the public. Key tools include risk maps for residents, funding guides for agencies, technical datasets for scientists, and mitigation strategies for water managers.",
  },
  {
    question:
      "Can local governments use this site to plan HAB mitigation projects?",
    answer:
      "The platform serves researchers, policymakers, local governments, environmental nonprofits, and the public. Key tools include risk maps for residents, funding guides for agencies, technical datasets for scientists, and mitigation strategies for water managers.",
  },
  {
    question: "How does the catalog of experimental products work?",
    answer:
      "The platform serves researchers, policymakers, local governments, environmental nonprofits, and the public. Key tools include risk maps for residents, funding guides for agencies, technical datasets for scientists, and mitigation strategies for water managers.",
  },
  {
    question: "Are there resources for educators or community advocates?",
    answer:
      "The platform serves researchers, policymakers, local governments, environmental nonprofits, and the public. Key tools include risk maps for residents, funding guides for agencies, technical datasets for scientists, and mitigation strategies for water managers.",
  },
  {
    question: "How do I stay updated on newly approved HAB treatments?",
    answer:
      "The platform serves researchers, policymakers, local governments, environmental nonprofits, and the public. Key tools include risk maps for residents, funding guides for agencies, technical datasets for scientists, and mitigation strategies for water managers.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="px-20 py-10 tracking-wide">
      <InternalPageHero title="HAB - CTRL FAQs" />

      <div className="mt-16 flex flex-row rounded-lg overflow-hidden">
        {/* Questions */}
        <div className="w-96 shrink-0 flex flex-col gap-2">
          {faqs.map((faq, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`text-left px-4 py-3 text-sm transition-all duration-200 border-b border-gray-200 ${
                activeIndex === index
                  ? "bg-primary text-white font-semibold"
                  : "bg-primary-lighter text-gray-700"
              }`}
            >
              {faq.question}
            </button>
          ))}
        </div>

        {/* Answers */}
        <div className="flex-1 bg-primary p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            {faqs[activeIndex].question}
          </h2>
          <p className="text-base" style={{ color: "white" }}>
            {faqs[activeIndex].answer}
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const options = [
  {
    id: "biological",
    label: "1. Biological",
    content: (
      <>
        <p>
          Biological products include{" "}
          <a
            href="/glossary#biochemical-pesticides"
            className="text-primary text-underline"
          >
            biochemical pesticides
          </a>
          ,{" "}
          <a
            href="/glossary#microbial-pesticides"
            className="text-primary text-underline"
          >
            microbial pesticides
          </a>
          ,{" "}
          <a
            href="/glossary#plant-incorporated-protectants-pip"
            className="text-primary text-underline"
          >
            plant-incorporated protectants (PIPs)
          </a>
          , or similar technologies.
        </p>
      </>
    ),
  },
  {
    id: "chemical",
    label: "2. Chemical",
    content: (
      <>
        <p>
          Conventional pesticides are all active ingredients other than
          biological pesticides and{" "}
          <a
            href="/glossary#antimicrobial-pesticide"
            className="text-primary text-underline"
          >
            antimicrobial pesticides
          </a>
          . Conventional active ingredients are generally produced
          synthetically, i.e., are synthetic chemicals that prevent, mitigate,
          destroy, or repel any pest; or that act as a plant growth regulator,
          desiccant, defoliant or nitrogen stabilizer.
        </p>
        <p className="mt-4">
          Wood preservative and anti-foulant products that do not have
          antimicrobial uses and agricultural fungicide and aquatic herbicide
          products are either classified as a conventional or a biochemical
          pesticide. Biochemical pesticides with a toxic mode of action are
          classified for the purposes of the registration process as
          conventional pesticides.
        </p>
        <p className="mt-4">
          Conventional pesticides may also be considered{" "}
          <a
            href="/minimumRiskPesticides"
            className="text-primary text-underline"
          >
            minimum risk
          </a>
          , reducing the regulations applied to their approval and use.
        </p>
      </>
    ),
  },
  {
    id: "physical",
    label: "3. Physical",
    content: (
      <>
        <p>
          An instrument or contrivance, generally working by physical means
          (e.g., electricity, light, or other mechanical or physical means) and
          not containing a substance or mixture of substances, that is intended
          to trap, destroy, repel, or mitigate a pest. Physical technologies do
          not require the same rigor of testing to obtain federal approval.
        </p>
        <p className="mt-4">
          This definition excludes equipment used for applying pesticides when
          sold separately from the pesticides themselves.{" "}
          <a
            href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-152/subpart-Z/section-152.500"
            className="text-underline text-primary"
          >
            40 C.F.R. & 152.500(a).
          </a>
        </p>
        <p className="mt-5">
          Some physical devices currently approved to combat HABs include
          nanobubble technology, ultrasonic technology, and ozone treatment.
        </p>
      </>
    ),
  },
];

export default function GettingApproval() {
  const [activeOption, setActiveOption] = useState("biological");

  const active = options.find((opt) => opt.id === activeOption);

  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Breadcrumb */}
      <div className="flex flex-row items-center gap-2 text-sm text-gray-500 mb-8">
        <svg
          className="usa-icon text-gray-500"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>
        <a href="/" className="text-primary hover:underline">
          Home
        </a>
        <span>›</span>
        <span className="text-primary">Laws and Permits</span>
        <span>›</span>
        <span className="text-gray-800">Getting an Approval</span>
      </div>

      {/* Page Hero Title */}
      <InternalPageHero
        title="Determine Product Classification"
        subtitle="Guide to getting an approval on your own"
      />

      <div className="flex-col">
        <div className="mt-10 scroll-mt-28">
          <h1 className="text-primary font-bold text-center">
            Understand your choices
          </h1>

          <h2 className="font-bold text-lg mt-5 text-center">
            What type of product do you have?
          </h2>
          <p className="text-center mt-8">
            Choices on the side panel: Biological, Chemical, Physical
          </p>

          <div className="bg-primary-lighter px-4 py-4 mt-10 rounded-2xl">
            <div className="px-4 py-2 bg-white mt-3 rounded-2xl">
              <div className="flex flex-row gap-8 mt-5">
                {/* Left side panel */}
                <div className="flex flex-col gap-2 w-48 shrink-0">
                  {options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setActiveOption(opt.id)}
                      className={`text-left px-4 py-3 rounded-lg font-bold transition-colors ${
                        activeOption === opt.id
                          ? "bg-primary text-white"
                          : "bg-white text-gray-700 hover:bg-primary-lighter"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Right side content */}
                <div className="flex-1">{active.content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

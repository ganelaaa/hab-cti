"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const richText =
  "prose cms-rich max-w-none [&>*:first-child]:mt-0 [&_p]:mt-5 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mt-3 [&_ul_ul]:list-[circle]";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "label-vs-labeling", label: "Label vs Labeling" },
  { id: "algaecide-label-requirements", label: "Algaecide Label Requirements" },
  { id: "front-panel-template", label: "Front Panel Template" },
  { id: "back-panel-template", label: "Back Panel Template" },
  { id: "example-labels", label: "Example Labels" },
  { id: "additional-documentation", label: "Additional Documentation" },
  { id: "label-review-training", label: "Pesticide Label Review Training" },
  { id: "additional-information", label: "Additional Information" },
  { id: "questions", label: "Questions about FIFRA product labeling?" },
];

function Block({ html, className = "" }) {
  return (
    <div
      className={`${richText} ${className}`}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}

export default function LabelingClient({ cms }) {
  const [activeSection, setActiveSection] = useState("overview");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Breadcrumb */}
      <div className="mb-8 flex flex-row items-center gap-2 text-sm text-gray-500">
        <svg
          className="usa-icon text-gray-500"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span>›</span>
        <span className="text-primary">Processing Permits</span>
        <span>›</span>
        <Link href="/agency/405" className="text-primary hover:underline">
          FIFRA
        </Link>
        <span>›</span>
        <Link
          href="/pesticideRegistration"
          className="text-primary hover:underline"
        >
          Pesticide Registration
        </Link>
        <span>›</span>
        <span className="text-gray-800">Product Labeling</span>
      </div>

      <InternalPageHero
        title={cms?.pageTitle || "Product Labeling"}
        subtitle={cms?.pageSubtitle || "Pesticide Product Label Requirements"}
        link="https://www.epa.gov/pesticide-registration/labeling-requirements"
      />

      <div className="mt-0 flex flex-row gap-10">
        <div className="mt-10 w-56 shrink-0">
          <div className="sticky top-8">
            <p className="mb-3 font-bold text-black">On this page</p>
            <div className="flex flex-col border-l-2 border-gray-200">
              {sections.map((section) => (
                <p
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`cursor-pointer py-2 pl-4 text-sm transition-colors duration-200 hover:text-primary ${
                    activeSection === section.id
                      ? "-ml-[2px] border-l-4 border-black font-semibold text-black"
                      : "text-primary"
                  }`}
                >
                  {section.label}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div
            id="overview"
            className="mt-10 scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Overview</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.overviewText} />
            </div>
          </div>

          <div
            id="label-vs-labeling"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Label vs Labeling</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.labelVsLabelingText} />
            </div>
          </div>

          <div id="algaecide-label-requirements" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Algaecide Label Requirements
              <sup>2</sup>
            </h1>

            <div className="mb-8 text-lg">
              <Block html={cms?.frontPanelText} />

              <div
                id="front-panel-template"
                className="mt-6 scroll-mt-28 border-b-4 border-primary-lighter"
              >
                <div className="mb-8">
                  <Block html={cms?.frontTemplateText} />
                  <img
                    src="/assets/img/labeling-front-panel-template.png"
                    alt="Front Panel Template"
                    className="mx-auto mt-6 w-full max-w-3xl border border-gray-300"
                  />
                </div>
              </div>

              <Block html={cms?.backPanelText} className="mt-8" />

              <div
                id="back-panel-template"
                className="mt-6 scroll-mt-28 border-b-4 border-primary-lighter"
              >
                <div className="mb-8">
                  <Block html={cms?.backTemplateText} />
                  <img
                    src="/assets/img/labeling-back-panel-template.jpg"
                    alt="Back Panel Template"
                    className="mx-auto mt-6 w-full max-w-3xl border border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            id="example-labels"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Example Labels</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.exampleLabelsText} />
            </div>
          </div>

          <div
            id="additional-documentation"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Additional Documentation</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.additionalDocsText} />
            </div>
          </div>

          <div
            id="label-review-training"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              Pesticide Label Review Training
            </h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.trainingText} />
            </div>
          </div>

          <div
            id="additional-information"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Additional Information</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.additionalInfoText} />
            </div>
          </div>

          <div id="questions" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Questions about FIFRA product labeling?
            </h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.questionsText} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

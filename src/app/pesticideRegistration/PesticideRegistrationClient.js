"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const richText =
  "prose cms-rich max-w-none [&_p]:mt-5 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mt-3 [&_ul_ul]:list-[circle]";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "registration-steps", label: "Registration Steps" },
  {
    id: "data-collection",
    label: "Data Collection Procedures & Considerations",
  },
  { id: "additional-information", label: "Additional information" },
  {
    id: "questions",
    label: "Questions about FIFRA Pesticide Product Registration?",
  },
];

function Block({ html, className = "" }) {
  return (
    <div
      className={`${richText} ${className}`}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}

export default function PesticideRegistrationClient({ cms }) {
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
        <span className="text-primary">FIFRA</span>
        <span>›</span>
        <span className="text-gray-800">Pesticide Registration</span>
      </div>

      <InternalPageHero
        title={cms?.pageTitle || "Pesticide Registration"}
        subtitle={cms?.pageSubtitle || "FIFRA pesticide product registration"}
        link="https://www.epa.gov/pesticide-registration/how-register-pesticide-guide-applicants-new-process#overview"
      />

      <div className="mt-0 flex flex-row gap-10">
        {/* Sticky nav */}
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
            <Block html={cms?.introText} className="mt-8" />
            <h1 className="font-bold text-primary">Overview</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.overviewText} />
            </div>
          </div>

          <div
            id="registration-steps"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Registration Steps</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.stepsText} />
            </div>
          </div>

          <div
            id="data-collection"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              Data Collection Procedures &amp; Considerations
            </h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.dataTopText} />
              <Block html={cms?.dataTableHtml} />
              <Block html={cms?.dataBottomText} />
            </div>
          </div>

          <div
            id="additional-information"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Additional information</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.additionalInfoText} />
            </div>
          </div>

          <div id="questions" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Questions about FIFRA Pesticide Product Registration?
            </h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.questionsText} />
            </div>
            <Block
              html={cms?.citationText}
              className="mb-8 text-sm [&_p]:text-gray-600! [&_a]:text-primary!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

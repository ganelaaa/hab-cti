"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const richText =
  "prose cms-rich max-w-none [&>*:first-child]:mt-0 [&_p]:mt-5 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mt-3 [&_ul_ul]:list-[circle]";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "setting-tolerances", label: "Setting Tolerances" },
  { id: "required-data", label: "Required Data" },
  {
    id: "standardized-test-procedures",
    label: "Standardized Test Procedures",
  },
  { id: "additional-resources", label: "Additional Resources" },
  { id: "questions", label: "Questions about pesticide tolerances?" },
];

function Block({ html, className = "" }) {
  return (
    <div
      className={`${richText} ${className}`}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}

export default function TolerancesClient({ cms }) {
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
        <span className="text-gray-800">Tolerances</span>
      </div>

      {/* background image */}
      <div className="relative mt-4 h-28 text-white">
        <div className="absolute inset-0 bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-black opacity-65" />

        <div className="relative z-10 px-1 py-4 text-center duration-300 hover:scale-105">
          <a
            href="https://www.epa.gov/pesticide-tolerances/about-pesticide-tolerances"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white no-underline hover:no-underline"
          >
            <h1 className="!mb-0 !mt-1 !text-4xl font-bold text-white">
              {cms?.pageTitle || "Tolerances"}
            </h1>
          </a>
          <p className="!mt-2 text-lg text-gray-200">
            {cms?.pageSubtitle ||
              "FFDCA - Maximum pesticide residue tolerance policies"}
          </p>
        </div>
      </div>

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
          <Block html={cms?.introText} className="mt-10" />

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
            id="setting-tolerances"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Setting Tolerances</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.settingText} />
            </div>
          </div>

          <div
            id="required-data"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Required Data</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.requiredDataTop} />
              <Block
                html={cms?.requiredDataTables}
                className="[&_table+table]:mt-12"
              />
            </div>
          </div>

          <div
            id="standardized-test-procedures"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              Standardized Test Procedures
            </h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.standardizedText} />
            </div>
          </div>

          <div
            id="additional-resources"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Additional Resources</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.resourcesText} />
            </div>
          </div>

          <div id="questions" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Questions about pesticide tolerances?
            </h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.questionsText} />
              <Block html={cms?.citationText} className="mt-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const richText =
  "prose cms-rich max-w-none [&_p]:mt-5 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mt-3 [&_ul_ul]:list-[circle]";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "active-ingredients", label: "Active Ingredients" },
  { id: "inert-ingredients", label: "Inert Ingredients" },
  { id: "endangered-species", label: "Endangered Species Act" },
  { id: "additional-information", label: "Additional Information" },
  { id: "questions", label: "Questions about Pesticide Ingredients?" },
];

const EPA_LINK =
  "https://www.epa.gov/ingredients-used-pesticide-products/basic-information-about-pesticide-ingredients";

function Block({ html, className = "" }) {
  return (
    <div
      className={`${richText} ${className}`}
      dangerouslySetInnerHTML={{ __html: html || "" }}
    />
  );
}

export default function PesticideIngredientsClient({ cms }) {
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
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span>›</span>
        <span className="text-primary">Laws and Permits</span>
        <span>›</span>
        <Link
          href="/researchRequirements"
          className="text-primary hover:underline"
        >
          Research Requirements and Guidelines
        </Link>
        <span>›</span>
        <span className="text-gray-800">Pesticide Ingredients</span>
      </div>

      <InternalPageHero
        title={cms?.pageTitle || "Pesticide Ingredients"}
        subtitle={cms?.pageSubtitle || "Active vs Inert Ingredients"}
        link={EPA_LINK}
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

        <div className="flex-1">
          <Block
            html={cms?.introText}
            className="text-sm [&_p]:text-gray-600! [&_a]:text-primary!"
          />

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
            id="active-ingredients"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Active Ingredients</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.activeText} />
            </div>
          </div>

          <div
            id="inert-ingredients"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Inert Ingredients</h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.inertText} />
            </div>
          </div>

          <div
            id="endangered-species"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              <Link
                href="/agency/411"
                className="underline hover:text-primary-darker"
              >
                Endangered Species Act
              </Link>
              <sup>1</sup>
            </h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.endangeredSpeciesText} />
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
              Questions about Pesticide Ingredients?
            </h1>
            <div className="mb-8 text-lg">
              <Block html={cms?.questionsText} />
            </div>
            <h2 className="mt-8 font-bold text-black">Citation</h2>
            <Block html={cms?.citationText} className="text-base" />
          </div>
        </div>
      </div>
    </div>
  );
}

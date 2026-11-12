"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import InternalPageHero from "@/components/InternalPageHero";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "conventional", label: "Conventional" },
  { id: "biochemical", label: "Biochemical" },
  { id: "microbial", label: "Microbial" },
  { id: "performance", label: "Product Performance" },
  { id: "additional", label: "Additional Information" },
  { id: "citation", label: "Citation" },
];

const arial = { fontFamily: "Arial, sans-serif" };
const h2 = {
  ...arial,
  fontWeight: "normal",
  color: "#000",
  margin: "18pt 0 6pt",
};

function Html({ html }) {
  return <div style={arial} dangerouslySetInnerHTML={{ __html: html || "" }} />;
}

function TableBlock({ id, html }) {
  return (
    <section id={id} className="mt-8 scroll-mt-24 overflow-x-auto">
      <div style={{ minWidth: 900 }}>
        <Html html={html} />
      </div>
    </section>
  );
}

export default function DataRequirementsClient({ cms }) {
  const [activeSection, setActiveSection] = useState("overview");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll spy
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-4 py-10 tracking-wide sm:px-10 lg:px-20">
      <div className="mb-8 flex flex-row items-center gap-2 text-sm text-gray-500">
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span>›</span>
        <Link
          href="/pesticideRegistration"
          className="text-primary hover:underline"
        >
          Pesticide Registration
        </Link>
        <span>›</span>
        <span className="text-gray-800">Data Requirements and Tests</span>
      </div>

      <InternalPageHero
        title={
          <a
            href="https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/final-test-guidelines-pesticides-and-toxic"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Data Requirements & Tests: All product types
          </a>
        }
        subtitle="Individual research data requirements and EPA-approved tests for Conventional, Biochemical, and Microbial pesticide end-use products."
      />

      <div className="flex flex-row gap-10 mt-0 max-lg:flex-col">
        {/* Left Sticky Sidebar */}
        <div className="w-56 shrink-0 mt-10 max-lg:hidden">
          <div className="sticky top-8">
            <p className="font-bold text-black mb-3">On this page</p>
            <div className="border-l-2 border-gray-200 flex flex-col">
              {sections.map((section) => (
                <p
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`pl-4 py-2 text-sm cursor-pointer transition-colors duration-200 hover:text-primary ${
                    activeSection === section.id
                      ? "text-black font-semibold border-l-4 border-black -ml-[2px]"
                      : "text-primary"
                  }`}
                >
                  {section.label}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <section id="overview" className="mt-10 scroll-mt-24">
            <Html html={cms?.introText} />
          </section>

          <TableBlock id="conventional" html={cms?.conventionalTable} />
          <TableBlock id="biochemical" html={cms?.biochemicalTable} />
          <TableBlock id="microbial" html={cms?.microbialTable} />

          <div className="mt-4">
            <Html html={cms?.tableFootNotes} />
          </div>

          <section id="performance" className="scroll-mt-24">
            <h2 style={{ ...h2, textAlign: "center", fontSize: "16pt" }}>
              Product Performance
            </h2>
            <Html html={cms?.productPerformanceText} />
          </section>

          <section id="additional" className="scroll-mt-24">
            <h2 style={{ ...h2, fontSize: "14pt" }}>Additional Information</h2>
            <Html html={cms?.additionalInfoText} />
          </section>

          <section id="citation" className="scroll-mt-24">
            <h2 style={{ ...h2, fontSize: "16pt" }}>Citation</h2>
            <Html html={cms?.citationText} />
          </section>
        </div>
      </div>
    </div>
  );
}

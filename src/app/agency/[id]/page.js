"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import InternalPageHero from "@/components/InternalPageHero";
import { getAgencyData } from "@/lib/cms";

export default function DynamicAgencyPage({ params }) {
  // Fix for Next.js 15: Unwrap the params Promise safely
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;

  const [agency, setAgency] = useState(null);
  const [activeSection, setActiveSection] = useState("background");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function loadData() {
      try {
        const data = await getAgencyData(id);
        setAgency(data);
      } catch (err) {
        console.error("Failed parsing dynamic agency database payload:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const cms = agency?.agencyInternalConnector;

  // The rendering sidebar list maps conditions smoothly to incoming content blocks
  const sections = [
    { id: "background", label: "Background", content: cms?.backgroundText },
    { id: "implementing-agency", label: "Implementing Agency", content: cms?.implementingAgency },
    { id: "regulatory-application", label: "Regulatory Application", content: cms?.regulatoryApplication },
    { id: "permits", label: "Permit(s) applicable to algaecide use", content: cms?.permitsApplicable },
    { id: "contacts", label: "Contacts", content: cms?.contacts },
  ];

  const scrollTo = (idName) => {
    document.getElementById(idName)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (loading || !agency) return;
    const handleScroll = () => {
      for (const section of sections) {
        if (!section.content) continue;
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
  }, [loading, agency]);

  if (loading) {
    return <div className="p-20 text-center text-gray-500">Retrieving agency regulatory fields...</div>;
  }

  if (!agency) {
    return <div className="p-20 text-center text-gray-500">Statute profile matching ID not found.</div>;
  }

  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Dynamic Breadcrumbs */}
      <div className="flex flex-row items-center gap-2 text-sm text-gray-500 mb-8">
        <svg className="usa-icon text-gray-500 w-4 h-4" aria-hidden="true" focusable="false" role="img">
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span>›</span>
        <span className="text-primary">Permitting Laws</span>
        <span>›</span>
        <span className="text-gray-800">{agency.title}</span>
      </div>

      <InternalPageHero
        title={agency.title || "Acts and Regulatory Agencies"}
        subtitle="Overview"
        link="https://www.epa.gov"
      />

      <div className="flex flex-row gap-10 mt-0">
        {/* On This Page: Sidebar Menu */}
        <div className="w-56 shrink-0 mt-10">
          <div className="sticky top-8">
            <p className="font-bold text-black mb-3">On this page</p>
            <div className="border-l-2 border-gray-200 flex flex-col">
              {sections.map((section) => {
                if (!section.content) return null; // Gracefully hides any items if text is unconfigured
                return (
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
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic HTML Presentation Outlets */}
        <div className="flex-1 min-w-0 prose max-w-none space-y-10 whitespace-normal break-words">
          {sections.map((section) => {
            if (!section.content) return null;
            return (
              <div 
                key={section.id} 
                id={section.id} 
                className="border-b-4 border-primary-lighter pb-6 mt-10 scroll-mt-28"
              >
                {/* We render the title heading only if it wasn't pre-rendered inside the WYSIWYG editor input block */}
                {!section.content.includes(`id="${section.id}"`) && (
                  <h1 className="text-primary font-bold text-2xl mb-4">{section.label}</h1>
                )}
                <div 
                  dangerouslySetInnerHTML={{ __html: section.content }} 
                  className="text-lg text-gray-800 leading-relaxed"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
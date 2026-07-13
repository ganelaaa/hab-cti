"use client";

import Link from "next/link";
import React, { useEffect, useState, use } from "react";
import InternalPageHero from "@/components/InternalPageHero";
import { getStateDetails } from "@/lib/cms";

export default function DynamicStatePage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [stateRecord, setStateRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    async function loadData() {
      const data = await getStateDetails(params.stateName);
      setStateRecord(data);
      setLoading(false);
    }
    loadData();
  }, [params.stateName]);

  const fields = stateRecord?.stateRegulationsConnector || {};

  // Group the 9 separate ACF text blocks into an array for processing
  const rawSections = [
    { title: fields.section01Title, content: fields.section01Text },
    { title: fields.section02Title, content: fields.section02Text },
    { title: fields.section03Title, content: fields.section03Text },
    { title: fields.section04Title, content: fields.section04Text },
    { title: fields.section05Title, content: fields.section05Text },
    { title: fields.section06Title, content: fields.section06Text },
    { title: fields.section07Title, content: fields.section07Text },
    { title: fields.section08Title, content: fields.section08Text },
    { title: fields.section09Title, content: fields.section09Text },
  ];

  // Instantly hides any sections that the admin leaves blank in WordPress
  const activeDynamicSections = rawSections.filter(sec => sec.title);

  // Generate the side menu links dynamically
  const menuSections = [];
  if (fields.introText) {
    menuSections.push({ id: "overview", label: "Overview" });
  }
  
  activeDynamicSections.forEach(sec => {
    menuSections.push({
      id: sec.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      label: sec.title
    });
  });

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `#${id}`);
  };

  // Scrollspy tracking logic matching the Research Requirements page
  useEffect(() => {
    if (menuSections.length <= 1) return;

    const handleScroll = () => {
      for (const section of menuSections) {
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
    handleScroll(); // Initial check on load
    return () => window.removeEventListener("scroll", handleScroll);
  }, [stateRecord, menuSections]);

  if (loading) {
    return <div className="p-20 text-center text-gray-500">Loading regulatory framework...</div>;
  }

  // Under Development Fallback Page
  if (!stateRecord) {
    return (
      <div className="px-4 py-10 tracking-wide sm:px-10 lg:px-20">
        <div className="mb-8 flex flex-row items-center gap-2 text-sm text-gray-500">
          <svg className="usa-icon text-gray-500 w-4 h-4" aria-hidden="true" focusable="false" role="img">
            <use href="/assets/img/sprite.svg#arrow_back"></use>
          </svg>
          <Link href="/" className="text-primary hover:underline">Home</Link>
          <span>›</span>
          <Link href="/regulationsDirectory" className="text-primary hover:underline">Laws and Permits</Link>
          <span>›</span>
          <span className="text-gray-800 capitalize">{params.stateName.replace("-", " ")}</span>
        </div>

        <InternalPageHero
          title={params.stateName.replace("-", " ")}
          subtitle="This page is currently under development"
        />
        
        <div className="text-center mb-8 mt-10">
          <p className="mt-2 text-gray-600 text-lg">Please check back soon!</p>
          <Link href="/regulationsDirectory" className="mt-6 inline-block text-sm font-semibold text-primary underline">
            Return to Map
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 tracking-wide sm:px-10 lg:px-20">
      
      {/* Breadcrumbs matching Research Requirements Page */}
      <div className="mb-8 flex flex-row items-center gap-2 text-sm text-gray-500">
        <svg className="usa-icon text-gray-500 w-4 h-4" aria-hidden="true" focusable="false" role="img">
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>
        <Link href="/" className="text-primary hover:underline">Home</Link>
        <span>›</span>
        <Link href="/regulationsDirectory" className="text-primary hover:underline">Laws and Permits</Link>
        <span>›</span>
        <span className="text-gray-800 capitalize">{stateRecord.title}</span>
      </div>

      {/* Replaced fixed background with the InternalPageHero component */}
      <InternalPageHero
        title={stateRecord.title}
        subtitle={<span dangerouslySetInnerHTML={{ __html: fields.heroImageText || "" }} />}
      />

      <div className="flex flex-col lg:flex-row gap-10 mt-6">
        
        {/* Left Interactive Sticky Menu - Button Layout */}
        <div className="lg:mt-10 w-full lg:w-56 shrink-0">
          <div className="sticky top-8">
            <p className="mb-3 font-bold text-black">On this page</p>
            <div className="flex flex-col border-l-2 border-gray-200">
              {menuSections.map((section) => (
                <button
                  type="button"
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`py-2 pl-4 text-left text-sm transition-colors duration-200 hover:text-primary ${
                    activeSection === section.id
                      ? "-ml-[2px] border-l-4 border-black font-semibold text-black"
                      : "text-primary"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content Viewport Engine */}
        <div className="min-w-0 flex-1 whitespace-normal breaks-words">
          
          {/* Main Introduction/Overview Block */}
          {fields.introText && (
            <div 
              id="overview" 
              className="mt-10 scroll-mt-28 border-b-4 border-primary-lighter pb-6 prose max-w-none"
            >
               <h1 className="font-bold text-primary text-2xl mb-4">Overview</h1>
               <div dangerouslySetInnerHTML={{ __html: fields.introText }} />
            </div>
          )}

          {/* Render Active Sections Dynamically */}
          {activeDynamicSections.map((section, index) => {
            const sectionId = section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            const isLast = index === activeDynamicSections.length - 1;
            return (
              <div
                key={sectionId}
                id={sectionId}
                className={`scroll-mt-28 border-primary-lighter pb-6 prose max-w-none ${isLast ? "pt-10" : "border-b-4 pt-10"}`}
              >
                <h1 className="font-bold text-primary text-2xl mb-4">
                  {section.title}
                </h1>
                <div dangerouslySetInnerHTML={{ __html: section.content || "" }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
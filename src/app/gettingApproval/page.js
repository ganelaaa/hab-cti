"use client";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const sections = [
  { id: "pre-application", label: "Pre-Application Meeting" },
  { id: "permission-approvals", label: "Permission and Approvals" },
  { id: "time-cost", label: "Estimated time and cost" },
  { id: "resources", label: "Resources" },
];

export default function GettingApproval() {
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
        title="Getting an approval"
        subtitle="Guide to getting an approval on your own"
      />

      {/* scroll left side */}
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
      </div>

      {/* pre-application section */}
      <div
        id="pre-application"
        className="mt-10 scroll-mt-28 border-b-4 border-primary-lighter"
      >
        <h1 className="font-bold text-primary">
          Prerequisites for getting an approval
        </h1>

        <p className="text-xl font-bold">
          Have you completed your Pre-application Meeting?
        </p>
      </div>

      {/* permission and approvals section */}
      <div
        id="permission-approvals"
        className="mt-10 scroll-mt-28 border-b-4 border-primary-lighter"
      >
        <h1 className="font-bold text-primary">Permission and Approvals</h1>
      </div>

      {/* estimated time and cost section */}
      <div
        id="time-cost"
        className="scroll-mt-28 border-b-4 border-primary-lighter"
      >
        <h1 className="font-bold text-primary">Estimated time and cost</h1>
      </div>

      {/* resources section */}
      <div
        id="resources"
        className="scroll-mt-28 border-b-4 border-primary-lighter"
      >
        <h1 className="font-bold text-primary">Resources</h1>
      </div>
    </div>
  );
}

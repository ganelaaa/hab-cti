"use client";

import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const richText =
  "prose cms-rich max-w-none [&_p]:mt-5 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mt-3 [&_ul_ul]:list-[circle]";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "regulation-devices", label: "Regulation of Devices" },
  { id: "device-labeling", label: "Device Labeling" },
  { id: "device-determination", label: "Device Determination" },
  { id: "additional-information", label: "Additional Information" },
  { id: "questions", label: "Questions about Physical Devices" },
];

function SectionHeader({ children }) {
  return <h2 className="mt-2 mb-1 font-bold text-black">{children}</h2>;
}

export default function PhysicalDevices({ cms }) {
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
        <a href="/" className="text-primary hover:underline">
          Home
        </a>
        <span>›</span>
        <span className="text-primary">Processing Permits</span>
        <span>›</span>
        <a href="/agency/405" className="text-primary hover:underline">
          FIFRA
        </a>
        <span>›</span>
        <a
          href="/pesticideRegistration"
          className="text-primary hover:underline"
        >
          Pesticide Registration
        </a>
        <span>›</span>
        <span className="text-gray-800">Physical Devices</span>
      </div>

      {/* Page Hero Title */}
      <InternalPageHero
        title={cms?.pageTitle || "Physical Devices"}
        subtitle={
          cms?.pageSubtitle ||
          "Physical device classification and regulation under FIFRA"
        }
      />

      {/* Body */}
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
          {/* Overview */}
          <div
            id="overview"
            className="mt-10 scroll-mt-28 border-primary-lighter border-b-4"
          >
            <div
              className={richText}
              dangerouslySetInnerHTML={{ __html: cms?.introText || "" }}
            />
            <h1 className="font-bold text-primary">Overview</h1>

            <div
              className={richText}
              dangerouslySetInnerHTML={{ __html: cms?.overviewText || "" }}
            />
          </div>

          {/* Regulation of Devices */}
          <div
            id="regulation-devices"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Regulation of Devices</h1>

            <div
              className={richText}
              dangerouslySetInnerHTML={{ __html: cms?.regulationText || "" }}
            />
          </div>

          {/* Device Labeling */}
          <div
            id="device-labeling"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Device Labeling</h1>
            <div
              className={richText}
              dangerouslySetInnerHTML={{ __html: cms?.labelingText || "" }}
            />

            <img
              src="device-img1.png"
              alt="image here"
              className="mt-3 w-full max-w-8"
            />
          </div>

          {/* Device Determination */}
          <div
            id="device-determination"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Device Determination</h1>

            <p className="text-underline font-bold">Device Examples</p>

            <img
              src="device-img2.png"
              alt="image here"
              className="mt-3 w-full max-w-8"
            />
            <div
              className={richText}
              dangerouslySetInnerHTML={{ __html: cms?.determinationText || "" }}
            />
          </div>

          {/* Additional Information */}
          <div
            id="additional-information"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Additional Information</h1>

            <div
              className={richText}
              dangerouslySetInnerHTML={{
                __html: cms?.additionalInfoText || "",
              }}
            />
          </div>

          {/* Questions / Contacts */}
          <div id="questions" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Questions about Physical Devices?
            </h1>
            <div
              className={richText}
              dangerouslySetInnerHTML={{ __html: cms?.questionsText || "" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

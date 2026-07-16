"use client";
import { useState, useEffect } from "react";
import InternalPageHero from "@/components/InternalPageHero";

export default function Fifra() {
  const [activeSection, setActiveSection] = useState("background");

  const sections = [
    { id: "research-requirements", label: "Research Requirements" },
    { id: "data-requirements", label: "EPA Data Requirements Table" },
    {
      id: "test-guidelines",
      label: "Test Guidelines for Pesticide and Toxic Substances",
    },
    { id: "resources", label: "Resources" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  // scroll event
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
        <span className="text-gray-800">
          Research Requirements and Guidelines
        </span>
      </div>

      {/* Page Hero Title */}
      <InternalPageHero
        title="Research Requirements and Guidelines"
        subtitle="Key research guidelines and requirements for aquatic use pesticide registration"
      />

      {/* scroll left side */}
      <div className="flex flex-row gap-10 mt-0">
        <div className="w-56 shrink-0 mt-10">
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

        <div className="flex-1">
          {/* requirements section */}
          <div
            id="research-requirements"
            className="border-b-4 border-primary-lighter mt-10"
          >
            <h1 className="text-primary font-bold text-2xl!">
              Research Requirements Based on Types of Harmful Algal Bloom
              Control Technologies
            </h1>
            <p className="mb-8 text-sm">
              EPA requires Good Laboratory Practices (GLPs), including:
            </p>
            <ol>
              <li>
                - Analytical confirmation of dose (typically HPLC data at ppm
                level)
              </li>
              <li className="mt-5">
                - Archiving of the original raw data and final reports
              </li>
              <li className="mt-5">
                - Quality Assurance (QA) of the experiment and the report
              </li>
            </ol>
            <span className="text-primary text-xl mt-10 inline-block ">
              EPA test guidelines and recommended protocols for pesticides and
              toxic substances can be found{" "}
              <a
                href="https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances"
                className="text-underline"
              >
                here
              </a>
              .
            </span>
            <div className="border-b-primary-lighter mt-8"></div>
          </div>

          {/* EPA Data Table */}
          <div
            id="data-requirements"
            className="border-b-4 border-primary-lighter text-lg"
          >
            <h1 className="text-primary font-bold text-2xl!">
              Identify Data Requirements based on EPA Registration Type
            </h1>
            <div className="flex flex-row">
              <p>Link:</p>
              <a
                className="text-underline hover:text-primary"
                href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-U/section-158.2060"
              >
                {""}
                https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-U/section-158.2060
              </a>
            </div>
            <div className="flex flex-row mt-5">
              <div className="border-gray-300! border-t-2 border-l-2 rounded px-20 py-20">
                <div className="border-t-2 border-r-2 border-l-2 border-b-2 border-primary rounded flex flex-col h-40 w-80 shadow-lg">
                  <p className="mt-3 font-bold">Type of Ingredient</p>
                  <p className="text-sm">
                    Choose how the ingredient functions in the product.
                  </p>
                  <div className="mt-4">
                    <p>Active</p>
                    <p>End-use</p>
                  </div>
                </div>
                <div className="border-r-primary! border-2! mt-10 mb-10"></div>
                <div className="border-t-2 border-r-2 border-l-2 border-b-2 border-primary rounded h-65 w-90 shadow-lg ">
                  <p className="font-bold mt-3">Type of Chemical</p>
                  <p className="text-sm">
                    Choose how the chemical functions in the product.
                  </p>
                  <p className="border-t-2 border-r-2 border-b-2 border-l-2 border-gray-300 rounded mt-5">
                    Conventional
                  </p>
                  <p className=" border-t-2 border-r-2 border-b-2 border-l-2 border-gray-300 rounded mt-3">
                    Biochemical
                  </p>
                  <p className=" border-t-2 border-r-2 border-b-2 border-l-2 border-gray-300 rounded mt-3">
                    Microbial
                  </p>
                  <p className=" border-t-2 border-r-2 border-b-2 border-l-2 border-gray-300 rounded mt-3">
                    Minimal Risk
                  </p>
                </div>
              </div>
              <div
                className="border-gray-300!
               px-20 py-20 border-r-2 border-t-2 rounded bg-primary-lighter"
              >
                <b className="text-lg">Understand Your Choices</b>
                <p className="text-sm">Definitions, guidance, and examples.</p>
                <p className="mt-5 text-green-800 text-lg font-bold">
                  Question
                </p>
                <p className="text-sm">
                  What type of ingredient are you looking to register?
                </p>
                <p className="mt-10 text-primary text-lg font-bold">
                  1. Active Ingredient
                </p>
                <p className="text-sm">
                  The primary component that performs the function of
                  controlling, killing, or disrupting harmful algal blooms.
                </p>
                <p className="mt-5">
                  <b>When to choose this:</b> If your product directly affects
                  HABs through chemical or biological action.
                </p>
                <p className="mt-5">
                  <b>Example:</b> Copper sulfate solution, peroxide-based bloom
                  disruptor.
                </p>
                <p className="mt-5 text-primary text-lg font-bold">
                  2. End-use Ingredient
                </p>
                <p className="mt-3 text-sm">
                  Substances that support the product's formulation or delivery
                  but are not active in bloom control themselves.
                </p>
                <p className="mt-3">
                  <b>When to choose this:</b> If your product only includes
                  carriers, binders, or stabilizers.
                </p>
                <p className="mt-3">
                  <b>Example:</b> Clay granules used to deliver active agents,
                  inert materials with no direct impact on algae.
                </p>
              </div>
            </div>
          </div>

          {/* Test Guidelines */}
          <div id="test-guidelines">
            <div className="flex flex-row mt-10">
              <h1 className="text-primary font-bold text-lg!">
                EPA Data Requirements for Development and Registration of
                Pesticide Active Ingredients
              </h1>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded border border-gray-300! border-t-2 border-b-2 border-l-2 border-r-2">
            <table className="w-full min-w-[700px] border-collapse text-sm text-black">
              <thead>
                <tr>
                  <th
                    colSpan="2"
                    className="border-b border-r border-gray-200 px-6 py-4 text-center font-bold"
                  >
                    EPA Gldn No.
                  </th>
                  <th
                    colSpan="1"
                    className="border-b border-gray-200 px-6 py-4 text-left font-bold"
                  >
                    Selected Options:
                  </th>
                </tr>
                <tr className="bg-[#f0f6ff]">
                  <th className="border-b-2  px-6 py-3 text-center font-bold">
                    RD
                  </th>
                  <th className="border-b-2 border-r-gray-200! border-r-2 px-6 py-3 text-center font-bold ">
                    BPPD
                  </th>
                  <th className="border-b-2 px-6 py-3 text-center font-bold">
                    EPA Guideline Name
                  </th>
                  <th className="border-b-2 px-6 py-3 text-center font-bold ">
                    Requirement Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Confidential Product Chemistry */}
                <tr>
                  <td
                    colSpan="4"
                    className="border-t px-6 py-3 text-center text-xs font-semibold uppercase border-b-2 border-gray-200"
                  >
                    Confidential Product Chemistry
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      830.155
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      880.11
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    Product Identity and Composition
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                      R
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      830.155
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      880.11
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    Description of Materials Used to Produce the Product
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                      R
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      830.155
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      880.11
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    Description of Production Process
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                      R
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      830.155
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center"></td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    Preliminary Analysis
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-600">
                      CR
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      830.155
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center"></td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    Certified Limits
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                      R
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      830.155
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center"></td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    Enforcement Analytical Method
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                      R
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      830.155
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center"></td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center ">
                    Enforcement Analytical Method
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                      R
                    </span>
                  </td>
                </tr>

                {/* Physical and Chemical Properties */}
                <tr>
                  <td
                    colSpan="4"
                    className="border-t-gray-200 px-6 py-3 text-center text-xs font-bold uppercase border-b-2 border-b-gray-200"
                  >
                    Physical and Chemical Properties
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 px-6 py-4 text-center">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      830.155
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center"></td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center">
                    Color
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                      R
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="border-r border-gray-100 px-6 py-4 text-center">
                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                      830.155
                    </span>
                  </td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center"></td>
                  <td className="border-r border-gray-100 px-6 py-4 text-center">
                    Physical State
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                      R
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="border-b-primary-lighter border-b-2 mt-10"></div>

          {/* Data Partners */}
          <div
            id="resources"
            className="border-b-4 border-primary-lighter mt-10"
          />
          <p className="font-bold text-primary-darker text-center mt-20 text-sm">
            DATA PARTNERS
          </p>
          <div className="flex flex-row gap-30 items-center justify-center mt-5">
            <img
              src="/NOAA.svg"
              className="w-20 h-20 rounded-full object-contain"
            />
            <img
              src="/IMET.jpg"
              className="w-20 h-20 rounded-full object-contain"
            />
            <img
              src="/MOTE.png"
              className="w-20 h-20 rounded-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

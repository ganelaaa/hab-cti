"use client";

import { useState, useEffect, Fragment } from "react";
import InternalPageHero from "@/components/InternalPageHero";
import { getResearchRequirementsFields } from "@/lib/cms";

export default function ResearchRequirementsPage() {
  const [activeSection, setActiveSection] = useState("research-requirements");
  const [cms, setCms] = useState(null);

  // 4-Level Flowchart Selection States
  const [ingredientType, setIngredientType] = useState("active");
  const [chemicalType, setChemicalType] = useState("conventional");
  const [registrationType, setRegistrationType] = useState("full");
  const [foodUse, setFoodUse] = useState("no");

  useEffect(() => {
    async function loadCmsData() {
      try {
        const data = await getResearchRequirementsFields();
        if (data) setCms(data);
      } catch (err) {
        console.error("Error fetching CMS fields:", err);
      }
    }
    loadCmsData();
  }, []);

  const sections = [
    { id: "research-requirements", label: cms?.section1Title || "Research Requirements" },
    { id: "data-requirements", label: cms?.section2Title || "EPA Data Requirements Table" },
    {
      id: "test-guidelines",
      label: cms?.section3Title || "Test Guidelines for Pesticide and Toxic Substances",
    },
    { id: "resources", label: cms?.resourcesTitle || "Resources" },
  ];

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

  // Map selection state to CMS textarea fields
  const getTableRows = () => {
    const keyMap = {
      conventional: { exp: "convExpJson", full: "convFullJson" },
      biochemical: { exp: "bioExpJson", full: "bioFullJson" },
      microbial: { exp: "microExpJson", full: "microFullJson" },
      minimalRisk: { exp: "minExpJson", full: "minFullJson" },
    };

    const fieldName = keyMap[chemicalType]?.[registrationType];
    const rawJson = cms?.[fieldName];

    let rows = [];
    if (rawJson) {
      try {
        rows = JSON.parse(rawJson);
      } catch (e) {
        console.error(`Error parsing JSON for field [${fieldName}]:`, e);
      }
    }

    if (foodUse === "no") {
      return rows.filter((row) => !row.isFoodUse);
    }
    return rows;
  };

  const tableRows = getTableRows();

  // Group rows dynamically by category
  const groupedCategories = tableRows.reduce((acc, row) => {
    const cat = row.category || "General Requirements";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(row);
    return acc;
  }, {});

  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Breadcrumb */}
      <div className="flex flex-row items-center gap-2 text-sm text-gray-500 mb-8">
        <svg
          className="usa-icon text-gray-500 w-4 h-4"
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
        title={cms?.pageTitle ?? "Research Requirements and Guidelines"}
        subtitle={cms?.pageSubtitle ?? "Key research guidelines and requirements for aquatic use pesticide registration"}
      />

      {/* Main Content Layout */}
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

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          
          {/* SECTION 1: Overview */}
          <div
            id="research-requirements"
            className="border-b-4 border-primary-lighter mt-10 pb-8"
          >
            <h1 className="text-primary font-bold text-2xl!">
              {cms?.section1Title ?? "Research Requirements Based on Types of Harmful Algal Bloom Control Technologies"}
            </h1>

            {cms?.section1Body ? (
              <div
                className="mt-4 text-sm [&>p]:mb-3 [&>ol]:list-disc [&>ol]:pl-5 [&>ol]:space-y-2 [&>a]:text-primary [&>a]:underline"
                dangerouslySetInnerHTML={{ __html: cms.section1Body }}
              />
            ) : (
              <div className="mt-4 text-sm space-y-3">
                <p className="mb-8 text-sm">
                  EPA requires Good Laboratory Practices (GLPs), including:
                </p>
                <ol>
                  <li>
                    - Analytical confirmation of dose (typically HPLC data at ppm level)
                  </li>
                  <li className="mt-5">
                    - Archiving of the original raw data and final reports
                  </li>
                  <li className="mt-5">
                    - Quality Assurance (QA) of the experiment and the report
                  </li>
                </ol>
                <span className="text-primary text-xl mt-10 inline-block ">
                  EPA test guidelines and recommended protocols for pesticides and toxic substances can be found{" "}
                  <a
                    href="https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances"
                    className="text-underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>
                  .
                </span>
              </div>
            )}
            <div className="border-b-primary-lighter mt-8"></div>
          </div>

          {/* SECTION 2: Flowchart Selector */}
          <div
            id="data-requirements"
            className="border-b-4 border-primary-lighter text-lg pt-10 pb-10"
          >
            <h1 className="text-primary font-bold text-2xl!">
              {cms?.section2Title ?? "Identify Data Requirements based on EPA Registration Type"}
            </h1>
            <div className="flex flex-row gap-2 mt-2 text-sm">
              <p className="font-bold">Link:</p>
              <a
                className="text-underline hover:text-primary break-all"
                href={cms?.section2LinkUrl || "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-U/section-158.2060"}
                target="_blank"
                rel="noreferrer"
              >
                {cms?.section2LinkText || cms?.section2LinkUrl || "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-U/section-158.2060"}
              </a>
            </div>

            {/* Split Flowchart Layout Container */}
            <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg mt-6 max-lg:grid-cols-1 overflow-hidden shadow-sm">
              
              {/* Left Side: Dot Grid Flowchart */}
              <div className="p-8 bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] flex flex-col items-center">
                
                {/* 1. Type of Ingredient Card */}
                <div 
                  className="w-full max-w-sm rounded-xl p-5 bg-white shadow-xs relative"
                  style={{ border: "2px solid #005EA2" }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Type of Ingredient</h3>
                      <p className="text-xs text-gray-500 mt-1">Choose how the ingredient functions in the product.</p>
                    </div>
                    <span className="text-xs text-gray-400">▲</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setIngredientType("active")}
                      className={`w-full py-2 px-4 rounded-md text-sm text-left font-medium transition-all ${
                        ingredientType === "active"
                          ? "bg-[#005EA2] text-white font-semibold shadow-sm"
                          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      Active
                    </button>
                    <button
                      type="button"
                      onClick={() => setIngredientType("enduse")}
                      className={`w-full py-2 px-4 rounded-md text-sm text-left font-medium transition-all ${
                        ingredientType === "enduse"
                          ? "bg-[#005EA2] text-white font-semibold shadow-sm"
                          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      End-use
                    </button>
                  </div>
                </div>

                {/* Connector Line 1 */}
                <div className="w-0.5 h-8 bg-gray-300"></div>

                {/* 2. Type of Chemical Card */}
                <div 
                  className="w-full max-w-sm rounded-xl p-5 bg-white shadow-xs relative"
                  style={{ border: "2px solid #005EA2" }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Type of Chemical</h3>
                      <p className="text-xs text-gray-500 mt-1">Choose how the chemical functions in the product.</p>
                    </div>
                    <span className="text-xs text-gray-400">▲</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    {[
                      { id: "conventional", label: "Conventional" },
                      { id: "biochemical", label: "Biochemical" },
                      { id: "microbial", label: "Microbial" },
                      { id: "minimalRisk", label: "Minimal Risk" },
                    ].map((chem) => (
                      <button
                        key={chem.id}
                        type="button"
                        onClick={() => setChemicalType(chem.id)}
                        className={`w-full py-2 px-4 rounded-md text-sm text-left font-medium transition-all ${
                          chemicalType === chem.id
                            ? "bg-[#005EA2] text-white font-semibold shadow-sm"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {chem.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Connector Line 2 */}
                <div className="w-0.5 h-8 bg-gray-300"></div>

                {/* 3. Registration Type Card */}
                <div 
                  className="w-full max-w-sm rounded-xl p-5 bg-white shadow-xs relative"
                  style={{ border: "2px solid #005EA2" }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Registration type</h3>
                      <p className="text-xs text-gray-500 mt-1">Select experimental vs full registration.</p>
                    </div>
                    <span className="text-xs text-gray-400">▲</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    {[
                      { id: "exp", label: "Experiment Use" },
                      { id: "full", label: "Full Registration" },
                    ].map((reg) => (
                      <button
                        key={reg.id}
                        type="button"
                        onClick={() => setRegistrationType(reg.id)}
                        className={`w-full py-2 px-4 rounded-md text-sm text-left font-medium transition-all ${
                          registrationType === reg.id
                            ? "bg-[#005EA2] text-white font-semibold shadow-sm"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {reg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Connector Line 3 */}
                <div className="w-0.5 h-8 bg-gray-300"></div>

                {/* 4. Food-Use? Card */}
                <div 
                  className="w-full max-w-sm rounded-xl p-5 bg-white shadow-xs relative"
                  style={{ border: "2px solid #005EA2" }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Food-Use?</h3>
                      <p className="text-xs text-gray-500 mt-1">EPA's mandate to consider this.</p>
                    </div>
                    <span className="text-xs text-gray-400">▲</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    {["yes", "no"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFoodUse(opt)}
                        className={`w-full py-2 px-4 rounded-md text-sm text-left font-medium capitalize transition-all ${
                          foodUse === opt
                            ? "bg-[#005EA2] text-white font-semibold shadow-sm"
                            : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Side: Persistent Guidance Panel */}
              <div className="p-8 bg-[#eaf4fc] border-l border-gray-200 flex flex-col justify-start">
                
                {/* Header Badge */}
                <div 
                  className="bg-white rounded-lg p-3 inline-flex items-center gap-3 w-fit shadow-2xs mb-6"
                  style={{ border: "1.5px solid #005EA2" }}
                >
                  <div className="w-8 h-8 rounded-md bg-[#005EA2] flex items-center justify-center text-white text-sm">
                    💡
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Understand Your Choices</h4>
                    <p className="text-xs text-gray-500">Definitions, guidance, and examples.</p>
                  </div>
                </div>

                {/* Question Label */}
                <p className="text-green-800 font-bold text-sm uppercase tracking-wide mb-1">Question</p>
                <p className="font-bold text-gray-900 text-base mb-6">What type of ingredient are you looking to register?</p>

                {/* Section 1: Active Ingredient Guidance */}
                <div className="mb-6 pb-6 border-b border-blue-200/70">
                  <h4 
                    className="font-bold text-base mb-2" 
                    style={{ color: "#005EA2" }}
                  >
                    1. Active Ingredient
                  </h4>
                  {cms?.guidanceActiveText ? (
                    <div
                      className="[&>p]:mb-2 [&>b]:text-black [&>p>b]:text-black text-sm text-gray-800"
                      dangerouslySetInnerHTML={{ __html: cms.guidanceActiveText }}
                    />
                  ) : (
                    <div className="text-sm text-gray-800">
                      <p className="mt-1 text-gray-700">The primary component that performs the function of controlling, killing, or disrupting harmful algal blooms.</p>
                      <p className="mt-3"><b>When to choose this:</b> If your product directly affects HABs through chemical or biological action.</p>
                      <p className="mt-2"><b>Example:</b> Copper sulfate solution, peroxide-based bloom disruptor.</p>
                    </div>
                  )}
                </div>

                {/* Section 2: End-use Ingredient Guidance */}
                <div>
                  <h4 
                    className="font-bold text-base mb-2" 
                    style={{ color: "#005EA2" }}
                  >
                    2. End-use Ingredient
                  </h4>
                  {cms?.guidanceEnduseText ? (
                    <div
                      className="[&>p]:mb-2 [&>b]:text-black [&>p>b]:text-black text-sm text-gray-800"
                      dangerouslySetInnerHTML={{ __html: cms.guidanceEnduseText }}
                    />
                  ) : (
                    <div className="text-sm text-gray-800">
                      <p className="mt-1 text-gray-700">Substances that support the product's formulation or delivery but are not active in bloom control themselves.</p>
                      <p className="mt-3"><b>When to choose this:</b> If your product only includes carriers, binders, or stabilizers.</p>
                      <p className="mt-2"><b>Example:</b> Clay granules used to deliver active agents, inert materials with no direct impact on algae.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

          {/* SECTION 3: Dynamic EPA Data Requirements Table */}
          <div id="test-guidelines" className="pt-10 pb-10 border-b-4 border-primary-lighter">
            <div className="flex flex-row justify-between items-end mb-4 flex-wrap gap-2">
              <h1 className="text-primary font-bold text-lg!">
                {cms?.section3Title ?? "EPA Data Requirements for Development and Registration of Pesticide Active Ingredients"}
              </h1>

              {/* Number of table entries indicator */}
              <div className="bg-[#eaf4fc] text-[#005EA2] border border-[#005EA2]/30 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#005EA2]"></span>
                Total Requirements: <span className="text-gray-900 font-extrabold">{tableRows.length}</span>
              </div>
            </div>

            {/* Valid HTML Table Structure */}
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
                      colSpan="2"
                      className="border-b border-gray-200 px-6 py-4 text-left font-bold"
                    >
                      Selected Options: <span className="capitalize text-primary">{chemicalType}</span> ({ingredientType}) | Reg: <span className="capitalize text-primary">{registrationType === 'full' ? 'Full Reg' : 'Exp Use'}</span> | Food-Use: <span className="uppercase text-primary">{foodUse}</span>
                    </th>
                  </tr>
                  <tr className="bg-[#f0f6ff]">
                    <th className="border-b-2 px-6 py-3 text-center font-bold">
                      RD
                    </th>
                    <th className="border-b-2 border-r-gray-200! border-r-2 px-6 py-3 text-center font-bold">
                      BPPD
                    </th>
                    <th className="border-b-2 px-6 py-3 text-center font-bold">
                      EPA Guideline Name
                    </th>
                    <th className="border-b-2 px-6 py-3 text-center font-bold">
                      Requirement Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Object.keys(groupedCategories).length > 0 ? (
                    Object.entries(groupedCategories).map(([categoryName, rows]) => (
                      <Fragment key={categoryName}>
                        {/* Category Subheader */}
                        <tr>
                          <td
                            colSpan="4"
                            className="border-t px-6 py-3 text-center text-xs font-semibold uppercase border-b-2 border-gray-200"
                          >
                            {categoryName}
                          </td>
                        </tr>
                        {rows.map((row, idx) => (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="border-r border-gray-100 px-6 py-4 text-center">
                              {row.rd ? (
                                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                                  {row.rd}
                                </span>
                              ) : null}
                            </td>
                            <td className="border-r border-gray-100 px-6 py-4 text-center">
                              {row.bppd ? (
                                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                                  {row.bppd}
                                </span>
                              ) : null}
                            </td>
                            <td className="border-r border-gray-100 px-6 py-4 text-center">
                              {row.name}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span
                                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                                  row.status?.startsWith("R")
                                    ? "bg-green-100 text-green-700"
                                    : row.status?.startsWith("CR")
                                    ? "bg-orange-100 text-orange-600"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-gray-500">
                        No data requirements found for this selection combination.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="border-b-primary-lighter border-b-2 mt-10"></div>
          </div>

          {/* SECTION 4: Resources Section */}
          <div id="resources" className="py-8 border-b-4 border-primary-lighter mt-10">
            <h1 className="text-primary font-bold text-2xl!">
              {cms?.resourcesTitle ?? "Resources"}
            </h1>

            {cms?.resourcesBody ? (
              <div
                className="mt-4 text-sm [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>a]:text-primary [&>a]:underline"
                dangerouslySetInnerHTML={{ __html: cms.resourcesBody }}
              />
            ) : (
              <p className="mt-2 text-sm text-gray-600">
                Additional EPA regulatory guidance documents and testing guidelines.
              </p>
            )}
          </div>

          {/* Data Partners */}
          <p className="font-bold text-primary-darker text-center mt-20 text-sm">
            DATA PARTNERS
          </p>
          <div className="flex flex-row gap-30 items-center justify-center mt-5">
            <img
              src="/NOAA.svg"
              alt="NOAA"
              className="w-20 h-20 rounded-full object-contain"
            />
            <img
              src="/IMET.jpg"
              alt="IMET"
              className="w-20 h-20 rounded-full object-contain"
            />
            <img
              src="/MOTE.png"
              alt="Mote"
              className="w-20 h-20 rounded-full object-contain"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
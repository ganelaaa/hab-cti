"use client";
import { useState } from "react";

export default function ControlStrategies() {
  const [activeTab, setActiveTab] = useState("chemical");
  const [activeSubTab, setActiveSubTab] = useState("conventional");
  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Strategies Headings */}
      <p className="text-green font-bold text-sm">CONTROL STRATEGIES</p>
      <p className="font-bold text-3xl text-(--black)] mt-1">
        Types of HAB Control Technologies
      </p>
      <p className="text-sm text-(--gray)] mt-2 max-w-xl whitespace-nowrap">
        Determining what type of product you have is key as each type has a
        different process for registration
      </p>
      {/* Control Technology Tabs */}
      <div className="rounded-xl border-b border-l-2 border-t-2 border-r-2 border-gray-300 mt-5">
        <div className="bg-[#ecf8dc] flex flex-row text-gray-500 font-bold gap-45 px-4 py-4">
          <p
            onClick={() => setActiveTab("chemical")}
            className={`px-2 py-2 rounded transition-all duration-500 cursor-pointer flex items-center gap-1 ${activeTab === "chemical" ? "bg-[#538200] text-white" : "text-gray-500"}`}
          >
            <svg
              className="usa-icon"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use href="/assets/img/sprite.svg#science"></use>
            </svg>
            Chemical
          </p>
          <p
            onClick={() => setActiveTab("biological")}
            className={`px-2 py-2 rounded transition-all duration-500 cursor-pointer flex items-center gap-1 ${activeTab === "biological" ? "bg-[#538200] text-white" : "text-gray-500"}`}
          >
            <svg
              className="usa-icon"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use href="/assets/img/sprite.svg#hourglass_empty"></use>
            </svg>
            Biological
          </p>
          <p
            onClick={() => setActiveTab("physical")}
            className={`px-2 py-2 rounded transition-all duration-500 cursor-pointer flex items-center gap-1 ${activeTab === "physical" ? "bg-[#538200] text-white" : "text-gray-500"}`}
          >
            <svg
              className="usa-icon"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use href="/assets/img/sprite.svg#wash"></use>
            </svg>
            Physical
          </p>
        </div>
        <div className="bg-primary-lighter text-gray-500 font-bold gap-15 px-3 py-3 flex flex-row">
          <p
            onClick={() => setActiveSubTab("conventional")}
            className={`rounded py-2 px-2 font-bold transition-all duration-500 cursor-pointer ${activeSubTab === "conventional" ? "bg-primary text-white" : "text-gray-500"}`}
          >
            Conventional Chemical
          </p>
          <p
            onClick={() => setActiveSubTab("biochemical")}
            className={`rounded py-2 px-2 transition-all duration-500 font-bold cursor-pointer ${activeSubTab === "biochemical" ? "bg-primary text-white" : "text-gray-500"}`}
          >
            Biochemical Pesticides
          </p>
          <p
            onClick={() => setActiveSubTab("antimicrobial")}
            className={`rounded py-2 px-2 transition-all duration-500 font-bold cursor-pointer ${activeSubTab === "antimicrobial" ? "bg-primary text-white" : "text-gray-500"}`}
          >
            Antimicrobial Pesticides
          </p>
          <p
            onClick={() => setActiveSubTab("minimum")}
            className={`rounded py-2 px-2 transition-all duration-500 font-bold cursor-pointer ${activeSubTab === "minimum" ? "bg-primary text-white" : "text-gray-500"}`}
          >
            Minimum Risk Pesticides
          </p>
        </div>
        {/* Information Block */}
        <div className="rounded border-b border-l border-t border-r border-gray-300 bg-white text-black p-6 flex flex-row">
          <div className="flex flex-row gap-6 items-start mb-6">
            <img
              src="/lab.png"
              className="w-60 h-60 object-contain shrink-0 mt-6"
            />
            <div>
              <h1 className="font-bold">Conventional Chemical</h1>
              <p className="font-light">
                Conventional pesticides are all active ingredients other than
                biological pesticides and antimicrobial pesticides. Conventional
                active ingredients are geenrally produced synthetically, i.e.,
                are synthetic chemicals athat prevent, mitigate, destroy, or
                repel any pest; or that act as a plant growth regulator,
                desiccant, defoliant or nitrogen stabilizer.
              </p>
              <p className="font-light mt-6">
                Wood preservative and anti-foulant products that do not have
                antimicrobial uses and agricultural fungicide and aquatic
                herbicide products are either classified as a conventional or a
                biochemical pesticide. biochemical pesticides eith a toxic mode
                of action are classified for the purposes of the registration
                process as conventional pesticides.
              </p>
              <button className="usa-button bg-blue-700 !mt-5">
                Know More
                <svg
                  className="usa-icon"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use href="/assets/img/sprite.svg#arrow_forward"></use>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

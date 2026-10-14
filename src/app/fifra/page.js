"use client";
import { useState, useEffect } from "react";
import InternalPageHero from "@/components/InternalPageHero";

export default function Fifra() {
  const [activeSection, setActiveSection] = useState("background");

  const sections = [
    { id: "background", label: "Background" },
    { id: "implementing-agency", label: "Implementing Agency" },
    { id: "regulatory-application", label: "Regulatory Application" },
    { id: "permits", label: "Permit(s) applicable to algaecide use" },
    { id: "contacts", label: "Contacts" },
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
        <span className="text-primary">Permitting Laws</span>
        <span>›</span>
        <span className="text-gray-800">FIFRA</span>
      </div>

      {/* Page Hero Title */}
      <InternalPageHero
        title="Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA)"
        subtitle="Overview"
        link="https://www.epa.gov/laws-regulations/summary-federal-insecticide-fungicide-and-rodenticide-act"
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
          {/* background section */}
          <div
            id="background"
            className="border-b-4 border-primary-lighter mt-10"
          >
            <h1 className="text-primary font-bold">Background</h1>
            <p className="mb-8 text-lg">
              The Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA) is
              an EPA-enforced act that regulates the distribution, sale,
              production, and use of pesticides and pesticide devices in the
              United States. Any substance intended to prevent, destroy, repel,
              or mitigate a pest is considered a pesticide and must be approved
              by FIFRA. Under FIFRA, "the label is the law," meaning that to
              lawfully use a pesticide, the directions and warnings prescribed
              on a pesticide's label must be followed exactly. As there is
              little active enforcement of pesticides following their approval,
              registering a pesticide with FIFRA is a time-consuming and
              data-intensive process. Pesticides will only be approved if 1.)
              The registrant supplies ample data to demonstrate that the
              pesticide works as intended without adverse impact to humans,
              non-target organisms, and environments, and 2.) The EPA's analyses
              of the registrant's data and existing scientific literature
              indicate a pesticide can be used with "reasonable certainty of no
              harm."
            </p>
            <a
              href="https://docs.google.com/spreadsheets/d/1WzWoZS27Thq1dQwqhclEeIkMvKfg8TT7uLEPLObPwmk/edit?gid=0#gid=0"
              className="usa-button mb-8 text-primary"
            >
              View FIFRA Registration Data Requirements
            </a>
          </div>

          {/* implementing agency section */}
          <div
            id="implementing-agency"
            className="border-b-4 border-primary-lighter text-lg"
          >
            <h1 className="text-primary font-bold">Implementing Agency</h1>
            <div className="mb-6">
              <span className="text-xl">
                The Environmental Protection Agency (EPA){" "}
                <a
                  href="https://www.epa.gov/aboutepa/about-office-chemical-safety-and-pollution-prevention#opp"
                  className="text-primary text-underline"
                  target="_blank"
                >
                  Office of Pesticide Programs (OPP)
                </a>
              </span>
            </div>
            <div className="mb-8">
              <ul>
                <li>
                  The Federal Food, Drug, and Cosmetic Act (FFDCA), as well as
                  the Pesticide Registration Improvement Act (PRIA), play a
                  large role in the FIFRA approval process
                </li>
                <li className="mt-3">
                  FFDCA mandates the establishment of minimum pesticide residue
                  tolerance or tolerance exemption
                </li>
                <li className="mt-3">
                  PRIA enacts various fees associated with pesticide
                  registration.
                </li>
                <li className="mt-3 ml-5">
                  If you are a small business [defined as 500 or fewer
                  employees, and an annual global across revenue from pesticides
                  that did not exceed $60 million (including revenue from all
                  affiliates) during the three-year period prior to the most
                  recent maintenance fee billing cycle], a state, or federal
                  agency, you may qualify for a{" "}
                  <a
                    className="text-primary text-underline"
                    href="https://www.epa.gov/pria-fees/pria-fee-waivers-small-businesses"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    PRIA fee waiver
                  </a>
                  .
                </li>
              </ul>
            </div>
          </div>

          {/* regulatory application */}
          <div
            id="regulatory-application"
            className="border-b-4 border-primary-lighter"
          >
            <h1 className="text-primary font-bold">Regulatory Application</h1>
            <div className="mb-8 text-lg">
              <p>
                All algaecides must be registered and approved by the EPA before
                use, with some exceptions:
              </p>
              <br></br>
              <ol className="ml-10">
                <li>1. Products consisting of only minimum risk ingredients</li>
                <li>
                  2. Permitted experimental use of pesticides in field studies
                </li>
                <li>
                  3. Products whose algaecidal function is achieved via physical
                  means
                </li>
              </ol>
            </div>
          </div>

          {/* permits applicable to algaecide use */}
          <div id="permits" className="border-b-4 border-primary-lighter">
            <h1 className="text-primary font-bold">
              Permit(s) applicable to algaecide use
            </h1>
            <div className="mb-8 text-lg">
              <p>
                To get a pesticide product legally approved as per FIFRA
                regulations, an applicant must submit a{" "}
                <a
                  href="/pesticideRegistration"
                  className="text-primary text-underline"
                >
                  Pesticide Product Registration Application
                </a>{" "}
                to the EPA. The pesticide registration process requires a
                diverse compilation of data and takes several years to complete.
              </p>
              <p className="mt-5">
                Following FIFRA approval, several other relevant acts and
                regulations police pesticide application. See the Acts &
                Regulations tab on the homepage to learn more.
              </p>
              <p className="mt-5">
                Additionally, each state has unique pesticide policies, and
                products must be registered and approved before application.
                Learn more about state-specific pesticide regulations by
                visiting{" "}
                <a
                  className="text-primary text-underline"
                  href="https://npic.orst.edu/reg/state_agencies.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  the National Pesticide Information Center
                </a>{" "}
                website or using the{" "}
                <a
                  href="/regulationsDirectory"
                  className="text-primary text-underline"
                >
                  US Regulatory Map
                </a>{" "}
                page on this site.
              </p>
            </div>
          </div>

          {/* Contacts */}
          <div id="contacts">
            <h1 className="text-primary font-bold">Contacts</h1>
            <p className="text-lg">
              Office of Pesticides Products (OPP) Contacts
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <p>
                <b>Director Edward Messina,</b>{" "}
                <a
                  className="text-primary text-lg text-underline"
                  href="mailto:messina.edward@epa.gov"
                >
                  messina.edward@epa.gov
                </a>
              </p>
              <p>
                <b>Deputy Director Elizabeth Vizard,</b>{" "}
                <a
                  className="text-primary text-lg text-underline"
                  href="mailto:vizard.elizabeth@epa.gov"
                >
                  vizard.elizabeth@epa.gov
                </a>
              </p>
              <p>
                <b>Deputy Director of Management Leo Gueriguian,</b>{" "}
                <a
                  className="text-primary text-lg text-underline"
                  href="mailto:gueriguian.leo@epa.gov"
                >
                  gueriguian.leo@epa.gov
                </a>
              </p>
              <p>
                <b>Pesticide Registration Director Charles "Billy" Smith,</b>{" "}
                <a
                  className="text-primary text-lg text-underline"
                  href="mailto:smith.charles@epa.gov"
                >
                  smith.charles@epa.gov
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

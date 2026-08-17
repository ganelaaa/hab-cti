"use client";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const sections = [
  { id: "pre-application", label: "Pre-Application Meeting" },
  { id: "permission-approvals", label: "Permission and Approvals" },
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

        {/* pre-application section */}
        <div className="flex-col">
          <div id="pre-application" className="mt-10 scroll-mt-28">
            <h1 className="font-bold text-primary !text-2xl">
              Prerequisites for getting an approval
            </h1>

            <p className="text-xl font-bold !mt-8 !text-lg">
              Have you completed your Pre-application Meeting?
            </p>

            <div className="bg-primary-lighter px-4 py-4 mt-10 rounded-2xl">
              <div className="font-bold gap-5 justify-center flex flex-row">
                <button className="bg-primary p-2 rounded text-white ">
                  EPA
                </button>
                <button className="text-gray-500 p-2 rounded">USACE</button>
              </div>
              <div className="px-4 py-2 bg-white mt-3 rounded-2xl">
                <h1 className="text-primary-darker font-bold text-lg! ">
                  Schedule a Pre-application meeting with EPA
                </h1>
                <p className="text-sm">
                  Before assembling an application for product registration or
                  an amendment to a product registration, an applicant or
                  registrant should first consider scheduling a pre-application
                  meeting. The pre-application meeting provides an opportunity
                  to discuss and confirm the data and labeling requirements that
                  apply to that application.
                </p>

                <div className="flex flex-row mt-5">
                  <div className="flex-1 pr-10">
                    <h1 className="font-bold text-lg!">
                      Set up a pre-registration meeting if you are considering
                      submitting an application involving a:
                    </h1>
                    <ul className="list-disc pl-5 text-sm">
                      <li>New active ingredient</li>
                      <li>Significant new uses of old chemicals</li>
                      <li>New Technology</li>
                      <li>
                        New or revised efficacy protocols (new methods of
                        application)
                      </li>
                      <li>
                        Any innovation that requires significant data to be
                        generated and submitted
                      </li>
                    </ul>

                    <h1 className="font-bold mt-20 text-lg!">
                      The request should have the following information:
                    </h1>
                    <ul className="list-disc pl-5 text-sm">
                      <li>
                        Identify any new active ingredient (chemical name,
                        formula, structural formula, and chemical class).
                      </li>
                      <li>
                        Description of the proposed use(s) and product claims
                        (labeling; identify public health claims, a "food use"
                        is involved, and the method of application.
                      </li>
                      <li>
                        Issues (what the company wishes to raise for AD
                        consideration)
                      </li>
                      <li>
                        Summary of any previous discussions involving EPA staff
                        of the issues
                      </li>
                      <li>Tentative dates for meeting</li>
                    </ul>
                  </div>

                  <div className="w-1 self-stretch bg-primary-lighter"></div>

                  <div className="flex flex-col gap-8 pl-10 justify-center pt-1">
                    <button className="bg-primary hover:bg-primary-darker px-6 py-3 rounded-lg whitespace-nowrap text-white">
                      Visit EPA Website
                    </button>
                    <button className="bg-primary hover:bg-primary-darker px-6 py-3 rounded-lg whitespace-nowrap text-white">
                      Get Documents List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* permission and approvals section */}
          <div id="permission-approvals" className="mt-10 scroll-mt-28">
            <h1 className="font-bold text-primary !text-2xl">
              Determine Applicable Regulatory Requirements
            </h1>
            <p className="text-sm">
              Use this guided tool to identify relevant federal permits and
              registrations for your harmful algal bloom control technology.
            </p>

            <div className="border-gray-200 border-b-2 border-t-2 border-l-2 border-r-2 rounded-xl py-4 px-4 mt-5">
              <div className="flex flex-row items-center">
                {/* left side */}
                <div
                  className="border-primary border-l-2 border-r-2 border-t-2 border-b-2 rounded-xl p-3 flex flex-col gap-1"
                  style={{
                    alignSelf: "center",
                    height: "fit-content",
                    backgroundImage:
                      "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
                    backgroundSize: "15px 15px",
                  }}
                >
                  <p>Is this product intended to be used as a pesticide?</p>
                  <button className="border-gray-200 border-b-2 border-t-2 border-l-2 border-r-2 rounded">
                    Yes
                  </button>
                  <button className="border-gray-200 border-b-2 border-t-2 border-l-2 border-r-2 rounded">
                    No
                  </button>
                </div>

                <div className="w-1 self-stretch bg-gray-200 mx-5 ml-5"></div>

                {/* right side */}
                <div className="flex flex-col ml-5">
                  <div className="flex flex-row justify-center">
                    <svg
                      className="usa-icon text-primary border border-primary rounded px-1 py-1 text-3xl"
                      aria-hidden="true"
                      focusable="false"
                      role="img"
                    >
                      <use href="/assets/img/sprite.svg#lightbulb"></use>
                    </svg>
                    <div className="flex flex-col ml-3">
                      <p className="font-bold">Understand your choices</p>
                      <p className="text-sm">
                        Definitions, guidance, and examples.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-bold text-green-700 mt-5">Question</p>
                    <p className="font-bold">
                      Is it a physical, chemical or a biological product?
                    </p>

                    <p className="mt-5 text-primary font-bold">1. Yes</p>
                    <p className="text-sm mt-2">
                      Your product is designed to prevent, destroy, repel, or
                      mitigate harmful algal blooms (HABs) and fits the legal
                      definition of a pesticide under FIFRA (Federal
                      Insecticide, Fungicide, and Rodenticide Act).
                    </p>

                    <p className="mt-3 text-sm">
                      <b>When to choose this:</b> If the product has a direct
                      mode of action on algae and is marketed or used as a
                      control method.
                    </p>
                    <p className="mt-3 text-sm">
                      <b>Example:</b> A copper-based algaecide used to kill
                      algae in lakes. A hydrogen peroxide solution formulated to
                      break down algal cells.
                    </p>

                    <p className="mt-5 text-primary font-bold">1. No</p>
                    <p className="text-sm mt-2">
                      Your product is not intended to act as a pesticide or is
                      used for non-pesticidal purposes (e.g., physical
                      suppression, inert delivery).
                    </p>
                    <p className="mt-3 text-sm">
                      <b>When to choose this:</b> If the product does not have
                      an active pesticidal claim or effect or it's being used
                      for research not intended to impact HABs directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Data Partners */}
          <p className="text-sm text-primary font-bold mt-20 text-center">
            DATA PARTNERS
          </p>
          <div className="flex flex-row mt-5 justify-center gap-20">
            <img
              src="/NOAA.svg"
              alt="NOAA"
              className="w-18 h-18 rounded-full object-contain"
            />
            <img
              src="/IMET.jpg"
              alt="IMET"
              className="w-18 h-18 rounded-full object-contain"
            />
            <img
              src="/MOTE.png"
              alt="MOTE"
              className="w-18 h-18 rounded-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

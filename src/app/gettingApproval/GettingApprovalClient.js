"use client";

import { useEffect, useRef, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const richText =
  "prose cms-rich max-w-none [&_p]:mt-4 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_li]:mt-2 [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-black [&>*:first-child]:mt-0";

const sections = [
  { id: "pre-application", label: "Pre-Application Meeting" },
  { id: "permission-approvals", label: "Permission and Approvals" },
];

const linkClass = "text-primary underline";

const productOptions = [
  {
    id: "biological",
    label: "Biological",
    content: (
      <p>
        Biological products include{" "}
        <a href="/glossary#biochemical-pesticides" className={linkClass}>
          biochemical pesticides
        </a>
        ,{" "}
        <a href="/glossary#microbial-pesticides" className={linkClass}>
          microbial pesticides
        </a>
        ,{" "}
        <a
          href="/glossary#plant-incorporated-protectants-pip"
          className={linkClass}
        >
          plant-incorporated protectants (PIPs)
        </a>
        , or similar technologies.
      </p>
    ),
  },
  {
    id: "chemical",
    label: "Chemical",
    content: (
      <>
        <p>
          Conventional pesticides are all active ingredients other than
          biological pesticides and{" "}
          <a href="/glossary#antimicrobial-pesticide" className={linkClass}>
            antimicrobial pesticides
          </a>
          . Conventional active ingredients are generally produced
          synthetically, i.e., are synthetic chemicals that prevent, mitigate,
          destroy, or repel any pest; or that act as a plant growth regulator,
          desiccant, defoliant or nitrogen stabilizer.
        </p>
        <p className="mt-3">
          Wood preservative and anti-foulant products that do not have
          antimicrobial uses and agricultural fungicide and aquatic herbicide
          products are either classified as a conventional or a biochemical
          pesticide. Biochemical pesticides with a toxic mode of action are
          classified for the purposes of the registration process as
          conventional pesticides.
        </p>
        <p className="mt-3">
          Conventional pesticides may also be considered{" "}
          <a href="/minimumRiskPesticides" className={linkClass}>
            minimum risk
          </a>
          , reducing the regulations applied to their approval and use.
        </p>
      </>
    ),
  },
  {
    id: "physical",
    label: "Physical",
    content: (
      <>
        <p>
          An instrument or contrivance, generally working by physical means
          (e.g., electricity, light, or other mechanical or physical means) and
          not containing a substance or mixture of substances, that is intended
          to trap, destroy, repel, or mitigate a pest. Physical technologies do
          not require the same rigor of testing to obtain federal approval.
        </p>
        <p className="mt-3">
          This definition excludes equipment used for applying pesticides when
          sold separately from the pesticides themselves.{" "}
          <a
            href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-152/subpart-Z/section-152.500"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            40 C.F.R. § 152.500(a)
          </a>
          .
        </p>
        <p className="mt-3">
          Some physical devices currently approved to combat HABs include
          nanobubble technology, ultrasonic technology, and ozone treatment.
        </p>
      </>
    ),
  },
];

const pesticideOptions = [
  {
    id: "yes",
    label: "Yes",
    content: (
      <>
        <p>
          Your product is designed to prevent, destroy, repel, or mitigate
          harmful algal blooms (HABs) and fits the legal definition of a
          pesticide under FIFRA (Federal Insecticide, Fungicide, and Rodenticide
          Act).
        </p>
        <p className="mt-3">
          <strong>When to choose this:</strong> If the product has a direct mode
          of action on algae and is marketed or used as a control method.
        </p>
        <p className="mt-3">
          <strong>Example:</strong> A copper-based algaecide used to kill algae
          in lakes, A hydrogen peroxide solution formulated to break down algal
          cells.
        </p>
      </>
    ),
  },
  {
    id: "no",
    label: "No",
    content: (
      <>
        <p>
          Your product is not intended to act as a pesticide or is used for
          non-pesticidal purposes (e.g., physical suppression, inert delivery).
        </p>
        <p className="mt-3">
          <strong>When to choose this:</strong> If the product does not have an
          active pesticidal claim or effect, or it&apos;s being used for
          research not intended to impact HABs directly.
        </p>
      </>
    ),
  },
];

const guidedSteps = [
  {
    id: "pesticide",
    question: "Is this product intended to be used as a pesticide?",
    options: pesticideOptions,
  },
  {
    id: "product",
    question: "What type of product do you have?",
    options: productOptions,
  },
];

export default function GettingApprovalClient({ cms }) {
  const [activeSection, setActiveSection] = useState("pre-application");
  const [answers, setAnswers] = useState({});
  const [revealedSteps, setRevealedSteps] = useState(1);
  const [activeStep, setActiveStep] = useState(0);

  const panelRef = useRef(null);

  const selectAnswer = (index, step, optionId) => {
    setAnswers((prev) => ({ ...prev, [step.id]: optionId }));
    const next = Math.min(index + 1, guidedSteps.length - 1);
    setRevealedSteps((prev) => Math.max(prev, next + 1));
    setActiveStep(next);

    // Point the side panel at the chosen answer
    setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      if (next !== index) {
        panel.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(`guidance-${step.id}-${optionId}`);
      if (el) panel.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" });
    }, 50);
  };

  const currentStep = guidedSteps[activeStep];

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
        <span className="text-primary">Laws and Permits</span>
        <span>›</span>
        <span className="text-gray-800">Getting an Approval</span>
      </div>

      <InternalPageHero
        title={cms?.pageTitle || "Getting an approval"}
        subtitle={
          cms?.pageSubtitle || "Guide to getting an approval on your own"
        }
      />

      <div className="mt-0 flex flex-row gap-10">
        {/* Sticky nav */}
        <div className="mt-10 w-56 shrink-0">
          <div className="sticky top-28">
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

        <div className="min-w-0 flex-1">
          {/* Pre-Application Meeting */}
          <div id="pre-application" className="mt-10 scroll-mt-28">
            <h1 className="mb-6 text-3xl font-bold text-primary">
              Pre-requisites for getting an approval
            </h1>
            <div className="flex flex-row items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-black">
                {cms?.questionHeading ||
                  "Have you completed your Pre-application Meeting?"}
              </h2>
              <div
                aria-hidden="true"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-400 bg-red-50 text-red-500"
              >
                ↑
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-primary-lighter p-6">
              <div className="rounded-2xl bg-white p-8">
                <h3 className="text-xl font-bold text-primary">
                  {cms?.meetingHeading ||
                    "Schedule a Pre-application meeting with EPA"}
                </h3>
                <div
                  className={`${richText} mt-3 text-sm`}
                  dangerouslySetInnerHTML={{ __html: cms?.meetingIntro || "" }}
                />

                <div className="mt-8 flex flex-row gap-8 max-lg:flex-col">
                  <div
                    className={`${richText} flex-1 border-r-4 border-primary-lighter pr-8 text-sm max-lg:border-r-0 max-lg:pr-0`}
                    dangerouslySetInnerHTML={{ __html: cms?.meetingBody || "" }}
                  />
                  <div className="flex w-56 shrink-0 flex-col items-center justify-center gap-4 max-lg:w-full">
                    <a
                      href={cms?.websiteLink || "https://www.epa.gov"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-white! no-underline hover:bg-primary-darker"
                    >
                      Visit EPA Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Determine Product Classification */}
          <div
            id="permission-approvals"
            className="mt-16 scroll-mt-28 border-t-4 border-primary-lighter pt-10"
          >
            <h2 className="text-2xl font-bold text-primary-darker">
              Determine Product Classification
            </h2>
            <p className="mt-2 text-sm">
              Use this guided tool to identify relevant federal permits and
              registrations for your harmful algal bloom control technology.
            </p>
            <div className="mt-6 grid grid-cols-2 overflow-clip rounded-lg border border-gray-300 shadow-sm max-lg:grid-cols-1">
              {/* Left: question cards */}
              <div className="flex flex-col items-center bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] p-8 [background-size:16px_16px]">
                {guidedSteps.slice(0, revealedSteps).map((step, index) => (
                  <div
                    key={step.id}
                    className="flex w-full flex-col items-center"
                  >
                    {index > 0 && <div className="h-8 w-0.5 bg-gray-300"></div>}
                    <div
                      onClick={() => setActiveStep(index)}
                      className="w-full max-w-sm cursor-pointer rounded-xl bg-white p-5 shadow-xs"
                      style={{ border: "2px solid #005EA2" }}
                    >
                      <h3 className="text-base font-bold text-gray-900">
                        {step.question}
                      </h3>
                      <div className="mt-4 flex flex-col gap-2">
                        {step.options.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              selectAnswer(index, step, opt.id);
                            }}
                            className={`w-full cursor-pointer rounded-md px-4 py-2 text-left text-sm font-medium transition-all ${
                              answers[step.id] === opt.id
                                ? "bg-[#005EA2] font-semibold text-white shadow-sm"
                                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right: guidance panel */}
              <div className="border-l border-gray-200 bg-[#eaf4fc] p-8">
                <div
                  ref={panelRef}
                  className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2"
                >
                  <div
                    className="mb-6 inline-flex w-fit items-center gap-3 rounded-lg bg-white p-3 shadow-2xs"
                    style={{ border: "1.5px solid #005EA2" }}
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#005EA2] text-sm text-white">
                      💡
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        Understand Your Choices
                      </h4>
                      <p className="text-xs text-gray-500">
                        Definitions, guidance, and examples.
                      </p>
                    </div>
                  </div>

                  <p className="mb-1 text-sm font-bold uppercase tracking-wide text-green-800">
                    Question
                  </p>
                  <p className="mb-6 text-base font-bold text-gray-900">
                    {currentStep.question}
                  </p>

                  {currentStep.options.map((opt, index) => {
                    const chosen = answers[currentStep.id] === opt.id;
                    return (
                      <div
                        key={opt.id}
                        id={`guidance-${currentStep.id}-${opt.id}`}
                        className={`mb-4 rounded-lg p-3 transition-colors ${
                          chosen ? "bg-white ring-2 ring-[#005EA2]" : ""
                        }`}
                      >
                        <h4
                          className="mb-2 text-base font-bold"
                          style={{ color: "#005EA2" }}
                        >
                          {index + 1}. {opt.label}
                        </h4>
                        <div className="text-sm text-gray-800">
                          {opt.content}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Data Partners */}
            <p className="mt-20 text-center text-sm font-bold text-primary-darker">
              DATA PARTNERS
            </p>
            <div className="mt-5 flex flex-row items-center justify-center gap-30">
              <img
                src="/NOAA.svg"
                alt="NOAA"
                className="h-20 w-20 rounded-full object-contain"
              />
              <img
                src="/IMET.jpg"
                alt="IMET"
                className="h-20 w-20 rounded-full object-contain"
              />
              <img
                src="/MOTE.png"
                alt="Mote"
                className="h-20 w-20 rounded-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

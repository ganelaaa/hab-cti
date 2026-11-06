"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";
import { getExperimentalUseFields } from "@/lib/cms";

export default function ExperimentalUse() {
  const [cms, setCms] = useState(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initFields() {
      try {
        const payload = await getExperimentalUseFields();
        setCms(payload);
      } catch (err) {
        console.error("Headless API fetch crash:", err);
      } finally {
        setLoading(false);
      }
    }
    initFields();
  }, []);

  // Anchor indicators map dynamically directly from live headline titles
  const sections = [
    { id: "overview", label: cms?.overviewTitle || "Overview" },
    {
      id: "eup-application",
      label:
        cms?.eupApplicationTitle ||
        "Information Required for the EPA Experimental Use Permit Application",
    },
    {
      id: "confidential-statement",
      label:
        cms?.confidentialStatementTitle ||
        "Information Required for the EPA Confidential Statement of Formula",
    },
    {
      id: "required-forms",
      label: cms?.requiredFormsTitle || "Required Forms",
    },
    {
      id: "additional-resources",
      label: cms?.additionalResourcesTitle || "Additional Resources",
    },
    {
      id: "questions",
      label:
        cms?.questionsTitle || "Questions about EPA Experimental Use Permits?",
    },
    { id: "citation", label: "Citation" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.pushState(null, "", `#${id}`);
  };

  useEffect(() => {
    if (loading) return;
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
  }, [loading, cms]);

  if (loading) {
    return (
      <div className="p-20 text-center text-gray-500">
        Loading permit metrics database...
      </div>
    );
  }

  // --- STATIC HTML CONTENT FALLBACKS (IF CMS TEXT AREAS ARE BLANK) ---
  const defaultOverviewHtml = `
    <p>To perform field trials on a new algaecide product or a new use for an approved product, you must obtain an Experimental Use Permit (EUP) from the EPA and the respective state(s) where field trials will be conducted. Aquatic area allowance varies by state.</p>
    <p class="mt-5">For aquatic uses, there is normally an exemption for testing in water bodies one surface acre or less in size per pest tested. However, only products with a tolerance or exemption from tolerance may be tested in waters used for irrigation, drinking water supplies, or swimming, or waters that contain or affect any fish, shellfish, or other plants or animals that may be taken for food or feed, including marine waters. See <a href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-172/section-172.3" target="_blank" class="text-primary underline">40 CFR 172.3</a>.</p>
    <p class="mt-5">Three forms must be submitted to obtain an EPA EUP: <a href="https://www.epa.gov/sites/default/files/2013-07/documents/8570-17.pdf" target="_blank" class="text-primary underline">EPA Form 8570-17</a> (Application for an Experimental Use Permit), <a href="https://www.epa.gov/sites/default/files/2013-07/documents/8570-4_0.pdf" target="_blank" class="text-primary underline">EPA Form 8570-4</a> (Confidential Statement of Formula), and <a href="https://www.epa.gov/sites/default/files/2021-01/documents/8570-35.pdf" target="_blank" class="text-primary underline">EPA Form 8570-35</a> (Data Matrix).</p>
  `;

  const defaultEupApplicationHtml = `
    <ul class="ml-6 list-disc">
      <li>Purpose or objectives of the proposed testing</li>
      <li class="mt-3">Detailed description of the proposed testing program, including the pest organism(s) involved, dosage rates, and states.</li>
      <li class="mt-3">Toxicity data may already be available for some ingredients. Applicants should use the <a href="https://www.epa.gov/pesticide-registration/pesticide-data-submitters-list-pdsl" target="_blank" class="text-primary underline">Pesticide Data Submitters List</a> to check.</li>
    </ul>
  `;

  const defaultConfidentialHtml = `
    <ul class="ml-6 list-disc">
      <li>A complete confidential statement of formula of the product to be tested that provides a tabulation of active and inert ingredients.</li>
      <li class="mt-3">Chemical and physical properties of each active ingredient of the formulation being tested.</li>
    </ul>
  `;

  const defaultRequiredFormsHtml = `
    <p>The following forms must be submitted as part of the Experimental Use Permit Application:</p>
    <ul class="mt-5 ml-6 list-disc">
      <li>Application for an Experimental Use Permit <a href="https://www.epa.gov/sites/default/files/2013-07/documents/8570-17.pdf" target="_blank" class="text-primary underline">(EPA Form 8570-17)</a></li>
      <li class="mt-3">Confidential Statement of Formula <a href="https://www.epa.gov/sites/default/files/2013-07/documents/8570-4_0.pdf" target="_blank" class="text-primary underline">(EPA Form 8570-4)</a></li>
      <li class="mt-3">Data Matrix <a href="https://www.epa.gov/sites/default/files/2021-01/documents/8570-35.pdf" target="_blank" class="text-primary underline">(EPA Form 8570-35)</a></li>
    </ul>
  `;

  const defaultAdditionalResourcesHtml = `
    <ul class="ml-6 list-disc">
      <li>See the EPA website for the <a href="https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-12-applying-experimental-use-permit#suggested-format-for-an-experimental-use-permit-application" target="_blank" class="text-primary underline">Suggested Format for an EUP Application</a>.</li>
    </ul>
  `;

  const defaultQuestionsHtml = `
    <ul class="ml-6 list-disc">
      <li><b>Antimicrobial Pesticides Contact:</b> Yvette Hopkins, <a href="mailto:hopkins.yvette@epa.gov" class="text-primary underline">hopkins.yvette@epa.gov</a>, 703-308-6214</li>
      <li class="mt-3"><b>Biopesticides Contact:</b> Robert Torla, <a href="mailto:torla.robert@epa.gov" class="text-primary underline">torla.robert@epa.gov</a>, 703-308-8098</li>
    </ul>
  `;

  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Breadcrumb row map */}
      <div className="mb-8 flex flex-row items-center gap-2 text-sm text-gray-500">
        <svg
          className="usa-icon text-gray-500 w-4 h-4"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>
        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>
        <span>›</span>
        <span className="text-primary">Laws and Permits</span>
        <span>›</span>
        <span className="text-gray-800">EPA Experimental Use Permit</span>
      </div>

      <InternalPageHero
        title={cms?.pageTitle || "EPA Experimental Use Permit"}
        subtitle={
          cms?.pageSubtitle ||
          "Experimental Use Permit Application Requirements"
        }
        link="https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-12-applying-experimental-use-permit"
      />

      <div className="mt-0 flex flex-row gap-10">
        {/* On This Page: Navigation Side Control Panel */}
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

        {/* Dynamic Inner HTML Content Displays */}
        <div className="flex-1 min-w-0 break-words whitespace-normal">
          <div
            className="mt-10 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: cms?.introText || "" }}
          />
          {/* Section 1: Overview */}
          <div
            id="overview"
            className="mt-10 scroll-mt-28 border-b-4 border-primary-lighter pb-6 prose max-w-none"
          >
            <h1 className="font-bold text-primary text-2xl mb-4">
              {cms?.overviewTitle || "Overview"}
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html: cms?.overviewDescription || defaultOverviewHtml,
              }}
            />
          </div>

          {/* Section 2: EUP Application Info */}
          <div
            id="eup-application"
            className="scroll-mt-28 border-b-4 border-primary-lighter pt-10 pb-6 prose max-w-none"
          >
            <h1 className="font-bold text-primary text-2xl mb-4">
              {cms?.eupApplicationTitle ||
                "Information Required for the EPA Experimental Use Permit Application"}
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  cms?.eupApplicationDescription || defaultEupApplicationHtml,
              }}
            />
          </div>

          {/* Section 3: Confidential Statement */}
          <div
            id="confidential-statement"
            className="scroll-mt-28 border-b-4 border-primary-lighter pt-10 pb-6 prose max-w-none"
          >
            <h1 className="font-bold text-primary text-2xl mb-4">
              {cms?.confidentialStatementTitle ||
                "Information Required for the EPA Confidential Statement of Formula"}
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  cms?.confidentialStatementDescription ||
                  defaultConfidentialHtml,
              }}
            />
          </div>

          {/* Section 4: Required Forms */}
          <div
            id="required-forms"
            className="scroll-mt-28 border-b-4 border-primary-lighter pt-10 pb-6 prose max-w-none"
          >
            <h1 className="font-bold text-primary text-2xl mb-4">
              {cms?.requiredFormsTitle || "Required Forms"}
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  cms?.requiredFormsDescription || defaultRequiredFormsHtml,
              }}
            />
          </div>

          {/* Section 5: Additional Resources */}
          <div
            id="additional-resources"
            className="scroll-mt-28 border-b-4 border-primary-lighter pt-10 pb-6 prose max-w-none"
          >
            <h1 className="font-bold text-primary text-2xl mb-4">
              {cms?.additionalResourcesTitle || "Additional Resources"}
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  cms?.additionalResourcesDescription ||
                  defaultAdditionalResourcesHtml,
              }}
            />
          </div>

          {/* Section 6: Questions Contacts */}
          <div
            id="questions"
            className="scroll-mt-28 border-b-4 border-primary-lighter pt-10 pb-6 prose max-w-none"
          >
            <h1 className="font-bold text-primary text-2xl mb-4">
              {cms?.questionsTitle ||
                "Questions about EPA Experimental Use Permits?"}
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html: cms?.questionsDescription || defaultQuestionsHtml,
              }}
            />
          </div>

          <div
            id="citation"
            className="scroll-mt-28 pt-6 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: cms?.citationText || "" }}
          />
        </div>
      </div>
    </div>
  );
}

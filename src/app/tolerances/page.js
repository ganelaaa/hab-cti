"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "setting-tolerances", label: "Setting Tolerances" },
  { id: "required-data", label: "Required Data" },
  { id: "standardized-test-procedures", label: "Standardized Test Procedures" },
  { id: "additional-resources", label: "Additional Resources" },
  { id: "questions", label: "Questions about pesticide tolerances?" },
];

const externalLinks = {
  pesticideTolerances: "https://www.epa.gov/pesticide-tolerances",
  heroLink:
    "https://www.epa.gov/pesticide-tolerances/about-pesticide-tolerances",
  ffdca:
    "https://www.epa.gov/laws-regulations/summary-federal-food-drug-and-cosmetic-act",
  cfr15250:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-152/subpart-C/section-152.50",
  cfr180:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-180",
  srs: "https://cdxapps.epa.gov/oms-substance-registry-services/search",
  productData: "#required-data",
  testGuidelines:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/final-test-guidelines-pesticides-and-toxic",
  testGuidelinesBase:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances",
  pesticideRegistration:
    "https://www.epa.gov/pesticide-registration/about-pesticide-registration",
  oecdGuidelines:
    "https://www.oecd.org/en/topics/sub-issues/testing-of-chemicals/test-guidelines.html",
  oecdMrl:
    "https://www.epa.gov/pesticide-tolerances/oecd-maximum-residue-limit-calculator",
  searchTolerances:
    "https://www.epa.gov/pesticide-tolerances/how-search-tolerances-pesticide-ingredients-code-federal-regulations",
  series810:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-810-product-performance-test-guidelines",
  series830:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-830-product-properties-test-guidelines",
  series835:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-835-fate-transport-and-transformation-test",
  series840:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-840-spray-drift-test-guidelines",
  series850:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-850-ecological-effects-test-guidelines",
  series860:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-860-residue-chemistry-test-guidelines",
  series870:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-870-health-effects-test-guidelines",
  series875:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-875-occupational-and-residential-exposure",
  series880:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-880-biochemicals-test-guidelines",
  series885:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-885-microbial-pesticide-test-guidelines",
  ecologicalRisk:
    "https://www.epa.gov/pesticide-science-and-assessing-pesticide-risks/factsheet-ecological-risk-assessment-pesticides",
  humanHealthRisk:
    "https://www.epa.gov/pesticide-science-and-assessing-pesticide-risks/assessing-human-health-risk-pesticides",
  cumulativeRisk:
    "https://www.epa.gov/pesticide-science-and-assessing-pesticide-risks/cumulative-assessment-risk-pesticides",
  questionForm:
    "https://www.epa.gov/pesticide-tolerances/forms/contact-us-about-pesticide-tolerances",
};

function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-primary text-underline ${className}`}
    >
      {children}
    </a>
  );
}

function InternalAnchor({ href, children, className = "" }) {
  return (
    <a href={href} className={`text-primary text-underline ${className}`}>
      {children}
    </a>
  );
}

function MailLink({ email, children }) {
  return (
    <a href={`mailto:${email}`} className="text-primary text-underline">
      {children || email}
    </a>
  );
}

function RenderParts({ parts }) {
  return parts.map((part, index) => {
    if (typeof part === "string") {
      return <span key={index}>{part}</span>;
    }

    if (part.type === "internal") {
      return (
        <InternalAnchor key={index} href={part.href}>
          {part.text}
        </InternalAnchor>
      );
    }

    if (part.type === "mail") {
      return (
        <MailLink key={index} email={part.href}>
          {part.text}
        </MailLink>
      );
    }

    return (
      <ExternalLink key={index} href={part.href}>
        {part.text}
      </ExternalLink>
    );
  });
}

function RequiredDataTable() {
  const rows = [
    {
      registrantParts: [
        "Product Chemistry ",
        { text: "(Series 830)", href: externalLinks.series830 },
      ],
      epaParts: [
        {
          text: "Ecological risk assessment",
          href: externalLinks.ecologicalRisk,
        },
      ],
    },
    {
      registrantParts: [
        "Product Performance ",
        { text: "(Series 810)", href: externalLinks.series810 },
      ],
      epaParts: [
        {
          text: "Human health risk assessment",
          href: externalLinks.humanHealthRisk,
        },
      ],
    },
    {
      registrantParts: [
        "Data from studies to determine hazards to humans and domestic animals ",
        { text: "(Series 870)", href: externalLinks.series870 },
      ],
      epaParts: [
        {
          text: "Cumulative risk assessment",
          href: externalLinks.cumulativeRisk,
        },
      ],
    },
    {
      registrantParts: [
        "Data from studies to determine hazards to nontarget organisms and the environment ",
        { text: "(Series 850)", href: externalLinks.series850 },
      ],
      epaParts: [],
    },
    {
      registrantParts: [
        "Post-application exposure studies ",
        { text: "(Series 875)", href: externalLinks.series875 },
      ],
      epaParts: [],
    },
    {
      registrantParts: [
        "Applicator/user exposure studies ",
        { text: "Series 875)", href: externalLinks.series875 },
      ],
      epaParts: [],
    },
    {
      registrantParts: [
        "Spray drift evaluation ",
        { text: "(Series 840)", href: externalLinks.series840 },
      ],
      epaParts: [],
    },
    {
      registrantParts: [
        "Environmental Fate ",
        { text: "(Series 835)", href: externalLinks.series835 },
      ],
      epaParts: [],
    },
    {
      registrantParts: [
        "Residue Chemistry ",
        { text: "(Series 860)", href: externalLinks.series860 },
      ],
      epaParts: [],
    },
  ];

  return (
    <div className="my-8 max-w-full overflow-x-auto tracking-normal">
      <table className="mx-auto w-full max-w-[820px] table-fixed border-collapse border border-black text-left text-base text-black">
        <caption className="border border-b-0 border-black bg-gray-100 px-2 py-3 text-left text-xl font-normal text-black">
          Scientific Analyses and Data Required to Establish Tolerances
        </caption>

        <thead>
          <tr>
            <th className="w-1/2 border border-black px-2 py-2 text-left font-bold leading-tight">
              Registrant Data with Links to Test Guidelines*
            </th>
            <th className="w-1/2 border border-black px-2 py-2 text-left font-bold leading-tight">
              EPA Analyses with Links to EPA webpage
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="break-words border border-black px-2 py-2 align-top leading-snug">
                <RenderParts parts={row.registrantParts} />
              </td>
              <td className="break-words border border-black px-2 py-2 align-top leading-snug">
                {row.epaParts.length > 0 ? (
                  <RenderParts parts={row.epaParts} />
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="mx-auto mt-12 w-full max-w-[820px] table-fixed border-collapse border border-black text-left text-base text-black">
        <thead>
          <tr>
            <th
              colSpan="3"
              className="border border-black bg-gray-100 px-2 py-2 text-left font-normal"
            >
              Additional Registrant Data Information
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="w-1/3 break-words border border-black px-2 py-3 align-top leading-snug">
              <ExternalLink href={externalLinks.oecdGuidelines}>
                OECD Standardized Test Procedures
              </ExternalLink>
            </td>
            <td className="w-1/3 break-words border border-black px-2 py-3 align-top leading-snug">
              Biochemicals Test Guidelines{" "}
              <ExternalLink href={externalLinks.series880}>
                (Series 880)
              </ExternalLink>
            </td>
            <td className="w-1/3 break-words border border-black px-2 py-3 align-top leading-snug">
              Microbial Pesticide Test Guidelines{" "}
              <ExternalLink href={externalLinks.series885}>
                (Series 885)
              </ExternalLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function TolerancesPage() {
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

        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>

        <span>›</span>

        <Link href="/learnMore" className="text-primary hover:underline">
          Learn More
        </Link>

        <span>›</span>

        <span className="text-gray-800">Tolerances</span>
      </div>

      {/* background image */}
      <div className="relative mt-4 h-28 text-white">
        <div className="absolute inset-0 bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-black opacity-65" />

        {/* Content */}
        <div className="relative z-10 px-1 py-4 text-center duration-300 hover:scale-105">
          <a
            href={externalLinks.heroLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white no-underline hover:no-underline"
          >
            <h1 className="!mb-0 !mt-1 !text-4xl font-bold text-white">
              Tolerances
            </h1>
          </a>

          <p className="!mt-2 text-lg text-gray-200">
            FFDCA - Maximum pesticide residue tolerance policies
          </p>
        </div>
      </div>

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

        <div className="min-w-0 flex-1">
          <p className="mt-10">
            This information presented on this webpage was collected from the{" "}
            <a
              className="text-underline text-primary"
              href="https://www.epa.gov/pesticide-tolerances"
            >
              EPA Regulation of Pesticide Residues on Food webpage
            </a>{" "}
            or the{" "}
            <a
              className="text-underline text-primary"
              href="https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances"
            >
              EPA Test Guidelines for Pesticides and Toxic Substances webpage
            </a>
            , unless otherwise specified. For more details, please visit the
            website. For a full list of contact information for individuals,
            offices, and topics, visit the{" "}
            <a
              className="text-underline text-primary"
              href="https://www.epa.gov/pesticide-contacts/contacting-epa-about-regulating-pesticides-issues"
            >
              EPA’s Pesticide Contacts Page
            </a>
            .{" "}
          </p>
          {/* overview section */}
          <div
            id="overview"
            className="mt-10 scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Overview</h1>

            <div className="mb-8 text-lg">
              <p>
                FIFRA-approved pesticides that are used on food products or may
                leave residues on non-target harvested food sources must have an
                established tolerance (maximum residue limit) or tolerance
                exemptions. A level of residue greater than or equal to the set
                tolerance triggers enforcement actions. Therefore, pesticide
                residues should always be less than the tolerance.
              </p>

              <p className="mt-5">
                <b>
                  Algaecides developed for use in marine environments are
                  subject to tolerance regulations
                </b>{" "}
                because pesticide residue may collect on marine organisms
                harvested for consumption. Under{" "}
                <ExternalLink href={externalLinks.ffdca}>
                  Section 408 of the Federal Food, Drug, and Cosmetic Act
                </ExternalLink>{" "}
                <a
                  className="text-underline text-primary"
                  href="https://habctrl.info/agency/413"
                >
                  (FFDCA)
                </a>
                , both the active and inert ingredients in a pesticide need a
                tolerance or an exemption from tolerance.{" "}
                <ExternalLink href={externalLinks.cfr15250}>
                  40 CFR 152.50(i)
                </ExternalLink>{" "}
                provides further information on pesticide ingredient tolerances
                and registration.
              </p>

              <p className="mt-5">
                A tolerance or tolerance exemption may already exist for
                FIFRA-approved pesticide ingredients. Information for tolerances
                and exemptions for pesticide chemical residues in food can be
                found in{" "}
                <ExternalLink href={externalLinks.cfr180}>
                  40 CFR 180
                </ExternalLink>
                . Ingredient-specific information, for FIFRA-approved
                ingredients, can be found by searching the{" "}
                <ExternalLink href={externalLinks.srs}>
                  EPA’s Substance Registry Services (SRS)
                </ExternalLink>
                .
              </p>
            </div>
          </div>

          {/* setting tolerances */}
          <div
            id="setting-tolerances"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Setting Tolerances</h1>

            <div className="mb-8 text-lg">
              <ul className="ml-6 list-disc">
                <li>
                  The EPA establishes tolerances such that a pesticide can be
                  used with “reasonable certainty of no harm.”
                </li>

                <li className="mt-3">
                  Factors considered in setting a tolerance
                  <ul className="mt-3 ml-6 list-[circle]">
                    <li>
                      Toxicity of the pesticide and its breakdown products
                    </li>
                    <li className="mt-3">
                      The frequency and amount of pesticide application
                      necessary to treat the pest
                    </li>
                    <li className="mt-3">
                      Residue remaining on food by the time it is marketed and
                      prepared
                    </li>
                    <li className="mt-3">
                      All possible routes of exposure to the pesticide
                    </li>
                  </ul>
                </li>

                <li className="mt-3">
                  ENFORCEMENT - Food products produced in the US are regulated
                  by the Food and Drug Administration (FDA), the US Department
                  of Agriculture (USDA), and state enforcement agencies.
                </li>

                <li className="mt-3">
                  Before the establishment of pesticide tolerances, the
                  pesticide registrant must provide the EPA with{" "}
                  <InternalAnchor href={externalLinks.productData}>
                    product data
                  </InternalAnchor>{" "}
                  in accordance with FIFRA pesticide registration.
                </li>

                <li className="mt-3">Tolerances</li>
              </ul>
            </div>
          </div>

          {/* required data */}
          <div
            id="required-data"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Required Data</h1>

            <div className="mb-8 text-lg">
              <p>
                Though the EPA establishes pesticide tolerances,{" "}
                <b>
                  the registrant must provide scientific data to inform the
                  EPA’s analyses.
                </b>{" "}
                See the table below for guidance on the data provided by the
                registrant vs. the analyses conducted by the EPA.
              </p>

              <RequiredDataTable />
            </div>
          </div>

          {/* standardized test procedures */}
          <div
            id="standardized-test-procedures"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              Standardized Test Procedures
            </h1>

            <div className="mb-8 text-lg">
              <p>
                The EPA Guideline Series contains information on data
                requirements but not test procedures. Standardized procedures
                for the prescribed tests can be found on the Organisation for
                Economic Co-operation and Development’s{" "}
                <ExternalLink href={externalLinks.oecdGuidelines}>
                  (OECD) Guidelines for the Testing of Chemicals webpage.
                </ExternalLink>{" "}
                To maintain consistency in data collection and submission, the
                EPA requests that all necessary tests be conducted using OECD
                standard operating procedures.
              </p>

              <p className="mt-6 text-base font-bold italic">
                This information was collected from the{" "}
                <ExternalLink href={externalLinks.pesticideTolerances}>
                  EPA Regulation of Pesticide Residues on Food webpage
                </ExternalLink>{" "}
                or the{" "}
                <ExternalLink href={externalLinks.testGuidelinesBase}>
                  EPA Test Guidelines for Pesticides and Toxic Substances
                  webpage
                </ExternalLink>
                , unless otherwise specified. For more details, please visit the
                website.
              </p>
            </div>
          </div>

          {/* additional resources */}
          <div
            id="additional-resources"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Additional Resources</h1>

            <div className="mb-8 text-lg">
              <ul className="ml-6 list-disc">
                <li>
                  List of all{" "}
                  <ExternalLink href={externalLinks.testGuidelines}>
                    EPA Test Guidelines for Pesticides and Toxic Substances
                  </ExternalLink>
                </li>

                <li className="mt-3">
                  <ExternalLink href={externalLinks.pesticideRegistration}>
                    FIFRA Pesticide Registration webpage
                  </ExternalLink>
                </li>

                <li className="mt-3">
                  <ExternalLink href={externalLinks.oecdMrl}>
                    OECD Maximum Residue Limit (Tolerance) Calculator
                  </ExternalLink>
                </li>

                <li className="mt-3">
                  <ExternalLink href={externalLinks.searchTolerances}>
                    How to Search for Tolerances for Pesticide Ingredients
                  </ExternalLink>
                </li>
              </ul>
            </div>
          </div>

          {/* questions */}
          <div id="questions" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Questions about pesticide tolerances?
            </h1>

            <div className="mb-8 text-lg">
              <p>
                <b>General Questions</b>
              </p>
              <ul className="list-disc ml-6">
                <li className="mt-3">
                  Contact{" "}
                  <MailLink email="pesticidequestions@epa.gov">
                    pesticidequestions@epa.gov
                  </MailLink>
                </li>

                <li className="mt-3">
                  Complete the question form on the{" "}
                  <ExternalLink href={externalLinks.questionForm}>
                    EPA’s website
                  </ExternalLink>
                </li>

                <li className="mt-3">
                  Inert Ingredients:{" "}
                  <MailLink email="InertsBranch@epa.gov">
                    InertsBranch@epa.gov
                  </MailLink>
                </li>
              </ul>
              <p className="mt-5">
                <b>Regional EPA Office Contacts</b>
              </p>
              <ul className="list-disc ml-6">
                <li className="mt-3">
                  Contact your{" "}
                  <a
                    className="text-underline text-primary"
                    href="https://www.epa.gov/aboutepa/regional-and-geographic-offices"
                  >
                    regional EPA office
                  </a>
                </li>
              </ul>
              <p className="mt-5">
                <b>EPA Contacts</b>
              </p>
              For a full list of contact emails for individuals, offices, and
              topics, visit the{" "}
              <a
                className="text-underline text-primary"
                href="https://www.epa.gov/pesticide-contacts/contacting-epa-about-regulating-pesticides-issues"
              >
                EPA’s Pesticide Contacts Page
              </a>
              .
              <p className="mt-10">
                This information was collected from the{" "}
                <a
                  className="text-underline text-primary"
                  href="https://www.epa.gov/pesticide-tolerances"
                >
                  EPA Regulation of Pesticide Residues on Food webpage
                </a>{" "}
                or the{" "}
                <a
                  className="text-underline text-primary"
                  href="https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances"
                >
                  EPA Test Guidelines for Pesticides and Toxic Substances
                  webpage
                </a>
                , unless otherwise specified. For more details, please visit the
                website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

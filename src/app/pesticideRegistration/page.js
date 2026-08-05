"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "registration-steps", label: "Registration Steps" },
  {
    id: "data-collection",
    label: "Data Collection Procedures & Considerations",
  },
  { id: "additional-information", label: "Additional information" },
  {
    id: "questions",
    label: "Questions about FIFRA Pesticide Product Registration?",
  },
];

const externalLinks = {
  pesticideRegistration:
    "https://www.epa.gov/pesticide-registration/about-pesticide-registration",
  registrationManual:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual",
  chapter1:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-1-overview-requirements-pesticide",
  chapter2:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-2-registering-pesticide-product",
  chapter10:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-10-data-compensation-requirements",
  chapter15:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-15-submitting-data-and-confidential",
  chapter20:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-20-forms-and-how-obtain-them",
  chapter21:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-21-directions-submitting-applications",
  appendixA:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-appendix-guidance-documents",
  conventional: "/conventionalPesticide",
  biopesticides:
    "https://www.epa.gov/pesticide-registration/biopesticide-registration",
  antimicrobial:
    "https://www.epa.gov/pesticide-registration/antimicrobial-pesticide-registration",
  minimumRisk: "/minimumRiskPesticides",
  physicalDevices:
    "https://www.epa.gov/pesticide-registration/pesticide-devices-guide-consumers",
  consultants:
    "https://www.epa.gov/pesticide-registration/list-pesticide-regulatory-consultants",
  testGuidelines:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/final-test-guidelines-pesticides-and-toxic",
  dataRequirements: "/researchRequirements",
  existingStudies:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-10-data-compensation-requirements",
  priaFees:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-fees-and-fee-waivers",
  priaDecisionTree:
    "https://www.epa.gov/pesticide-registration/pria-fee-determination-decision-tree",
  feeWaiver:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-fees-and-fee-waivers",
  appropriateDivision:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-21-directions-submitting-applications",
  companyNumber:
    "https://www.epa.gov/pesticide-registration/pesticide-establishment-and-company-numbers",
  form85701:
    "https://www.epa.gov/sites/default/files/2013-07/documents/8570-1.pdf",
  form85704:
    "https://www.epa.gov/sites/default/files/2013-07/documents/8570-4_0.pdf",
  form857034:
    "https://www.epa.gov/sites/default/files/2013-07/documents/8570-34.pdf",
  form857035:
    "https://www.epa.gov/sites/default/files/2021-01/documents/8570-35.pdf",
  form857027:
    "https://www.epa.gov/sites/default/files/2013-07/documents/8570-27.pdf",
  form857036:
    "https://www.epa.gov/sites/default/files/2013-07/documents/8570-36.pdf",
  cfr152119:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-152/subpart-G/section-152.119",
  cfr157:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-157",
  tolerances: "https://www.epa.gov/pesticide-tolerances",
  oecd: "https://www.oecd.org/en/topics/sub-issues/testing-of-chemicals/test-guidelines.html",
  npicStateAgencies: "https://npic.orst.edu/reg/state_agencies.html",
  oecdPhysicalChemical:
    "https://www.oecd-ilibrary.org/environment/oecd-guidelines-for-the-testing-of-chemicals-section-1-physical-chemical-properties_20745753",
  oecdHealth:
    "https://www.oecd-ilibrary.org/environment/oecd-guidelines-for-the-testing-of-chemicals-section-4-health-effects_20745788",
  oecdBiotic:
    "https://www.oecd-ilibrary.org/environment/oecd-guidelines-for-the-testing-of-chemicals-section-2-effects-on-biotic-systems_20745761",
  oecdEnvironmental:
    "https://www.oecd-ilibrary.org/environment/oecd-guidelines-for-the-testing-of-chemicals-section-3-environmental-fate-and-behaviour_2074577x",
  oecdOther:
    "https://www.oecd-ilibrary.org/environment/oecd-guidelines-for-the-testing-of-chemicals-section-5-other-test-guidelines_20745796",
  oecdSeawater:
    "https://www.oecd-ilibrary.org/environment/test-no-306-biodegradability-in-seawater_9789264070486-en",
  oecdMrl:
    "https://www.epa.gov/pesticide-tolerances/oecd-maximum-residue-limit-calculator",
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
};

const immediateOfficeContacts = [
  {
    name: 'Charles "Billy" Smith',
    email: "smith.charles@epa.gov",
    responsibility: "Division Director",
  },
  {
    name: "Dan Rosenblatt",
    email: "rosenblatt.dan@epa.gov",
    responsibility: "Deputy Director",
  },
  {
    name: "Jennifer Saunders",
    email: "saunders.jennifer@epa.gov",
    responsibility: "(Acting) Associate Division Director",
  },
  {
    name: "Kable (Bo) Davis",
    email: "davis.kable@epa.gov",
    responsibility: "Senior Regulatory Specialist",
  },
  {
    name: "Alexandra Boukedes",
    email: "boukedes.alexandra@epa.gov",
    responsibility: "Acting Senior Regulatory Specialist",
  },
  {
    name: "RD Ombudsman",
    email: "OPP_RD_Ombudsman@epa.gov",
    responsibility: "RD Ombudsman",
  },
  {
    name: "CRP Team",
    email: "ChildResistantPackaging@epa.gov",
    responsibility: "Child-Resistant Packaging (CRP)",
  },
  {
    name: "Invert Efficacy Team",
    email: "OPP_RD_INVERT_EFFICACY@epa.gov",
    responsibility: "Invertebrate Efficacy Team",
  },
  {
    name: "Inerts Mailbox",
    email: "inertsbranch@epa.gov",
    responsibility: "Inert Ingredients Team",
  },
];

const herbicideBranchContacts = [
  {
    name: "Lindsay Roe",
    email: "roe.lindsay@epa.gov",
    responsibility: "Branch Chief",
  },
  {
    name: "Mindy Ondish",
    email: "ondish.mindy@epa.gov",
    responsibility: "PM Team 23",
  },
  {
    name: "Sarah Meadows",
    email: "meadows.sarah@epa.gov",
    responsibility: "Senior Regulatory Specialist",
  },
  {
    name: "Emily Schmid",
    email: "schmid.emily@epa.gov",
    responsibility: "PM Team 25",
  },
];

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

function StepNumber({ children }) {
  return (
    <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-black text-[14px] font-bold leading-none text-black">
      {children}
    </span>
  );
}

function ContactTable({ rows }) {
  return (
    <div className="mb-8 overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse border border-gray-500 text-center text-sm text-black">
        <thead>
          <tr className="bg-gray-300">
            <th className="border border-gray-500 px-3 py-2 font-bold">Name</th>
            <th className="border border-gray-500 px-3 py-2 font-bold">
              Email
            </th>
            <th className="border border-gray-500 px-3 py-2 font-bold">
              Area of Responsibility
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={`${row.name}-${row.email}`}>
              <td className="border border-gray-500 px-3 py-2">{row.name}</td>
              <td className="border border-gray-500 px-3 py-2">
                <a
                  href={`mailto:${row.email}`}
                  className="text-primary text-underline"
                >
                  {row.email}
                </a>
              </td>
              <td className="border border-gray-500 px-3 py-2">
                {row.responsibility}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DataSpecsTable() {
  const rows = [
    {
      category: (
        <>
          Product Chemistry (
          <ExternalLink href={externalLinks.series830}>Series 830</ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdPhysicalChemical}>
          OECD Guidelines for Physical-Chemical Properties
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Product Performance (
          <ExternalLink href={externalLinks.series810}>Series 810</ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Data from studies to determine hazards to humans and domestic animals
          (
          <ExternalLink href={externalLinks.series870}>Series 870</ExternalLink>
          )
        </>
      ),
      methods: (
        <>
          <ExternalLink href={externalLinks.oecdHealth}>
            OECD Guidelines for Health Effects
          </ExternalLink>{" "}
          (Humans)
          <br />
          <ExternalLink href={externalLinks.oecdOther}>
            OECD Other Tests Guidelines
          </ExternalLink>{" "}
          (Livestock)
        </>
      ),
    },
    {
      category: (
        <>
          Data from studies to determine hazards to nontarget organisms and the
          environment (
          <ExternalLink href={externalLinks.series850}>Series 850</ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdBiotic}>
          OECD Guidelines for Effects of Biotic Systems
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Post-application exposure studies (
          <ExternalLink href={externalLinks.series875}>Series 875</ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdHealth}>
          OECD Guidelines for Health Effects
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Applicator/user exposure studies (
          <ExternalLink href={externalLinks.series875}>Series 875</ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdHealth}>
          OECD Guidelines for Health Effects
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Spray drift evaluation (
          <ExternalLink href={externalLinks.series840}>Series 840</ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Environmental Fate (
          <ExternalLink href={externalLinks.series835}>Series 835</ExternalLink>
          )
        </>
      ),
      methods: (
        <>
          <ExternalLink href={externalLinks.oecdEnvironmental}>
            OECD Guidelines for Environmental fate and behavior
          </ExternalLink>
          <br />
          Seawater Specific -{" "}
          <ExternalLink href={externalLinks.oecdSeawater}>
            Test No. 306: Biodegradability in Seawater
          </ExternalLink>
        </>
      ),
    },
    {
      category: (
        <>
          Residue Chemistry (
          <ExternalLink href={externalLinks.series860}>Series 860</ExternalLink>
          )
        </>
      ),
      methods: (
        <>
          <ExternalLink href={externalLinks.oecdOther}>
            OECD Other Tests Guidelines
          </ExternalLink>
          <br />
          <ExternalLink href={externalLinks.oecdMrl}>
            OECD Maximum Residue Limit (Tolerance) Calculator
          </ExternalLink>
        </>
      ),
    },
    {
      category: (
        <>
          Biochemical Specific Tests (
          <ExternalLink href={externalLinks.series880}>Series 880</ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecd}>
          Various OECD Test Methods
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Microbial Pesticide Specific Tests (
          <ExternalLink href={externalLinks.series885}>Series 885</ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecd}>
          Various OECD Test Methods
        </ExternalLink>
      ),
    },
  ];

  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse border border-gray-500 text-center text-sm text-black">
        <caption className="border border-b-0 border-gray-500 bg-gray-300 px-4 py-3 text-center text-lg font-bold text-black">
          Scientific Data Specifications and Methods
        </caption>

        <thead>
          <tr className="bg-gray-300">
            <th className="w-1/2 border border-gray-500 px-4 py-3 font-bold">
              EPA Required Data Category and Test Guidelines
            </th>
            <th className="w-1/2 border border-gray-500 px-4 py-3 font-bold">
              Organization for Economic Co-operation and Development (OECD)
              Standardized Methods
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={`data-row-${index}`}>
              <td className="border border-gray-500 px-4 py-2">
                {row.category}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {row.methods}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PesticideRegistration() {
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
        <span className="text-primary">Processing Permits</span>
        <span>›</span>
        <span className="text-primary">FIFRA</span>
        <span>›</span>
        <span className="text-gray-800">Pesticide Registration</span>
      </div>

      {/* Page Hero Title */}
      <InternalPageHero
        title="Pesticide Registration"
        subtitle="FIFRA pesticide product registration"
        link={externalLinks.pesticideRegistration}
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

        <div className="flex-1">
          {/* overview section */}
          <div
            id="overview"
            className="mt-10 scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Overview</h1>

            <div className="mb-8 text-lg">
              <p>
                Under FIFRA, EPA regulates all pesticides that are sold or
                distributed in the United States. There are three major types of
                pesticides:{" "}
                <Link
                  href="/conventionalPesticide"
                  className="text-primary text-underline"
                >
                  conventional
                </Link>
                ,{" "}
                <ExternalLink href={externalLinks.antimicrobial}>
                  antimicrobial
                </ExternalLink>
                , and{" "}
                <Link
                  href="/biopesticideRegistration"
                  className="text-primary text-underline"
                >
                  biopesticides
                </Link>
                . Each type has a unique registration pathway, but the general
                process is similar. If your product qualifies as a{" "}
                <ExternalLink href={externalLinks.physicalDevices}>
                  physical device
                </ExternalLink>
                , living plant, or{" "}
                <Link
                  href={externalLinks.minimumRisk}
                  className="text-primary text-underline"
                >
                  minimum risk
                </Link>
                , it may not require FIFRA approval.
              </p>

              <p className="mt-5">
                Before a pesticide product can be lawfully sold or distributed,
                EPA conducts a comprehensive scientific assessment, resulting in
                a regulatory decision, meaning whether to approve the product
                for sale and/or distribution in the United States. The
                EPA&apos;s scientific assessment relies on data submitted by the
                pesticide registrant. Therefore, each product must be rigorously
                tested for its impact on non-target organisms, humans, and the
                environment. This page provides an overview of the FIFRA
                pesticide registration process. Detailed information is
                available in the{" "}
                <ExternalLink href={externalLinks.registrationManual}>
                  Pesticide Registration Manual
                </ExternalLink>
                .
              </p>
            </div>
          </div>

          {/* registration steps section */}
          <div
            id="registration-steps"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Registration Steps</h1>

            <div className="mb-8 text-lg">
              <div className="flex gap-4">
                <StepNumber>1</StepNumber>
                <p>
                  Determine what type of product you have (
                  <ExternalLink href={externalLinks.conventional}>
                    Conventional
                  </ExternalLink>
                  ,{" "}
                  <ExternalLink href={externalLinks.antimicrobial}>
                    Antimicrobial
                  </ExternalLink>
                  , and{" "}
                  <ExternalLink
                    className="text-primary text-underline"
                    href="/biopesticideRegistration"
                  >
                    Biopesticides
                  </ExternalLink>
                  ).
                </p>
              </div>

              <div className="mt-5 flex gap-4">
                <StepNumber>2</StepNumber>
                <div>
                  <p>
                    Determine the data needed to submit your product for
                    registration.{" "}
                    <Link
                      href={externalLinks.dataRequirements}
                      className="text-primary text-underline"
                    >
                      Data requirements
                    </Link>{" "}
                    include:
                  </p>

                  <ul className="mt-3 ml-6 list-disc">
                    <li>
                      <ExternalLink href={externalLinks.series830}>
                        Product Chemistry
                      </ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={externalLinks.series810}>
                        Product Performance
                      </ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={externalLinks.series870}>
                        Data from studies that determine hazard to humans and
                        domestic animals
                      </ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={externalLinks.series850}>
                        Data from studies that determine hazard to non-target
                        organisms
                      </ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={externalLinks.series875}>
                        Post application exposure studies
                      </ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={externalLinks.series875}>
                        Applicator/user exposure studies
                      </ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={externalLinks.series840}>
                        Pesticide spray drift evaluation
                      </ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={externalLinks.series835}>
                        Environmental fate
                      </ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={externalLinks.series860}>
                        Residue chemistry
                      </ExternalLink>
                    </li>
                    <li>
                      <ExternalLink href={externalLinks.antimicrobial}>
                        Additional information for antimicrobial products
                      </ExternalLink>
                      <ul className="mt-3 ml-6 list-[circle]">
                        <li>
                          Navigate to the EPA webpage for a list of required
                          data{" "}
                          <ExternalLink href={externalLinks.testGuidelines}>
                            Test Guidelines
                          </ExternalLink>
                        </li>
                        <li>
                          If your proposed product is substantially similar to
                          another EPA-registered product, you may be able to{" "}
                          <ExternalLink href={externalLinks.existingStudies}>
                            cite data from existing studies
                          </ExternalLink>
                          .
                        </li>
                        <li>
                          If citing another company&apos;s data, you must first
                          determine whether you need to pay or get authorization
                          from the data owner to use it. More can be found in
                          the{" "}
                          <ExternalLink href={externalLinks.chapter10}>
                            Pesticide Registration Manual: Ch. 10 - Data
                            Compensation Requirements
                          </ExternalLink>
                          .
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex gap-4">
                <StepNumber>3</StepNumber>
                <div>
                  <p>Consider using a consultant</p>
                  <ul className="mt-3 ml-6 list-disc">
                    <li>
                      <ExternalLink href={externalLinks.consultants}>
                        List of Pesticide Regulatory Consultants
                      </ExternalLink>{" "}
                      - provided by EPA
                    </li>
                    <li>
                      <Link
                        href="/consultantsDatabase"
                        className="text-primary text-underline"
                      >
                        List of consultants
                      </Link>{" "}
                      - provided by this website
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex gap-4">
                <StepNumber>4</StepNumber>
                <div>
                  <p>
                    Determine the registration fee(s) and review timeframe for
                    your product
                  </p>
                  <ul className="mt-3 ml-6 list-disc">
                    <li>
                      The{" "}
                      <ExternalLink href={externalLinks.priaFees}>
                        Pesticide Registration Improvement Act
                      </ExternalLink>{" "}
                      (PRIA, aka PRIA 5) requires the submission of fees
                      associated with EPA assessments of pesticide data.
                    </li>
                    <li>
                      Use the{" "}
                      <ExternalLink href={externalLinks.priaDecisionTree}>
                        PRIA Fee Determination Decision Tree
                      </ExternalLink>{" "}
                      to find the fees and review timeline associated with your
                      product.
                    </li>
                    <li>
                      If you are a small business, academic institution,
                      non-profit, or state/federal office, you may qualify for a{" "}
                      <ExternalLink href={externalLinks.feeWaiver}>
                        fee waiver
                      </ExternalLink>
                      .
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex gap-4">
                <StepNumber>5</StepNumber>
                <p>
                  Schedule a{" "}
                  <ExternalLink href={externalLinks.chapter2}>
                    pre-registration
                  </ExternalLink>{" "}
                  meeting with the EPA. After reviewing the pesticide
                  registration process,{" "}
                  <ExternalLink href={externalLinks.appropriateDivision}>
                    contact the appropriate division
                  </ExternalLink>{" "}
                  based on product type and schedule a meeting.
                </p>
              </div>

              <div className="mt-5 flex gap-4">
                <StepNumber>6</StepNumber>
                <p>
                  Obtain an{" "}
                  <ExternalLink href={externalLinks.companyNumber}>
                    EPA company number
                  </ExternalLink>
                  .
                </p>
              </div>

              <div className="mt-5 flex gap-4">
                <StepNumber>7</StepNumber>
                <div>
                  <p>
                    Complete the application package. Required contact for the
                    application package includes:
                  </p>

                  <ul className="mt-3 ml-6 list-disc">
                    <li>
                      Administrative data
                      <ul className="mt-3 ml-6 list-[circle]">
                        <li>Fee payment</li>
                        <li>Cover letter</li>
                        <li>
                          Application form (
                          <ExternalLink href={externalLinks.form85701}>
                            EPA Form 8570-1
                          </ExternalLink>
                          )
                        </li>
                        <li>Applicant name and address</li>
                        <li>
                          Authorized agent information, if you have used a
                          consultant
                        </li>
                        <li>Company number</li>
                        <li>
                          Summary of Application, including:
                          <ul className="mt-3 ml-6 list-disc">
                            <li>
                              A list of included data with a brief description
                              of the results
                            </li>
                            <li>
                              Statement granting release of data to the public
                              after registration in accordance with{" "}
                              <ExternalLink href={externalLinks.cfr152119}>
                                40 CFR 152.119
                              </ExternalLink>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <Link
                            href="/labelingInfoPage"
                            className="text-primary text-underline"
                          >
                            Draft Labeling
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <li className="mt-3">
                      Data Portion
                      <ul className="mt-3 ml-6 list-[circle]">
                        <li>Data listed in Data Requirements above</li>
                        <li>
                          Confidential Statement of Formula (
                          <ExternalLink href={externalLinks.form85704}>
                            EPA Form 8570-4
                          </ExternalLink>
                          )
                        </li>
                        <li>
                          Product Chemistry and Acute Toxicology. For more
                          details, see{" "}
                          <ExternalLink href={externalLinks.appendixA}>
                            Pesticide Registration Manual: Appendix A - Guidance
                            Documents
                          </ExternalLink>
                          .
                        </li>
                        <li>
                          Data Compensation Requirements, if applicable
                          <ul className="mt-3 ml-6 list-disc">
                            <li>
                              Certification with Respect to Citation of Data (
                              <ExternalLink href={externalLinks.form857034}>
                                EPA Form 8570-34
                              </ExternalLink>
                              )
                            </li>
                            <li>
                              Data Matrix (
                              <ExternalLink href={externalLinks.form857035}>
                                EPA Form 8570-35
                              </ExternalLink>
                              )
                            </li>
                            <li>
                              Formulator&apos;s Exemption Statement (
                              <ExternalLink href={externalLinks.form857027}>
                                EPA Form 8570-27
                              </ExternalLink>
                              )
                            </li>
                          </ul>
                        </li>
                        <li>
                          Data Waivers &amp; Rationale for a Data Waiver, if
                          applicable
                        </li>
                        <li>
                          Child-Resistant Packaging (CRP) Certification. See{" "}
                          <ExternalLink href={externalLinks.cfr157}>
                            40 CFR 157.20-157.36
                          </ExternalLink>
                          .
                        </li>
                        <li>
                          Restricted Use Pesticide (RUP) Classification, if
                          applicable
                        </li>
                        <li>
                          Statement concerning{" "}
                          <Link
                            href="/tolerances"
                            className="text-primary text-underline"
                          >
                            Tolerances
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex gap-4">
                <StepNumber>8</StepNumber>
                <div>
                  <p>Submit the application package and pay the fee(s)</p>
                  <ul className="mt-3 ml-6 list-disc">
                    <li>
                      See the Pesticide Registration Manual Chapters
                      <ul className="mt-3 ml-6 list-[circle]">
                        <li>
                          <ExternalLink href={externalLinks.chapter15}>
                            Ch. 15-Submitting Data and Confidential Business
                            Information
                          </ExternalLink>
                        </li>
                        <li>
                          <ExternalLink href={externalLinks.chapter20}>
                            Ch. 20- Forms and How to Obtain Them
                          </ExternalLink>
                        </li>
                        <li>
                          <ExternalLink href={externalLinks.chapter21}>
                            Ch. 21-Directions for Submitting Applications and
                            Contacting EPA
                          </ExternalLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mt-6 text-base font-bold">
                This information was collected from the{" "}
                <ExternalLink href={externalLinks.pesticideRegistration}>
                  EPA&apos;s Pesticide Registration webpage
                </ExternalLink>
                , unless otherwise noted.
              </p>
            </div>
          </div>

          {/* data collection section */}
          <div
            id="data-collection"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              Data Collection Procedures &amp; Considerations
            </h1>

            <div className="mb-8 text-lg">
              <p>
                Data required for pesticide registration submission must be
                collected using{" "}
                <Link
                  href="/goodLaboratoryPractices"
                  className="text-primary text-underline"
                >
                  Good Laboratory Practices
                </Link>
                , including standardized methods set forth by the EPA or the
                Organization for Economic Co-operation and Development (OECD).
                Each required data category has an accompanying series of
                necessary tests. The various series identify and detail the data
                required for registration, as well as the test methodology.
                Additional EPA-accepted standardized test methods can be found
                on the OECD webpage. See the table below for the EPA series and
                corresponding OECD test methods.
              </p>

              <DataSpecsTable />

              <p className="mt-5">
                Collection of the required pesticide registration data may
                require field trials. Unregistered pesticides may be applicable
                for an Experimental Use Permit (EUP). Although the complete set
                of registration data may not be available at the time of an EUP
                request, most studies and resulting data must have been
                collected before the EPA will grant an EUP. An EUP must also be
                approved by the state in which the experimental use is to take
                place. To determine the policy of an individual state, use the
                external link to the{" "}
                <ExternalLink href={externalLinks.npicStateAgencies}>
                  National Pesticide Information Center
                </ExternalLink>{" "}
                or the internal link to the{" "}
                <Link
                  href="/regulationsDirectory"
                  className="text-primary text-underline"
                >
                  US Regulatory Map
                </Link>
                .
              </p>

              <p className="mt-6 text-base font-bold">
                This information was collected from the{" "}
                <ExternalLink href={externalLinks.testGuidelines}>
                  EPA&apos;s Test Guidelines for Pesticides and Toxic Substances
                  webpage
                </ExternalLink>
                .
              </p>
            </div>
          </div>

          {/* additional information section */}
          <div
            id="additional-information"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Additional information</h1>

            <div className="mb-8 text-lg">
              <p>
                Specific information about each type of pesticide and its
                associated registration process can be found by clicking the
                respective link below.
              </p>

              <ul className="mt-3 ml-6 list-disc">
                <li>
                  <ExternalLink href={externalLinks.conventional}>
                    Conventional pesticides
                  </ExternalLink>{" "}
                  (includes conventional chemicals)
                </li>
                <li>
                  <ExternalLink
                    href="/biopesticideRegistration"
                    className="text-primary text-underline"
                  >
                    Biopesticides
                  </ExternalLink>{" "}
                  (includes biochemical pesticides, microbial pesticides, and
                  plant-incorporated-protectants)
                </li>
                <li>
                  <ExternalLink href={externalLinks.antimicrobial}>
                    Antimicrobial pesticides
                  </ExternalLink>
                </li>
              </ul>
            </div>
          </div>

          {/* questions section */}
          <div id="questions" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Questions about FIFRA Pesticide Product Registration?
            </h1>

            <div className="mb-8 text-lg">
              <p>
                Contact Information for the EPA&apos;s Pesticide Registration
                Division
              </p>

              <p className="mt-6 font-bold">Immediate Office</p>
              <ContactTable rows={immediateOfficeContacts} />

              <p className="mt-6 font-bold">Herbicide Branch</p>
              <p>
                Herbicides including phenoxys, aquatics, desiccants and
                defoliants
              </p>
              <ContactTable rows={herbicideBranchContacts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

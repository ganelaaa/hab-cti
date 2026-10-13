"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "data-requirements", label: "Data Requirements" },
  {
    id: "additional-data-requirements-details",
    label: "Additional Data Requirements Details",
  },
  { id: "experimental-use-permit", label: "Experimental Use Permit" },
  { id: "additional-information", label: "Additional Information" },
  {
    id: "questions",
    label: "Questions about Biopesticide Registration?",
  },
];

const externalLinks = {
  biopesticideRegistration:
    "https://www.epa.gov/pesticide-registration/biopesticide-registration",
  bppdContacts:
    "https://www.epa.gov/pesticide-contacts/contacts-office-pesticide-programs-biopesticides-and-pollution-prevention",
  pesticideRegistrationManual:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual",
  oecdGuidelines:
    "https://www.oecd.org/en/topics/sub-issues/testing-of-chemicals/publications-on-testing-and-assessment-of-chemicals.html",
  oecdGlp:
    "https://www.oecd.org/content/dam/oecd/en/topics/policy-sub-issues/testing-of-chemicals/good-laboratory-practice-frequently-asked-questions.pdf",
  cfr158SubpartU:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-U",
  cfr158Part:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158",
  cfr1582030: "https://www.ecfr.gov/current/title-40/section-158.2030",
  cfr15875:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-A/section-158.75",
  cfr15845:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-A/section-158.45",
  npicStateAgencies: "https://npic.orst.edu/reg/state_agencies.html",
  biopesticideActiveIngredients:
    "https://www.epa.gov/ingredients-used-pesticide-products/biopesticide-active-ingredients",
  testGuidelines:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/final-test-guidelines-pesticides-and-toxic",
  testGuidelinesBase:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances",
  dataEvaluationFormats:
    "https://www.epa.gov/pesticide-registration/oecd-data-evaluation-record-templates",
  bppdChecklists:
    "https://www.epa.gov/pesticide-registration/bppd-internal-application-checklists",
  csfTips:
    "https://www.epa.gov/pesticide-registration/tips-avoiding-confidential-statement-formula-or-product-chemistry-issues",
  csfBiopesticides:
    "https://www.epa.gov/pesticide-registration/biopesticides-confidential-statement-formula",
  registrationForms:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-20-forms-and-how-obtain-them",
  pesticideDataSubmittersList:
    "https://www.epa.gov/pesticide-registration/pesticide-data-submitters-list-pdsl",
  dataCompensation:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-10-data-compensation-requirements",
  priaDecisionTree:
    "https://www.epa.gov/pria-fees/pria-5-fee-determination-decision-tree",
  priaFeeWaiversSmallBusiness:
    "https://www.epa.gov/pria-fees/pria-fee-waivers-small-businesses",
  chapter3:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-3-additional-considerations",
  acuteToxicityWaiver:
    "https://www.epa.gov/pesticide-registration/bridging-or-waiving-data-requirements",
  series810:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-810-product-performance-test-guidelines",
  series830:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-830-product-properties-test-guidelines",
  series850:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-850-ecological-effects-test-guidelines",
  series860:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-860-residue-chemistry-test-guidelines",
  series870:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-870-health-effects-test-guidelines",
  series880:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-880-biochemicals-test-guidelines",
  oecd113:
    "https://www.oecd.org/en/publications/test-no-113-screening-test-for-thermal-stability-and-stability-in-air_9789264069749-en.html",
  oecd109:
    "https://www.oecd.org/en/publications/test-no-109-density-of-liquids-and-solids_9789264123298-en.html",
  oecd211:
    "https://www.oecd.org/en/publications/2012/10/test-no-211-daphnia-magna-reproduction-test_g1g24069.html",
  oecd202:
    "https://www.oecd.org/en/publications/2004/11/test-no-202-daphnia-sp-acute-immobilisation-test_g1gh28f3.html",
  oecd203:
    "https://www.oecd.org/en/publications/test-no-203-fish-acute-toxicity-test_9789264069961-en.html",
  oecdResidues:
    "https://www.oecd.org/en/publications/introduction-to-oecd-test-guidelines-on-pesticide-residues-chemistry-section-5-part-a_9789264203761-en.html",
  oecd401:
    "https://www.oecd.org/en/publications/test-no-401-acute-oral-toxicity_9789264040113-en.html",
  oecd402:
    "https://www.oecd.org/en/publications/test-no-402-acute-dermal-toxicity_9789264070585-en.html",
  oecd403:
    "https://www.oecd.org/en/publications/test-no-403-acute-inhalation-toxicity_9789264070608-en.html",
  oecd405:
    "https://www.oecd.org/en/publications/test-no-405-acute-eye-irritation-corrosion_9789264185333-en.html",
  oecd404:
    "https://www.oecd.org/en/publications/test-no-404-acute-dermal-irritation-corrosion_9789264242678-en.html",
  oecd442b:
    "https://www.oecd.org/en/publications/test-no-442b-skin-sensitization_9789264090996-en.html",
  oecd497:
    "https://www.oecd.org/en/publications/guideline-no-497-defined-approaches-on-skin-sensitisation_b92879a4-en.html",
  oecd410:
    "https://www.oecd.org/en/publications/test-no-410-repeated-dose-dermal-toxicity-21-28-day-study_9789264070745-en.html",
  oecd411:
    "https://www.oecd.org/en/publications/test-no-411-subchronic-dermal-toxicity-90-day-study_9789264070769-en.html",
};

const dataRows = [
  { kind: "heading", title: "Product Efficiacy" },
  {
    category: "Product Performance (Series 810.1000)",
    href: externalLinks.series810,
    cr: "",
    explanation: "",
  },

  { kind: "heading", title: "Confidential Product Chemistry" },
  {
    category: "Product Identity and Composition (Series 880.1100)",
    href: externalLinks.series880,
    cr: "",
    explanation: "",
  },
  {
    category:
      "Description of starting materials, production and formulation process (Series 880.1200)",
    href: externalLinks.series880,
    cr: "",
    explanation: "",
  },
  {
    category: "Discussion of formation of Impurities (Series 880.1400)",
    href: externalLinks.series880,
    cr: "",
    explanation: "",
  },
  {
    category: "Certified Limits (Series 830.1750)",
    href: externalLinks.series830,
    cr: "",
    explanation: "",
  },
  {
    category: "Enforcement Analytical Method (Series 830.1800)",
    href: externalLinks.series830,
    cr: "",
    explanation: "",
  },
  {
    category:
      "Preparing a Confidential Statement of Formula for Biochemical and Microbial Pesticides",
    href: externalLinks.csfBiopesticides,
    linkWholeCategory: true,
    cr: "",
    explanation: "",
  },

  { kind: "heading", title: "Physical & Chemical Properties" },
  {
    category: "Color (Series 830.6302)",
    href: externalLinks.series830,
    cr: "",
    explanation: "",
  },
  {
    category: "Physical State (Series 830.6303)",
    href: externalLinks.series830,
    cr: "",
    explanation: "",
  },
  {
    category: "Odor (Series 830.6304)",
    href: externalLinks.series830,
    cr: "",
    explanation: "",
  },
  {
    category:
      "Stability to Normal and Elevated Temperatures, Metals, and Metal Ions (Series 830.6313)",
    href: externalLinks.series830,
    crParts: [
      {
        text: "OECD Test No. 113: Screening Test for Thermal Stability and Stability in Air",
        href: externalLinks.oecd113,
      },
    ],
    explanation: "",
  },
  {
    category: "Storage Stability (Series 830.6317)",
    href: externalLinks.series830,
    cr: "",
    explanation: "",
  },
  {
    category: "Corrosion Characteristics (Series 830.6320)",
    href: externalLinks.series830,
    cr: "",
    explanation: "",
  },
  {
    category: "UV/Visible light absorption (Series 830.7050)",
    href: externalLinks.series830,
    cr: "",
    explanation: "",
  },
  {
    category: "Density/Relative Density/Bulk Density (Series 830.7300)",
    href: externalLinks.series830,
    crParts: [
      {
        text: "OECD Test No. 109: Density of Liquids and Solids",
        href: externalLinks.oecd109,
      },
    ],
    explanation: "",
  },
  {
    category: "Water Solubility (Series 830.7840)",
    href: externalLinks.series830,
    cr: "",
    explanation: "",
  },
  {
    category: "Vapor pressure (Series 830.7950)",
    href: externalLinks.series830,
    cr: "",
    explanation: "",
  },

  { kind: "heading", title: "Ecological Effects" },
  {
    category:
      "E Aquatic invertebrate acute toxicity, freshwater and marine (if applicable) (Series 850.1010)",
    href: externalLinks.series850,
    crParts: [
      {
        text: "OECD Test No. 211: Daphnia magna Reproduction Test",
        href: externalLinks.oecd211,
      },
      "\n",
      {
        text: "OECD Test No. 202: Daphnia sp. Acute Immobilisation Test",
        href: externalLinks.oecd202,
      },
    ],
    explanation: "",
  },
  {
    category: "E Avian acute oral toxicity (850.2100)",
    href: externalLinks.series850,
    cr: "",
    explanation: "",
  },
  {
    category: "E Avian dietary toxicity (850.2200)",
    href: externalLinks.series850,
    cr: "",
    explanation: "",
  },
  {
    category:
      "E Fish Acute Toxicity, Freshwater and Marine (if applicable) (Series 850.1075)",
    href: externalLinks.series850,
    crParts: [
      {
        text: "OECD Test No. 203: Fish, Acute Toxicity Test",
        href: externalLinks.oecd203,
      },
    ],
    explanation: "",
  },
  {
    category: "Aquatic field fish/invertebrate testing (Series 850.1950)",
    href: externalLinks.series850,
    cr: "CR10",
    explanation:
      "10. Required if environmental fate characteristics indicate that the estimated environmental concentration of the pesticide in the aquatic environment is >0.01 of any EC50 or LC50 determined in the aquatic nontarget organism testing.",
  },
  {
    category: "Freshwater fish /invertebrate testing (850.1300,1400,1500)",
    href: externalLinks.series850,
    cr: "CR10",
    explanation: "",
  },
  {
    category:
      "Marine/Estuarine fish/invertebrate animal testing (850.1025,1035,1045,1055,1350,1400,1500)",
    href: externalLinks.series850,
    cr: "CR10",
    explanation: "",
  },

  {
    kind: "heading",
    title: "Nontarget Birds, Bees, Plant (All Conditional Requirements)",
  },
  {
    category:
      "Terrestrial Plant Toxicity - Seedling Emergence (Series 850.4100)",
    href: externalLinks.series850,
    cr: "",
    explanation: "",
  },
  {
    category: "Terrestrial Plant Toxicity - Vegetative Vigor (Series 850.4150)",
    href: externalLinks.series850,
    cr: "",
    explanation: "",
  },

  { kind: "heading", title: "Residue Chemistry" },
  {
    category:
      "Additional test methods- Introduction to OECD Test Guidelines on Pesticide Residues Chemistry - Section 5 Part A",
    categoryPrefix: "Additional test methods- ",
    categoryLinkText:
      "Introduction to OECD Test Guidelines on Pesticide Residues Chemistry - Section 5 Part A",
    href: externalLinks.oecdResidues,
    cr: "",
    explanation: "",
  },
  {
    category: "Chemical Identity (Series 860.1100)",
    href: externalLinks.series860,
    cr: "CR2",
    explanationParts: [
      "2. The same chemical identity data are required for biochemical product chemistry data requirements, ",
      {
        text: "§ 158.2030",
        href: externalLinks.cfr1582030,
      },
      ", with an emphasis on impurities.",
    ],
  },
  {
    category: "Nature of residue in plants (Series 860.1300)",
    href: externalLinks.series860,
    cr: "CR5",
    explanation:
      "5. Required unless it is an arthropod pheromone applied at a rate less than or equal to 150 grams active ingredient per acre.",
  },
  {
    category: "Residue Analytic Method (Series 860.1340)",
    href: externalLinks.series860,
    cr: "CR9",
    explanation:
      "9. A residue analytical method suitable for enforcement of tolerances is required whenever a numeric tolerance (including temporary and time-limited tolerances) is proposed.",
  },
  {
    category: "Multiresidue method (Series 860.1360)",
    href: externalLinks.series860,
    cr: "CR11",
    explanation:
      "11. Data are required to determine whether FDA/USDA multiresidue methodology would detect and identify the pesticides and any metabolites.",
  },
  {
    category:
      "Magnitude of the Reside - Water, Fish, Potable Water, and Irrigated Crops (Series 860.1400)",
    href: externalLinks.series860,
    cr: "CR12",
    explanation:
      "12. Data on fish are required for all pesticides applied directly to water inhabited, or which will be inhabited by fish that may be caught or harvested for human consumption.",
  },
  {
    category:
      "Reasonable Grounds in Support of Tolerance Petition (Series 860.1560)",
    href: externalLinks.series860,
    cr: "CR19",
    explanation: "19. Required when a residue analytical method is required.",
  },

  { kind: "heading", title: "Mammalian Toxicology Data" },
  {
    category: "E Acute Oral Toxicity-rat (Series 870.1100)",
    href: externalLinks.series870,
    crParts: [
      {
        text: "OECD Test No. 401: Acute Oral Toxicity",
        href: externalLinks.oecd401,
      },
    ],
    explanation: "",
  },
  {
    category: "E Acute Dermal Toxicity (Series 870.1200)",
    href: externalLinks.series870,
    crParts: [
      {
        text: "OECD Test No. 402: Acute Dermal Toxicity",
        href: externalLinks.oecd402,
      },
    ],
    explanation: "",
  },
  {
    category: "E Acute Inhalation Toxicity-rat (Series 870.1300)",
    href: externalLinks.series870,
    crParts: [
      {
        text: "OECD Test No. 403: Acute Inhalation Toxicity",
        href: externalLinks.oecd403,
      },
    ],
    explanation: "",
  },
  {
    category:
      "E Acute Eye Irritation (Primary eye irritation) - rabbit (Series 870.2400)",
    href: externalLinks.series870,
    crParts: [
      {
        text: "OECD Test No. 405: Acute Eye Irritation/Corrosion",
        href: externalLinks.oecd405,
      },
    ],
    explanation: "",
  },
  {
    category:
      "E Acute Dermal Irritation (Primary dermal irritation) (Series 870.2500)",
    href: externalLinks.series870,
    crParts: [
      {
        text: "OECD Test No. 404: Acute Dermal Irritation/Corrosion",
        href: externalLinks.oecd404,
      },
    ],
    explanation: "",
  },
  {
    category: "Skin Sensitization (Series 870.2600)",
    href: externalLinks.series870,
    crParts: [
      {
        text: "OECD Test No. 442B: Skin Sensitization",
        href: externalLinks.oecd442b,
      },
      "\n",
      {
        text: "Guideline No. 497: Defined Approaches on Skin Sensitization",
        href: externalLinks.oecd497,
      },
    ],
    explanation: "",
  },
  {
    category: "E Hypersensitivity incidents (N/A)",
    href: externalLinks.series870,
    cr: "",
    explanation: "",
  },
  {
    category: "E 90 Day Oral (one species) (Series 870.3100)",
    href: externalLinks.series870,
    crParts: [
      "CR 6 ",
      {
        text: "OECD Test No. 410: Repeated Dose Dermal Toxicity: 21/28-day Study",
        href: externalLinks.oecd410,
      },
    ],
    explanation:
      "6. Required for non-food uses that are likely to result in repeated oral exposure to humans.",
  },
  {
    category: "90 Day Dermal -rat (Series 870.3250)",
    href: externalLinks.series870,
    crParts: [
      "CR7\n",
      {
        text: "OECD Test No. 411: Subchronic Dermal Toxicity: 90-day Study",
        href: externalLinks.oecd411,
      },
    ],
    explanation:
      "7. The use pattern is such that the dermal route would be the primary route of exposure.",
  },
  {
    category: "90 Day Inhalation - Rat (Series 870.3465)",
    href: externalLinks.series870,
    cr: "CR8",
    explanation:
      "8. Required if there is a likelihood of significant levels of repeated inhalation exposure to the pesticide as a gas, vapor, or aerosol.",
  },
  {
    category: "E Prenatal developmental - Rat preferably (Series 870.3700)",
    href: externalLinks.series870,
    cr: "CR9",
    explanation:
      "9. Required if the use of the product under widespread and commonly recognized practice may reasonably be expected to result in significant exposure to female humans (e.g., occupational exposure or repeated application of insect repellents directly to the skin). Tier II data is required on a different test species from Tier I data when developmental effects are observed in the first study and information on species-to-species extrapolation is needed.",
  },
  {
    category: "E Bacterial reverse mutation test (Series 870.5100)",
    href: externalLinks.series870,
    cr: "CR 10",
    explanation:
      "10. Required to support nonfood uses if the use is likely to result in significant human exposure",
  },
];

const contactGroups = [
  {
    title: "BPPD Immediate Office",
    descriptionParts: [
      "General questions, contact the Biopesticides and Pollution Prevention Department (BPPD) Ombudsman ",
      {
        type: "mail",
        text: "BPPDQuestions@epa.gov",
        href: "BPPDQuestions@epa.gov",
      },
    ],
    rows: [
      {
        name: "Shannon Borges",
        email: "borges.shannon@epa.gov",
        responsibility: "Acting Director",
      },
      {
        name: "Jeannine Kausch",
        email: "kausch.jeannine@epa.gov",
        responsibility: "Senior Advisor",
      },
    ],
  },
  {
    title: "Biochemical Pesticides Branch",
    description:
      "Registration and risk management for biochemical pesticides (including pheromones) and biochemical plant growth regulators. Enforcement case reviews and 25(b) issues related to biochemical pesticides.",
    rows: [
      {
        name: "Linda Hollis",
        email: "hollis.linda@epa.gov",
        responsibility: "Branch Chief",
      },
      {
        name: "James Parker",
        email: "parker.james@epa.gov",
        responsibility: "Team Leader",
      },
      {
        name: "Gina Burnett",
        email: "burnett.gina@epa.gov",
        responsibility: "Senior Regulatory Advisor",
      },
    ],
  },
  {
    title: "Emerging Technologies Branch",
    description:
      "Risk management oversight, risk assessment, and policy/rulemaking for products of biotechnology, Wolbachia, genetically engineered mosquitoes, Plant Incorporated Protectants (PIPs), and insect resistance management. Registration Review for PIPs.",
    rows: [
      {
        name: "Mike Mendelsohn",
        email: "mendelsohn.mike@epa.gov",
        responsibility: "Branch Chief",
      },
      {
        name: "Alan Reynolds",
        email: "reynolds.alan@epa.gov",
        responsibility: "Product Manager 94",
      },
      {
        name: "Amanda Pierce",
        email: "pierce.amanda@epa.gov",
        responsibility: "Senior Advisor",
      },
      {
        name: "Wiebke Striegel",
        email: "striegel.wiebke@epa.gov",
        responsibility: "Senior Scientist",
      },
    ],
  },
  {
    title: "Microbial Pesticides Branch",
    description:
      "Registration of microbial pesticides and registration review for microbial and biochemical pesticides.",
    rows: [
      {
        name: "Alex Boukedes",
        email: "boukedes.alexandra@epa.gov",
        responsibility: "Product Manager 92",
      },
    ],
  },
  {
    title: "Risk Assessment Branch",
    description:
      "Risk assessments, including human health and ecological, and product characterization for microbial and biochemical pesticides (excluding PIPs). Science policy for microbial and biochemical pesticides.",
    rows: [
      {
        name: "Geoff Sinclair",
        email: "sinclair.geoffrey@epa.gov",
        responsibility: "Branch Chief",
      },
      {
        name: "Cassandra Kirk",
        email: "kirk.cassandra@epa.gov",
        responsibility: "Senior Scientist",
      },
      {
        name: "Dana Sackett",
        email: "sackett.dana@epa.gov",
        responsibility: "Senior Scientist",
      },
      {
        name: "Angela Gonzales",
        email: "gonzales.angela@epa.gov",
        responsibility: "Senior Scientist",
      },
      {
        name: "Kathryn Korthauer",
        email: "korthauer.kathryn@epa.gov",
        responsibility: "Risk Assessment Process Leader",
      },
    ],
  },
  {
    title: "Center for Integrated Pest Management",
    descriptionParts: [
      {
        type: "mail",
        text: "ipm@epa.gov",
        href: "ipm@epa.gov",
      },
    ],
    rows: [
      {
        name: "Thomas Cook",
        email: "cook.tom@epa.gov",
        responsibility: "Team Leader",
      },
    ],
  },
];

function ExternalLink({ href, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-primary underline ${className}`}
    >
      {children}
    </a>
  );
}

function MailLink({ email, children }) {
  return (
    <a href={`mailto:${email}`} className="text-primary underline">
      {children || email}
    </a>
  );
}

function RenderParts({ parts }) {
  return parts.map((part, index) => {
    if (typeof part === "string") {
      return <span key={index}>{part}</span>;
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

function ContactTable({ rows }) {
  return (
    <div className="mb-8 max-w-full overflow-x-auto">
      <table className="w-full table-fixed border-collapse border border-gray-500 text-center text-xs text-black md:text-sm">
        <thead>
          <tr className="bg-gray-300">
            <th className="w-[25%] border border-gray-500 px-3 py-2 font-bold">
              Name
            </th>
            <th className="w-[35%] border border-gray-500 px-3 py-2 font-bold">
              Email
            </th>
            <th className="w-[40%] border border-gray-500 px-3 py-2 font-bold">
              Area of Responsibility
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={`${row.name}-${row.email}`}>
              <td className="break-words border border-gray-500 px-3 py-2">
                {row.name}
              </td>
              <td className="break-words border border-gray-500 px-3 py-2">
                <MailLink email={row.email}>{row.email}</MailLink>
              </td>
              <td className="break-words border border-gray-500 px-3 py-2">
                {row.responsibility}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CrToken({ value }) {
  const match = value?.match(/^CR\s*(\d+)$/);

  if (match) {
    return (
      <>
        CR<sub>{match[1]}</sub>
      </>
    );
  }

  return value;
}

function CategoryCell({ row }) {
  const hasEupMarker = row.category?.startsWith("E ");
  const categoryText = hasEupMarker
    ? row.category.replace(/^E\s+/, "")
    : row.category;

  const eupMarker = hasEupMarker ? (
    <>
      <sup>E</sup>{" "}
    </>
  ) : null;

  if (row.categoryParts) {
    return (
      <>
        {eupMarker}
        <RenderParts parts={row.categoryParts} />
      </>
    );
  }

  if (row.categoryPrefix && row.categoryLinkText && row.href) {
    return (
      <>
        {eupMarker}
        {row.categoryPrefix}
        <ExternalLink href={row.href}>{row.categoryLinkText}</ExternalLink>
      </>
    );
  }

  if (row.linkWholeCategory && row.href) {
    return (
      <>
        {eupMarker}
        <ExternalLink href={row.href}>{categoryText}</ExternalLink>
      </>
    );
  }

  if (row.href) {
    const match = categoryText.match(/^(.*?)(\s*\((?:Series\s*)?[\d.,\s]+\))$/);

    if (match) {
      return (
        <>
          {eupMarker}
          {match[1]}
          <ExternalLink href={row.href}>{match[2]}</ExternalLink>
        </>
      );
    }
  }

  return (
    <>
      {eupMarker}
      {categoryText}
    </>
  );
}

function LeftRequirementCell({ row }) {
  return (
    <div>
      <div>
        <CategoryCell row={row} />

        {row.cr && (
          <>
            {" "}
            <CrToken value={row.cr} />
          </>
        )}
      </div>

      {row.crParts && (
        <div className="mt-1 whitespace-pre-line">
          <RenderParts parts={row.crParts} />
        </div>
      )}
    </div>
  );
}

function RightExplanationCell({ row }) {
  if (row.explanationParts) {
    return <RenderParts parts={row.explanationParts} />;
  }

  return row.explanation || "";
}

function hasExplanation(row) {
  return Boolean(row.explanation || row.explanationParts);
}

function DataRequirementsTable() {
  const rightCellSpans = new Map();
  const skipRightCell = new Set();

  dataRows.forEach((row, index) => {
    if (row.kind === "heading" || !hasExplanation(row)) {
      return;
    }

    let span = 1;

    for (let i = index + 1; i < dataRows.length; i++) {
      const nextRow = dataRows[i];

      if (
        nextRow.kind === "heading" ||
        hasExplanation(nextRow) ||
        nextRow.cr !== row.cr
      ) {
        break;
      }

      span += 1;
      skipRightCell.add(i);
    }

    rightCellSpans.set(index, span);
  });

  return (
    <div className="my-8 max-w-full overflow-x-auto">
      <table className="w-full table-fixed border-collapse border border-black text-sm text-black">
        <thead>
          <tr>
            <th
              colSpan="2"
              className="border border-black bg-gray-100 px-4 py-4 text-center"
            >
              <div className="text-2xl font-normal">
                Scientific Data Specifications and Methods
              </div>

              <div className="mt-1 text-base font-normal">
                <sup>1</sup> Biochemical Pesticides Data Requirements -{" "}
                <ExternalLink href={externalLinks.cfr158SubpartU}>
                  40 CFR 158 Subpart U
                </ExternalLink>
              </div>
            </th>
          </tr>

          <tr>
            <th className="w-[59%] border border-black px-3 py-3 text-center text-lg font-bold leading-tight">
              EPA Required Data Category and Test
              <br />
              Guidelines
            </th>

            <th className="w-[41%] border border-black px-3 py-3 text-center text-lg font-bold leading-tight">
              CR - Conditionally Required
              <br />
              Explanation (if applicable)
            </th>
          </tr>
        </thead>

        <tbody>
          {dataRows.map((row, index) => {
            if (row.kind === "heading") {
              return (
                <tr key={`${row.title}-${index}`}>
                  <td
                    colSpan="2"
                    className="border border-black px-3 py-2 text-center text-lg font-normal"
                  >
                    {row.title}
                  </td>
                </tr>
              );
            }

            return (
              <tr key={`${row.category}-${index}`}>
                <td className="break-words border border-black px-3 py-2 align-top text-base leading-snug">
                  <LeftRequirementCell row={row} />
                </td>

                {!skipRightCell.has(index) && (
                  <td
                    rowSpan={rightCellSpans.get(index) || 1}
                    className="break-words border border-black px-3 py-2 align-top text-base leading-snug"
                  >
                    <RightExplanationCell row={row} />
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function BiopesticideRegistrationPage() {
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
        <span className="text-gray-800">Biopesticide Registration</span>
      </div>

      {/* background image */}
      <div className="relative mt-4 h-28 text-white">
        <div className="absolute inset-0 bg-cover bg-center" />
        <div className="absolute inset-0 z-0 bg-black opacity-65" />

        {/* Content */}
        <div className="relative z-10 px-1 py-4 text-center duration-300 hover:scale-105">
          <a
            href={externalLinks.biopesticideRegistration}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white no-underline hover:no-underline"
          >
            <h1 className="!mb-0 !mt-1 !text-4xl font-bold text-white">
              Biopesticide Registration
            </h1>
          </a>

          <p className="!mt-2 text-lg text-gray-200">
            FIFRA product registration - Biochemical and microbial-based
            biopesticides
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

        <div className="mt-5 min-w-0 flex-1">
          <p>
            The information presented on this webpage was collected from{" "}
            <a
              className="text-primary text-underline"
              href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158"
            >
              40 CFR 158
            </a>{" "}
            and/or{" "}
            <a
              className="text-underliner text-primary"
              href="https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances"
            >
              EPA’s Test Guidelines for Pesticides and Toxic Substances
            </a>{" "}
            unless otherwise noted. Please visit the agency’s website for more
            information. For a full list of contact information for individuals,
            offices, and topics, visit the{" "}
            <a
              className="text-underline text-primary"
              href="https://www.epa.gov/pesticide-contacts/contacting-epa-about-regulating-pesticides-issues"
            >
              EPA’s Pesticide Contacts Page
            </a>
            .
          </p>
          {/* Overview */}
          <div
            id="overview"
            className="mt-10 scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Overview</h1>

            <div className="mb-8 text-lg">
              <p>
                Biopesticides are certain types of pesticides derived from such
                natural materials as animals, plants, bacteria, and certain
                minerals. Biopesticides fall into three major categories:
              </p>

              <ol className="mt-3 ml-6 list-decimal">
                <li>
                  <b>Biochemical pesticides:</b> Naturally occurring substances
                  that control pests by non-toxic mechanisms. Conventional
                  pesticides, by contrast, are generally synthetic materials
                  that directly kill or inactivate the pest. Because it is
                  sometimes difficult to determine whether a substance meets the
                  criteria for classification as a biochemical pesticide, EPA
                  has established a special committee to make such decisions.
                </li>

                <li className="mt-3">
                  <b>Microbial pesticides:</b> Consist of a microorganism (e.g.,
                  a bacterium, fungus, virus or protozoan) as the active
                  ingredient. Microbial pesticides can control many different
                  kinds of pests, although each separate active ingredient is
                  relatively specific for its target pest(s).
                </li>

                <li className="mt-3">
                  <b>Plant-Incorporated-Protectants (PIPs):</b> Pesticidal
                  substances that plants produce from genetic material that has
                  been added to the plant.
                </li>
              </ol>

              <p className="mt-5">
                The EPA encourages the development and use of biopesticides
                because they are generally host-specific, effective in small
                quantities, decompose quickly, and are usually less toxic than
                conventional pesticides.
              </p>
            </div>
          </div>

          {/* Data Requirements */}
          <div
            id="data-requirements"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Data Requirements</h1>

            <div className="mb-8 text-lg">
              <p>
                The EPA sets data requirements based on three active ingredient
                categories:{" "}
                <a className="text-underline text-primary" href="/glossary">
                  Conventional chemicals, Biochemicals, and Microbial
                </a>
                . These categories do not exactly match the three
                classifications of pesticides defined by the EPA, which are
                Conventional, Biopesticide, and Antimicrobial. Figure 1 below
                demonstrates how these categories and classifications overlap.
                Biopesticides may be composed of biochemical or microbial active
                ingredients.
              </p>

              <img
                src="/bio.png"
                alt="biopesticide information image"
                className="w-full h-150 mt-10"
              />

              <p className="mt-5">
                <b>Figure 1.</b> Definitions and relationships between
                classifications of completed pesticide products and categories
                of pesticide active ingredients.
              </p>
              <p className="mt-5">
                Data required for pesticide registration submission must be
                collected using standardized methods set forth by the EPA or the{" "}
                <ExternalLink href={externalLinks.oecdGuidelines}>
                  Organization for Economic Co-operation and Development (OECD)
                </ExternalLink>
                . Each required data category has an accompanying series of
                necessary tests. The various series identify and detail the data
                required for registration, as well as the test methodology.
                Additional EPA-accepted standardized test methods are available
                on the OECD webpage. See the table below for data series and
                corresponding OECD test methods.
              </p>

              <p className="mt-5">
                See the table below for EPA data series numbers. Note that tests
                are reviewed by one of two divisions in the EPA Office of
                Pesticide Programs: the{" "}
                <a
                  className="text-underline text-primary"
                  href="https://www.epa.gov/pesticide-contacts/contacts-office-pesticide-programs-registration-division"
                >
                  Registration Division (RD)
                </a>{" "}
                or the{" "}
                <a
                  className="text-underline text-primary"
                  href="https://www.epa.gov/pesticide-contacts/contacts-office-pesticide-programs-biopesticides-and-pollution-prevention"
                >
                  Biopesticides and Pollution Prevention Division (BPPD)
                </a>
                . Questions regarding tests should be directed to the
                appropriate division.
              </p>

              <DataRequirementsTable />

              <p className="mt-5 text-base">
                <sup>1</sup> The information in this table represents the
                uniformly required data for all biopesticides. Some additional
                Conditional Requirements pertinent to algaecides have been
                included. A complete list of additional requirements for
                biopesticides is available in{" "}
                <ExternalLink href={externalLinks.cfr158SubpartU}>
                  CFR 40 Part 158 Subpart U
                </ExternalLink>
                .
              </p>

              <p className="mt-3 text-base">
                <sup>2</sup> Mammalian toxicity data may qualify for a data
                waiver. See the EPA’s{" "}
                <ExternalLink href={externalLinks.acuteToxicityWaiver}>
                  Guidance for Waiving or Bridging of Mammalian Acute Toxicity
                  Tests for Pesticides and Pesticide Products
                </ExternalLink>
                .
              </p>

              <p className="mt-3 text-base">
                <sup>E</sup> Represents data required to apply for an
                Experimental Use Permit.
              </p>
            </div>
          </div>

          {/* Additional Data Requirements Details */}
          <div
            id="additional-data-requirements-details"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              Additional Data Requirements Details
            </h1>

            <div className="mb-8 text-lg">
              <p>
                Additional details on data requirements for Biopesticides can be
                found in{" "}
                <ExternalLink href={externalLinks.cfr158SubpartU}>
                  CFR 40 Part 158 Subpart U
                </ExternalLink>
              </p>

              <p className="mt-5">
                The studies required under Part 158 provide the scientific basis
                for characterizing the potential risks associated with pesticide
                exposure. There is considerable flexibility available to the EPA
                in implementing Part 158. For example:
              </p>

              <ul className="mt-3 ml-6 list-disc">
                <li>
                  Additional data may be required (
                  <ExternalLink href={externalLinks.cfr15875}>
                    Section 158.75
                  </ExternalLink>
                  ),
                </li>

                <li className="mt-3">
                  Alternative approaches may be accepted (see OECD Tests in the
                  table above), and
                </li>

                <li className="mt-3">
                  Studies can be waived (
                  <ExternalLink href={externalLinks.cfr15845}>
                    Section 158.45
                  </ExternalLink>
                  ).
                </li>
              </ul>
            </div>
          </div>

          {/* Experimental Use Permit */}
          <div
            id="experimental-use-permit"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Experimental Use Permit</h1>

            <div className="mb-8 text-lg">
              <p>
                Collection of the required pesticide registration data may
                require field trials. Unregistered pesticides may be applicable
                for an{" "}
                <Link
                  href="/experimentalUse"
                  className="text-primary underline"
                >
                  Experimental Use Permit
                </Link>{" "}
                (EUP). Although the complete set of registration data may not be
                available at the time of an EUP request, most studies and
                resulting data must have been collected before the EPA will
                grant an EUP. An EUP must also be approved by the state in which
                the experimental use is to take place. To determine the policy
                of an individual state, use the external link to the{" "}
                <ExternalLink href={externalLinks.npicStateAgencies}>
                  National Pesticide Information Center
                </ExternalLink>{" "}
                or the internal link to the{" "}
                <Link
                  href="/regulationsDirectory"
                  className="text-primary underline"
                >
                  US Regulatory Map
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div
            id="additional-information"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Additional Information</h1>

            <div className="mb-8 text-lg">
              <ul className="ml-6 list-disc">
                <li>
                  <ExternalLink
                    href={externalLinks.biopesticideActiveIngredients}
                  >
                    List of EPA-registered Biopesticide Active Ingredients
                  </ExternalLink>
                </li>

                <li className="mt-3">
                  Navigate to the EPA webpage for a list of required data{" "}
                  <ExternalLink href={externalLinks.testGuidelines}>
                    Test Guidelines
                  </ExternalLink>
                </li>

                <li className="mt-3">
                  Reviewer requirements. View a list of{" "}
                  <ExternalLink href={externalLinks.dataEvaluationFormats}>
                    Standard Data Evaluation Formats
                  </ExternalLink>{" "}
                  used for evaluation by data reviewers.
                </li>

                <li className="mt-3">
                  <ExternalLink href={externalLinks.bppdChecklists}>
                    BPPD Internal Application Checklists
                  </ExternalLink>
                </li>

                <li className="mt-3">
                  <ExternalLink href={externalLinks.csfTips}>
                    Tips for Avoiding Confidential Statement of Formula or
                    Product Chemistry Issues with Biopesticides
                  </ExternalLink>
                </li>

                <li className="mt-3">
                  See necessary registration forms,{" "}
                  <ExternalLink href={externalLinks.registrationForms}>
                    Pesticide Registration Manual: Ch. 20 - Forms and How to
                    Obtain Them
                  </ExternalLink>
                </li>

                <li className="mt-3">
                  If your proposed product is substantially similar to another
                  EPA-registered product, you may be able to{" "}
                  <ExternalLink
                    href={externalLinks.pesticideDataSubmittersList}
                  >
                    cite data from existing studies
                  </ExternalLink>
                  .
                </li>

                <li className="mt-3">
                  If citing another organization’s data, you must first
                  determine whether you need to pay or get authorization from
                  the data owner to use it. More can be found in the{" "}
                  <ExternalLink href={externalLinks.dataCompensation}>
                    Pesticide Registration Manual: Ch. 10 - Data Compensation
                    Requirements
                  </ExternalLink>
                </li>

                <li className="mt-3">
                  Determine the registration fee(s) and review timeframe for
                  your product
                  <ul className="mt-3 ml-6 list-[circle]">
                    <li>
                      The Pesticide Registration Improvement Act (PRIA, aka PRIA
                      5) requires the submission of fees associated with EPA
                      assessments of pesticide data.
                    </li>

                    <li className="mt-3">
                      Use the{" "}
                      <ExternalLink href={externalLinks.priaDecisionTree}>
                        PRIA Fee Determination Decision Tree
                      </ExternalLink>{" "}
                      to find the fees and review timeline associated with your
                      product.
                    </li>

                    <li className="mt-3">
                      If you are a{" "}
                      <ExternalLink
                        href={externalLinks.priaFeeWaiversSmallBusiness}
                      >
                        small business
                      </ExternalLink>
                      , academic institution, non-profit, or state/federal
                      office, you may qualify for a fee waiver.
                    </li>
                  </ul>
                </li>

                <li className="mt-3">
                  Review{" "}
                  <ExternalLink href={externalLinks.chapter3}>
                    Pesticide Registration Manual: Ch. 3 - Additional
                    Considerations for Biopesticide Products
                  </ExternalLink>
                </li>

                <li className="mt-3">
                  Schedule a pre-registration meeting with the{" "}
                  <ExternalLink href={externalLinks.bppdContacts}>
                    Office of Pesticide Products Biopesticide and Pollution
                    Prevention Division
                  </ExternalLink>
                  . See{" "}
                  <a href="#questions" className="text-primary underline">
                    contact information
                  </a>{" "}
                  below.
                </li>
              </ul>

              <p className="mt-6 text-base font-bold">
                This information was collected from the{" "}
                <ExternalLink href={externalLinks.cfr158Part}>
                  40 CFR 158
                </ExternalLink>{" "}
                or EPA’s{" "}
                <ExternalLink href={externalLinks.testGuidelinesBase}>
                  Test Guidelines for Pesticides and Toxic Substances
                </ExternalLink>{" "}
                unless otherwise noted. Please visit the website for more
                information.
              </p>
            </div>
          </div>

          {/* Questions */}
          <div id="questions" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Questions about Biopesticide Registration?
            </h1>

            <div className="mb-8 text-lg">
              {contactGroups.map((group) => (
                <div key={group.title}>
                  <p className="mt-6 font-bold">{group.title}</p>

                  <p>
                    {group.descriptionParts ? (
                      <RenderParts parts={group.descriptionParts} />
                    ) : (
                      group.description
                    )}
                  </p>

                  <ContactTable rows={group.rows} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

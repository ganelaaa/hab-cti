"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const richText =
  "prose cms-rich max-w-none [&_p]:mt-5 [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:ml-6 [&_ol]:list-decimal [&_ol]:ml-6 [&_li]:mt-3 [&_ul_ul]:list-[circle]";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "data-requirements", label: "Data Requirements" },
  { id: "experimental-use-permit", label: "Experimental Use Permit" },
  {
    id: "additional-information",
    label: "Additional Registration Information",
  },
  { id: "endangered-species", label: "Endangered Species Act" },
  {
    id: "questions",
    label: "Questions about Conventional Pesticide Registration?",
  },
];

const externalLinks = {
  conventionalEPA:
    "https://www.epa.gov/pesticide-registration/conventional-pesticide-registration",
  pesticideRegistration:
    "https://www.epa.gov/pesticide-registration/about-pesticide-registration",
  registrationManual:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual",
  chapter10:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-10-data-compensation-requirements",
  testGuidelines:
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/final-test-guidelines-pesticides-and-toxic",
  priaFees:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-fees-and-fee-waivers",
  priaDecisionTree:
    "https://www.epa.gov/pesticide-registration/pria-fee-determination-decision-tree",
  feeWaiver:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-fees-and-fee-waivers",
  benefitsInfo:
    "https://www.epa.gov/pesticide-registration/suggestions-registrants-providing-benefits-information-new-conventional",
  esaProgress:
    "https://www.epa.gov/endangered-species/progress-toward-protections-federally-listed-species",
  esaQA:
    "https://www.epa.gov/sites/default/files/2016-11/documents/esa-new-ai-qa.pdf",
  npicStateAgencies: "https://npic.orst.edu/reg/state_agencies.html",
  existingStudies:
    "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-10-data-compensation-requirements",
  cfr158:
    "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158",
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
  oecd: "https://www.oecd.org/en/topics/sub-issues/testing-of-chemicals/test-guidelines.html",
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
    "https://www.oecd.org/en/topics/sub-issues/pesticides-biocides/maximum-residue-limit-calculator.html",
  oecdFlammability:
    "https://www.oecd-ilibrary.org/environment/guidance-document-on-flammability-testing_9789264069237-en",
  oecdStorageStability:
    "https://www.epa.gov/pesticide-registration/storage-stability-and-corrosion-characteristics",
  oecdThermal:
    "https://www.oecd-ilibrary.org/environment/test-no-113-screening-test-for-thermal-stability-and-stability-in-air_9789264069831-en",
  oecdViscosity:
    "https://www.oecd-ilibrary.org/environment/test-no-114-viscosity-of-liquids_9789264069862-en",
  oecdPH:
    "https://www.oecd-ilibrary.org/environment/test-no-122-determination-of-ph-acidity-and-alkalinity_9789264070028-en",
  oecdDensity:
    "https://www.oecd-ilibrary.org/environment/test-no-109-density-of-liquids-and-solids_9789264069763-en",
  oecdParticleSize:
    "https://www.oecd-ilibrary.org/environment/test-no-110-particle-size-distribution-fibre-length-and-diameter-distributions_9789264069800-en",
  oecdDaphnia211:
    "https://www.oecd-ilibrary.org/environment/test-no-211-daphnia-magna-reproduction-test_9789264185203-en",
  oecdDaphnia202:
    "https://www.oecd-ilibrary.org/environment/test-no-202-daphnia-sp-acute-immobilisation-test_9789264069947-en",
  oecdFish203:
    "https://www.oecd-ilibrary.org/environment/test-no-203-fish-acute-toxicity-test_9789264069961-en",
  oecdResidues:
    "https://www.oecd-ilibrary.org/environment/introduction-to-the-oecd-guidelines-on-pesticide-residues-chemistry_9789264203594-en",
  oecdStorageResidues:
    "https://www.oecd-ilibrary.org/environment/test-no-506-stability-of-pesticide-residues-in-stored-commodities_9789264224100-en",
  oecdCropField:
    "https://www.oecd-ilibrary.org/environment/test-no-509-crop-field-trial_9789264076457-en",
  oecdAcuteOral:
    "https://www.oecd-ilibrary.org/environment/test-no-401-acute-oral-toxicity_9789264070950-en",
  oecdAcuteDermal:
    "https://www.oecd-ilibrary.org/environment/test-no-402-acute-dermal-toxicity_9789264070943-en",
  oecdAcuteInhalation:
    "https://www.oecd-ilibrary.org/environment/test-no-403-acute-inhalation-toxicity_9789264070332-en",
  oecdEyeIrritation:
    "https://www.oecd-ilibrary.org/environment/test-no-405-acute-eye-irritation-corrosion_9789264070646-en",
  oecdDermalIrritation:
    "https://www.oecd-ilibrary.org/environment/test-no-404-acute-dermal-irritation-corrosion_9789264070622-en",
  oecdSkinSensitization:
    "https://www.oecd-ilibrary.org/environment/test-no-442b-skin-sensitization_9789264090743-en",
  oecdRepeatedDermal:
    "https://www.oecd-ilibrary.org/environment/test-no-410-repeated-dose-dermal-toxicity-21-28-day-study_9789264070745-en",
  oecdSubchronicDermal:
    "https://www.oecd-ilibrary.org/environment/test-no-411-subchronic-dermal-toxicity-90-day-study_9789264070738-en",
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

function DataTable({ caption, rows }) {
  return (
    <div className="my-8 overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse border border-gray-500 text-center text-sm text-black">
        {caption && (
          <caption className="border border-b-0 border-gray-500 bg-gray-300 px-4 py-3 text-center text-lg font-bold text-black">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-gray-300">
            <th className="w-1/2 border border-gray-500 px-4 py-3 font-bold">
              EPA Required Data Category and Test Guidelines
            </th>
            <th className="w-1/2 border border-gray-500 px-4 py-3 font-bold">
              Organization for Economic Co-operation & Development (OECD)
              Standardized Methods
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border border-gray-500 px-4 py-2 text-left">
                {row.category}
              </td>
              <td className="border border-gray-500 px-4 py-2 text-left">
                {row.methods || ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionHeader({ children }) {
  return <h2 className="mt-2 mb-1 font-bold text-black">{children}</h2>;
}

export default function ConventionalPesticide({ cms }) {
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

  const productPerformanceRows = [
    {
      category: (
        <>
          Product Performance (
          <ExternalLink href={externalLinks.series810}>
            Series 810.1000
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
  ];

  const confidentialProductChemistryRows = [
    {
      category: (
        <>
          Product Identity and Composition (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1550
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Description of Materials Used to Produce the Product (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1600
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Description of Product Process (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1620
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Description of Formulation Process (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1650
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Discussion of Formation of Impurities (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1670
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Preliminary Analysis (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1700
          </ExternalLink>
          ) CR¹
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Certified Limits (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1750
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Enforcement Analytical Method (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1800
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Submittal of Samples (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1900
          </ExternalLink>
          ) CR¹
        </>
      ),
      methods: "",
    },
  ];

  const physicalChemicalRows = [
    {
      category: (
        <>
          Color (
          <ExternalLink href={externalLinks.series830}>
            Series 830.6302
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Physical State (
          <ExternalLink href={externalLinks.series830}>
            Series 830.6303
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Odor (
          <ExternalLink href={externalLinks.series830}>
            Series 830.6304
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Stability to Normal and Elevated Temperatures, Metals, and Metal Ions
          (
          <ExternalLink href={externalLinks.series830}>
            Series 830.6313
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdThermal}>
          Test No. 113: Screening Test for Thermal Stability and Stability in
          Air
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Oxidation/Reduction: Chemical Incompatibility (
          <ExternalLink href={externalLinks.series830}>
            Series 830.6314
          </ExternalLink>
          ) CR¹
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Flammability (
          <ExternalLink href={externalLinks.series830}>
            Series 830.6315
          </ExternalLink>
          ) CR¹
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdFlammability}>
          Guidance Document on Flammability Testing of Plant Protection and
          Biocidal Products
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Explodability (
          <ExternalLink href={externalLinks.series830}>
            Series 830.6316
          </ExternalLink>
          ) CR¹
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Storage Stability (
          <ExternalLink href={externalLinks.series830}>
            Series 830.6317
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdStorageStability}>
          EPA - Storage Stability and Corrosion Characteristics Alternate Test
          (preferred)
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Miscibility (
          <ExternalLink href={externalLinks.series830}>
            Series 830.6319
          </ExternalLink>
          ) CR¹
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Corrosion Characteristics (
          <ExternalLink href={externalLinks.series830}>
            Series 830.6320
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdStorageStability}>
          EPA - Storage Stability and Corrosion Characteristics Alternate Test
          (preferred)
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Dielectric Breakdown Voltage (
          <ExternalLink href={externalLinks.series830}>
            Series 830.6321
          </ExternalLink>
          ) CR¹
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          pH (
          <ExternalLink href={externalLinks.series830}>
            Series 830.7000
          </ExternalLink>
          ) CR¹
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdPH}>
          Test No. 122: Determination of pH, Acidity, and Alkalinity
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Viscosity (
          <ExternalLink href={externalLinks.series830}>
            Series 830.7100
          </ExternalLink>
          ) CR¹
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdViscosity}>
          Test No. 114: Viscosity of Liquids
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          UV/Visible Light Absorption (
          <ExternalLink href={externalLinks.series830}>
            Series 830.7050
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Melting Point/Melting Range (
          <ExternalLink href={externalLinks.series870}>
            Series 870.7200
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Boiling Point/Boiling Range (
          <ExternalLink href={externalLinks.series870}>
            Series 870.7220
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Density/Relative Density/Bulk Density (
          <ExternalLink href={externalLinks.series830}>
            Series 830.7300
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdDensity}>
          Test No. 109: Density of Liquids and Solids
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Dissociation Constants in Water (
          <ExternalLink href={externalLinks.series870}>
            Series 870.7370
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Particle Size, Fiber Length, and Diameter Distribution (
          <ExternalLink href={externalLinks.series830}>
            Series 830.7520
          </ExternalLink>
          ) CR¹
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdParticleSize}>
          Test No. 110: Particle Size Distribution/Fibre Length and Diameter
          Distributions
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Partition Coefficient (n-octanol/water) (
          <ExternalLink href={externalLinks.series870}>
            Series 870.7550/7560/7570
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Water Solubility (
          <ExternalLink href={externalLinks.series870}>
            Series 870.7840/7860
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Vapor Pressure (
          <ExternalLink href={externalLinks.series870}>
            Series 870.7950
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
  ];

  const environmentalFateRows = [
    { category: "Hydrolysis", methods: "" },
    { category: "Photodegradation in Water", methods: "" },
    {
      category: (
        <>
          Aerobic Aquatic (
          <ExternalLink href={externalLinks.series835}>
            Series 835.4300
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Aerobic Aquatic (
          <ExternalLink href={externalLinks.series835}>
            Series 835.4400
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Leaching and Adsorption/Desorption (
          <ExternalLink href={externalLinks.series835}>
            Series 835.1230/1240
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Aquatic Sediment (
          <ExternalLink href={externalLinks.series835}>
            Series 835.6200
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
  ];

  const ecologicalEffectsRows = [
    {
      category: (
        <>
          Aquatic Invertebrate, Acute Toxicity, Freshwater (
          <ExternalLink href={externalLinks.series850}>
            Series 850.1010
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <>
          <ExternalLink href={externalLinks.oecdDaphnia211}>
            Test No. 211: Daphnia magna Reproduction Test
          </ExternalLink>
          <br />
          <ExternalLink href={externalLinks.oecdDaphnia202}>
            Test No. 202: Daphnia sp. Acute Immobilisation Test
          </ExternalLink>
        </>
      ),
    },
    {
      category: (
        <>
          Oyster Acute Toxicity (Shell Deposition) (
          <ExternalLink href={externalLinks.series850}>
            Series 850.1025
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Mysid Acute Toxicity (
          <ExternalLink href={externalLinks.series850}>
            Series 850.1035
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Penaeid Acute Toxicity (
          <ExternalLink href={externalLinks.series850}>
            Series 850.1045
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Bivalve Acute Toxicity (Embryo Larval) (
          <ExternalLink href={externalLinks.series850}>
            Series 850.1055
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Fish Acute Toxicity, Marine & Fresh (
          <ExternalLink href={externalLinks.series850}>
            Series 850.1075
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdFish203}>
          Test No. 203: Fish, Acute Toxicity Test
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Aquatic Invertebrate Life Cycle - Freshwater (saltwater if applicable)
          (
          <ExternalLink href={externalLinks.series850}>
            Series 850.1300
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Fish Early Life Stage - Freshwater (saltwater if applicable) (
          <ExternalLink href={externalLinks.series850}>
            Series 850.1400
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Avian Oral Toxicity (
          <ExternalLink href={externalLinks.series850}>
            Series 850.2100
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Avian Reproduction (
          <ExternalLink href={externalLinks.series850}>
            Series 850.2300
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Avian Dietary Toxicity (
          <ExternalLink href={externalLinks.series850}>
            Series 850.2100
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
  ];

  const nontargetPlantsRows = [
    {
      category: (
        <>
          Terrestrial Plant Toxicity - Seedling Emergence (
          <ExternalLink href={externalLinks.series850}>
            Series 850.4100
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Terrestrial Plant Toxicity - Vegetative Vigor (
          <ExternalLink href={externalLinks.series850}>
            Series 850.4150
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Aquatic Field Phytotoxicity (
          <ExternalLink href={externalLinks.series850}>
            Series 850.4450
          </ExternalLink>
          ) CR
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Aquatic Plant Growth (Algal and Aquatic Vascular Plant Toxicity) (
          <ExternalLink href={externalLinks.series850}>
            Series 850.440/5400
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
  ];

  const residueChemistryRows = [
    {
      category: (
        <>
          <ExternalLink href={externalLinks.oecdResidues}>
            Introduction to OECD Test Guidelines on Pesticide Residues Chemistry
            - Section 5 Part A
          </ExternalLink>
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Directions for Use (
          <ExternalLink href={externalLinks.series860}>
            Series 860.1200
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Chemical Identity (
          <ExternalLink href={externalLinks.series860}>
            Series 860.110
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Magnitude of the Residue - Storage Stability Data (
          <ExternalLink href={externalLinks.series860}>
            Series 860.1380
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdStorageResidues}>
          Test No. 506: Stability of Pesticide Residues in Stored Commodities
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Magnitude of the Residue - Water, Fish, Potable Water, and Irrigated
          Crops (
          <ExternalLink href={externalLinks.series860}>
            Series 860.1400
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Magnitude of the Residue - Crop Field Trials (Plants) (
          <ExternalLink href={externalLinks.series860}>
            Series 860.1500
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdCropField}>
          Test No. 509: Crop Field Trial
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Proposed Tolerance (
          <ExternalLink href={externalLinks.series860}>
            Series 860.1550
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Reasonable Grounds in Support of Tolerance Petition (
          <ExternalLink href={externalLinks.series860}>
            Series 860.1560
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Submittal of Analytic Reference Standards (
          <ExternalLink href={externalLinks.series860}>
            Series 860.1650
          </ExternalLink>
          ) CR
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Nature of Residue in Plants (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1300
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Residue Analytical Methods (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1340
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Multiresidue Method (
          <ExternalLink href={externalLinks.series830}>
            Series 830.1360
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
  ];

  const mammalianToxicologyRows = [
    {
      category: (
        <>
          Acute Oral Toxicity - Rat (
          <ExternalLink href={externalLinks.series870}>
            Series 870.1100
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdAcuteOral}>
          Test No. 401: Acute Oral Toxicity
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Acute Dermal Toxicity (
          <ExternalLink href={externalLinks.series870}>
            Series 870.1200
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdAcuteDermal}>
          Test No. 402: Acute Dermal Toxicity
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Acute Inhalation Toxicity - Rat (
          <ExternalLink href={externalLinks.series870}>
            Series 870.1300
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdAcuteInhalation}>
          Test No. 403: Acute Inhalation Toxicity
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Acute Eye Irritation - Rabbit (
          <ExternalLink href={externalLinks.series870}>
            Series 870.2400
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdEyeIrritation}>
          Test No. 405: Acute Eye Irritation/Corrosion
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Acute Dermal Irritation (
          <ExternalLink href={externalLinks.series870}>
            Series 870.2500
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdDermalIrritation}>
          Test No. 404: Acute Dermal Irritation/Corrosion
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          Skin Sensitization (
          <ExternalLink href={externalLinks.series870}>
            Series 870.2600
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <>
          <ExternalLink href={externalLinks.oecdSkinSensitization}>
            Test No. 442B: Skin Sensitization
          </ExternalLink>
          <br />
          Guideline No. 497: Defined Approaches on Skin Sensitization
        </>
      ),
    },
    {
      category: (
        <>
          21/28 Day Dermal (
          <ExternalLink href={externalLinks.series870}>
            Series 870.3200
          </ExternalLink>
          )
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdRepeatedDermal}>
          Test No. 410: Repeated Dose Dermal Toxicity: 21/28-day Study
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          90 Day Dermal (
          <ExternalLink href={externalLinks.series870}>
            Series 870.3250
          </ExternalLink>
          ) CR¹
        </>
      ),
      methods: (
        <ExternalLink href={externalLinks.oecdSubchronicDermal}>
          Test No. 411: Subchronic Dermal Toxicity: 90-day Study
        </ExternalLink>
      ),
    },
    {
      category: (
        <>
          90 Day Neurotoxicity - Rat (
          <ExternalLink href={externalLinks.series870}>
            Series 870.6200
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    { category: "Chronic Oral - Rodent", methods: "" },
    {
      category:
        "Carcinogenicity - Two Rodent Species (Rat and Mouse Preferred)",
      methods: "",
    },
    { category: "Reproduction and Fertility Effects", methods: "" },
    { category: "Bacterial Reverse Mutation Assay", methods: "" },
    { category: "In Vitro Mammalian Cell Assay", methods: "" },
    { category: "In Vivo Cytogenetics", methods: "" },
    { category: "Metabolism and Pharmacokinetics", methods: "" },
    { category: "Immunotoxicity", methods: "" },
  ];

  const applicationExposureRows = [
    {
      category: (
        <>
          Dermal Outdoor Exposure (
          <ExternalLink href={externalLinks.series875}>
            Series 875.1100
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Inhalation Outdoor Exposure (
          <ExternalLink href={externalLinks.series875}>
            Series 875.1300
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Data Reporting and Calculations (
          <ExternalLink href={externalLinks.series875}>
            Series 875.1600
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Product Use Information (
          <ExternalLink href={externalLinks.series875}>
            Series 875.1700
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
  ];

  const postApplicationRows = [
    {
      category: (
        <>
          Dislodgeable Foliar Residue and Turf Transferable Residues (
          <ExternalLink href={externalLinks.series875}>
            Series 875.2100
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Soil Residue Dissipation (
          <ExternalLink href={externalLinks.series875}>
            Series 875.2200
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Dermal Exposure (
          <ExternalLink href={externalLinks.series875}>
            Series 875.2400
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Inhalation Exposure (
          <ExternalLink href={externalLinks.series875}>
            Series 875.2500
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Indoor Surface Residue Dissipation (
          <ExternalLink href={externalLinks.series875}>
            Series 875.2300
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Product Use Information (
          <ExternalLink href={externalLinks.series875}>
            Series 875.2700
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Description of Human Activity (
          <ExternalLink href={externalLinks.series875}>
            Series 875.2800
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
    {
      category: (
        <>
          Data Reporting Calculations (
          <ExternalLink href={externalLinks.series875}>
            Series 875.2900
          </ExternalLink>
          )
        </>
      ),
      methods: "",
    },
  ];

  const sprayDriftRows = [
    {
      category: (
        <>
          Spray Drift (
          <ExternalLink href={externalLinks.series840}>Series 840</ExternalLink>
          ) — Required when aerial applications (rotary and fixed winged) and
          mist blower or other ground applications are proposed and detrimental
          effect levels on nontarget organisms are estimated to be exceeded.
        </>
      ),
      methods: "",
    },
  ];

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
        <Link href="/agency/405" className="text-primary hover:underline">
          FIFRA
        </Link>
        <span>›</span>
        <Link
          href="/pesticideRegistration"
          className="text-primary hover:underline"
        >
          Pesticide Registration
        </Link>
        <span>›</span>
        <span className="text-gray-800">
          Conventional Pesticide Registration
        </span>
      </div>

      {/* Page Hero Title */}
      <InternalPageHero
        title={cms?.pageTitle || "Conventional Pesticide Registration"}
        subtitle={
          cms?.pageSubtitle ||
          "FIFRA product registration — Conventional Pesticides"
        }
        link={externalLinks.conventionalEPA}
      />

      {/* Body */}
      <div className="mt-0 flex flex-row gap-10">
        {/* Sticky nav */}
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
          <div
            className={richText}
            dangerouslySetInnerHTML={{ __html: cms?.introText || "" }}
          />
          {/* Overview */}
          <div
            id="overview"
            className="mt-10 scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Overview</h1>
            <div className="mb-8 text-lg">
              <div
                className={richText}
                dangerouslySetInnerHTML={{ __html: cms?.overviewText || "" }}
              />
            </div>
          </div>

          {/* Data Requirements */}
          <div
            id="data-requirements"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Data Requirements</h1>
            <div className="mb-8 text-lg">
              <div
                className={richText}
                dangerouslySetInnerHTML={{ __html: cms?.dataTopText || "" }}
              />

              <div
                className={richText}
                dangerouslySetInnerHTML={{ __html: cms.dataRequirementsTable }}
              />

              <div
                className={`${richText} text-base`}
                dangerouslySetInnerHTML={{ __html: cms?.tableFootnotes || "" }}
              />
            </div>
          </div>

          {/* Experimental Use Permit */}
          <div
            id="experimental-use-permit"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Experimental Use Permit</h1>
            <div className="mb-8 text-lg">
              <div
                className={richText}
                dangerouslySetInnerHTML={{ __html: cms?.eupText || "" }}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div
            id="additional-information"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              Additional Registration Information
            </h1>
            <div className="mb-8 text-lg">
              <div
                className={richText}
                dangerouslySetInnerHTML={{
                  __html: cms?.additionalInfoText || "",
                }}
              />
            </div>
          </div>

          {/* Endangered Species Act */}
          <div
            id="endangered-species"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Endangered Species Act</h1>
            <div className="mb-8 text-lg">
              <div
                className={richText}
                dangerouslySetInnerHTML={{
                  __html: cms?.endangeredSpeciesText || "",
                }}
              />
            </div>
          </div>

          {/* Questions / Contacts */}
          <div id="questions" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Questions about Conventional Pesticide Registration?
            </h1>
            <div className="mb-8 text-lg">
              <div
                className={richText}
                dangerouslySetInnerHTML={{ __html: cms.contactsTable }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

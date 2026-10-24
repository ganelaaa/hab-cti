"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";
import { getToxicologyPageFields } from "@/lib/cms";

// ---------------------------------------------------------------------------
// Built-in content (from the Toxicology Data info page document). Every block
// below can be overridden from WordPress; when a CMS field is empty the
// built-in text is shown instead.
// ---------------------------------------------------------------------------

const EPA_DATA_REQUIREMENTS =
    "https://www.epa.gov/pesticide-registration/data-requirements-pesticide-registration";
const EPA_CONTACTS =
    "https://www.epa.gov/pesticide-contacts/contacting-epa-about-regulating-pesticides-issues";
const EPA_TEST_GUIDELINES =
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/final-test-guidelines-pesticides-and-toxic";
const EPA_BRIDGING =
    "https://www.epa.gov/pesticide-registration/bridging-or-waiving-data-requirements";
const EPA_SERIES_870 =
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-870-health-effects-test-guidelines";
const EPA_SERIES_875 =
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-875-occupational-and-residential-exposure";
const EPA_SERIES_850 =
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-850-ecological-effects-test-guidelines";
const EPA_SERIES_885 =
    "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-885-microbial-pesticide-test-guidelines";

const link = (href, text) =>
    `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-primary underline">${text}</a>`;

const DEFAULTS = {
    pageTitle: "Toxicology Data",
    pageSubtitle: "Toxicology data required for FIFRA approval of pesticide products",

    sourceNote: `<p><b>The information presented on this webpage was collected from the EPA&rsquo;s ${link(EPA_DATA_REQUIREMENTS, "Data Requirements for Pesticide Registration webpage")}, unless otherwise specified. For more details, please visit the agency&rsquo;s website. For a full list of contact information for individuals, offices, and topics, visit the EPA&rsquo;s ${link(EPA_CONTACTS, "Pesticide Contacts Page")}.</b></p>`,

    overviewTitle: "Overview",
    overviewDescription: `
    <p>The role of the EPA and, thereby, the FIFRA application process, is to ensure pesticides are safe and effective. Determining the safety of pesticide products involves the review of a robust data set provided by the applicant. There are several categories of required data (see <a href="/pesticideRegistration" class="text-primary underline">Pesticide Registration</a>). The required toxicology data falls into three categories: i.) hazards to humans and domestic animals, ii.) hazards to non-target organisms, and iii.) hazards to pesticide applicators and affiliated workers. Tests within these categories may be Required (R), Conditionally Required (CR), or Not Required (NR), depending on the pesticide product type (conventional, antimicrobial, or biopesticide). Toxicology data is required for product registration and experimental use permits. See the respective info page, <a href="/conventionalPesticide" class="text-primary underline">Conventional Pesticides</a>, Antimicrobial, or <a href="/biopesticideRegistration" class="text-primary underline">Biopesticides</a>, and the table below for specific information on data requirements for each type. Note that toxicology data is not required for minimum risk products.</p>
  `,

    dataRequirementsTitle: "Data Requirements",
    dataRequirementsDescription: `
    <p>The collection of pesticide toxicology data must follow Good Laboratory Practices. Data should be obtained using the EPA-prescribed methods shown as Series Number and Test Guideline Name in the table below. Additional information on test series and guidance can be found on the EPA&rsquo;s ${link(EPA_TEST_GUIDELINES, "Final Test Guidelines for Pesticides and Toxic Substances webpage")}. Some testing may not be within the capabilities of a standard laboratory, which is often the case with mammalian toxicity testing. For third-party labs approved by the EPA for toxicological testing, see the EPA Approved Lab List below. In some cases, a product may be eligible for a ${link(EPA_BRIDGING, "bridge or waiver of data requirements")}.</p>
  `,

    categoriesTitle: "Toxicology Data Categories and Corresponding Subcategories",
    categoriesDescription: `
    <p><b>Hazards to Humans and Domestic Animals</b></p>
    <ul>
      <li>Mammalian Toxicology</li>
    </ul>
    <p class="mt-4"><b>Hazards to Non-target Organisms</b></p>
    <ul>
      <li>Ecological Effects</li>
    </ul>
    <p class="mt-4"><b>Hazards to Applicators</b></p>
    <ul>
      <li>Applicator Exposure (Occupational and Residential)</li>
      <li>Post-Application Exposure (Occupational and Residential)</li>
    </ul>
  `,

    tableTitle: "Toxicology Data Requirements - Test Names and Guidelines",
    tableSource:
        "EPA Data Requirements for Development and Registration of Pesticide End-Use Products (EPs) • Prepared by Cynthia Ann Smith of Conn & Smith, Inc. • January 31, 2025",
    tableFootnote1: `<p>The table above shows data requirements and tests applicable to aquatic algaecides. Other forms of pesticide products may require additional data.</p>`,
    tableFootnote2: `<p>Although algaecides are not commonly applied directly to food-use products, any pesticide applied in the marine environment may leave residues on marine organisms harvested for food and therefore must have an EPA-established tolerance.</p>`,

    labsTitle: "EPA Approved Labs - Toxicological Assessment",
    labsDescription: `
    <ul>
      <li>${link("https://www.stillmeadow.com/epa-lab-testing/", "STILLMEADOW Incorporated")}</li>
      <li>${link("https://www.criver.com/products-services/safety-assessment/toxicology-services", "Charles River")}</li>
      <li>${link("https://www.labcorp.com/biopharma/nonclinical/disciplines/toxicology", "Labcorp")}</li>
      <li>${link("https://ichorlifesciences.com/pharmacology-services/preclincial-toxicology-services/", "Ichor Life Sciences")}</li>
      <li>${link("https://iitri.org/toxicology/", "IIT Research Institute")}</li>
      <li>${link("https://www.eurofins.com/en/biopharma-services/biopharma-product-testing/services/toxicology/alternative-toxicology/", "Eurofins")}</li>
    </ul>
    <p class="mt-5">Use Contract Laboratory&rsquo;s ${link("https://contractlaboratory.com/?_sort=featured_vendor__desc&s=&post_type=hp_vendor", "Laboratory Outsourcing Network webpage")} to find a GLP-certified lab offering the testing services you require.</p>
  `,

    additionalInfoTitle: "Additional Information",
    additionalInfoDescription: `
    <ul>
      <li>For more information on the test guidelines, see the EPA&rsquo;s ${link(EPA_TEST_GUIDELINES, "Final Test Guidelines for Pesticides and Toxic Substances")}
        <ul class="mt-2">
          <li>${link(EPA_SERIES_870, "Series 870 - Health Effects Test Guidelines")}</li>
          <li class="mt-1">${link(EPA_SERIES_875, "Series 875 - Occupational and Residential Exposure Test Guidelines")}</li>
          <li class="mt-1">${link(EPA_SERIES_850, "Series 850 - Ecological Effects Test Guidelines")}</li>
          <li class="mt-1">${link(EPA_SERIES_885, "Series 885 - Microbial Pesticides Test Guidelines")}</li>
        </ul>
      </li>
      <li class="mt-3">Details on data required for pesticide registration can be found in ${link("https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158", "40 CFR Part 158")}</li>
    </ul>
  `,

    questionsTitle: "Questions about FIFRA toxicology data?",
    questionsDescription: `
    <p><b>General Questions</b></p>
    <ul>
      <li>Complete the ${link("https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/forms/contact-us-about-test-guidelines-pesticides", "request for information form")} on the EPA&rsquo;s website</li>
      <li class="mt-2">Contact <a href="mailto:pesticidequestions@epa.gov" class="text-primary underline">pesticidequestions@epa.gov</a></li>
    </ul>
    <p class="mt-5"><b>Regional EPA Office Contacts</b></p>
    <ul>
      <li>${link("https://www.epa.gov/aboutepa/regional-and-geographic-offices", "Contact your regional EPA office")}</li>
    </ul>
    <p class="mt-5"><b>EPA Contacts</b></p>
    <p>For a full list of contact emails for individuals, offices, and topics, visit the EPA&rsquo;s ${link(EPA_CONTACTS, "Pesticide Contacts Page")}.</p>
  `,

    citationTitle: "Citation",
    citationDescription: `<p>The information presented on this webpage was collected from the EPA&rsquo;s ${link(EPA_DATA_REQUIREMENTS, "Data Requirements for Pesticide Registration webpage")}, unless otherwise specified. For more details, please visit the agency&rsquo;s website.</p>`,
};

// Table rows. Each entry is either a section heading
//   { type: "section", title, url }
// or a test row
//   { rd, bppd, url, name, indent?, reg: [conv, biochem, micro],
//     eupFood: [rd, biochem, micro], eupNonFood: [rd, biochem, micro] }
// (R = Required, CR = Conditionally Required, NR = Not Required)
const DEFAULT_TABLE_ROWS = [
    {
        "type": "section",
        "label": "Test Series Number/Guideline",
        "title": "Mammalian Toxicology Data",
        "url": "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-870-health-effects-test-guidelines"
    },
    {
        "rd": "",
        "bppd": "885.3400",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0159-0023",
        "name": "Hypersensitivity Incidents",
        "reg": [
            "NR",
            "NR",
            "R"
        ],
        "eupFood": [
            "NR",
            "NR",
            "R"
        ],
        "eupNonFood": [
            "NR",
            "NR",
            "R"
        ]
    },
    {
        "rd": "870.1100",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0156-0003",
        "name": "Acute Oral Toxicity",
        "reg": [
            "R",
            "R",
            "R"
        ],
        "eupFood": [
            "R",
            "R",
            "R"
        ],
        "eupNonFood": [
            "R",
            "R",
            "R"
        ]
    },
    {
        "rd": "870.1200",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0156-0004",
        "name": "Acute Dermal Toxicity",
        "reg": [
            "R",
            "R",
            "R"
        ],
        "eupFood": [
            "R",
            "R",
            "R"
        ],
        "eupNonFood": [
            "R",
            "R",
            "R"
        ]
    },
    {
        "rd": "870.1300",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0156-0005",
        "name": "Acute Inhalation Toxicity",
        "reg": [
            "R",
            "R",
            "R"
        ],
        "eupFood": [
            "R",
            "R",
            "R"
        ],
        "eupNonFood": [
            "R",
            "R",
            "R"
        ]
    },
    {
        "rd": "870.2400",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0156-0006",
        "name": "Acute Eye Irritation",
        "reg": [
            "R",
            "R",
            "R"
        ],
        "eupFood": [
            "R",
            "R",
            "R"
        ],
        "eupNonFood": [
            "R",
            "R",
            "R"
        ]
    },
    {
        "rd": "870.2500",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0156-0007",
        "name": "Acute Dermal Irritation",
        "reg": [
            "R",
            "R",
            "R"
        ],
        "eupFood": [
            "R",
            "R",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "R",
            "NR"
        ]
    },
    {
        "rd": "870.2600",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0156-0008",
        "name": "Skin Sensitization",
        "reg": [
            "R",
            "R",
            "NR"
        ],
        "eupFood": [
            "R",
            "R",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "R",
            "NR"
        ]
    },
    {
        "rd": "870.3200",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0156-0012",
        "name": "21/28 Day Dermal",
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "NR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "NR",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "870.3250",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0156-0013",
        "name": "90-Day Dermal",
        "reg": [
            "CR",
            "NR",
            "NR"
        ],
        "eupFood": [
            "NR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "NR",
            "NR",
            "NR"
        ]
    },
    {
        "type": "section",
        "title": "Applicator Exposure (Occupational and Residential)",
        "url": "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-875-occupational-and-residential-exposure"
    },
    {
        "rd": "875.1100",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0157-0003",
        "name": "Dermal Outdoor Exposure",
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.1300",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0157-0005",
        "name": "Inhalation Outdoor Exposure",
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.1500",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0157-0007",
        "name": "Biological Monitoring",
        "reg": [
            "CR",
            "NR",
            "NR"
        ],
        "eupFood": [
            "CR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "CR",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.1600",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0157-0008",
        "name": "Data Reporting and Calculations",
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.1700",
        "bppd": "",
        "url": "",
        "name": "Product Use Information",
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "type": "section",
        "title": "Post-Application Exposure (Occupational and Residential)",
        "url": "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-875-occupational-and-residential-exposure"
    },
    {
        "rd": "875.2100",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0157-0010",
        "name": "Dislodgeable Foliar Residue and Turf Transferable Residues",
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.2200",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0157-0011",
        "name": "Soil Residue Dissipation",
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.2400",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0157-0012",
        "name": "Dermal Exposure",
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.2500",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0157-0013",
        "name": "Inhalation Exposure",
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.2600",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0157-0014",
        "name": "Biological Monitoring",
        "reg": [
            "CR",
            "NR",
            "NR"
        ],
        "eupFood": [
            "CR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "CR",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.2700",
        "bppd": "",
        "url": "",
        "name": "Product Use Information",
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.2800",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0157-0015",
        "name": "Description of Human Activity",
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.2900",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0157-0016",
        "name": "Data Reporting and Calculations",
        "indent": true,
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "875.3000",
        "bppd": "",
        "url": "",
        "name": "Nondietary Ingestion Exposure",
        "indent": true,
        "reg": [
            "R",
            "NR",
            "NR"
        ],
        "eupFood": [
            "R",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "R",
            "NR",
            "NR"
        ]
    },
    {
        "type": "section",
        "title": "Spray Drift",
        "url": "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-850-ecological-effects-test-guidelines"
    },
    {
        "rd": "201-1",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0153-0003",
        "name": "Droplet Size",
        "reg": [
            "CR",
            "NR",
            "NR"
        ],
        "eupFood": [
            "CR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "CR",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "202-1",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0153-0003",
        "name": "Droplet Size",
        "reg": [
            "CR",
            "NR",
            "NR"
        ],
        "eupFood": [
            "CR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "CR",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "850.2200",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0154-0011",
        "name": "Avian Dietary Toxicity",
        "reg": [
            "NR",
            "R",
            "NR"
        ],
        "eupFood": [
            "NR",
            "R",
            "NR"
        ],
        "eupNonFood": [
            "NR",
            "R",
            "NR"
        ]
    },
    {
        "rd": "850.2500",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0154-0014",
        "name": "Simulated or Actual Field Testing",
        "reg": [
            "CR",
            "NR",
            "CR (Tier IV)"
        ],
        "eupFood": [
            "CR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "CR",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "850.3030",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0154-0017",
        "name": "Honey Bee Toxicity of Residues on Foliage",
        "reg": [
            "CR",
            "NR",
            "NR"
        ],
        "eupFood": [
            "CR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "CR",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "850.3040",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0154-0018",
        "name": "Field Testing for Pollinators",
        "reg": [
            "CR",
            "CR (Tier III)",
            "NR"
        ],
        "eupFood": [
            "CR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "CR",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "850.4100",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0154-0023",
        "name": "Terrestrial Plant Toxicity: Seedling Emergence",
        "reg": [
            "CR",
            "R",
            "NR"
        ],
        "eupFood": [
            "CR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "CR",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "850.4150",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0154-0024",
        "name": "Terrestrial Plant Toxicity: Vegetative Vigor",
        "reg": [
            "CR",
            "R",
            "NR"
        ],
        "eupFood": [
            "CR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "CR",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "850.4300",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0154-0026",
        "name": "Terrestrial Field Phytotoxicity",
        "reg": [
            "CR",
            "NR",
            "NR"
        ],
        "eupFood": [
            "CR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "CR",
            "NR",
            "NR"
        ]
    },
    {
        "rd": "850.4450",
        "bppd": "",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0154-0002",
        "name": "Aquatic Field Phytotoxicity",
        "reg": [
            "CR",
            "NR",
            "NR"
        ],
        "eupFood": [
            "CR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "CR",
            "NR",
            "NR"
        ]
    },
    {
        "type": "section",
        "title": "Microbial: Tier I",
        "url": "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-885-microbial-pesticide-test-guidelines"
    },
    {
        "rd": "",
        "bppd": "885.4300",
        "url": "https://www.regulations.gov/document/EPA-HQ-OPPT-2009-0159-0035",
        "name": "Nontarget Plant Testing",
        "reg": [
            "NR",
            "NR",
            "CR"
        ],
        "eupFood": [
            "NR",
            "NR",
            "NR"
        ],
        "eupNonFood": [
            "NR",
            "NR",
            "NR"
        ]
    }
];

// ---------------------------------------------------------------------------

const STATUS_STYLES = {
    R: "bg-yellow-100 text-black-500",
    CR: "bg-blue-100 text-blue-600",
    NR: "bg-gray-100 text-gray-600",
};

function StatusPill({ value }) {
    const text = String(value ?? "").trim();
    if (!text) return null;
    const base = text.split(" ")[0].toUpperCase();
    return (
        <span
            className={`inline-flex h-7 min-w-7 items-center justify-center whitespace-nowrap rounded-full px-1.5 text-[11px] font-semibold ${STATUS_STYLES[base] || STATUS_STYLES.NR
                }`}
        >
            {text}
        </span>
    );
}

function GuidelineNumber({ number, url }) {
    if (!number) return null;
    if (!url) return <span>{number}</span>;
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
        >
            {number}
        </a>
    );
}

const thBase = "border border-gray-200! px-2 py-3 text-center font-bold";

function ToxicologyTable({ rows, title, source, footnote1, footnote2 }) {
    return (
        <div className="mt-6">
            <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-gray-700">
                <span className="font-semibold text-black">Legend:</span>
                <span className="flex items-center gap-2">
                    <StatusPill value="R" /> Required
                </span>
                <span className="flex items-center gap-2">
                    <StatusPill value="CR" /> Conditionally Required
                </span>
                <span className="flex items-center gap-2">
                    <StatusPill value="NR" /> Not Required
                </span>
            </div>

            <div className="overflow-x-auto rounded border-[1px] border-gray-300!">
                <table className="w-full min-w-[860px] border-collapse text-sm text-black">
                    <caption className="border-b border-gray-200! bg-white px-4 py-4 text-left">
                        <span className="text-lg font-bold">
                            {title}
                            <sup className="ml-0.5 text-xs">1</sup>
                        </span>
                        {source && (
                            <span className="mt-1 block text-xs font-normal text-gray-600">
                                {source}
                            </span>
                        )}
                    </caption>
                    <thead>
                        <tr className="bg-[#f0f6ff]">
                            <th colSpan="2" rowSpan="2" className={`${thBase} text-xs`}>
                                EPA Guideline
                                <span className="mt-1 block font-normal text-gray-600">
                                    RD - Registration Division
                                    <br />
                                    BPPD - Biopesticide &amp; Pollution Prevention Division
                                </span>
                            </th>
                            <th rowSpan="3" className={`${thBase} min-w-[140px]`}>
                                EPA Test Guideline Name
                            </th>
                            <th colSpan="3" className={thBase}>
                                Registration: Aquatic Use
                            </th>
                            <th colSpan="6" className={thBase}>
                                Experimental Use Permit: Aquatic Use
                            </th>
                        </tr>
                        <tr className="bg-[#f0f6ff]">
                            <th colSpan="3" className={thBase}>
                                Food Use<sup className="ml-0.5 text-xs">2</sup>
                            </th>
                            <th colSpan="3" className={thBase}>
                                Food Use
                                <span className="block text-xs font-normal">
                                    (New Tolerance Exemption Proposed)
                                </span>
                            </th>
                            <th colSpan="3" className={thBase}>
                                Non-Food Use
                                <span className="block text-xs font-normal">
                                    (<i>NO</i> New Tolerance Exemption Proposed)
                                </span>
                            </th>
                        </tr>
                        <tr className="bg-[#f0f6ff] text-xs">
                            <th className={`${thBase} min-w-[64px]`}>RD</th>
                            <th className={`${thBase} min-w-[88px]`}>
                                BPPD
                                <span className="block font-normal text-gray-600">
                                    (tests required for biological pesticides only)
                                </span>
                            </th>
                            {[
                                "Conventional Pesticide (RD)",
                                "Biochemical Pesticide (BPPD)",
                                "Microbial Pesticide (BPPD)",
                                "RD",
                                "Biochem BPPD",
                                "Micro BPPD",
                                "RD",
                                "Biochem BPPD",
                                "Micro BPPD",
                            ].map((label, index) => (
                                <th key={index} className={`${thBase} min-w-[60px]`}>
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((row, index) => {
                            if (row.type === "section") {
                                const title = row.url ? (
                                    <a
                                        href={row.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary underline"
                                    >
                                        {row.title}
                                    </a>
                                ) : (
                                    row.title
                                );
                                return (
                                    <tr key={`section-${index}`}>
                                        {row.label && (
                                            <td
                                                colSpan="2"
                                                className="border border-gray-200! bg-gray-100 px-2 py-3 text-center text-xs"
                                            >
                                                {row.label}
                                            </td>
                                        )}
                                        <td
                                            colSpan={row.label ? 10 : 12}
                                            className="border border-gray-200! bg-gray-100 px-4 py-3 text-center text-xs font-bold uppercase tracking-wide"
                                        >
                                            {title}
                                        </td>
                                    </tr>
                                );
                            }

                            const statuses = [
                                ...(row.reg || []),
                                ...(row.eupFood || []),
                                ...(row.eupNonFood || []),
                            ];
                            return (
                                <tr key={`row-${index}`} className="border-b border-gray-100!">
                                    <td className="border border-gray-100! px-2 py-3 text-center">
                                        <GuidelineNumber number={row.rd} url={row.url} />
                                    </td>
                                    <td className="border border-gray-100! px-2 py-3 text-center">
                                        <GuidelineNumber number={row.bppd} url={row.url} />
                                    </td>
                                    <td
                                        className={`border border-gray-100! px-2 py-3 text-left ${row.indent ? "pl-8" : ""
                                            }`}
                                    >
                                        {row.indent ? "• " : ""}
                                        {row.name}
                                    </td>
                                    {Array.from({ length: 9 }).map((_, i) => (
                                        <td
                                            key={i}
                                            className="border border-gray-100! px-1 py-3 text-center"
                                        >
                                            <StatusPill value={statuses[i]} />
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mt-5 space-y-3 text-sm text-gray-700">
                <div className="flex gap-2">
                    <sup className="mt-1 text-xs">1</sup>
                    <div dangerouslySetInnerHTML={{ __html: footnote1 }} />
                </div>
                <div className="flex gap-2">
                    <sup className="mt-1 text-xs">2</sup>
                    <div dangerouslySetInnerHTML={{ __html: footnote2 }} />
                </div>
            </div>
        </div>
    );
}

export default function ToxicologyData() {
    const [cms, setCms] = useState(null);
    const [activeSection, setActiveSection] = useState("overview");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initFields() {
            try {
                const payload = await getToxicologyPageFields();
                setCms(payload);
            } catch (err) {
                console.error("Toxicology page fetch crash:", err);
            } finally {
                setLoading(false);
            }
        }
        initFields();
    }, []);

    // Anything left blank in WordPress falls back to the built-in text.
    const text = (key) => cms?.[key]?.trim?.() || DEFAULTS[key];

    let tableRows = DEFAULT_TABLE_ROWS;
    if (cms?.tableJson?.trim()) {
        try {
            const parsed = JSON.parse(cms.tableJson);
            if (Array.isArray(parsed) && parsed.length > 0) tableRows = parsed;
        } catch (e) {
            console.error("Toxicology table JSON is not valid:", e);
        }
    }

    const sections = [
        { id: "overview", label: text("overviewTitle") },
        { id: "data-requirements", label: text("dataRequirementsTitle") },
        { id: "approved-labs", label: text("labsTitle") },
        { id: "additional-information", label: text("additionalInfoTitle") },
        { id: "questions", label: text("questionsTitle") },
        { id: "citation", label: text("citationTitle") },
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, cms]);

    if (loading) {
        return (
            <div className="p-20 text-center text-gray-500">
                Loading toxicology data...
            </div>
        );
    }

    const sectionClass =
        "scroll-mt-28 border-b-4 border-primary-lighter pb-6 prose max-w-none";
    const headingClass = "font-bold text-primary text-2xl mb-4";

    return (
        <div className="px-20 py-10 tracking-wide">
            {/* Breadcrumb */}
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
                <span className="text-gray-800">{text("pageTitle")}</span>
            </div>

            <InternalPageHero
                title={text("pageTitle")}
                subtitle={text("pageSubtitle")}
                link={EPA_DATA_REQUIREMENTS}
            />

            <div className="mt-0 flex flex-row gap-10">
                {/* On this page */}
                <div className="mt-10 w-56 shrink-0">
                    <div className="sticky top-8">
                        <p className="mb-3 font-bold text-black">On this page</p>
                        <div className="flex flex-col border-l-2 border-gray-200!">
                            {sections.map((section) => (
                                <p
                                    key={section.id}
                                    onClick={() => scrollTo(section.id)}
                                    className={`cursor-pointer py-2 pl-4 text-sm transition-colors duration-200 hover:text-primary ${activeSection === section.id
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

                {/* Content */}
                <div className="flex-1 min-w-0 break-words whitespace-normal">
                    {/* Source note */}
                    <div className="mt-10 rounded border-l-4 border-primary bg-[#f0f6ff] px-5 py-4 text-sm prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: text("sourceNote") }} />
                    </div>

                    <div id="overview" className={sectionClass}>
                        <h1 className={headingClass}>{text("overviewTitle")}</h1>
                        <div
                            dangerouslySetInnerHTML={{ __html: text("overviewDescription") }}
                        />
                    </div>

                    <div id="data-requirements" className={sectionClass}>
                        <h1 className={headingClass}>{text("dataRequirementsTitle")}</h1>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: text("dataRequirementsDescription"),
                            }}
                        />

                        <h2 className="mt-8 mb-2 text-lg font-bold text-black">
                            {text("categoriesTitle")}
                        </h2>
                        <div
                            dangerouslySetInnerHTML={{ __html: text("categoriesDescription") }}
                        />

                        <ToxicologyTable
                            rows={tableRows}
                            title={text("tableTitle")}
                            source={text("tableSource")}
                            footnote1={text("tableFootnote1")}
                            footnote2={text("tableFootnote2")}
                        />
                    </div>

                    <div id="approved-labs" className={sectionClass}>
                        <h1 className={headingClass}>{text("labsTitle")}</h1>
                        <div
                            dangerouslySetInnerHTML={{ __html: text("labsDescription") }}
                        />
                    </div>

                    <div id="additional-information" className={sectionClass}>
                        <h1 className={headingClass}>{text("additionalInfoTitle")}</h1>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: text("additionalInfoDescription"),
                            }}
                        />
                    </div>

                    <div id="questions" className={sectionClass}>
                        <h1 className={headingClass}>{text("questionsTitle")}</h1>
                        <div
                            dangerouslySetInnerHTML={{ __html: text("questionsDescription") }}
                        />
                    </div>

                    <div id="citation" className="scroll-mt-28 prose max-w-none">
                        <h1 className={headingClass}>{text("citationTitle")}</h1>
                        <div
                            dangerouslySetInnerHTML={{ __html: text("citationDescription") }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
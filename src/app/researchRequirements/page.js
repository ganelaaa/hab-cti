"use client";

import { useState, useEffect, useRef, Fragment } from "react";
import InternalPageHero from "@/components/InternalPageHero";
import { getResearchRequirementsFields, getResearchQuestions } from "@/lib/cms";

// Roles that tell the page which question drives the data table below it.
// Any other question is informational only and does not change the table.
const TABLE_ROLES = [
  "ingredientType",
  "chemicalType",
  "registrationType",
  "foodUse",
];

const ROLE_DEFAULTS = {
  ingredientType: "active",
  chemicalType: "conventional",
  registrationType: "full",
  foodUse: "no",
};

// Where the flowchart answers are remembered (per browser tab), so coming back
// from a link / the browser's back button keeps what was selected.
const FLOW_STORAGE_KEY = "hab-research-requirements-flow";

// The saved selections are only used when the visitor is *returning* to the
// page (browser back/forward, or a reload). Landing on the page fresh - from
// the menu, a link, a new visit - always starts from the first box.
let lastPopstateAt = 0;
let pageMountedBefore = false;
if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    lastPopstateAt = Date.now();
  });
}
function isReturningToPage() {
  const firstMount = !pageMountedBefore;
  pageMountedBefore = true;
  const navType = performance.getEntriesByType("navigation")[0]?.type;
  const viaHistory = Date.now() - lastPopstateAt < 5000;
  const viaDocumentLoad =
    firstMount && (navType === "reload" || navType === "back_forward");
  return viaHistory || viaDocumentLoad;
}

const guidanceHtmlClass =
  "text-sm text-gray-800 [&_p+p]:mt-3 [&_a]:text-[color:var(--primary)] [&_a]:underline [&_a:visited]:text-[color:var(--primary)] [&_a:hover]:text-[color:var(--primary-darker)] [&_b]:text-black [&_strong]:text-black [&_ul]:list-disc [&_ul]:pl-5";

// Built-in questions, used until/unless the CMS provides its own.
function buildDefaultSteps(cms) {
  return [
    {
      id: "default-ingredient",
      title: "Type of Ingredient",
      helper: "Choose how the ingredient functions in the product.",
      role: "ingredientType",
      questionHtml: "What type of ingredient are you looking to register?",
      options: [
        {
          key: "active",
          label: "Active",
          heading: "Active Ingredient",
          isDefault: true,
          html:
            cms?.guidanceActiveText ||
            `<p class="text-gray-700">The primary component that performs the function of controlling, killing, or disrupting harmful algal blooms.</p>
<p><b>When to choose this:</b> If your product directly affects HABs through chemical or biological action.</p>
<p><b>Example:</b> Copper sulfate solution, peroxide-based bloom disruptor.</p>`,
        },
        {
          key: "enduse",
          label: "End-use",
          heading: "End-use Ingredient",
          html:
            cms?.guidanceEnduseText ||
            `<p class="text-gray-700">Substances that support the product's formulation or delivery but are not active in bloom control themselves.</p>
<p><b>When to choose this:</b> If your product only includes carriers, binders, or stabilizers.</p>
<p><b>Example:</b> Clay granules used to deliver active agents, inert materials with no direct impact on algae.</p>`,
        },
      ],
    },
    {
      id: "default-chemical",
      title: "Type of Chemical",
      helper: "Choose how the chemical functions in the product.",
      role: "chemicalType",
      questionHtml: "What type of product do you have?",
      options: [
        {
          key: "conventional",
          label: "Conventional",
          heading: "Conventional",
          isDefault: true,
          html: `<p>Conventional pesticides are all active ingredients other than biological pesticides and antimicrobial pesticides. Conventional active ingredients are generally produced synthetically, i.e., are synthetic chemicals that prevent, mitigate, destroy, or repel any pest; or that act as a plant growth regulator, desiccant, defoliant or nitrogen stabilizer.</p>
<p>Wood preservative and anti-foulant products that do not have antimicrobial uses and agricultural fungicide and aquatic herbicide products are either classified as a conventional or a biochemical pesticide. Biochemical pesticides with a toxic mode of action are classified for the purposes of the registration process as conventional pesticides. Learn more about <a href="/conventionalPesticide">Conventional Pesticides</a>.</p>`,
        },
        {
          key: "biochemical",
          label: "Biochemical",
          heading: "Biochemical",
          html: `<p>Naturally occurring substances that control pests by non-toxic mechanisms. Conventional pesticides, by contrast, are generally synthetic materials that directly kill or inactivate the pest. Because it is sometimes difficult to determine whether a substance meets the criteria for classification as a biochemical pesticide, EPA has established a special committee to make such decisions. Learn more about <a href="/biopesticideRegistration">Biochemical Pesticides</a>.</p>`,
        },
        {
          key: "microbial",
          label: "Microbial",
          heading: "Microbial",
          html: `<p>Consists of a microorganism (e.g., a bacterium, fungus, virus or protozoan) as the active ingredient. Microbial pesticides can control many different kinds of pests, although each separate active ingredient is relatively specific for its target pest(s). Learn more about <a href="/biopesticideRegistration">Microbial Pesticides</a>.</p>`,
        },
        {
          key: "minimalRisk",
          label: "Minimal Risk",
          heading: "Minimum risk",
          html: `<p>Minimum risk pesticide products, also referred to as 25(b) exempt products, are made of ingredients that pose little to no risk to human health or the environment. Pesticide products meeting the six conditions defined in 40 CFR 152.25(f) are exempt from the Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA) regulations. Products that claim to meet minimum risk conditions are generally not reviewed by the EPA. However, the producer must ensure that the product meets all exemption criteria to avoid FIFRA violations. Learn more about <a href="/minimumRiskPesticides">Minimum Risk Pesticides</a>.</p>`,
        },
      ],
    },
    {
      id: "default-registration",
      title: "Registration type",
      helper: "Select experimental vs full registration.",
      role: "registrationType",
      questionHtml: "What kind of registration are you pursuing?",
      options: [
        {
          key: "exp",
          label: "Experiment Use",
          heading: "Experimental Use",
          html: `<p>If your product is not currently registered or not registered for the proposed use, an Experimental Use Permit (EUP) can be obtained. Before EUP approval, the product must be registered with the EPA under experimental use. Learn more about <a href="/experimentalUse">Experimental Use</a>.</p>`,
        },
        {
          key: "full",
          label: "Full Registration",
          heading: "Full Registration",
          isDefault: true,
          html: `<p>For products that have undergone laboratory and field testing and have collected the necessary data to support EPA approval and FIFRA pesticide registration. Learn more about <a href="/pesticideRegistration">Pesticide Registration</a>.</p>`,
        },
      ],
    },
    {
      id: "default-food-use",
      title: "Food-Use?",
      helper: "EPA's mandate to consider this.",
      role: "foodUse",
      questionHtml: `Is your product considered a &ldquo;food-use&rdquo; product? Note that any product designed for use in marine environments that leaves a residue following use is considered a food-use product. See the <a href="/tolerances">Tolerances</a> page to learn more.`,
      options: [
        { key: "yes", label: "yes", heading: "", html: "" },
        { key: "no", label: "no", heading: "", html: "", isDefault: true },
      ],
    },
  ];
}

const firstValue = (value) => (Array.isArray(value) ? value[0] : value);

// Turns the CMS "researchQuestions" entries into the same shape as the defaults.
function normalizeQuestions(nodes = []) {
  return nodes
    .map((node) => {
      const fields = node.researchQuestionConnector || {};
      const role = firstValue(fields.tableRole);

      const options = (fields.options || [])
        .filter((option) => option?.optionLabel)
        .map((option) => ({
          key: String(option.optionKey || option.optionLabel).trim(),
          label: option.optionLabel,
          heading: option.optionPanelHeading || "",
          html: option.optionDescription || "",
          isDefault: !!option.isDefault,
        }));

      return {
        id: String(node.databaseId),
        title: node.title,
        helper: fields.boxHelperText || "",
        role: TABLE_ROLES.includes(role) ? role : null,
        questionHtml: fields.panelQuestion || "",
        options,
      };
    })
    .filter((step) => step.title && step.options.length > 0);
}

// The table only understands a fixed set of answers. Whatever the CMS option
// key / label looks like ("Minimal Risk", "minimum-risk", "Experimental Use",
// "Yes, food-use"...), map it to the value the table logic expects.
function canonicalTableValue(role, rawKey) {
  const text = String(rawKey ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  switch (role) {
    case "ingredientType":
      if (text.includes("end")) return "enduse";
      if (text.includes("active")) return "active";
      return text;
    case "chemicalType":
      if (text.includes("conv")) return "conventional";
      if (text.includes("biochem")) return "biochemical";
      if (text.includes("microb")) return "microbial";
      if (text.includes("min")) return "minimalRisk";
      return text;
    case "registrationType":
      if (text.includes("exp")) return "exp";
      if (text.includes("full")) return "full";
      return text;
    case "foodUse":
      if (text.startsWith("no") || text.includes("nonfood")) return "no";
      if (text.startsWith("y") || text.includes("food")) return "yes";
      return text;
    default:
      return text;
  }
}

// The option that is selected before the visitor chooses anything.
function getDefaultKey(step) {
  const flagged = step.options.find((option) => option.isDefault);
  if (flagged) return flagged.key;

  const roleDefault = ROLE_DEFAULTS[step.role];
  const matching = step.options.find(
    (option) => canonicalTableValue(step.role, option.key) === roleDefault,
  );
  if (matching) return matching.key;

  return step.options[0].key;
}

// Left-hand flowchart card with a minimize / expand arrow in the top right.
function StepCard({
  title,
  helper,
  collapsed,
  onToggle,
  onActivate,
  children,
}) {
  return (
    <div
      onClick={onActivate}
      className="w-full max-w-sm rounded-xl p-5 bg-white shadow-xs relative"
      style={{ border: "2px solid #005EA2" }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-gray-900 text-base">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{helper}</p>
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
          aria-expanded={!collapsed}
          aria-label={`${collapsed ? "Expand" : "Minimize"} ${title}`}
          className="-m-1 cursor-pointer p-1 text-xs text-gray-400 transition-colors hover:text-gray-700"
        >
          {collapsed ? "▼" : "▲"}
        </button>
      </div>
      {!collapsed && <div className="mt-4 flex flex-col gap-2">{children}</div>}
    </div>
  );
}

function OptionButton({ selected, onClick, className = "", children }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`w-full py-2 px-4 rounded-md text-sm text-left font-medium transition-all ${className} ${
        selected
          ? "bg-[#005EA2] text-white font-semibold shadow-sm"
          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}

// Every link on this page opens in a new tab, so the visitor never loses
// their selections. Applied once on the page wrapper, so it also covers links
// written in WordPress (question text, option text, section text, table rows).
// Skipped: in-page "#" anchors, mailto:/tel: links, and anything inside an
// element marked data-same-tab (the breadcrumb).
function openLinksInNewTab(event) {
  const anchor = event.target.closest?.("a[href]");
  if (!anchor || anchor.closest("[data-same-tab]")) return;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || /^(mailto|tel):/i.test(href)) return;
  anchor.setAttribute("target", "_blank");
  anchor.setAttribute("rel", "noopener noreferrer");
}

// Right-hand guidance panel pieces (the text can contain HTML, e.g. links).
function GuidanceQuestion({ html }) {
  return (
    <>
      <p className="text-green-800 font-bold text-sm uppercase tracking-wide mb-1">
        Question
      </p>
      <div
        className="font-bold text-gray-900 text-base mb-6 [&_a]:text-[color:var(--primary)] [&_a]:underline [&_a:visited]:text-[color:var(--primary)] [&_a:hover]:text-[color:var(--primary-darker)]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}

function GuidanceItem({ title, html, last = false }) {
  return (
    <div className={last ? "" : "mb-6 pb-6 border-b border-blue-200/70"}>
      <h4 className="font-bold text-base mb-2" style={{ color: "#005EA2" }}>
        {title}
      </h4>
      <div
        className={guidanceHtmlClass}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export default function ResearchRequirementsPage() {
  const [activeSection, setActiveSection] = useState("research-requirements");
  const [cms, setCms] = useState(null);

  // Flowchart questions: loaded from the CMS, with built-in defaults as a fallback.
  // `null` means the CMS request has not finished yet.
  const [cmsQuestionSteps, setCmsQuestionSteps] = useState(null);
  const steps = cmsQuestionSteps?.length
    ? cmsQuestionSteps
    : buildDefaultSteps(cms);

  // Progressive flowchart: boxes are revealed one after another, each box can
  // be minimized, and the right-hand panel follows the active box.
  const [answers, setAnswers] = useState({});
  const [revealedSteps, setRevealedSteps] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const [collapsedSteps, setCollapsedSteps] = useState({});
  const [flowRestored, setFlowRestored] = useState(false);
  const returningRef = useRef(null);

  const NO_DEFAULT_ROLES = ["ingredientType"];

  const getAnswer = (step) =>
    answers[step.id] ??
    (NO_DEFAULT_ROLES.includes(step.role) ? null : getDefaultKey(step));

  // Value of the question that drives the data table (falls back to the
  // default when the CMS has no question with that role).
  const getRoleValue = (role) => {
    const step = steps.find((item) => item.role === role);
    return step
      ? canonicalTableValue(role, getAnswer(step))
      : ROLE_DEFAULTS[role];
  };

  const ingredientType = getRoleValue("ingredientType");
  const chemicalType = getRoleValue("chemicalType");
  const registrationType = getRoleValue("registrationType");
  const foodUse = getRoleValue("foodUse");

  const selectOption = (index, step, key) => {
    setAnswers((prev) => ({ ...prev, [step.id]: key }));
    const nextIndex = Math.min(index + 1, steps.length - 1);
    setRevealedSteps((prev) => Math.max(prev, nextIndex + 1));
    setActiveStep(nextIndex);
  };

  const toggleStep = (index, step) => {
    const isCollapsed = !!collapsedSteps[step.id];
    setCollapsedSteps((prev) => ({ ...prev, [step.id]: !isCollapsed }));
    if (isCollapsed) setActiveStep(index);
  };

  const currentStep = steps[Math.min(activeStep, steps.length - 1)];
  const currentItems = currentStep.options.filter((option) => option.html);

  // Decide at mount time (not after the CMS answers) whether the visitor is
  // coming back to the page or landing on it fresh.
  useEffect(() => {
    if (returningRef.current === null) {
      returningRef.current = isReturningToPage();
    }
  }, []);

  // Restore the saved selections once the questions are known (so they can be
  // checked against the current CMS questions), then keep saving every change.
  useEffect(() => {
    if (cmsQuestionSteps === null || flowRestored) return;
    try {
      if (!returningRef.current) sessionStorage.removeItem(FLOW_STORAGE_KEY);
      const saved = returningRef.current
        ? JSON.parse(sessionStorage.getItem(FLOW_STORAGE_KEY) || "null")
        : null;
      if (saved && typeof saved === "object") {
        const validAnswers = {};
        steps.forEach((step) => {
          const key = saved.answers?.[step.id];
          if (step.options.some((option) => option.key === key)) {
            validAnswers[step.id] = key;
          }
        });
        const revealed = Math.min(
          Math.max(Number(saved.revealedSteps) || 1, 1),
          steps.length,
        );
        const validCollapsed = {};
        steps.forEach((step) => {
          if (saved.collapsedSteps?.[step.id]) validCollapsed[step.id] = true;
        });
        setAnswers(validAnswers);
        setRevealedSteps(revealed);
        setActiveStep(
          Math.min(Math.max(Number(saved.activeStep) || 0, 0), revealed - 1),
        );
        setCollapsedSteps(validCollapsed);
      }
    } catch {
      // storage unavailable or corrupted: start fresh
    }
    setFlowRestored(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cmsQuestionSteps]);

  useEffect(() => {
    if (!flowRestored) return;
    try {
      sessionStorage.setItem(
        FLOW_STORAGE_KEY,
        JSON.stringify({ answers, revealedSteps, activeStep, collapsedSteps }),
      );
    } catch {
      // ignore
    }
  }, [flowRestored, answers, revealedSteps, activeStep, collapsedSteps]);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const nodes = await getResearchQuestions();
        setCmsQuestionSteps(normalizeQuestions(nodes));
      } catch (err) {
        console.error("Error fetching research questions:", err);
        setCmsQuestionSteps([]);
      }
    }
    loadQuestions();
  }, []);

  useEffect(() => {
    async function loadCmsData() {
      try {
        const data = await getResearchRequirementsFields();
        if (data) setCms(data);
      } catch (err) {
        console.error("Error fetching CMS fields:", err);
      }
    }
    loadCmsData();
  }, []);

  const sections = [
    {
      id: "research-requirements",
      label: cms?.section1Title || "Research Requirements",
    },
    {
      id: "data-requirements",
      label: cms?.section2Title || "EPA Data Requirements Table",
    },
    {
      id: "test-guidelines",
      label:
        cms?.section3Title ||
        "Test Guidelines for Pesticide and Toxic Substances",
    },
    { id: "resources", label: cms?.resourcesTitle || "Resources" },
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll spy
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

  // Map selection state to CMS textarea fields
  const getTableRows = () => {
    const keyMap = {
      conventional: { exp: "convExpJson", full: "convFullJson" },
      biochemical: { exp: "bioExpJson", full: "bioFullJson" },
      microbial: { exp: "microExpJson", full: "microFullJson" },
      minimalRisk: { exp: "minExpJson", full: "minFullJson" },
    };

    const fieldName = keyMap[chemicalType]?.[registrationType];
    const rawJson = cms?.[fieldName];

    let rows = [];
    if (rawJson) {
      try {
        rows = JSON.parse(rawJson);
      } catch (e) {
        console.error(`Error parsing JSON for field [${fieldName}]:`, e);
      }
    }

    if (foodUse === "no") {
      return rows.filter((row) => !row.isFoodUse);
    }
    return rows;
  };

  const tableRows = getTableRows();

  // Group rows dynamically by category
  const groupedCategories = tableRows.reduce((acc, row) => {
    const cat = row.category || "General Requirements";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(row);
    return acc;
  }, {});

  return (
    <div className="px-20 py-10 tracking-wide" onClick={openLinksInNewTab}>
      {/* Breadcrumb */}
      <div
        data-same-tab
        className="flex flex-row items-center gap-2 text-sm text-gray-500 mb-8"
      >
        <svg
          className="usa-icon text-gray-500 w-4 h-4"
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
        <span className="text-gray-800">
          Research Requirements and Guidelines
        </span>
      </div>

      {/* Page Hero Title */}
      <InternalPageHero
        title={cms?.pageTitle ?? "Research Requirements and Guidelines"}
        subtitle={
          cms?.pageSubtitle ??
          "Key research guidelines and requirements for aquatic use pesticide registration"
        }
      />

      {/* Main Content Layout */}
      <div className="flex flex-row gap-10 mt-0 max-lg:flex-col">
        {/* Left Sticky Sidebar */}
        <div className="w-56 shrink-0 mt-10 max-lg:hidden">
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

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          {/* SECTION 1: Overview */}
          <div
            id="research-requirements"
            className="border-b-4 border-primary-lighter mt-10 pb-2"
          >
            <h1 className="text-primary font-bold text-2xl!">
              {cms?.section1Title ??
                "Research Requirements Based on Types of Harmful Algal Bloom Control Technologies"}
            </h1>

            {cms?.section1Body ? (
              <div
                className="mt-4 text-sm [&>p]:mb-3 [&>ol]:list-disc [&>ol]:pl-5 [&>ol]:space-y-2 [&_a]:text-[color:var(--primary)] [&_a]:underline [&_a:visited]:text-[color:var(--primary)] [&_a:hover]:text-[color:var(--primary-darker)] [&>*:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: cms.section1Body }}
              />
            ) : (
              <div className="mt-4 text-sm space-y-3">
                <p className="mb-8 text-sm">
                  EPA requires Good Laboratory Practices (GLPs), including:
                </p>
                <ol>
                  <li>
                    - Analytical confirmation of dose (typically HPLC data at
                    ppm level)
                  </li>
                  <li className="mt-5">
                    - Archiving of the original raw data and final reports
                  </li>
                  <li className="mt-5">
                    - Quality Assurance (QA) of the experiment and the report
                  </li>
                </ol>
                <span className="text-primary text-xl mt-10 inline-block ">
                  EPA test guidelines and recommended protocols for pesticides
                  and toxic substances can be found{" "}
                  <a
                    href="https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances"
                    className="text-underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>
                  .
                </span>
              </div>
            )}
          </div>

          {/* SECTION 2: Flowchart Selector */}
          <div
            id="data-requirements"
            className="border-b-4 border-primary-lighter text-lg pt-4 pb-10"
          >
            <h1 className="text-primary font-bold text-2xl!">
              {cms?.section2Title ??
                "Identify Data Requirements based on EPA Registration Type"}
            </h1>
            <div className="flex flex-row gap-2 mt-2 text-sm">
              <p className="font-bold">Link:</p>
              <a
                className="text-underline hover:text-primary break-all"
                href={
                  cms?.section2LinkUrl ||
                  "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-U/section-158.2060"
                }
                target="_blank"
                rel="noreferrer"
              >
                {cms?.section2LinkText ||
                  cms?.section2LinkUrl ||
                  "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-U/section-158.2060"}
              </a>
            </div>

            {/* Split Flowchart Layout Container */}
            <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg mt-6 max-lg:grid-cols-1 overflow-clip shadow-sm">
              {/* Left Side: Dot Grid Flowchart */}
              <div className="p-8 bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] flex flex-col items-center">
                {cmsQuestionSteps === null ? (
                  <p className="text-sm text-gray-500">Loading questions...</p>
                ) : (
                  steps.slice(0, revealedSteps).map((step, index) => (
                    <Fragment key={step.id}>
                      {index > 0 && (
                        <div className="w-0.5 h-8 bg-gray-300"></div>
                      )}
                      <StepCard
                        title={step.title}
                        helper={step.helper}
                        collapsed={!!collapsedSteps[step.id]}
                        onToggle={() => toggleStep(index, step)}
                        onActivate={() => setActiveStep(index)}
                      >
                        {step.options.map((option) => (
                          <OptionButton
                            key={option.key}
                            selected={getAnswer(step) === option.key}
                            onClick={() =>
                              selectOption(index, step, option.key)
                            }
                            className={
                              option.label === option.label.toLowerCase()
                                ? "capitalize"
                                : ""
                            }
                          >
                            {option.label}
                          </OptionButton>
                        ))}
                      </StepCard>
                    </Fragment>
                  ))
                )}
              </div>

              {/* Right Side: Persistent Guidance Panel */}
              <div className="p-8 bg-[#eaf4fc] border-l border-gray-200 flex flex-col justify-start">
                <div className="sticky top-28">
                  {/* Header Badge */}
                  <div
                    className="bg-white rounded-lg p-3 inline-flex items-center gap-3 w-fit shadow-2xs mb-6"
                    style={{ border: "1.5px solid #005EA2" }}
                  >
                    <div className="w-8 h-8 rounded-md bg-[#005EA2] flex items-center justify-center text-white text-sm">
                      💡
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">
                        Understand Your Choices
                      </h4>
                      <p className="text-xs text-gray-500">
                        Definitions, guidance, and examples.
                      </p>
                    </div>
                  </div>

                  {cmsQuestionSteps !== null && (
                    <>
                      <GuidanceQuestion html={currentStep.questionHtml} />

                      {currentItems.map((option, index) => (
                        <GuidanceItem
                          key={option.key}
                          title={`${index + 1}. ${option.heading || option.label}`}
                          html={option.html}
                          last={index === currentItems.length - 1}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Dynamic EPA Data Requirements Table */}
          <div
            id="test-guidelines"
            className="pt-4 pb-10 border-b-4 border-primary-lighter"
          >
            <div className="flex flex-row justify-between items-end mb-4 flex-wrap gap-2">
              <h1 className="text-primary font-bold text-lg!">
                {cms?.section3Title ??
                  "EPA Data Requirements for Development and Registration of Pesticide Active Ingredients"}
              </h1>

              {/* Number of table entries indicator */}
              <div className="bg-[#eaf4fc] text-[#005EA2] border border-[#005EA2]/30 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#005EA2]"></span>
                Total Requirements:{" "}
                <span className="text-gray-900 font-extrabold">
                  {tableRows.length}
                </span>
              </div>
            </div>

            {/* Valid HTML Table Structure */}
            <div className="mt-6 overflow-x-auto rounded border border-gray-300! border-t-2 border-b-2 border-l-2 border-r-2">
              <table className="w-full min-w-[700px] border-collapse text-sm text-black">
                <thead>
                  <tr>
                    <th
                      colSpan="2"
                      className="border-b border-r border-gray-200 px-6 py-4 text-center font-bold"
                    >
                      EPA Gldn No.
                    </th>
                    <th
                      colSpan="2"
                      className="border-b border-gray-200 px-6 py-4 text-left font-bold"
                    >
                      Selected Options:{" "}
                      <span className="capitalize text-primary">
                        {chemicalType}
                      </span>{" "}
                      ({ingredientType || "none selected"}) | Reg:{" "}
                      <span className="capitalize text-primary">
                        {registrationType === "full" ? "Full Reg" : "Exp Use"}
                      </span>{" "}
                      | Food-Use:{" "}
                      <span className="uppercase text-primary">{foodUse}</span>
                    </th>
                  </tr>
                  <tr className="bg-[#f0f6ff]">
                    <th className="border-b-2 px-6 py-3 text-center font-bold">
                      RD
                    </th>
                    <th className="border-b-2 border-r-gray-200! border-r-2 px-6 py-3 text-center font-bold">
                      BPPD
                    </th>
                    <th className="border-b-2 px-6 py-3 text-center font-bold">
                      EPA Guideline Name
                    </th>
                    <th className="border-b-2 px-6 py-3 text-center font-bold">
                      Requirement Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Object.keys(groupedCategories).length > 0 ? (
                    Object.entries(groupedCategories).map(
                      ([categoryName, rows]) => (
                        <Fragment key={categoryName}>
                          {/* Category Subheader */}
                          <tr>
                            <td
                              colSpan="4"
                              className="border-t px-6 py-3 text-center text-xs font-semibold uppercase border-b-2 border-gray-200"
                            >
                              {categoryName}
                            </td>
                          </tr>
                          {rows.map((row, idx) => (
                            <tr key={idx} className="border-b border-gray-100">
                              <td className="border-r border-gray-100 px-6 py-4 text-center">
                                {row.rd ? (
                                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                                    {row.rd}
                                  </span>
                                ) : null}
                              </td>
                              <td className="border-r border-gray-100 px-6 py-4 text-center">
                                {row.bppd ? (
                                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">
                                    {row.bppd}
                                  </span>
                                ) : null}
                              </td>
                              <td className="border-r border-gray-100 px-6 py-4 text-center">
                                {row.name}
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span
                                  className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                                    row.status?.startsWith("R")
                                      ? "bg-green-100 text-green-700"
                                      : row.status?.startsWith("CR")
                                        ? "bg-orange-100 text-orange-600"
                                        : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {row.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </Fragment>
                      ),
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-gray-500"
                      >
                        No data requirements found for this selection
                        combination.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 4: Resources Section */}
          <div
            id="resources"
            className="pt-4 pb-8 border-b-4 border-primary-lighter"
          >
            <h1 className="text-primary font-bold text-2xl!">
              {cms?.resourcesTitle ?? "Resources"}
            </h1>

            {cms?.resourcesBody ? (
              <div
                className="cms-rich mt-4 text-sm [&_p]:mb-3 [&_p]:mt-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 [&_li]:mt-2 [&_li]:mb-0 [&>*:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: cms.resourcesBody }}
              />
            ) : (
              <p className="mt-2 text-sm text-gray-600">
                Additional EPA regulatory guidance documents and testing
                guidelines.
              </p>
            )}
          </div>

          {/* Data Partners */}
          <p className="font-bold text-primary-darker text-center mt-20 text-sm">
            DATA PARTNERS
          </p>
          <div className="flex flex-row gap-30 items-center justify-center mt-5">
            <img
              src="/NOAA.svg"
              alt="NOAA"
              className="w-20 h-20 rounded-full object-contain"
            />
            <img
              src="/IMET.jpg"
              alt="IMET"
              className="w-20 h-20 rounded-full object-contain"
            />
            <img
              src="/MOTE.png"
              alt="Mote"
              className="w-20 h-20 rounded-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { getAllAgencyPosts, getAllGlossaryPosts } from "@/lib/cms";

// Add or edit pages and keywords here
const SEARCH_PAGES = [
  { title: "About", href: "/about", keywords: "about us team mission" },
  {
    title: "Funding Resources",
    href: "/fundingResources",
    keywords: "grants funding loi proposal",
  },
  {
    title: "HABs 101",
    href: "/habs101",
    keywords: "harmful algal blooms basics introduction",
  },
  { title: "FAQs", href: "/faq", keywords: "frequently asked questions help" },
  { title: "Glossary", href: "/glossary", keywords: "definitions terms" },
  {
    title: "Getting an Approval",
    href: "/gettingApproval",
    keywords: "product classification biological chemical physical",
  },
  {
    title: "Pesticide Registration",
    href: "/pesticideRegistration",
    keywords: "register epa application",
  },
  {
    title: "Biopesticide Registration",
    href: "/biopesticideRegistration",
    keywords: "biological biochemical microbial",
  },
  {
    title: "Conventional Pesticide",
    href: "/conventionalPesticide",
    keywords: "chemical registration",
  },
  {
    title: "Minimum Risk Pesticides",
    href: "/minimumRiskPesticides",
    keywords: "25b exempt",
  },
  {
    title: "Experimental Use",
    href: "/experimentalUse",
    keywords: "eup field studies permit",
  },
  {
    title: "Physical Devices",
    href: "/physicalDevices",
    keywords: "ultrasonic nanobubble ozone devices",
  },
  {
    title: "Good Laboratory Practices",
    href: "/goodLaboratoryPractices",
    keywords: "glp laboratory",
  },
  {
    title: "Research Requirements",
    href: "/researchRequirements",
    keywords: "data requirements studies",
  },
  { title: "Tolerances", href: "/tolerances", keywords: "residue ffdca" },
  {
    title: "Labeling Information",
    href: "/labelingInfoPage",
    keywords: "label labeling",
  },
  {
    title: "Registered Products",
    href: "/registeredProducts",
    keywords: "products list",
  },
  {
    title: "Regulations Directory",
    href: "/regulationsDirectory",
    keywords: "agencies epa usace fws noaa nmfs",
  },
  {
    title: "State Policies and Permits",
    href: "/statePoliciesandPermits",
    keywords: "state regulations map permits",
  },
  {
    title: "Control Technologies",
    href: "/controlTechnologies",
    keywords: "strategies control methods",
  },
  {
    title: "External Resources",
    href: "/externalResources",
    keywords: "links resources",
  },
  {
    title: "Literature Search",
    href: "/literatureSearch",
    keywords: "papers research",
  },
  { title: "Patent Search", href: "/patentSearch", keywords: "patents" },
  {
    title: "Privacy Policy",
    href: "/privacyPolicy",
    keywords: "privacy data cookies",
  },
];

function stripHtml(html) {
  return (html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function matches(query, ...fields) {
  const q = query.toLowerCase();
  return fields.some((field) => (field || "").toLowerCase().includes(q));
}

function ResultGroup({ title, items }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="text-primary font-bold text-xl">{title}</h2>
      <ul className="mt-3 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-primary underline font-semibold"
            >
              {item.title}
            </Link>
            {item.snippet && (
              <p className="text-sm text-gray-700 mt-1">{item.snippet}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function SearchPage({ searchParams }) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  const [agencies, glossary] = await Promise.all([
    getAllAgencyPosts(),
    getAllGlossaryPosts(),
  ]);

  const pageResults = query
    ? SEARCH_PAGES.filter((p) => matches(query, p.title, p.keywords)).map(
        (p) => ({
          title: p.title,
          href: p.href,
        }),
      )
    : [];

  const agencyResults = query
    ? agencies
        .filter((a) => {
          const c = a.agencyInternalConnector || {};
          return matches(
            query,
            a.title,
            stripHtml(c.cardDescription),
            stripHtml(c.backgroundText),
          );
        })
        .map((a) => ({
          title: a.title,
          href: `/agency/${a.databaseId}`,
          snippet: stripHtml(
            a.agencyInternalConnector?.cardDescription || "",
          ).slice(0, 160),
        }))
    : [];

  const glossaryResults = query
    ? glossary
        .filter((g) => matches(query, g.term, stripHtml(g.content)))
        .map((g) => ({
          title: g.term,
          href: `/glossary#${slugify(g.term)}`,
          snippet: stripHtml(g.content).slice(0, 160),
        }))
    : [];

  const total =
    pageResults.length + agencyResults.length + glossaryResults.length;

  return (
    <div className="px-4 py-10 tracking-wide sm:px-10 lg:px-20">
      <h1 className="text-primary font-bold">Search results</h1>

      {!query ? (
        <p className="mt-4">Type something in the search box to get started.</p>
      ) : (
        <p className="mt-4">
          {total} {total === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
        </p>
      )}

      <ResultGroup title="Pages" items={pageResults} />
      <ResultGroup title="Agencies and laws" items={agencyResults} />
      <ResultGroup title="Glossary" items={glossaryResults} />

      {query && total === 0 && (
        <p className="mt-6 text-gray-700">
          No matches found. Try a different word, or browse the{" "}
          <Link href="/glossary" className="text-primary underline">
            glossary
          </Link>
          .
        </p>
      )}
    </div>
  );
}

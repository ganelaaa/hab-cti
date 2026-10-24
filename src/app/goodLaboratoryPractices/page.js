"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "data-requiring-glp", label: "Data requiring GLP compliance" },
  {
    id: "additional-information-required",
    label: "Additional Information required when submitting GLP-compliant data",
  },
  { id: "data-exempt", label: "Data Exempt from GLP compliance" },
  { id: "additional-resources", label: "Additional Resources" },
  { id: "questions", label: "Questions about Good Laboratory Practices?" },
];

const externalLinks = {
  heroLink:
    "https://www.epa.gov/compliance/good-laboratory-practices-standards-compliance-monitoring-program",
  cfr: "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-160",
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

function MailLink({ email, children }) {
  return (
    <a href={`mailto:${email}`} className="text-primary text-underline">
      {children || email}
    </a>
  );
}

export default function GoodLaboratoryPracticesPage() {
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

        <span className="text-gray-800">Good Laboratory Practices</span>
      </div>

      {/* Page Hero Title */}
      <InternalPageHero
        title="Good Laboratory Practices"
        subtitle="Compliance"
        link={externalLinks.heroLink}
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
          <p className="mt-10">
            The information presented on this webpage was collected from{" "}
            <a
              className="text-underline text-primary"
              href="https://www.govinfo.gov/content/pkg/CFR-2011-title40-vol24/xml/CFR-2011-title40-vol24-part160.xml"
            >
              40 CFR Part 160
            </a>
            , unless otherwise specified. For more details, please visit the
            agency’s website. For a full list of contact information for
            individuals, offices, and topics, visit the{" "}
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
                Good laboratory practice (GLP) standards ensure the quality and
                integrity of data submitted to the government for regulatory
                decisions. The GLP standards include, but are not limited to,
                logs of equipment maintenance and calibration, reagent use and
                storage, personnel qualifications and training, quality
                assurance investigations and reports, and adherence to
                respective standard operating procedures (SOP) for all
                laboratory activities. Data collected to support FIFRA product
                registration must follow GLPs as defined in{" "}
                <ExternalLink href={externalLinks.cfr}>
                  40 CFR Part 160
                </ExternalLink>
                .
              </p>
            </div>
          </div>

          {/* data requiring glp compliance */}
          <div
            id="data-requiring-glp"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              <a
                className="text-underline text-primary hover:text-primary-darker"
                href="/pesticideRegistration"
              >
                Pesticide Registration
              </a>{" "}
              Data requiring GLP compliance
            </h1>

            <div className="mb-8 text-lg">
              <ul className="ml-6 list-disc">
                <li>
                  <a
                    className="text-underline text-primary"
                    href="/toxicologyData"
                  >
                    Toxicology
                  </a>
                </li>
                <li className="mt-3">Environmental fate</li>
                <li className="mt-3">Ecological effects</li>
                <li className="mt-3">Residue chemistry</li>
                <li className="mt-3">Product efficacy</li>
                <li className="mt-3">Product chemistry</li>
                <li className="mt-3">Physical and chemical properties</li>
              </ul>
            </div>
          </div>

          {/* additional information required */}
          <div
            id="additional-information-required"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              Additional Information required when submitting GLP-compliant data
            </h1>

            <div className="mb-8 text-lg">
              <ul className="ml-6 list-disc">
                <li>
                  Statement of Compliance signed by the study director and
                  registrant (study director and registrant may be the same
                  individual)
                </li>
                <li className="mt-3">
                  Quality Assurance Statement signed by the quality assurance
                  unit, listing study inspection dates and reports
                </li>
                <li className="mt-3">Facility information</li>
                <li className="mt-3">
                  Personnel details, qualifications, training, and job
                  descriptions
                </li>
                <li className="mt-3">Substance characterization</li>
                <li className="mt-3">
                  SOP and protocol lists, including all amendments and
                  deviations from SOPs
                </li>
                <li className="mt-3">
                  Logs of equipment maintenance and calibration
                </li>
              </ul>
            </div>
          </div>

          {/* data exempt */}
          <div
            id="data-exempt"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">
              Data Exempt from GLP compliance
            </h1>

            <div className="mb-8 text-lg">
              <ul className="ml-6 list-disc">
                <li>Basic exploratory research</li>
                <li className="mt-3">Screening tests</li>
                <li className="mt-3">
                  <a
                    className="text-underline text-primary"
                    href="/minimumRiskPesticides"
                  >
                    Minimum risk pesticides
                  </a>
                </li>
              </ul>
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
                  <a
                    className="text-primary text-underline"
                    href="https://www.epa.gov/compliance/resources-and-guidance-documents-compliance-monitoring#cwa"
                  >
                    Compliance Monitoring Resources and Guidance Documents
                  </a>
                </li>
                <li className="mt-3">
                  Compliance Assurance Program
                  <ul className="mt-2 ml-6 list-disc">
                    <li>
                      <a
                        className="text-primary text-underline"
                        href="https://www.epa.gov/compliance/compliance-assistance-centers"
                      >
                        Compliance Assistance Centers
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-primary text-underline"
                        href="https://www.epa.gov/compliance/resources-and-guidance-documents-compliance-assistance"
                      >
                        Resources and Guidance Documents for Compliance
                        Assistance
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    className="text-primary text-underline"
                    href="https://www.epa.gov/compliance/guidance-federal-insecticide-fungicide-and-rodenticide-act-fifra-inspection-manual"
                  >
                    FIFRA Inspection Manual
                  </a>
                </li>
                <li>
                  <a
                    className="text-primary text-underline"
                    href="https://www.epa.gov/compliance/epa-good-laboratory-practices-inspections"
                  >
                    List of laboratories that have undergone EPA’s Good
                    Laboratory Practices Inspections
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* questions */}
          <div id="questions" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Questions about Good Laboratory Practices?
            </h1>

            <div className="mb-8 text-lg">
              <p>
                <b>General Good Laboratory Practice Questions</b>
              </p>
              <p>
                Email:{" "}
                <a
                  className="text-primary text-underline"
                  href="mailto:GLP@epa.gov"
                >
                  GLP@epa.gov
                </a>
              </p>

              <p className="mt-5">
                <b>Regional EPA Office Contacts</b>
              </p>
              <p>
                Contact your{" "}
                <a
                  className="text-primary text-underline"
                  href="https://www.epa.gov/aboutepa/regional-and-geographic-offices"
                >
                  regional EPA office
                </a>
              </p>

              <p className="mt-5">
                <b>EPA Contacts</b>
              </p>
              <p>
                For a full list of contact emails for individuals, offices, and
                topics, visit the{" "}
                <a
                  className="text-primary text-underline"
                  href="https://www.epa.gov/pesticide-contacts/contacting-epa-about-regulating-pesticides-issues"
                >
                  EPA’s Pesticide Contacts Page
                </a>
                .{" "}
              </p>

              <p className="mt-10">
                The information presented on this webpage was collected from{" "}
                <a
                  className="text-primary text-underline"
                  href="https://www.govinfo.gov/content/pkg/CFR-2011-title40-vol24/xml/CFR-2011-title40-vol24-part160.xml"
                >
                  40 CFR Part 160
                </a>
                , unless otherwise specified. For more details, please visit the
                agency’s website.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Fragment, useEffect, useState } from "react";

const sections = [
  {
    id: "grant-information",
    label: "US HAB-CTI Grant Information",
  },
  {
    id: "review-process",
    label: "2025 Notice of Funding and Review Process",
  },
  {
    id: "resources",
    label: "Resources",
  },
  {
    id: "other-funding-opportunities",
    label: "Other Funding Opportunities",
  },
];

const tierCards = [
  {
    tier: "Tier 1",
    title: "Lab Experiments & Literature Search",
    image: "/funding-tier-1.png",
    bullets: [
      "Effects on the Cells and Toxins in the Lab",
      "Previous Uses Worldwide",
      "Existing Regulatory Approvals",
    ],
  },
  {
    tier: "Tier 2",
    title: "Mesocosms, Raceways, Collaborations",
    image: "/funding-tier-2.png",
    bullets: [
      "Effective with Natural Communities",
      "Ecological Impacts",
      "Human Health Concerns",
      "Logistical Issues",
      "Economically Feasible",
    ],
  },
  {
    tier: "Tier 3",
    title: "Canals/Marinas, Nearshore, Offshore",
    image: "/funding-tier-3.png",
    bullets: [
      "Pilot Studies",
      "Field Demonstrations",
      "Federal/State/Local Regulatory Approvals",
      "Engineering Needed",
      "Public Interactions",
    ],
  },
  {
    tier: "Tier 4",
    title: "Commercialism Monitor",
    image: "/funding-tier-4.png",
    bullets: [
      "Customers",
      "Intellectual Property",
      "Efficiency Scaling",
      "State/Local Budgets",
      "Deployment Contractors",
    ],
  },
];

const fundingOpportunities = [
  {
    title: "NOAA NCCOS PCMHAB",
    href: "https://coastalscience.noaa.gov/science-areas/habs/pcmhab/",
    description:
      "This funding opportunity focuses on supporting research initiatives aimed at advancing the understanding and management of harmful algal blooms (HABs) in coastal and marine environments. It offers funding to projects that address the ecological, economic, and societal impacts of HABs.",
  },
  {
    title: "USACE ERDC HAB Technology Demonstration Program",
    href: "https://www.erdcwerx.org/harmful-algal-bloom-demonstration-program/",
    description:
      "This program supports the development and demonstration of new technologies to detect, predict, and manage harmful algal blooms. It is aimed at fostering innovations that enhance HAB mitigation strategies for freshwater and marine ecosystems.",
  },
  {
    title:
      "USACE Freshwater Harmful Algal Bloom Research and Development Initiative",
    href: "https://ansrp.el.erdc.dren.mil/HAB.html",
    description:
      "This initiative funds projects that investigate the causes, effects, and management of freshwater harmful algal blooms. It focuses on improving scientific understanding and creating effective response tools for preventing and controlling HABs in freshwater systems.",
  },
  {
    title: "FFWCC",
    href: "https://myfwc.com/research/redtide/taskforce/grant/",
    description:
      "The Florida Fish and Wildlife Conservation Commission offers funding for research projects that aim to conserve and protect Florida’s fish, wildlife, and habitats. This funding supports initiatives focused on managing natural resources, preserving biodiversity, and responding to ecological challenges.",
  },
  {
    title: "USGS Water Resources Research Act Program",
    href: "https://www.usgs.gov/programs/water-resources-research-act-program",
    description:
      "This program funds research projects that address critical water resource challenges in the United States. The goal is to support scientific studies that improve the understanding and management of the nation’s water systems, focusing on quality, availability, and sustainability.",
  },
  {
    title: "USGS HABs Matching Funds",
    href: "https://www.usgs.gov/programs/national-water-quality-program/harmful-algal-bloom-funds",
    description:
      "This funding opportunity helps support projects related to harmful algal bloom research and management. It provides matching funds for efforts that aim to improve detection, prediction, and mitigation of HABs, with a particular focus on freshwater ecosystems.",
  },
  {
    title: "Florida Red Tide Mitigation and Technology Development Initiative",
    href: "https://mote.org/research/centers-of-excellence/red-tide-initiative/",
    description:
      "This initiative focuses on developing and implementing technologies to mitigate the impact of red tide in Florida’s coastal waters. It supports innovative approaches to managing red tide events, protecting marine life, and reducing the negative effects on local communities.",
  },
];

function ExternalIcon() {
  return (
    <svg
      className="inline-block w-3 h-3 ml-1.5 mb-1"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M7.5 4.5H5.25C4.01 4.5 3 5.51 3 6.75v8C3 15.99 4.01 17 5.25 17h8c1.24 0 2.25-1.01 2.25-2.25V12.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M11 3h6v6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m9 11 7.25-7.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FundingResources() {
  const [activeSection, setActiveSection] = useState("grant-information");
  const [activeResource, setActiveResource] = useState("recording");

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 88;
    const elementTop = el.getBoundingClientRect().top + window.scrollY;
    const targetTop = elementTop - headerOffset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const checkPoint = 110;

      for (const section of sections) {
        const el = document.getElementById(section.id);

        if (el) {
          const rect = el.getBoundingClientRect();

          if (rect.top <= checkPoint && rect.bottom >= checkPoint) {
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
    <div className="tracking-wide px-20">
      {/* link to go back to home */}
      <div className="flex flex-row mt-5 font-light">
        <div className="flex flex-row items-center hover:scale-105 transition-all duration-300 cursor-pointer w-fit">
          <svg
            className="usa-icon text-gray-500"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use href="/assets/img/sprite.svg#arrow_back"></use>
          </svg>
          <a className="text-black ml-2 text-sm relative group" href="/">
            Funding Resources
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-700" />
          </a>
        </div>
      </div>

      {/* Hero */}
      <div className="relative text-white mt-4 overflow-hidden h-75 rounded-lg">
        <div
          className="absolute inset-0 bg-cover bg-center kenburns-loop"
          style={{ backgroundImage: "url('/fundingHero.png')" }}
        />

        <div className="absolute inset-0 bg-black opacity-65 z-0" />

        <div className="relative z-10 py-16 px-1 text-center mt-7">
          <h1 className="!text-5xl font-bold !mb-0 !mt-3">
            Funding Opportunities
          </h1>

          <p className="text-lg !mt-3 text-gray-200">
            A repository of available grants and funding options
          </p>

          <p className="text-lg !mt-0 text-gray-200">for your research.</p>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-row gap-10 mt-0 max-lg:flex-col">
        {/* Left scroll nav */}
        <div className="w-56 shrink-0 mt-8 max-lg:hidden">
          <div className="sticky top-24">
            <p className="font-bold text-black mb-3">On this page</p>

            <div className="border-l-2 border-gray-200 flex flex-col">
              {sections.map((section) => (
                <p
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`pl-4 py-2 text-sm cursor-pointer transition-colors duration-200 hover:text-primary ${activeSection === section.id
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

        <div className="flex-1 min-w-0">
          {/* Grant Information */}
          <div
            id="grant-information"
            className="border-b-4 border-primary-lighter pt-8 pb-7 scroll-mt-24"
          >
            <h1 className="text-primary font-bold !mt-0">
              US HAB-CTI Grant Information
            </h1>

            <p className="mb-6 text-lg !mt-0">
              One of the objectives of the US HAB-CTI is to fund extramural proof of concept, innovative HAB control tools and technology projects to assess their real-world feasibility.  It is anticipated that US HAB-CTI research will primarily be conducted in the scale of "Tier 1" (small scale lab testing) or "Tier 2" (tanks, mesocosms, and raceways). Promising US HAB-CTI tools and technologies will be encouraged to apply to relevant future NOAA Prevention Control and Mitigation HAB competitive funding announcements or other opportunities independent from the US HAB-CTI (shown as "Tier 3" and "Tier 4" in image).
            </p>
          </div>

          {/* Tier Timeline */}
          <div className="border-b-4 border-primary-lighter py-8">
            <div className="w-full">
              <div className="flex flex-row justify-center items-center gap-28 max-md:gap-8">
                <img
                  src="/partner-noaa.png"
                  alt="NOAA"
                  className="w-24 h-20 object-contain max-md:w-16"
                />

                <img
                  src="/partner-imet.png"
                  alt="University of Maryland Center for Environmental Science"
                  className="w-44 h-20 object-contain max-md:w-24"
                />

                <img
                  src="/partner-mote.png"
                  alt="Mote Marine Laboratory"
                  className="w-24 h-20 object-contain max-md:w-16"
                />
              </div>

              <h1 className="text-black font-extrabold text-center leading-tight mt-6 !mb-0">
                US Harmful Algal Bloom - Control Technologies Incubator
                Clearinghouse
              </h1>

              <div className="mt-6 overflow-x-auto pb-2">
                <div className="w-full min-w-[940px] bg-[#e7f3fc] px-8 py-6">
                  {/* Funding labels */}
                  <div className="grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)_36px_minmax(0,1fr)_36px_minmax(0,1fr)] items-center mb-4">
                    <div className="col-start-1 col-end-4 flex items-center gap-3">
                      <span className="h-px bg-black flex-1" />
                      <p className="text-[12px] font-bold text-black whitespace-nowrap !m-0">
                        Incubator Funding
                      </p>
                      <span className="h-px bg-black flex-1" />
                    </div>

                    <div className="col-start-5 col-end-8 flex items-center gap-3">
                      <span className="h-px bg-black flex-1" />
                      <p className="text-[12px] font-bold text-black whitespace-nowrap !m-0">
                        Other Funding
                      </p>
                      <span className="h-px bg-black flex-1" />
                    </div>
                  </div>

                  {/* Tier cards */}
                  <div className="grid grid-cols-[minmax(0,1fr)_36px_minmax(0,1fr)_36px_minmax(0,1fr)_36px_minmax(0,1fr)] items-stretch">
                    {tierCards.map((card, index) => (
                      <Fragment key={card.tier}>
                        <article className="bg-white rounded-md min-h-[320px] px-4 py-5 flex flex-col">
                          <h2 className="text-center text-black font-extrabold text-xl !m-0">
                            {card.tier}
                          </h2>

                          <p className="text-center text-black text-xs font-bold leading-snug mt-3 min-h-[42px] !mb-0">
                            {card.title}
                          </p>

                          <div
                            className="w-[180px] h-[100px] mx-auto mt-2 bg-gray-200 bg-cover bg-center"
                            style={{ backgroundImage: `url('${card.image}')` }}
                            role="img"
                            aria-label={card.title}
                          />

                          <ul className="list-disc pl-4 mt-4 text-[12px] text-black font-medium leading-snug space-y-1 !mb-0">
                            {card.bullets.map((bullet) => (
                              <li key={bullet}>{bullet}</li>
                            ))}
                          </ul>
                        </article>

                        {index < tierCards.length - 1 && (
                          <span
                            className="flex items-center justify-center text-black text-xl font-bold"
                            aria-hidden="true"
                          >
                            →
                          </span>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Process */}
          <div
            id="review-process"
            className="border-b-4 border-primary-lighter py-8 scroll-mt-24"
          >
            <h1 className="text-primary font-bold">
              2025 Notice of Funding and Review Process
            </h1>

            <p className="text-primary font-bold text-xl !mt-1">
              US HAB-CTI Application
            </p>

            <div className="border-1 border-primary bg-[#dceefa] rounded-sm mt-3 p-6">
              <h2 className="text-lg font-bold text-gray-900 !m-0">
                Letter of Intent (LOI) Submission
              </h2>

              <div className="border-t border-gray-500/50 mt-5 mb-5" />

              <div className="grid grid-cols-3 gap-7 max-md:grid-cols-1">
                <div>
                  <p className="text-sm font-bold underline text-gray-700 !m-0">
                    LOI Deadline
                  </p>

                  <p className="text-sm font-extrabold text-gray-800 mt-1 !mb-0">
                    December 9, 2024
                  </p>

                  <p className="text-sm font-semibold text-gray-600 !m-0">
                    Required to submit full proposal
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold underline text-gray-700 !m-0">
                    Full Proposal Deadline
                  </p>

                  <p className="text-sm font-extrabold text-gray-800 mt-1 !mb-0">
                    March 3, 2025
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold underline text-gray-700 !m-0">
                    Submit LOI via Email
                  </p>

                  <a
                    href="mailto:ushabcti@umces.edu"
                    className="block text-primary text-base font-extrabold mt-1 hover:underline"
                  >
                    ushabcti@umces.edu
                  </a>
                </div>
              </div>

              <a
                href="#"
                className="mt-6 h-10 bg-primary hover:bg-primary-darker text-white text-sm font-bold rounded flex items-center justify-center gap-2"
              >
                Apply Now <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Resources */}
          <div
            id="resources"
            className="border-b-4 border-primary-lighter py-8 scroll-mt-24"
          >
            <h1 className="text-primary font-bold">Resources</h1>

            <div className="bg-[#e9f3fd] rounded-xl p-3 mt-4">
              <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
                <button
                  type="button"
                  onClick={() => setActiveResource("recording")}
                  className={`h-10 rounded text-sm font-bold flex items-center justify-center text-center px-3 transition-all ${activeResource === "recording"
                    ? "bg-primary text-white"
                    : "bg-transparent text-primary hover:bg-white/70"
                    }`}
                >
                  2025 Informational Webinar Recording
                </button>

                <button
                  type="button"
                  onClick={() => setActiveResource("slides")}
                  className={`h-10 rounded text-sm font-bold flex items-center justify-center text-center px-3 transition-all ${activeResource === "slides"
                    ? "bg-primary text-white"
                    : "bg-transparent text-primary hover:bg-white/70"
                    }`}
                >
                  2025 Informational Webinar Slides
                </button>
              </div>

              {activeResource === "recording" ? (
                <a
                  href="/funding-webinar-video.mp4"
                  className="relative block aspect-video bg-[#06483f] rounded-lg overflow-hidden mt-3 group"
                  aria-label="Open 2025 informational webinar recording"
                >
                  <img
                    src="/funding-webinar-poster.png"
                    alt="2025 informational webinar recording"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  />

                  <div className="absolute inset-0 bg-[#06483f]/20" />

                  <div className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white flex items-center justify-center text-white text-xl pl-1">
                    ▶
                  </div>
                </a>
              ) : (
                <div className="mt-3 min-h-[320px] rounded-lg bg-white flex flex-col items-center justify-center text-center px-6">
                  <h2 className="text-primary font-bold text-xl !m-0">
                    2025 Informational Webinar Slides
                  </h2>

                  <p className="text-lg text-gray-700 mt-3 max-w-md !mb-0">
                    Open the slide deck for the 2025 informational webinar.
                  </p>

                  <a
                    href="/funding-webinar-slides.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary text-lg font-bold underline underline-offset-2 mt-5"
                  >
                    Open Webinar Slides
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Other Funding Opportunities */}
          <div
            id="other-funding-opportunities"
            className="border-b-4 border-primary-lighter py-8 scroll-mt-24"
          >
            <h1 className="text-primary font-bold">
              Other Funding Opportunities
            </h1>

            <div className="flex flex-col gap-5 mt-5">
              {fundingOpportunities.map((item) => (
                <article key={item.title}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary text-lg font-bold underline underline-offset-2 hover:text-primary-darker"
                  >
                    {item.title}
                    <ExternalIcon />
                  </a>

                  <p className="text-lg mt-1.5 !mb-0">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Data Partners */}
          <div className="py-8 text-center">
            <p className="uppercase text-primary text-xs font-extrabold tracking-widest !m-0">
              Data Partners
            </p>

            <div className="flex flex-row justify-center items-center gap-28 mt-7 max-md:gap-10">
              <img
                src="/partner-noaa.png"
                alt="NOAA"
                className="w-24 h-12 object-contain max-md:w-16"
              />

              <img
                src="/partner-imet.png"
                alt="IMET"
                className="w-32 h-12 object-contain max-md:w-20"
              />

              <img
                src="/partner-mote.png"
                alt="Mote Marine Laboratory"
                className="w-32 h-12 object-contain max-md:w-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
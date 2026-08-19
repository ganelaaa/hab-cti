"use client";

import Link from "next/link";
import React, { use, useEffect, useMemo, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";
import {
  getRegulationsDirectoryFields,
  getStateLinkDetails,
} from "@/lib/cms";

const PAGE_CONFIG = {
  "link-a": {
    fallbackLabel: "Link A",
  },

  "link-b": {
    fallbackLabel: "Link B",
  },
};

function makeSectionId(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function DynamicStateResourcePage({
  params: paramsPromise,
}) {
  const params = use(paramsPromise);

  const pageConfig = PAGE_CONFIG[params.pageType];

  const [stateRecord, setStateRecord] = useState(null);
  const [directoryFields, setDirectoryFields] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    async function loadData() {
      if (!pageConfig) {
        setLoading(false);
        return;
      }

      const [stateData, directoryData] = await Promise.all([
        getStateLinkDetails(
          params.stateName,
          params.pageType
        ),
        getRegulationsDirectoryFields(),
      ]);

      setStateRecord(stateData);
      setDirectoryFields(directoryData);
      setLoading(false);
    }

    loadData();
  }, [
    params.stateName,
    params.pageType,
    pageConfig,
  ]);

  /*
   * The CMS helper aliases linkAPage / linkBPage
   * to pageFields.
   */
  const fields =
    stateRecord?.stateRegulationsConnector?.pageFields || {};

  const rawSections = useMemo(
    () => [
      {
        title: fields.section01Title,
        content: fields.section01Text,
      },
      {
        title: fields.section02Title,
        content: fields.section02Text,
      },
      {
        title: fields.section03Title,
        content: fields.section03Text,
      },
      {
        title: fields.section04Title,
        content: fields.section04Text,
      },
      {
        title: fields.section05Title,
        content: fields.section05Text,
      },
      {
        title: fields.section06Title,
        content: fields.section06Text,
      },
      {
        title: fields.section07Title,
        content: fields.section07Text,
      },
      {
        title: fields.section08Title,
        content: fields.section08Text,
      },
      {
        title: fields.section09Title,
        content: fields.section09Text,
      },
    ],
    [fields]
  );

  /*
   * Only sections with a title are displayed.
   */
  const activeDynamicSections = useMemo(
    () =>
      rawSections.filter(
        (section) => section.title
      ),
    [rawSections]
  );

  /*
   * Sidebar navigation.
   */
  const menuSections = useMemo(() => {
    const sections = [];

    if (fields.introText) {
      sections.push({
        id: "overview",
        label: "Overview",
      });
    }

    activeDynamicSections.forEach((section) => {
      sections.push({
        id: makeSectionId(section.title),
        label: section.title,
      });
    });

    return sections;
  }, [
    fields.introText,
    activeDynamicSections,
  ]);

  /*
   * Scroll spy.
   */
  useEffect(() => {
    if (menuSections.length === 0) {
      return;
    }

    const handleScroll = () => {
      for (const section of menuSections) {
        const element = document.getElementById(
          section.id
        );

        if (!element) {
          continue;
        }

        const rect =
          element.getBoundingClientRect();

        if (
          rect.top <= 150 &&
          rect.bottom >= 150
        ) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [menuSections]);

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

    window.history.pushState(
      null,
      "",
      `#${id}`
    );
  };

  if (loading) {
    return (
      <div className="p-20 text-center text-gray-500">
        Loading regulatory framework...
      </div>
    );
  }

  /*
   * Invalid page type.
   */
  if (!pageConfig) {
    return (
      <div className="px-4 py-10 tracking-wide sm:px-10 lg:px-20">
        <InternalPageHero
          title="Page not found"
          subtitle="The requested state resource page does not exist."
        />

        <div className="mt-10 text-center">
          <Link
            href="/regulationsDirectory"
            className="text-sm font-semibold text-primary underline"
          >
            Return to Regulations Directory
          </Link>
        </div>
      </div>
    );
  }

  const pageLabel =
    params.pageType === "link-a"
      ? directoryFields?.linkALabel ||
        pageConfig.fallbackLabel
      : directoryFields?.linkBLabel ||
        pageConfig.fallbackLabel;

  const displayStateName =
    stateRecord?.title ||
    params.stateName
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");

  /*
   * If any WordPress field contains data,
   * the page is considered populated.
   */
  const hasPageContent =
    Object.values(fields).some(Boolean);

  /*
   * Under-development page.
   */
  if (!stateRecord || !hasPageContent) {
    return (
      <div className="px-4 py-10 tracking-wide sm:px-10 lg:px-20">
        <div className="mb-8 flex flex-row flex-wrap items-center gap-2 text-sm text-gray-500">
          <svg
            className="usa-icon h-4 w-4 text-gray-500"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use href="/assets/img/sprite.svg#arrow_back"></use>
          </svg>

          <Link
            href="/"
            className="text-primary hover:underline"
          >
            Home
          </Link>

          <span>›</span>

          <span className="text-primary">
            Laws and Permits
          </span>

          <span>›</span>

          <Link
            href="/regulationsDirectory"
            className="text-primary hover:underline"
          >
            Regulations Directory
          </Link>

          <span>›</span>

          <span className="text-gray-800">
            {displayStateName}
          </span>

          <span>›</span>

          <span className="text-gray-800">
            {pageLabel}
          </span>
        </div>

        <InternalPageHero
          title={displayStateName}
          subtitle={`${pageLabel} is currently under development`}
        />

        <div className="mb-8 mt-10 text-center">
          <p className="mt-2 text-lg text-gray-600">
            Please check back soon!
          </p>

          <Link
            href="/regulationsDirectory"
            className="mt-6 inline-block text-sm font-semibold text-primary underline"
          >
            Return to Regulations Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="state-resource-page px-4 py-10 tracking-wide sm:px-10 lg:px-20">
      {/*
        This styling affects ONLY links inside CMS content
        on this state page.

        It does not modify globals.css and does not affect
        navigation, breadcrumbs, footer links, or other pages.
      */}
      <style>{`
        .state-resource-page .state-cms-content a,
        .state-resource-page .state-cms-content a:link,
        .state-resource-page .state-cms-content a:visited {
          color: #005ea2 !important;
          text-decoration-line: underline !important;
          text-decoration-color: #005ea2 !important;
          text-decoration-thickness: 1px !important;
          text-underline-offset: 3px !important;
          cursor: pointer !important;
        }

        .state-resource-page .state-cms-content a:hover,
        .state-resource-page .state-cms-content a:focus {
          color: #005ea2 !important;
          text-decoration-line: underline !important;
          text-decoration-color: #005ea2 !important;
        }
      `}</style>

      {/* Breadcrumbs */}
      <div className="mb-8 flex flex-row flex-wrap items-center gap-2 text-sm text-gray-500">
        <svg
          className="usa-icon h-4 w-4 text-gray-500"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>

        <Link
          href="/"
          className="text-primary hover:underline"
        >
          Home
        </Link>

        <span>›</span>

        <span className="text-primary">
          Laws and Permits
        </span>

        <span>›</span>

        <Link
          href="/regulationsDirectory"
          className="text-primary hover:underline"
        >
          Regulations Directory
        </Link>

        <span>›</span>

        <span className="text-gray-800">
          {stateRecord.title}
        </span>

        <span>›</span>

        <span className="text-gray-800">
          {pageLabel}
        </span>
      </div>

      {/* Hero */}
      <InternalPageHero
        title={stateRecord.title}
        subtitle={
          fields.heroImageText ? (
            <span
              dangerouslySetInnerHTML={{
                __html: fields.heroImageText,
              }}
            />
          ) : (
            pageLabel
          )
        }
      />

      <div className="mt-6 flex flex-col gap-10 lg:flex-row">
        {/* Left sticky navigation */}
        {menuSections.length > 0 && (
          <div className="w-full shrink-0 lg:mt-10 lg:w-56">
            <div className="sticky top-8">
              <p className="mb-3 font-bold text-black">
                On this page
              </p>

              <div className="flex flex-col border-l-2 border-gray-200">
                {menuSections.map((section) => (
                  <button
                    type="button"
                    key={section.id}
                    onClick={() =>
                      scrollTo(section.id)
                    }
                    className={`py-2 pl-4 text-left text-sm transition-colors duration-200 hover:text-primary ${
                      activeSection === section.id
                        ? "-ml-[2px] border-l-4 border-black font-semibold text-black"
                        : "text-primary"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Right content */}
        <div className="min-w-0 flex-1 whitespace-normal break-words">
          {/* Overview */}
          {fields.introText && (
            <div
              id="overview"
              className="prose mt-10 max-w-none scroll-mt-28 border-b-4 border-primary-lighter pb-6"
            >
              <h1 className="mb-4 text-2xl font-bold text-primary">
                Overview
              </h1>

              <div
                className="state-cms-content"
                dangerouslySetInnerHTML={{
                  __html: fields.introText,
                }}
              />
            </div>
          )}

          {/* Dynamic CMS sections */}
          {activeDynamicSections.map(
            (section, index) => {
              const sectionId =
                makeSectionId(section.title);

              const isLast =
                index ===
                activeDynamicSections.length - 1;

              return (
                <div
                  key={sectionId}
                  id={sectionId}
                  className={`prose max-w-none scroll-mt-28 border-primary-lighter pb-6 ${
                    isLast
                      ? "pt-10"
                      : "border-b-4 pt-10"
                  }`}
                >
                  <h1 className="mb-4 text-2xl font-bold text-primary">
                    {section.title}
                  </h1>

                  {section.content && (
                    <div
                      className="state-cms-content"
                      dangerouslySetInnerHTML={{
                        __html:
                          section.content,
                      }}
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
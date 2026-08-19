"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

import { getRegulationsDirectoryFields } from "@/lib/cms";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const FIPS_TO_STATE = {
  "01": { name: "Alabama", slug: "alabama" },
  "02": { name: "Alaska", slug: "alaska" },
  "04": { name: "Arizona", slug: "arizona" },
  "05": { name: "Arkansas", slug: "arkansas" },
  "06": { name: "California", slug: "california" },
  "08": { name: "Colorado", slug: "colorado" },
  "09": { name: "Connecticut", slug: "connecticut" },
  "10": { name: "Delaware", slug: "delaware" },

  "11": {
    name: "District of Columbia",
    slug: "district-of-columbia",
  },

  "12": { name: "Florida", slug: "florida" },
  "13": { name: "Georgia", slug: "georgia" },
  "15": { name: "Hawaii", slug: "hawaii" },
  "16": { name: "Idaho", slug: "idaho" },
  "17": { name: "Illinois", slug: "illinois" },
  "18": { name: "Indiana", slug: "indiana" },
  "19": { name: "Iowa", slug: "iowa" },
  "20": { name: "Kansas", slug: "kansas" },
  "21": { name: "Kentucky", slug: "kentucky" },
  "22": { name: "Louisiana", slug: "louisiana" },
  "23": { name: "Maine", slug: "maine" },
  "24": { name: "Maryland", slug: "maryland" },

  "25": {
    name: "Massachusetts",
    slug: "maassachusetts",
  },

  "26": { name: "Michigan", slug: "michigan" },
  "27": { name: "Minnesota", slug: "minnesota" },
  "28": { name: "Mississippi", slug: "mississippi" },
  "29": { name: "Missouri", slug: "missouri" },
  "30": { name: "Montana", slug: "montana" },
  "31": { name: "Nebraska", slug: "nebraska" },
  "32": { name: "Nevada", slug: "nevada" },

  "33": {
    name: "New Hampshire",
    slug: "new-hampshire",
  },

  "34": { name: "New Jersey", slug: "new-jersey" },
  "35": { name: "New Mexico", slug: "new-mexico" },
  "36": { name: "New York", slug: "new-york" },

  "37": {
    name: "North Carolina",
    slug: "north-carolina",
  },

  "38": {
    name: "North Dakota",
    slug: "north-dakota",
  },

  "39": { name: "Ohio", slug: "ohio" },
  "40": { name: "Oklahoma", slug: "oklahoma" },
  "41": { name: "Oregon", slug: "oregon" },
  "42": { name: "Pennsylvania", slug: "pennsylvania" },

  "44": {
    name: "Rhode Island",
    slug: "rhode-island",
  },

  "45": {
    name: "South Carolina",
    slug: "south-carolina",
  },

  "46": {
    name: "South Dakota",
    slug: "south-dakota",
  },

  "47": { name: "Tennessee", slug: "tennessee" },
  "48": { name: "Texas", slug: "texas" },
  "49": { name: "Utah", slug: "utah" },
  "50": { name: "Vermont", slug: "vermont" },
  "51": { name: "Virginia", slug: "virginia" },
  "53": { name: "Washington", slug: "washington" },

  "54": {
    name: "West Virginia",
    slug: "west-virginia",
  },

  "55": { name: "Wisconsin", slug: "wisconsin" },
  "56": { name: "Wyoming", slug: "wyoming" },
};

const HIDE_DELAY = 300;

/*
 * Near the edges of the map we don't center the bubble,
 * otherwise it could go outside the visible container.
 */
const EDGE_THRESHOLD = 150;

export default function RegulationsDirectory() {
  const [directoryFields, setDirectoryFields] =
    useState(null);

  const [activeState, setActiveState] =
    useState(null);

  const mapContainerRef = useRef(null);
  const hideTimerRef = useRef(null);

  useEffect(() => {
    async function loadDirectoryFields() {
      const data =
        await getRegulationsDirectoryFields();

      setDirectoryFields(data);
    }

    loadDirectoryFields();
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) {
        clearTimeout(
          hideTimerRef.current
        );
      }
    };
  }, []);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(
        hideTimerRef.current
      );

      hideTimerRef.current = null;
    }
  };

  const scheduleHide = () => {
    clearHideTimer();

    hideTimerRef.current =
      setTimeout(() => {
        setActiveState(null);
      }, HIDE_DELAY);
  };

  const openStateMessage = (
    event,
    fips
  ) => {
    clearHideTimer();

    const state =
      FIPS_TO_STATE[fips];

    const container =
      mapContainerRef.current;

    if (!state || !container) {
      return;
    }

    const containerRect =
      container.getBoundingClientRect();

    const anchorX =
      event.clientX -
      containerRect.left;

    const anchorY =
      event.clientY -
      containerRect.top;

    let horizontalMode =
      "center";

    if (
      anchorX < EDGE_THRESHOLD
    ) {
      horizontalMode = "left";
    } else if (
      anchorX >
      containerRect.width -
      EDGE_THRESHOLD
    ) {
      horizontalMode = "right";
    }

    setActiveState({
      ...state,

      fips,

      anchorX,
      anchorY,

      horizontalMode,
    });
  };

  /*
   * Keep the small message box visible
   * within the map edges.
   */
  const getBubbleTransform = () => {
    if (
      activeState?.horizontalMode ===
      "left"
    ) {
      return "translate(0, -100%)";
    }

    if (
      activeState?.horizontalMode ===
      "right"
    ) {
      return "translate(-100%, -100%)";
    }

    return "translate(-50%, -100%)";
  };

  /*
   * Move the speech-bubble pointer depending
   * on whether the message is near an edge.
   */
  const getPointerPosition = () => {
    if (activeState?.horizontalMode === "left") {
      return {
        left: "14px",
      };
    }

    if (activeState?.horizontalMode === "right") {
      return {
        right: "14px",
      };
    }

    return {
      left: "50%",
      transform: "translateX(-50%)",
    };
  };

  const pageTitle =
    directoryFields?.pageTitle ||
    "Regulations Directory";

  const pageDescription =
    directoryFields?.pageDescription ||
    "Select a state to view its regulatory information.";

  const linkALabel =
    directoryFields?.linkALabel ||
    "Link A";

  const linkBLabel =
    directoryFields?.linkBLabel ||
    "Link B";

  return (
    <div className="px-4 py-10 tracking-wide sm:px-10 lg:px-20">
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

        <span className="text-gray-800">
          Regulations Directory
        </span>
      </div>

      {/* CMS controlled heading */}
      <div className="mb-8 mt-10 text-center">
        <h1 className="text-3xl font-bold text-primary">
          {pageTitle}
        </h1>

        {pageDescription && (
          <p className="mt-2 text-gray-600">
            {pageDescription}
          </p>
        )}
      </div>

      {/* Map */}
      <div
        ref={mapContainerRef}
        className="relative"
      >
        {/* Small dynamic message box */}
        {activeState && (
          <div
            className="absolute z-20 w-max max-w-[240px]"
            style={{
              left:
                activeState.anchorX,

              top:
                activeState.anchorY -
                6,

              transform:
                getBubbleTransform(),
            }}
            onMouseEnter={
              clearHideTimer
            }
            onMouseLeave={
              scheduleHide
            }
          >
            <div className="relative rounded-md border border-gray-300 bg-white px-3 py-2 shadow-md">
              {/* State name */}
              <p className="whitespace-nowrap border-b border-gray-200 pb-1.5 text-sm font-bold leading-tight text-primary">
                {activeState.name}
              </p>

              {/* Links */}
              <div className="mt-1.5 flex flex-col items-start gap-1 whitespace-nowrap text-sm">
                <Link
                  href={`/states/${activeState.slug}/link-a`}
                  className="font-semibold text-primary underline-offset-2 hover:underline"
                >
                  {linkALabel}
                </Link>

                <Link
                  href={`/states/${activeState.slug}/link-b`}
                  className="font-semibold text-primary underline-offset-2 hover:underline"
                >
                  {linkBLabel}
                </Link>
              </div>

              {/* Message pointer */}
              <div
                aria-hidden="true"
                className="absolute -bottom-[7px]"
                style={getPointerPosition()}
              >
                {/* Outer triangle = border */}
                <div
                  className="
      h-0 w-0
      border-l-[7px]
      border-r-[7px]
      border-t-[7px]
      border-l-transparent
      border-r-transparent
      border-t-gray-300
    "
                />

                {/* Inner triangle = white fill */}
                <div
                  className="
      absolute
      -top-[1px]
      left-[1px]
      h-0 w-0
      border-l-[6px]
      border-r-[6px]
      border-t-[6px]
      border-l-transparent
      border-r-transparent
      border-t-white
    "
                />
              </div>
            </div>
          </div>
        )}

        <div
          className="w-full"
          style={{
            height: "520px",
          }}
        >
          <ComposableMap
            projection="geoAlbersUsa"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Geographies
              geography={GEO_URL}
            >
              {({
                geographies,
              }) =>
                geographies.map(
                  (geo) => {
                    const fips =
                      String(
                        geo.id
                      ).padStart(
                        2,
                        "0"
                      );

                    const state =
                      FIPS_TO_STATE[
                      fips
                      ];

                    if (!state) {
                      return null;
                    }

                    /*
                     * This explicitly keeps the state
                     * highlighted even when the cursor
                     * moves into the message box.
                     */
                    const isActive =
                      activeState?.fips ===
                      fips;

                    return (
                      <Geography
                        key={
                          geo.rsmKey
                        }
                        geography={
                          geo
                        }
                        onMouseEnter={(
                          event
                        ) =>
                          openStateMessage(
                            event,
                            fips
                          )
                        }
                        onMouseLeave={
                          scheduleHide
                        }
                        aria-label={
                          state.name
                        }
                        style={{
                          default:
                          {
                            fill: isActive
                              ? "#1A6496"
                              : "#D1E4F3",

                            stroke:
                              "#ffffff",

                            strokeWidth: 0.8,

                            outline:
                              "none",

                            cursor:
                              "pointer",
                          },

                          hover: {
                            fill: "#1A6496",

                            stroke:
                              "#ffffff",

                            strokeWidth: 0.8,

                            outline:
                              "none",

                            cursor:
                              "pointer",
                          },

                          pressed: {
                            fill: "#0F4C75",

                            stroke:
                              "#ffffff",

                            strokeWidth: 0.8,

                            outline:
                              "none",
                          },
                        }}
                      />
                    );
                  }
                )
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}
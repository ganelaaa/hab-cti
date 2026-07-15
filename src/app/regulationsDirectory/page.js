"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const FIPS_TO_STATE = {
  "01": "alabama",
  "02": "alaska",
  "04": "arizona",
  "05": "arkansas",
  "06": "california",
  "08": "colorado",
  "09": "connecticut",
  10: "delaware",
  11: "district-of-columbia",
  12: "florida",
  13: "georgia",
  15: "hawaii",
  16: "idaho",
  17: "illinois",
  18: "indiana",
  19: "iowa",
  20: "kansas",
  21: "kentucky",
  22: "louisiana",
  23: "maine",
  24: "maryland",
  25: "maassachusetts",
  26: "michigan",
  27: "minnesota",
  28: "mississippi",
  29: "missouri",
  30: "montana",
  31: "nebraska",
  32: "nevada",
  33: "new-hampshire",
  34: "new-jersey",
  35: "new-mexico",
  36: "new-york",
  37: "north-carolina",
  38: "north-dakota",
  39: "ohio",
  40: "oklahoma",
  41: "oregon",
  42: "pennsylvania",
  44: "rhode-island",
  45: "south-carolina",
  46: "south-dakota",
  47: "tennessee",
  48: "texas",
  49: "utah",
  50: "vermont",
  51: "virginia",
  53: "washington",
  54: "west-virginia",
  55: "wisconsin",
  56: "wyoming",
};

const FIPS_TO_ABBR = {
  "01": "AL",
  "02": "AK",
  "04": "AZ",
  "05": "AR",
  "06": "CA",
  "08": "CO",
  "09": "CT",
  10: "DE",
  11: "DC",
  12: "FL",
  13: "GA",
  15: "HI",
  16: "ID",
  17: "IL",
  18: "IN",
  19: "IA",
  20: "KS",
  21: "KY",
  22: "LA",
  23: "ME",
  24: "MD",
  25: "MA",
  26: "MI",
  27: "MN",
  28: "MS",
  29: "MO",
  30: "MT",
  31: "NE",
  32: "NV",
  33: "NH",
  34: "NJ",
  35: "NM",
  36: "NY",
  37: "NC",
  38: "ND",
  39: "OH",
  40: "OK",
  41: "OR",
  42: "PA",
  44: "RI",
  45: "SC",
  46: "SD",
  47: "TN",
  48: "TX",
  49: "UT",
  50: "VT",
  51: "VA",
  53: "WA",
  54: "WV",
  55: "WI",
  56: "WY",
};

export default function RegulationsDirectory() {
  const [hoveredState, setHoveredState] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleStateClick = (geo) => {
    const fips = geo.id;
    const slug = FIPS_TO_STATE[fips];
    if (slug) {
      window.location.href = `/states/${slug}`;
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Breadcrumb */}
      <div className="flex flex-row items-center gap-2 text-sm text-gray-500 mb-8">
        <svg
          className="usa-icon text-gray-500"
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
        <span className="text-gray-800">Regulations Directory</span>
      </div>

      {/* WIP */}
      <div className="text-center mb-8 mt-10">
        <h1 className="text-3xl text-primary font-bold">
          This page is currently under development
        </h1>
        <p>Please check back soon!</p>
      </div>

      {/* Map */}
      <div className="relative">
        {/* Hover State */}
        {hoveredState && (
          <div
            className="absolute z-10 bg-gray-900 text-white text-sm px-3 py-1.5 rounded pointer-events-none"
            style={{
              left: tooltipPos.x + 12,
              top: tooltipPos.y - 36,
              whiteSpace: "nowrap",
            }}
          >
            {hoveredState}
          </div>
        )}

        <div
          className="w-full"
          style={{ height: "520px" }}
          onMouseMove={handleMouseMove}
        >
          <ComposableMap
            projection="geoAlbersUsa"
            style={{ width: "100%", height: "100%" }}
          >
            <Geographies geography={GEO_URL}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const fips = geo.id;
                  const abbr = FIPS_TO_ABBR[fips] || "";

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => handleStateClick(geo)}
                      onMouseEnter={() => setHoveredState(abbr)}
                      onMouseLeave={() => setHoveredState(null)}
                      style={{
                        default: {
                          fill: "#D1E4F3",
                          stroke: "#ffffff",
                          strokeWidth: 0.8,
                          outline: "none",
                          cursor: "pointer",
                        },
                        hover: {
                          fill: "#1A6496",
                          stroke: "#ffffff",
                          strokeWidth: 0.8,
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#0F4C75",
                          stroke: "#ffffff",
                          strokeWidth: 0.8,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>
        </div>
      </div>
    </div>
  );
}

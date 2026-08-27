"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import InternalPageHero from "@/components/InternalPageHero";

export default function RegulationsDirectory() {

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
      <InternalPageHero
              title="Regulatory Agencies Info Page"
              subtitle="Federal & State Regulations"
            />  
    </div>
  );
}
"use client";

import Link from "next/link";

import InternalPageHero from "@/components/InternalPageHero";

const linkClass = "text-primary text-underline";

function AgencyEntry({ logo, name, href, children }) {
  return (
    <div className="mt-8">
      <div className="flex items-center gap-4">
        <img src={logo} alt="" className="w-20 h-20 shrink-0 object-contain" />
        <h1>
          <a className={linkClass} href={href}>
            {name}
          </a>
        </h1>
      </div>
      <p className="mt-2 ml-24">{children}</p>
    </div>
  );
}

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

        <Link href="/" className="text-primary hover:underline">
          Home
        </Link>

        <span>›</span>

        <span className="text-primary">Laws and Permits</span>

        <span>›</span>

        <span className="text-gray-800">Regulations Directory</span>
      </div>

      {/* CMS controlled heading */}
      <InternalPageHero
        title="Regulatory Agencies Info Page"
        subtitle="Federal & State Regulations"
      />

      <div className="mt-2">
        <AgencyEntry
          logo="/USEPA.svg.png"
          name="Environmental Protection Agency (EPA)"
          href="https://www.epa.gov/"
        >
          The Environmental Protection Agency (EPA) works to protect human
          health and the environment by ensuring Americans have clean air, land,
          and water. The agency conducts scientific research, enforces national
          environmental regulations, and cleans up contaminated sites. The
          EPA-managed regulations and acts include FIFRA, FFDCA, PRIA, MPRSA,
          MBTA, and the CWA, including NPDES.
        </AgencyEntry>

        <AgencyEntry
          logo="/castle.png"
          name="U.S. Army Corps of Engineers (USACE)"
          href="https://www.usace.army.mil/"
        >
          The U.S. ACE regulates development in protected aquatic areas by
          issuing permits under{" "}
          <Link className={linkClass} href="/agency/419">
            Section 404 of the Clean Water Act
          </Link>{" "}
          and{" "}
          <Link className={linkClass} href="/agency/418">
            Section 10 of the Rivers and Harbors Act
          </Link>{" "}
          for activities involving excavation, structures, or dredged and fill
          materials. It also manages water quality across its civil works
          infrastructure by monitoring aquatic health, implementing
          environmental restoration efforts, and controlling discharge from
          federal dams and reservoirs.
        </AgencyEntry>

        <AgencyEntry
          logo="/fish.svg.png"
          name="U.S. Fish and Wildlife Service (FWS)"
          href="https://www.fws.gov/"
        >
          The U.S. Fish and Wildlife Service is a federal agency dedicated to
          conserving, protecting, and enhancing fish, wildlife, plants, and
          their natural habitats. It accomplishes this by enforcing federal
          wildlife laws like the{" "}
          <Link className={linkClass} href="/agency/411">
            Endangered Species Act
          </Link>
          , managing the National Wildlife Refuge System, and restoring vital
          ecosystems across the country.
        </AgencyEntry>

        <AgencyEntry
          logo="/NOAA.svg"
          name="National Oceanographic and Atmospheric Administration (NOAA)"
          href="https://www.noaa.gov/"
        >
          The National Oceanic and Atmospheric Administration (NOAA) monitors,
          predicts, and protects coastal, marine, and climate ecosystems to
          maintain healthy oceanic and atmospheric environments. The agency
          monitors and regulates marine fisheries{" "}
          <Link className={linkClass} href="/agency/420">
            (MSA)
          </Link>
          , marine mammals{" "}
          <Link className={linkClass} href="/agency/421">
            (MMPA)
          </Link>
          , coastal habitats{" "}
          <Link className={linkClass} href="/agency/425">
            (CZMA)
          </Link>
          , and marine sanctuaries{" "}
          <Link className={linkClass} href="/agency/424">
            (NMSA)
          </Link>
          , among other things.
        </AgencyEntry>

        <AgencyEntry
          logo="/NOAA_Fisheries_logo.svg.webp"
          name="National Marine Fisheries Service (NMFS)"
          href="https://www.fisheries.noaa.gov/"
        >
          The National Marine Fisheries Service (NMFS), also known as NOAA
          Fisheries, is a NOAA agency that holds federal regulatory jurisdiction
          over the stewardship of living marine resources and their habitats
          within the U.S. Exclusive Economic Zone. In this governing capacity,
          the agency enforces key statutes like the Magnuson-Stevens Act{" "}
          <Link className={linkClass} href="/agency/420">
            (MSA)
          </Link>
          , the Marine Mammal Protection Act{" "}
          <Link className={linkClass} href="/agency/421">
            (MMPA)
          </Link>
          , and the Endangered Species Act{" "}
          <Link className={linkClass} href="/agency/411">
            (ESA)
          </Link>
          .
        </AgencyEntry>
      </div>
    </div>
  );
}

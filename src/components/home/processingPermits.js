export default function ProcessingPermits() {
  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Agency Heading */}
      <p className="text-green font-bold text-sm">PROCESSING PERMITS</p>
      <p className="font-bold text-3xl text-(--black)] mt-1">
        Acts and Regulatory Agencies
      </p>
      <p className="text-sm text-(--gray)] mt-2 max-w-xl whitespace-nowrap">
        Learn how permits for algal bloom control are reviewed and approved,
        what regulatory agencies are involved, and what steps are needed from
        application to implementation and deployment.
      </p>

      {/* Blue Cards */}
      <div className="flex flex-row mt-5 gap-10 border-primary-lighter">
        {/* FIFRA */}
        <div className="relative px-6 py-6 bg-primary-lighter border-gray-300 border-b border-t border-l border-r rounded w-full">
          <img src="/USEPA.svg.png" className="w-20 h-20 mb-3 object-contain" />{" "}
          <div className="absolute top-15 right-10 bg-[#78a529] p-2 px-2  rounded-2xl text-white font-bold flex flex-row items-center gap-1 text-2xl">
            <svg
              className="usa-icon"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use href="/assets/img/sprite.svg#star"></use>
            </svg>
            Primary
          </div>
          <p className="font-semibold text-xl">Federal Insecticide,</p>
          <p className="font-semibold text-xl">Fungicide, and Rodenticide</p>
          <p className="font-semibold text-xl">Act (FIFRA)</p>
          <div className="mt-3">
            <p>Regulates the use, sale, distribution, and registration</p>
            <p>of pesticides and algicides.</p>
          </div>
          <a
            href="https://www.epa.gov/laws-regulations/summary-federal-insecticide-fungicide-and-rodenticide-act"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold underline text-black mt-10 inline-block hover:text-primary transition-colors duration-200"
          >
            Visit the FIFRA Website
          </a>
        </div>
        {/* NPDES */}
        <div className="relative px-6 py-6 bg-primary-lighter rounded w-full">
          <img src="/USEPA.svg.png" className="w-20 h-20 mb-3 object-contain" />{" "}
          <div className="absolute top-15 right-10 bg-[#78a529] p-2 px-2  rounded-2xl text-white font-bold flex flex-row items-center gap-1 text-2xl">
            <svg
              className="usa-icon"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use href="/assets/img/sprite.svg#star"></use>
            </svg>
            Primary
          </div>
          <p className="font-semibold text-xl">Clean Water Act National</p>
          <p className="font-semibold text-xl">Pollutant Discharge</p>
          <p className="font-semibold text-xl">Elimination System (NPDES)</p>
          <div className="mt-3">
            <p>Prohibits anybody from discharging "pollutants"</p>
            <p>through a "point source" into a "water of the United</p>
            <p>States" unless they have an NPDES permit.</p>
          </div>
          <a
            href="https://www.epa.gov/npdes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold underline text-black mt-10 inline-block hover:text-primary transition-colors duration-200"
          >
            Visit the NPDES Website
          </a>
        </div>
        {/* FFDCA */}
        <div className="relative px-6 py-6 bg-primary-lighter border-gray-300 border-b border-t border-l border-r rounded w-full">
          <img src="/FFDCA.png" className="w-20 h-20 mb-3 object-contain" />{" "}
          <div className="absolute top-15 right-10 bg-[#78a529] p-2 px-2  rounded-2xl text-white font-bold flex flex-row items-center gap-1 text-2xl">
            <svg
              className="usa-icon"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use href="/assets/img/sprite.svg#star"></use>
            </svg>
            Primary
          </div>
          <p className="font-semibold text-xl">Federal Food, Drug, and</p>
          <p className="font-semibold text-xl">Cosmetic Act (FFDCA)</p>
          <div className="mt-3">
            <p>Authorizes the EPA to set pesticide tolerances in</p>
            <p>foods, including products used in marine or</p>
            <p>freshwater sites where fish or shellfish may be</p>
            <p>exposed and consumed by humans.</p>
          </div>
          <a
            href="https://www.fda.gov/regulatory-information/laws-enforced-fda/federal-food-drug-and-cosmetic-act-fdc-act"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold underline text-black mt-10 inline-block hover:text-primary transition-colors duration-200"
          >
            Visit the FFDCA Website
          </a>
        </div>
      </div>

      {/* White Cards first row */}
      <div className="flex flex-row mt-5 gap-10">
        {/* MMPA */}
        <div className="px-6 py-6 border-gray-300 border-b border-t border-l border-r rounded w-full">
          <img src="/castle.png" className="w-20 h-20 mb-3 object-contain" />{" "}
          <p className="font-semibold text-xl">Marine Mammal Protection</p>
          <p className="font-semibold text-xl">Act (MMPA)</p>
          <div className="mt-3">
            <p>Prohibits the Disturbance of a marine mamal or</p>
            <p>marine mammal stock in the wild by causing</p>
            <p>disruption or behavioral patterns, including, but not</p>
            <p>limited to, migration, breathing, nursing, breeding,</p>
            <p>feeding, or sheltering (Level B harassment).</p>
          </div>
          <a
            href="https://www.fisheries.noaa.gov/national/marine-mammal-protection/marine-mammal-protection-act"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold underline text-black mt-10 inline-block hover:text-primary transition-colors duration-200"
          >
            Visit the MMPA Website
          </a>
        </div>
        {/* NEPA */}
        <div className="px-6 py-6 border-gray-300 border-b border-t border-l border-r rounded w-full">
          <img src="/NEPA.svg.png" className="w-20 h-20 mb-3 object-contain" />{" "}
          <p className="font-semibold text-xl">National Environment Policy</p>
          <p className="font-semibold text-xl">Act (NEPA)</p>
          <div className="mt-3">
            <p>Requires federal agences to assess the environmental"</p>
            <p>effects of their proposed actions prior to making</p>
            <p>decisions.</p>
          </div>
          <a
            href="https://www.epa.gov/nepa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold underline text-black mt-10 inline-block hover:text-primary transition-colors duration-200"
          >
            Visit the NEPA Website
          </a>
        </div>
        {/* Section 404 */}
        <div className="px-6 py-6 border-gray-300 border-b border-t border-l border-r rounded w-full">
          <img src="/castle.png" className="w-20 h-20 mb-3 object-contain" />{" "}
          <p className="font-semibold text-xl">Section 404 of the Clean</p>
          <p className="font-semibold text-xl">Water Act</p>
          <div className="mt-3">
            <p>A permit is required for the discharge of dredged or</p>
            <p>fill material into waters of the United States.</p>
          </div>
          <a
            href="https://www.epa.gov/laws-regulations/summary-clean-water-act"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold underline text-black mt-10 inline-block hover:text-primary transition-colors duration-200"
          >
            Visit the Clean Water Act Website
          </a>
        </div>
      </div>

      {/* White Cards second row */}
      <div className="flex flex-row mt-5 gap-10">
        {/* Species Act */}
        <div className="px-6 py-6 border-gray-300 border-b border-t border-l border-r rounded w-full">
          <img src="/fish.svg.png" className="w-20 h-20 mb-3 object-contain" />{" "}
          <p className="font-semibold text-xl">Endangered Species Act</p>
          <div className="mt-3">
            <p>Ensures actions authorized, funded, or carried out are</p>
            <p>not likely to jeopardize the continued existence of any</p>
            <p>dlisted species or result in the destruction or adverse</p>
            <p>modification of designated critical habitat of such</p>
            <p>species. EPA has an ecological risk assessment</p>
            <p>process for the evaluation of potential risk to</p>
            <p>endangered and threatened species from exposure</p>
            <p>to pesticides.</p>
          </div>
          <a
            href="https://www.fws.gov/law/endangered-species-act"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold underline text-black mt-10 inline-block hover:text-primary transition-colors duration-200"
          >
            Visit the Endangered Species Act Website
          </a>
        </div>
        {/* Stevens Act */}
        <div className="px-6 py-6 border-gray-300 border-b border-t border-l border-r rounded w-full">
          <img src="/NOAA.svg" className="w-20 h-20 mb-3 object-contain" />{" "}
          <p className="font-semibold text-xl">Magnuson-Stevens Act</p>
          <div className="mt-3">
            <p>Protects habitat that fish need to spawn, breed, feed"</p>
            <p>and grow to maturity and ensure a safe and</p>
            <p>sustainable supply of seafood.</p>
          </div>
          <a
            href="https://www.fisheries.noaa.gov/resource/document/magnuson-stevens-fishery-conservation-and-management-act"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold underline text-black mt-10 inline-block hover:text-primary transition-colors duration-200"
          >
            Visit the Magnuson-Stevens Act Website
          </a>
        </div>
        {/* Section 10 */}
        <div className="px-6 py-6 border-gray-300 border-b border-t border-l border-r rounded w-full">
          <img src="/castle.png" className="w-20 h-20 mb-3 object-contain" />{" "}
          <p className="font-semibold text-xl">Section 10 of the Rivers and</p>
          <p className="font-semibold text-xl">Harbors Act</p>
          <div className="mt-3">
            <p>Prohibits unauthorized obstruction or alteration of</p>
            <p>U.S. navigable waters. A permit from the USACE is</p>
            <p>required for work or structures in, over, or under</p>
            <p>these waters, including many water bodies and</p>
            <p>wetlands regulated by the Corps.</p>
          </div>
          <a
            href="https://www.epa.gov/cwa-404/section-10-rivers-and-harbors-appropriation-act-1899"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold underline text-black mt-10 inline-block hover:text-primary transition-colors duration-200"
          >
            Visit the Rivers and Harbors Act Website
          </a>
        </div>
      </div>
    </div>
  );
}

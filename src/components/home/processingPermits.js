export default function ProcessingPermits() {
  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Agency Heading */}
      <p className="text-green font-bold">PROCESSING PERMITS</p>
      <p className="font-bold text-3xl">Acts and Regulatory Agencies</p>
      <p className="text-xl">
        Learn how permits for algal bloom control are reviewed and approved,
        what regulatory agencies are involved, and what steps are needed from
        application to implementation and deployment.
      </p>

      {/* Blue Cards */}
      <div className="flex flex-row px-20 py-10 tracking-wide gap-10 border-b border-primary-lighter">
        {/* FIFRA */}
        <div className="px-30 py-30 bg-primary-lighter border-gray-300 border-b border-t border-l border-r rounded">
          <p className="font-semibold">Federal Insecticide,</p>
          <p className="font-semibold">Fungicide, and Rodenticide</p>
          <p className="font-semibold">Act (FIFRA)</p>
          <p>Regulates the use, sale, distribution, and registration</p>
          <p>of pesticides and algicides.</p>
        </div>
        {/* NPDES */}
        <div className="px-30 py-30 bg-primary-lighter rounded">
          <p className="font-semibold">Clean Water Act National</p>
          <p className="font-semibold">Pollutant Discharge</p>
          <p className="font-semibold">Elimination System (NPDES)</p>
          <p>Prohibits anybody from discharging "pollutants"</p>
          <p>through a "point source" into a "water of the United</p>
          <p>States" unless they have an NPDES permit.</p>
        </div>
        {/* FFDCA */}
        <div className="px-30 py-30 bg-primary-lighter border-gray-300 border-b border-t border-l border-r rounded">
          <p className="font-semibold">Federal Food, Drug, and</p>
          <p className="font-semibold">Cosmetic Act (FFDCA)</p>
          <p>Authorizes the EPA to set pesticide tolerances in</p>
          <p>foods, including products used in marine or</p>
          <p>freshwater sites where fish or shellfish may be</p>
          <p>exposed and consumed by humans.</p>
        </div>
      </div>

      {/* White Cards first row */}
      <div className="flex flex-row px-20 py-10 tracking-wide gap-10">
        {/* MMPA */}
        <div className="px-30 py-30 border-gray-300 border-b border-t border-l border-r rounded">
          <p className="font-semibold">Marine Mammal Protection</p>
          <p className="font-semibold">Act (MMPA)</p>
          <p>Prohibits the Disturbance of a marine mamal or</p>
          <p>marine mammal stock in the wild by causing</p>
          <p>disruption or behavioral patterns, including, but not</p>
          <p>limited to, migration, breathing, nursing, breeding,</p>
          <p>feeding, or sheltering (Level B harassment).</p>
        </div>
        {/* NEPA */}
        <div className="px-30 py-30 border-gray-300 border-b border-t border-l border-r rounded">
          <p className="font-semibold">National Environment Policy</p>
          <p className="font-semibold">Act (NEPA)</p>
          <p>Requires federal agences to assess the environmental"</p>
          <p>effects of their proposed actions prior to making</p>
          <p>decisions.</p>
        </div>
        {/* Section 404 */}
        <div className="px-30 py-30 border-gray-300 border-b border-t border-l border-r rounded">
          <p className="font-semibold">Section 404 of the Clean</p>
          <p className="font-semibold">Water Act</p>
          <p>A permit is required for the discharge of dredged or</p>
          <p>fill material into waters of the United States.</p>
        </div>
      </div>

      {/* White Cards second row */}
      <div className="flex flex-row px-20 py-10 tracking-wide gap-10">
        {/* Species Act */}
        <div className="px-30 py-30 border-gray-300 border-b border-t border-l border-r rounded">
          <p className="font-semibold">Endangered Species Act</p>
          <p>Ensures actions authorized, funded, or carried out are</p>
          <p>not likely to jeopardize the continued existence of any</p>
          <p>dlisted species or result in the destruction or adverse</p>
          <p>modification of designated critical habitat of such</p>
          <p>species. EPA has an ecological risk assessment</p>
          <p>process for the evaluation of potential risk to</p>
          <p>endangered and threatened species from exposure</p>
          <p>to pesticides.</p>
        </div>
        {/* Stevens Act */}
        <div className="px-30 py-30 border-gray-300 border-b border-t border-l border-r rounded">
          <p className="font-semibold">Magnuson-Stevens Act</p>
          <p>Protects habitat that fish need to spawn, breed, feed"</p>
          <p>and grow to maturity and ensure a safe and</p>
          <p>sustainable supply of seafood.</p>
        </div>
        {/* Section 10 */}
        <div className="px-30 py-30 border-gray-300 border-b border-t border-l border-r rounded">
          <p className="font-semibold">Section 10 of the Rivers and</p>
          <p className="font-semibold">Habors Act</p>
          <p>Prohibits unauthorized obstruction or alteration of</p>
          <p>U.S. navigable waters. A permit from the USACE is</p>
          <p>required for work or structures in, over, or under</p>
          <p>these waters, including many water bodies and</p>
          <p>wetlands regulated by the Corps.</p>
        </div>
      </div>
    </div>
  );
}

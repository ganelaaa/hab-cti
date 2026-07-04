// "use client";
// import Link from "next/link";

// export default function Agencies({ permittingCms, complianceCms }) {
//   const laws = [
//     {
//       title: permittingCms?.card01Title || "Federal Insecticide,\nFungicide, and Rodenticide\nAct (FIFRA)",
//       description: permittingCms?.card01Description || "Regulates the use, sale, distribution, and registration of pesticides and algicides.",
//       href: permittingCms?.card01Link || "/agency/405",
//       imagePath: permittingCms?.card01Image?.node?.sourceUrl || "/USEPA.svg.png",
//       isPrimary: permittingCms?.card01IsPrimary ?? true,
//     },
//     {
//       title: permittingCms?.card02Title || "Federal Food, Drug, and\nCosmetic Act (FFDCA)",
//       description: permittingCms?.card02Description || "Authorizes the EPA to set pesticide tolerances in foods, including products used in marine or freshwater sites where fish or shellfish may be exposed and consumed by humans.",
//       href: permittingCms?.card02Link || "/learnMore",
//       imagePath: permittingCms?.card02Image?.node?.sourceUrl || "/USEPA.svg.png",
//       isPrimary: permittingCms?.card02IsPrimary ?? true,
//     },
//     {
//       title: permittingCms?.card03Title || "Pesticide Registration\nImprovement Act (PRIA)",
//       description: permittingCms?.card03Description || "Establishes a fee-for-service system for pesticide registration at the EPA.",
//       href: permittingCms?.card03Link || "/learnMore",
//       imagePath: permittingCms?.card03Image?.node?.sourceUrl || "/USEPA.svg.png",
//       isPrimary: permittingCms?.card03IsPrimary ?? true,
//     },
//     {
//       title: permittingCms?.card04Title || "Clean Water Act National\nPollutant Discharge\nElimination System (NPDES)",
//       description: permittingCms?.card04Description || "Prohibits anybody from discharging \"pollutants\" through a \"point source\" into a \"water of the United States\" unless they have an NPDES permit.",
//       href: permittingCms?.card04Link || "/npdes",
//       imagePath: permittingCms?.card04Image?.node?.sourceUrl || "/USEPA.svg.png",
//       isPrimary: permittingCms?.card04IsPrimary ?? true,
//     },
//     {
//       title: permittingCms?.card05Title || "State Policies and Permits",
//       description: permittingCms?.card05Description || "Each state has its own pesticide permitting and registration process. Although additional regulations may apply, each state must follow the minimum pesticide requirements set forth by FIFRA. State-specific entities such as the Department of Natural Resources, Department of Public Health, and State Wildlife Commissions are often involved in the review of Experimental Use Permit applications and pesticide registration.",
//       href: permittingCms?.card05Link || "/regulationsDirectory",
//       imagePath: permittingCms?.card05Image?.node?.sourceUrl || "/usmap.png",
//       isPrimary: permittingCms?.card05IsPrimary ?? true,
//     },
//     {
//       title: permittingCms?.card06Title || "Marine Protection, Research\nand Sanctuaries Act (MPRSA)",
//       description: permittingCms?.card06Description || "Regulates the intentional transportation and disposal of materials into ocean waters.",
//       href: permittingCms?.card06Link || "/agency/406",
//       imagePath: permittingCms?.card06Image?.node?.sourceUrl || "/USEPA.svg.png",
//       isPrimary: permittingCms?.card06IsPrimary ?? true,
//     },
//     {
//       title: permittingCms?.card07Title || "Section 10 of the Rivers and\nHarbors Act",
//       description: permittingCms?.card07Description || "Prohibits unauthorized obstruction or alteration of U.S. navigable waters. A permit from the USACE is required for work or structures in, over, or under these waters, including many water bodies and wetlands regulated by the Corps.",
//       href: permittingCms?.card07Link || "/section10",
//       imagePath: permittingCms?.card07Image?.node?.sourceUrl || "/USEPA.svg.png",
//       isPrimary: permittingCms?.card07IsPrimary ?? false,
//     },
//     {
//       title: permittingCms?.card08Title || "Section 404 of the Clean\nWater Act",
//       description: permittingCms?.card08Description || "A permit is required for the discharge of dredged or fill material into waters of the United States.",
//       href: permittingCms?.card08Link || "/learnMore",
//       imagePath: permittingCms?.card08Image?.node?.sourceUrl || "/castle.png",
//       isPrimary: permittingCms?.card08IsPrimary ?? false,
//     },
//   ];

//   const compliance = [
//     {
//       title: complianceCms?.act01Title || "Endangered Species Act",
//       description: complianceCms?.act01Description || "Ensures actions authorized, funded, or carried out are not likely to jeopardize the continued existence of any listed species or result in the destruction or adverse modification of designated critical habitat of such species. EPA has an ecological risk assessment process for the evaluation of potential risk to endangered and threatened species from exposure to pesticides.",
//       href: complianceCms?.act01Link || "/esa",
//       imagePath: complianceCms?.act01Image?.node?.sourceUrl || "/fish.svg.png",
//     },
//     {
//       title: complianceCms?.act02Title || "Magnuson-Stevens Act",
//       description: complianceCms?.act02Description || "Protects habitat that fish need to spawn, breed, feed and grow to maturity and ensure a safe and sustainable supply of seafood.",
//       href: complianceCms?.act02Link || "/learnMore",
//       imagePath: complianceCms?.act02Image?.node?.sourceUrl || "/NOAA.svg",
//     },
//     {
//       title: complianceCms?.act03Title || "Marine Mammal Protection\nAct (MMPA)",
//       description: complianceCms?.act03Description || "Prohibits the disturbance of a marine mammal or marine mammal stock in the wild by causing disruption of behavioral patterns, including but not limited to migration, breathing, nursing, breeding, feeding, or sheltering (Level B harassment).",
//       href: complianceCms?.act03Link || "/mmpa",
//       imagePath: complianceCms?.act03Image?.node?.sourceUrl || "/NOAA.svg",
//     },
//     {
//       title: complianceCms?.act04Title || "National Environment Policy\nAct (NEPA)",
//       description: complianceCms?.act04Description || "Requires federal agencies to assess the environmental effects of their proposed actions prior to making decisions.",
//       href: complianceCms?.act04Link || "/learnMore",
//       imagePath: complianceCms?.act04Image?.node?.sourceUrl || "/NEPA.svg.png",
//     },
//     {
//       title: complianceCms?.act05Title || "Migratory Birds Treaty Act (MBTA)",
//       description: complianceCms?.act05Description || "Prevents the taking, possession, transportation, sale, purchase, barter, importation, exportation, and banding or marking of migratory birds unless otherwise permitted. Under the MBTA, “take” refers to bird death by intentional (hunting) or incidental means. As “incidental taking” may result from human activities that disturb bird behavior, migratory bird habitats essential to standard behaviors, including nesting, foraging, and migration, are also protected under this act.",
//       href: complianceCms?.act05Link || "/learnMore",
//       imagePath: complianceCms?.act05Image?.node?.sourceUrl || "/fish.svg.png",
//     },
//     {
//       title: complianceCms?.act06Title || "National Marine Sanctuaries Act (NMSA)",
//       description: complianceCms?.act06Description || "Authorizes the Secretary of Commerce to designate and protect areas of the marine environment with special national significance due to their conservation, recreational, ecological, historical, scientific, cultural, archeological, educational or esthetic qualities as national marine sanctuaries.",
//       href: complianceCms?.act06Link || "/learnMore",
//       imagePath: complianceCms?.act06Image?.node?.sourceUrl || "/NOAA.svg",
//     },
//     {
//       title: complianceCms?.act07Title || "Section 307 of the Coastal Zone Management\nAct (CZMA)",
//       description: complianceCms?.act07Description || "Referred to as the “federal consistency” provision of the CZMA, gives states a strong voice in federal agency decision making, which they otherwise would not have, for activities that may affect a state’s coastal uses or resources.",
//       href: complianceCms?.act07Link || "/learnMore",
//       imagePath: complianceCms?.act07Image?.node?.sourceUrl || "/NOAA.svg",
//     },
//   ];

//   return (
//     <div className="px-4 py-10 tracking-wide sm:px-10 lg:px-20">
//       <p className="text-sm font-bold text-green">ACTS AND REGULATORY AGENCIES</p>
//       <h2 className="mt-1 text-3xl font-bold text-black">{permittingCms?.sectionTitle || "Permitting Laws"}</h2>
//       <p className="mt-2 max-w-xl text-sm text-gray-600">
//         {permittingCms?.sectionDescription || "Laws and regulations requiring permits for algaecide approval and deployment."}
//       </p>

//       <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//         {laws.map((item, idx) => (
//           <AgencyCard key={idx} item={item} />
//         ))}
//       </div>

//       <h2 className="mt-16 text-3xl font-bold text-black">{complianceCms?.sectionTitle || "Acts Requiring Compliance"}</h2>
//       <p className="mt-2 max-w-xl text-sm text-gray-600">
//         {complianceCms?.sectionDescription || "Regulatory statutes with which the deployment of algaecide products must comply."}
//       </p>

//       <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//         {compliance.map((item, idx) => (
//           <AgencyCard key={idx} item={item} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function AgencyCard({ item }) {
//   return (
//     <div className={`relative flex flex-col rounded border border-gray-300 p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,94,162,0.3)] ${item.isPrimary ? 'bg-primary-lighter' : 'bg-white'}`}>
//       <img src={item.imagePath} alt="" className="mb-3 h-16 w-16 object-contain" />
      
//       {item.isPrimary && (
//         <div className="absolute top-3 right-3 flex flex-row items-center gap-1 rounded-2xl bg-[#78a529] p-1 px-2 text-sm font-bold text-white">
//           <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
//             <use href="/assets/img/sprite.svg#star"></use>
//           </svg>
//           Primary
//         </div>
//       )}

//       <div className="min-w-0 flex-1">
//         <h3 className="whitespace-pre-line text-lg font-semibold leading-snug text-black">
//           {item.title}
//         </h3>
//         <p className="mt-3 text-sm text-gray-700 leading-normal">
//           {item.description}
//         </p>
//       </div>

//       <Link
//         href={item.href}
//         className="mt-auto inline-block pt-4 text-sm font-bold text-black underline transition-colors duration-200 hover:text-primary"
//       >
//         Learn More
//       </Link>
//     </div>
//   );
// }

"use client";
import Link from "next/link";

export default function Agencies({ allAgencies = [] }) {
  // Dynamically split your custom post items based on their select configurations
  const laws = allAgencies.filter((item) => 
    item.agencyInternalConnector?.agencyType?.includes("permitting")
  );

  const compliance = allAgencies.filter((item) => 
    item.agencyInternalConnector?.agencyType?.includes("compliance")
  );

  return (
    <div className="px-4 py-10 tracking-wide sm:px-10 lg:px-20">
      <p className="text-sm font-bold text-green">ACTS AND REGULATORY AGENCIES</p>
      
      {/* SECTION 1: Permitting Laws */}
      <h2 className="mt-1 text-3xl font-bold text-black">Permitting Laws</h2>
      <p className="mt-2 max-w-xl text-sm text-gray-600">
        Laws and regulations requiring permits for algaecide approval and deployment.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {laws.map((agency) => (
          <DynamicAgencyCard key={agency.databaseId} agency={agency} />
        ))}
        {laws.length === 0 && (
          <p className="text-sm text-gray-400 italic col-span-full">No permitting laws published yet.</p>
        )}
      </div>

      {/* SECTION 2: Acts Requiring Compliance */}
      <h2 className="mt-16 text-3xl font-bold text-black">Acts Requiring Compliance</h2>
      <p className="mt-2 max-w-xl text-sm text-gray-600">
        Regulatory statutes with which the deployment of algaecide products must comply.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {compliance.map((agency) => (
          <DynamicAgencyCard key={agency.databaseId} agency={agency} />
        ))}
        {compliance.length === 0 && (
          <p className="text-sm text-gray-400 italic col-span-full">No compliance acts published yet.</p>
        )}
      </div>
    </div>
  );
}

function DynamicAgencyCard({ agency }) {
  const cms = agency.agencyInternalConnector;
  
  // Maps directly onto your verified nested structure from the GQL IDE
  const imagePath = cms?.featuredImage?.node?.sourceUrl || "/USEPA.svg.png";

  return (
    <div className={`relative flex flex-col rounded border border-gray-300 p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(0,94,162,0.3)] ${
      cms?.isPrimary ? 'bg-primary-lighter' : 'bg-white'
    }`}>
      <img src={imagePath} alt="" className="mb-3 h-16 w-16 object-contain" />
      
      {cms?.isPrimary && (
        <div className="absolute top-3 right-3 flex flex-row items-center gap-1 rounded-2xl bg-[#78a529] p-1 px-2 text-sm font-bold text-white">
          <svg className="usa-icon" aria-hidden="true" focusable="false" role="img">
            <use href="/assets/img/sprite.svg#star"></use>
          </svg>
          Primary
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="whitespace-pre-line text-lg font-semibold leading-snug text-black">
          {agency.title}
        </h3>
        <p className="mt-3 text-sm text-gray-700 leading-normal">
          {cms?.cardDescription || "Click learn more to view complete details, contacts, and backgrounds."}
        </p>
      </div>

      <Link
        href={`/agency/${agency.databaseId}`}
        className="mt-auto inline-block pt-4 text-sm font-bold text-black underline transition-colors duration-200 hover:text-primary"
      >
        Learn More
      </Link>
    </div>
  );
}
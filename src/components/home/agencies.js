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
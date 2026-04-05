export default function ProcessingPermits() {
  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Agency Heading */}
      <p className="text-green-600 font-bold">PROCESSING PERMITS</p>
      <p className="font-bold text-2xl">Acts and Regulatory Agencies</p>
      <p className="text-xs">
        Learn how permits for algal bloom control are reviewed and approved,
        what regulatory agencies are involved, and what steps are needed from
        application to implementation and deployment.
      </p>

      {/* Cards */}
      <div className="flex flex-row">
        {/* FIFRA */}
        <div className="border bg-primary-lighter px-25 py-20 mr-108">
          <h1>Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA)</h1>
          <p>
            Regulates the use, sale, distribution, and registration of
            pesticides and algicides.
          </p>
          <p className="underline">Visit the FIFRA website</p>
          <svg
            className="usa-icon"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use href="/assets/img/sprite.svg#launch"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}

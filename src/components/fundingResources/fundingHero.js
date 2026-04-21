export default function FundingHero() {
  return (
    <div className="tracking-wide">
      {/* link to go back to home */}
      <div className="flex flex-row mt-5 ml-4 font-light">
        <svg
          className="usa-icon text-gray-500"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>
        <a className="text-black ml-2 hover:text-primary text-sm" href="/">
          Funding Resources
        </a>
      </div>

      {/* funding hero image */}
      <div className="relative mt-8">
        <img src="/" className="w-full object-cover h-105" />
        <div className="absolute inset-0 bg-black opacity-80 z-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
          <h1 className="!text-6xl font-bold">Funding Opportunities</h1>
          <p className="text-xl">
            A repository of available grants and funding options
          </p>
          <p className="text-xl">for your research.</p>
        </div>
      </div>

      <div className="border-primary-lighter border-b-6 mt-20">
        <h1 className="text-primary-darker">US HAB-CTI Grant Information</h1>
        <p className="mb-6 font-light">
          One of the objectives of the US HAB-CTI is to fund extramural proof of
          concept, innovative HAB control tools and technology projects to
          assess their real-world feasibility. It is anticipated that US HAB-CTI
          research will primarily be conducted in the scale of "Tier 1" (small
          scale lab testing) or "Tier 2" (tanks, mesocosms, and raceways).
          Promising US HAB-CTI tools and technologies will be encouraged to
          apply to relevant future NOAA Prevention Control and Mitigation HAB
          competitive funding announcements or other opportunities independent
          from the US HAB-CTI (shown as "Tier 3" and "Tier 4" in image).
        </p>
      </div>
    </div>
  );
}

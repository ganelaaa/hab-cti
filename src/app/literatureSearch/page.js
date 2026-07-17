export default function LiteratureSearch() {
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
        <span className="text-primary">Literature</span>
        <span>›</span>
        <span className="text-gray-800">Literature Search</span>
      </div>

      {/* Main Body */}
      <div className="text-center mt-40">
        <h1 className="text-primary font-bold">Literature Search</h1>
        <p>
          Discover relevant studies, articles, and insights - all in one place.
        </p>
      </div>

      {/* searchbar */}
      <div className="flex justify-center mt-10">
        <div className="flex items-center rounded-lg border border-primary bg-white px-3 py-2 w-96">
          <svg
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use href="/assets/img/sprite.svg#search"></use>
          </svg>
          <input
            type="search"
            placeholder="What research are you looking for today?"
            className="navbar-search min-w-0 flex-1 bg-transparent text-xs text-gray-600 outline-none"
          />
        </div>
      </div>

      {/* filter */}
      <div className="flex flex-row gap-7 justify-center mt-10">
        <p className="font-bold text-primary">Filter by:</p>
        <p>class</p>
        <p>mitigation</p>
        <p>species</p>
        <p>scale</p>
        <p>waterbody</p>
      </div>

      {/* data partners */}
      <div className="mt-30">
        <p className="text-center">Data partners</p>
        <div className="flex flex-row justify-center gap-10 mt-4">
          <img
            src="/NOAA.svg"
            alt="NOAA"
            className="w-18 h-18 rounded-full object-contain"
          />
          <img
            src="/IMET.jpg"
            alt="IMET"
            className="w-18 h-18 rounded-full object-contain"
          />
          <img
            src="/MOTE.png"
            alt="MOTE"
            className="w-18 h-18 rounded-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

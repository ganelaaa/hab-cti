export default function LiteratureSearch() {
  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Breadcrumb */}
      <div className="flex flex-row items-center gap-2 text-sm text-gray-500 mb-8">
        <a href="/" className="text-primary hover:underline">
          Home
        </a>
        <span>›</span>
        <span className="text-primary">Literature</span>
        <span>›</span>
        <span className="text-gray-800">Literature Search</span>
      </div>

      {/* title */}
      <div className="text-center">
        <h1 className="text-4xl text-primary font-bold">Literature Search</h1>
        <p>
          Discover relevant studies, articles, and insights - all in one place.
        </p>
        {/* searchbar */}
        <div>searchbar</div>
        {/* filters */}
        <p>filter by:</p>

        {/* data partners */}
        <p className="text-sm">Data partners</p>
        <p>Images here</p>
      </div>
    </div>
  );
}

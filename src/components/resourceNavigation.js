export default function ResourceNavigation() {
  return (
    <div className="px-20 py-10">
      {/* Agency Heading */}
      <p className="text-green-600">RESOURCE NAVIGATION</p>
      <p className="font-bold text-2xl">Quick Access to Key Tools</p>
      <p className="text-xs">
        Easily find permits, research, technologies, and approved products
        related to HAB control.
      </p>

      {/* Cards */}
      <div className="flex flex-row mt-7">
        <div className="bg-amber-200 border-l-red-700 text-black py-3 px-3">
          <div className="font-bold">
            <div className="text-xl">Attention!</div>
            <h3>Content last updated as of: March 04, 2025, Monday</h3>
          </div>
        </div>

        {/* Literature*/}
      </div>
    </div>
  );
}

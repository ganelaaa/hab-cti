export default function ControlStrategies() {
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
        <span className="text-gray-800">Control Strategies</span>
      </div>

      {/* WIP */}
      <div className="text-center mb-8 mt-10">
        <h1 className="text-3xl text-primary font-bold">
          General Control Strategies - Under Construction
        </h1>
        <p>Page is currently under construction</p>
        <p className="mt-10">
          For information about general cyanobacteria control strategies for
          freshwater,
          <p className="mt-5">
            please visit the{" "}
            <a
              className="text-primary text-underline"
              href="https://hcb-2.itrcweb.org/management-criteria-tool/"
            >
              Interstate Technology Regulatory Council’s Management Criteria
              Tool
            </a>
          </p>
        </p>
      </div>
    </div>
  );
}

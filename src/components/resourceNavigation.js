export default function ResourceNavigation() {
  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Quick Access Heading */}
      <p className="text-green-600 text-sm font-semibold">
        RESOURCE NAVIGATION
      </p>
      <p className="font-bold text-3xl text-(--black)] mt-1">
        Quick Access to Key Tools
      </p>
      <p className="text-sm text-(--gray)] mt-2 max-w-xl">
        Easily find permits, research, technologies, and approved products
        related to HAB control.
      </p>

      {/* Laws and Permit Section */}
      <fieldset className="border border-primary rounded-xl py-10 px-10 mt-8 font-medium">
        <legend className="text-primary px-2 text-sm font-medium">
          Laws and Permits
        </legend>

        <div className="flex flex-row gap-6 mt-4">
          <div className="border border-gray-300 rounded-md py-5 px-5 w-full bg-white hover:shadow-sm transition">
            <p className="font-semibold text-black">
              <svg
                className="usa-icon"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <use href="/assets/img/sprite.svg#star"></use>
              </svg>
              Research Requirements
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Data Requirements for EPA Registration
            </p>
          </div>

          <div className="border border-gray-300 rounded-md py-5 px-5 w-full bg-white hover:shadow-sm transition">
            <p className="font-semibold text-black">
              <svg
                className="usa-icon"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <use href="/assets/img/sprite.svg#construction_worker"></use>
              </svg>
              Field Studies
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Experimental Use Permits
            </p>
          </div>

          <div className="border border-gray-300 rounded-md py-5 px-5 w-full bg-white hover:shadow-sm transition">
            <p className="font-semibold text-black">
              <svg
                className="usa-icon"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <use href="/assets/img/sprite.svg#link"></use>
              </svg>
              External Resources
            </p>
            <p className="text-sm text-gray-700 mt-1">Learn More!</p>
          </div>
        </div>

        <div className="flex flex-row gap-6 mt-6">
          <div className="border border-gray-300 rounded-md py-5 px-5 w-full bg-white hover:shadow-sm transition">
            <p className="font-semibold text-black">
              <svg
                className="usa-icon"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <use href="/assets/img/sprite.svg#thumb_up_alt"></use>
              </svg>
              Getting an Approval
            </p>
            <p className="text-sm text-gray-700 mt-1">Permits & Regulations</p>
          </div>

          <div className="border border-gray-300 rounded-md py-5 px-5 w-full bg-white hover:shadow-sm transition">
            <p className="font-semibold text-black">
              <svg
                className="usa-icon"
                aria-hidden="true"
                focusable="false"
                role="img"
              >
                <use href="/assets/img/sprite.svg#topic"></use>
              </svg>
              Regulatory Agencies
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Federal & State Regulations
            </p>
          </div>
        </div>
      </fieldset>

      {/* Literature */}
      <div className="flex flex-row gap-8 mt-10">
        <fieldset className="border border-primary rounded-xl py-8 px-8 w-2/3">
          <legend className="text-primary px-2 text-sm font-medium">
            Literature
          </legend>

          <div className="flex flex-row gap-6 mt-4">
            <div className="border border-gray-300 rounded-md py-5 px-5 w-full bg-white">
              <p className="font-semibold text-black">
                <svg
                  className="usa-icon"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use href="/assets/img/sprite.svg#public"></use>
                </svg>
                HABs 101
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Species, Impacts, Research, Resources, Response
              </p>
            </div>

            <div className="border border-gray-300 rounded-md py-5 px-5 w-full bg-white">
              <p className="font-semibold text-black">
                <svg
                  className="usa-icon"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use href="/assets/img/sprite.svg#local_library"></use>
                </svg>
                Literature Search
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Publications on HAB control technologies
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-6 mt-6">
            <div className="border border-gray-300 rounded-md py-5 px-5 w-full bg-white">
              <p className="font-semibold text-black">
                <svg
                  className="usa-icon"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use href="/assets/img/sprite.svg#contact_page"></use>
                </svg>
                Consultants Database
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Get Consultants or Experts
              </p>
            </div>

            <div className="border border-gray-300 rounded-md py-5 px-5 w-full bg-white">
              <p className="font-semibold text-black">
                <svg
                  className="usa-icon"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use href="/assets/img/sprite.svg#history"></use>
                </svg>
                Control Technologies
              </p>
              <p className="text-sm text-gray-600 mt-1">Common Concepts</p>
            </div>
          </div>
        </fieldset>

        {/* Products */}
        <fieldset className="border border-primary rounded-xl py-8 px-8 w-1/3">
          <legend className="text-primary px-2 text-sm font-medium">
            Products
          </legend>

          <div className="flex flex-col gap-6 mt-4">
            <div className="border border-gray-300 rounded-md py-5 px-5 bg-white">
              <p className="font-semibold text-black">
                <svg
                  className="usa-icon"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use href="/assets/img/sprite.svg#verified"></use>
                </svg>
                Registered Products
              </p>
              <p className="text-sm text-gray mt-1">Product Catalogue</p>
            </div>

            <div className="border border-gray-300 rounded-md py-5 px-5 bg-white">
              <p className="font-semibold text-black">
                <svg
                  className="usa-icon"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use href="/assets/img/sprite.svg#search"></use>
                </svg>
                Patent Search
              </p>
              <p className="text-sm text-gray-600 mt-1">
                IP, Inventorship Agreements & Registration Information
              </p>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

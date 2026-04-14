export default function Footer() {
  return (
    <div className="mt-15 tracking-wide">
      {/* Return to top */}
      <div className="flex justify-center py-2">
        <a href="#" className="text-primary underline text-sm text-center mb-4">
          Return to top
        </a>
      </div>
      <div className="bg-primary-darker text-white">
        <div className="px-20 py-20">
          <div className="flex flex-row justify-between items-center mb-8">
            {/* Logo */}
            <div className="flex flex-row items-center gap-4">
              <div className="rounded-full w-18">
                <img
                  src="/logo.png"
                  alt="US HAB-CTI Logo"
                  className="rounded-full"
                />
              </div>

              {/* Title */}
              <div className="text-2xl font-semibold">
                <p>United States Harmful Algal</p>
                <div>Bloom Control Technologies Incubator</div>
              </div>
            </div>

            {/* Sign Up */}
            <div className="flex flex-col gap-2">
              <div className="font-bold text-xl">Sign up for Announcements</div>
              <div>Get updates delivered to your e-mail!</div>
              <div className="flex flex-row gap-2">
                <input
                  type="email"
                  placeholder="yourmail@example.com"
                  className="px-3 py-1 text-sm text-black rounded w-56 bg-white justify-self-end-safe"
                />
                <button className="usa-button">
                  Sign Up
                  <svg
                    className="usa-icon"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                  >
                    <use href="/assets/img/sprite.svg#arrow_forward"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* Divider */}
          <hr className="border-gray-400 mb-8" />

          <div className="flex flex-row justify-between gap-8">
            {/* Main Links column */}
            <div className="flex flex-col gap-5">
              <div className="underline font-bold">Main Links</div>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                <li>Home</li>
                <li>Guidance by Role</li>
                <li>Acts & Agencies</li>
                <li>FAQs</li>
                <li>Disclaimer</li>
              </ul>
            </div>

            {/* Researcher column */}
            <div className="flex flex-col gap-5">
              <div className="underline font-bold">Researcher</div>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                <li>Literature Search</li>
                <li>Regulations Directory</li>
                <li>Research Guidelines</li>
                <li>Field Studies</li>
              </ul>
            </div>

            {/* Tech Developer column */}
            <div className="flex flex-col gap-5">
              <div className="underline font-bold">Tech Developer</div>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                <li>Patent Check</li>
                <li>Consultants Database</li>
                <li>Timelines and Costs</li>
                <li>Getting Approvals</li>
                <li>External Resources</li>
              </ul>
            </div>

            {/* Manager column */}
            <div className="flex flex-col gap-5">
              <div className="underline font-bold">Manager</div>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                <li>Registered Products</li>
                <li>Existing Literature</li>
              </ul>
            </div>

            {/* Contact column */}
            <div className="flex flex-col gap-5">
              <div className="underline font-bold">Contact</div>
              <p className="font-extrabold">
                <svg
                  className="usa-icon mr-2.5"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use href="/assets/img/sprite.svg#phone"></use>
                </svg>
                (800) CALL-GOVT
              </p>
              <p className="font-bold">
                <svg
                  className="usa-icon mr-2.5"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use href="/assets/img/sprite.svg#mail_outline"></use>
                </svg>
                info@agency.gov
              </p>
              <div className="underline font-bold mt-2">Join Us</div>
              <div className="flex flex-row gap-3 mt-1 text-2xl">
                <a href="#" className="text-white">
                  <svg
                    className="usa-icon hover:text-red-500"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                  >
                    <use href="/assets/img/sprite.svg#youtube"></use>
                  </svg>
                </a>
                <a href="#" className="text-white">
                  <svg
                    className="usa-icon hover:text-blue-800"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                  >
                    <use href="/assets/img/sprite.svg#facebook"></use>
                  </svg>
                </a>
                <a href="#" className="text-white">
                  <svg
                    className="usa-icon hover:text-blue-300"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                  >
                    <use href="/assets/img/sprite.svg#twitter"></use>
                  </svg>
                </a>
                <a href="#" className="text-white">
                  <svg
                    className="usa-icon hover:text-pink-500"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                  >
                    <use href="/assets/img/sprite.svg#instagram"></use>
                  </svg>
                </a>
                <a href="#" className="text-white">
                  <svg
                    className="usa-icon hover:text-blue-600"
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                  >
                    <use href="/assets/img/sprite.svg#linkedin"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-400 mt-8 mb-4" />

          {/* Copyright and Legal Stuff */}
          <div className="flex flex-row justify-between items-center text-sm font-bold">
            <p> © UMD HCIM'25 + US-HABCTI.2024-25. All rights reserved.</p>
            <div className="flex gap-12">
              <a href="#" className="underline hover:text-primary-lighter">
                Legal Notice
              </a>
              <a href="#" className="underline hover:text-primary-lighter">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

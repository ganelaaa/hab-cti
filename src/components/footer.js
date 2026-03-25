export default function Footer() {
  return (
    <div className="mt-15">
      {/* Return to top */}
      <div className="flex justify-center py-2">
        <a href="#" className="text-blue-800 underline text-sm text-center">
          Return to top
        </a>
      </div>
      <div className="bg-primary text-white">
        <div className="px-20 py-20">
          <div className="flex flex-row justify-between items-center mb-8">
            {/* Logo */}
            <div className="flex flex-row items-center gap-4">
              <div className="bg-blue-700 rounded-full w-12 h-12">
                Logo Here
              </div>

              {/* Title */}
              <div className="text-xl font-m">
                <p>United States Harmful Algal</p>
                <div>Bloom Control Technologies Incubator</div>
              </div>
            </div>

            {/* Sign Up */}
            <div className="flex flex-col gap-2">
              <div className="font-bold text-lg">Sign up for Announcements</div>
              <div>Get updates delivered to your e-mail!</div>
              <div className="flex flex-row gap-2">
                <input
                  type="email"
                  placeholder="yourmail@example.com"
                  className="px-1 py-1 text-sm text-black rounded w-56 bg-white justify-self-end-safe"
                />
                <button className="usa-button bg-blue-700">Sign Up</button>
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
              <p>(800) CALL-GOVT</p>
              <p>info@agency.gov</p>
              <div className="underline font-bold mt-2">Join Us</div>
              <div className="flex flex-row gap-3 mt-1">
                <a href="#" className="text-white">
                  icon
                </a>
                <a href="#" className="text-white">
                  icon
                </a>
                <a href="#" className="text-white">
                  icon
                </a>
                <a href="#" className="text-white">
                  icon
                </a>
                <a href="#" className="text-white">
                  icon
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-400 mt-8 mb-4" />

          {/* Copyright and Legal Stuff */}
          <div className="flex flex-row justify-between items-center text-sm font-bold">
            <p> © UMD HCIM'25 + US-HABCTI.2024-25. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="underline">
                Legal Notice
              </a>
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

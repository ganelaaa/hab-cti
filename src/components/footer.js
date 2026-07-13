"use client";
export default function Footer() {
  const contactEmail = "info@agency.gov"; 
  return (
    <div className="mt-5 tracking-wide">
      {/* Return to top */}
      <div className="flex justify-center py-2">
        <p
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-primary-darker text-primary underline text-lg text-center mb-4 transition-colors duration-300 cursor-pointer"
        >
          Return to top
        </p>
      </div>
      <div className="bg-primary-darker text-white">
        <div className="px-20 py-8">
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
                <p>Harmful Algal Bloom Control</p>
                <div>Technologies & Regulatory Logistics</div>
              </div>
            </div>

            {/* Sign Up */}
            <div className="flex flex-col gap-2">
              <div className="font-bold text-xl">Contact</div>
              <div>For questions, updates, or website feedback, contact us at:</div>
              <div>{contactEmail}</div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-400 mt-8 mb-4" />

          {/* Copyright and Legal Stuff */}
          <div className="flex flex-row justify-between items-center text-sm font-bold">
            <p> © UMD HCIM'25 + US-HABCTI.2024-25. All rights reserved.</p>
            <div className="flex gap-12">
              <a className="underline hover:text-primary-lighter">
                Legal Notice
              </a>
              <a className="underline hover:text-primary-lighter">
                Disclaimer
              </a>
              <a className="underline hover:text-primary-lighter">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

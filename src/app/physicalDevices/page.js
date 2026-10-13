"use client";

import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "regulation-devices", label: "Regulation of Devices" },
  { id: "device-labeling", label: "Device Labeling" },
  { id: "device-determination", label: "Device Determination" },
  { id: "additional-information", label: "Additional Information" },
  { id: "questions", label: "Questions about Physical Devices" },
];

function SectionHeader({ children }) {
  return <h2 className="mt-2 mb-1 font-bold text-black">{children}</h2>;
}

export default function PhysicalDevices() {
  const [activeSection, setActiveSection] = useState("overview");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Breadcrumb */}
      <div className="mb-8 flex flex-row items-center gap-2 text-sm text-gray-500">
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
        <span className="text-primary">Processing Permits</span>
        <span>›</span>
        <a href="/fifra" className="text-primary hover:underline">
          FIFRA
        </a>
        <span>›</span>
        <a
          href="/pesticideRegistration"
          className="text-primary hover:underline"
        >
          Pesticide Registration
        </a>
        <span>›</span>
        <span className="text-gray-800">Physical Devices</span>
      </div>

      {/* Page Hero Title */}
      <InternalPageHero
        title="Physical Devices"
        subtitle="Physical device classification and regulation under FIFRA"
      />

      {/* Body */}
      <div className="mt-0 flex flex-row gap-10">
        {/* Sticky nav */}
        <div className="mt-10 w-56 shrink-0">
          <div className="sticky top-8">
            <p className="mb-3 font-bold text-black">On this page</p>
            <div className="flex flex-col border-l-2 border-gray-200">
              {sections.map((section) => (
                <p
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className={`cursor-pointer py-2 pl-4 text-sm transition-colors duration-200 hover:text-primary ${
                    activeSection === section.id
                      ? "-ml-[2px] border-l-4 border-black font-semibold text-black"
                      : "text-primary"
                  }`}
                >
                  {section.label}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          {/* Overview */}
          <div
            id="overview"
            className="mt-10 scroll-mt-28 border-primary-lighter border-b-4"
          >
            <p className="font-bold">
              {" "}
              The information presented on this webpage was collected from
              <a
                className="text-primary text-underline"
                href="https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-13-devices"
              >
                {" "}
                Chapter 13: Devices, of the EPA’s Pesticide Registration
                Manual{" "}
              </a>
              and/or{" "}
              <a
                className="text-primary text-underline"
                href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156"
              >
                40 CFR Part 156
              </a>{" "}
              and{" "}
              <a
                className="text-primary text-underline"
                href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-152/subpart-Z"
              >
                40 CFR 152.500 Z
              </a>
              . For more details, please visit the agency’s website. For a full
              list of contact information for individuals, offices, and topics,
              visit the{" "}
              <a
                className="text-primary text-underline"
                href="https://www.epa.gov/pesticide-contacts/contacting-epa-about-regulating-pesticides-issues"
              >
                EPA’s Pesticide Contacts Page
              </a>
              .{" "}
            </p>
            <h1 className="font-bold text-primary">Overview</h1>

            <p className="mt-5">
              FIFRA defines a device as an instrument or contrivance, generally
              working by physical means (e.g., electricity, light, or other
              mechanical or physical means) and not containing a substance or
              mixture of substances, that is intended to{" "}
              <a className="text-underline">
                trap, destroy, repel, or mitigate
              </a>{" "}
              a pest; but not including equipment used for the application of
              pesticides when sold separately therefrom. Refer to FIFRA section
              2(h).{" "}
            </p>

            <p className="mt-5 mb-4">
              <a className="font-bold">
                Devices are not required to be registered
              </a>{" "}
              under FIFRA section 3. However,{" "}
              <a className="font-bold">
                devices are subject to certain requirements
              </a>{" "}
              (labeling) of FIFRA as specified in{" "}
              <a
                className="text-primary text-underline"
                href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-152/subpart-Z"
              >
                40 CFR 152.500 Z
              </a>
              .
            </p>
          </div>

          {/* Regulation of Devices */}
          <div
            id="regulation-devices"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Regulation of Devices</h1>

            <p>
              Though devices do not require registration with the EPA, most
              devices are subject to EPA regulations under FIFRA section 2(q)(1)
              (
              <a
                className="text-primary text-underline"
                href="/labelingInfoPage"
              >
                device & pesticide labeling
              </a>
              ).
            </p>

            <p className="mt-8">
              Devices subject to FIFRA section 2(q)(1) regulation:
            </p>

            <ul className="mt-3 list-disc pl-6">
              <li className="mt-5">
                Certain ultraviolet light systems, ozone generators, water
                filters and air filters (except those containing substances),
                and ultrasonic devices
              </li>
              <li className="mt-5">
                Certain high-frequency sound generators, carbide cannons, foils,
                and rotating devices for which claims are made to repel birds
              </li>
              <li className="mt-5">
                Black light traps, fly traps, electronic and heat screens, fly
                ribbons, and fly paper for which claims are made to kill or
                entrap certain insects
              </li>
              <li className="mt-5">
                Mole thumpers, sound repellents, foils, and rotating devices for
                which claims are made to repel certain mammals
              </li>
              <li className="mt-5">
                Products that are claimed to control pests via electromagnetic
                and/or electrical emissions (e.g., handheld bug zappers,
                electric flea combs)
              </li>
              <li className="mt-5">
                Products that are claimed to control burrowing animals via
                product-caused subterranean explosions
              </li>
              <li className="mt-5">
                Products that work via principles indicated in the 1976 Federal
                Register Notice for one category of pest but are claimed to
                control pests of different types (e.g., sticky traps for rodents
                (without attractants), light or laser repellents for birds,
                etc.).
              </li>
            </ul>

            <p className="mt-10">
              Devices not regulated under FIFRA section 2(q)(1):
            </p>
            <ul className="list-disc pl-6">
              <li className="mt-5">
                Devices that depend for their effectiveness more upon the
                performance of the person using the device than on the
                performance of the device itself; and
              </li>
              <li className="mt-5 mb-5">
                Devices that operate to entrap vertebrate animals.
              </li>
            </ul>
          </div>

          {/* Device Labeling */}
          <div
            id="device-labeling"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Device Labeling</h1>
            <p>
              Devices are subject to the{" "}
              <a
                className="text-primary text-underline"
                href="/labelingInfoPage"
              >
                labeling requirements
              </a>{" "}
              of FIFRA section 2(q)(1) and{" "}
              <a
                className="text-primary text-underline"
                href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156"
              >
                40 CFR Part 156
              </a>
              . A compliant EPA-regulated device will include an EPA
              Establishment Number on the label (associated with the location
              where the device is produced) but does not require an EPA
              Registration Number; example below.{" "}
            </p>

            <img
              src="device-img1.png"
              alt="image here"
              className="mt-3 w-full max-w-8"
            />
          </div>

          {/* Device Determination */}
          <div
            id="device-determination"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Device Determination</h1>

            <p className="text-underline font-bold">Device Examples</p>

            <img
              src="device-img2.png"
              alt="image here"
              className="mt-3 w-full max-w-8"
            />
            <p>
              Figure 1. Examples of pesticide devices and regulatory
              applicability. Image a.) ultrasonic device used to{" "}
              <a className="text-underline">repel</a> algae, preventing blooms
              in surface waters; b.) bug zapper, attracts insects with UV light
              and <a className="text-underline">destroys</a> insects with
              electricity; c.) cockroach trap containing insecticide to kill
              cockroaches; d.) spray tank and hose attachment for dispensing
              pesticides; e.) fly swatter.
            </p>

            <p className="mt-5">
              In Figure 1, a and b are regulated physical devices because the
              device itself enacts the means for repelling or destroying pests,
              via sonic pulse and electric charge, respectively. Whereas d and e
              are unregulated devices because the device itself does not repel,
              destroy, or mitigate pests. Both d and e only work when manually
              used by an individual. Therefore, the mechanism of action relies
              on manual operation rather than the device alone repelling,
              destroying, or mitigating a pest. The cockroach trap (Figure 1c)
              is not considered a physical device because it is a vessel that
              holds a conventional (chemical-based) insecticide. Likewise, a
              canister of insecticide with a spray top would not be considered a
              device. Both canister-based and trap-based insecticides require
              full FIFRA registration.{" "}
            </p>
            <p className="text-underline font-bold mt-8">
              Device Determination by EPA
            </p>

            <p className="mt-5">
              IF YOU ARE UNCERTAIN IF YOUR PRODUCT IS A DEVICE: You can obtain a
              device determination from EPA by submitting{" "}
              <a
                className="text-primary text-underline"
                href="https://www.epa.gov/pesticide-registration/pesticide-registration-manual-blank-forms"
              >
                Form 8570-1
              </a>{" "}
              with the following information. This is{" "}
              <a className="text-underline">not a required step</a> but is
              recommended for new applicants.
            </p>

            <p className="mt-10">
              Submit{" "}
              <a
                className="text-primary text-underline"
                href="https://www.epa.gov/system/files/documents/2025-06/8570-1.pdf"
              >
                8570-1 application form
              </a>{" "}
              (select “miscellaneous” and provide an explanation in the space
              provided);
            </p>

            <ul className="list-disc pl-6">
              <li className="mt-5">
                Submit a cover letter on company letterhead requesting a device
                determination and include as much of the following information
                as possible:
              </li>
              <li className="mt-5">
                Your EPA-issued{" "}
                <a
                  className="text-primary text-underline"
                  href="/pesticideRegistration"
                >
                  company number
                </a>
                ;
              </li>
              <li className="mt-5">The complete brand names of the product;</li>
              <li className="mt-5">
                Complete copy of the{" "}
                <a
                  className="text-primary text-underline"
                  href="/labelingInfoPage"
                >
                  label
                </a>{" "}
                for the product, and a statement of all claims to be made for
                the product, including all written, printed, or broadcast claims
                made for the product;
              </li>
              <li className="mt-5">
                Directions for use and warnings or cautionary statements;
              </li>
              <li className="mt-5">
                All material distributed with the product;
              </li>
              <li className="mt-5">
                A detailed written description of how the product works to kill,
                destroy, repel, or mitigate a pest;
              </li>
              <li className="mt-5">
                Starting material inputs or ingredients or specifications used
                in the operation of the product. Ingredients in the product must
                be identified by common name and CAS number if applicable;
              </li>
              <li className="mt-5">
                Schematic diagram or detailed engineering drawings, diagrams,
                flow diagrams or patent(s) application information. Note: if a
                patent(s) has been issued, please include copies;
              </li>
              <li className="mt-5">
                Photographs of the product from all sides, including digital
                copies available upon request; and
              </li>
              <li className="mt-5">
                <a
                  className="text-primary text-underline"
                  href="https://www.epa.gov/pesticides/pesticide-devices-guide-consumers#examples"
                >
                  Comparisons to current industry products
                </a>
                ;
              </li>
              <li className="mt-5 mb-5">
                Provide proof of payment:{" "}
                <a
                  className="text-primary text-underline"
                  href="https://www.epa.gov/pria-fees/m009-pria-fee-category"
                >
                  PRIA code M009
                </a>
                . The cost is $2,482* and the timeframe for EPA review is 4
                months.
              </li>
            </ul>
          </div>

          {/* Additional Information */}
          <div
            id="additional-information"
            className="scroll-mt-28 border-b-4 border-primary-lighter"
          >
            <h1 className="font-bold text-primary">Additional Information</h1>

            <p>
              Further information on physical devices currently on the market
              and reasoning for their device status can be found here:{" "}
              <a
                className="text-primary text-underline"
                href="https://www.epa.gov/pesticides/pesticide-devices-guide-consumers#examples"
              >
                Pesticide Devices: A Guide for Consumers
              </a>
              .{" "}
            </p>

            <p className="font-bold mt-8">State Regulations</p>
            <p className="mt-5">
              Some states have laws governing physical devices in addition to
              those imposed by FIFRA. Some state governments require
              registration of devices, including submission and review of
              efficacy data and labeling, before a device can be sold or
              distributed in that state. Navigate to the{" "}
              <a
                className="text-primary text-underline"
                href="/statePoliciesandPermits"
              >
                US Map Page
              </a>{" "}
              on this site to learn more about state-specific regulations.
            </p>

            <p className="font-bold mt-8">Additional Federal Regulations</p>
            <p className="mt-5 mb-5">
              Physical devices (both FIFRA-regulated and non-FIFRA-regulated)
              placed within{" "}
              <a
                className="text-primary text-underline"
                href="https://www.ecfr.gov/current/title-33/chapter-II/part-329"
              >
                navigable waters of the US
              </a>{" "}
              are subject to the regulatory statutes of the{" "}
              <a
                className="text-primary text-underline"
                href="https://habctrl.info/agency/418"
              >
                Rivers and Harbors Act Section 10.
              </a>{" "}
              For more information, contact your{" "}
              <a
                className="text-primary text-underline"
                href="https://www.usace.army.mil/Locations/"
              >
                US Army Corps of Engineers regional office
              </a>
              .
            </p>
          </div>

          {/* Questions / Contacts */}
          <div id="questions" className="scroll-mt-28">
            <h1 className="font-bold text-primary">
              Questions about Physical Devices?
            </h1>
            <p className="font-bold mt-5">Regulatory Requirements</p>
            <p className="mt-3">
              If you have any questions concerning regulatory requirements for
              devices that are not subject to registration, please contact:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <a
                  className="text-primary text-underline mt-5"
                  href="OPP_FIFRA_Jurisdictional_Issues@epa.gov"
                >
                  OPP_FIFRA_Jurisdictional_Issues@epa.gov
                </a>
              </li>
            </ul>

            <p className="font-bold mt-10">Other Questions</p>
            <p className="mt-3">
              Email:{" "}
              <a
                href="mailto:pesticidequestions@epa.gov"
                className="text-primary text-underline hover:text-primary-darker"
              >
                pesticidequestions@epa.gov
              </a>
            </p>
            <p>
              Complete the{" "}
              <a
                className="text-primary text-underline"
                href="https://www.epa.gov/minimum-risk-pesticides/forms/contact-us-about-minimum-risk-pesticides"
              >
                comment request form on EPA’s website
              </a>
            </p>

            <p className="font-bold mt-10">Regional EPA Office Contacts</p>
            <p className="mt-3">
              Contact your{" "}
              <a
                className="text-primary text-underline"
                href="https://www.epa.gov/aboutepa/regional-and-geographic-offices"
              >
                regional EPA office
              </a>
            </p>

            <p className="font-bold mt-10">EPA Contacts</p>
            <p className="mt-3">
              For a full list of contact emails for individuals, offices, and
              topics, visit the{" "}
              <a
                className="text-primary text-underline"
                href="https://www.epa.gov/pesticide-contacts/contacting-epa-about-regulating-pesticides-issues"
              >
                EPA’s Pesticide Contacts Page
              </a>
              .{" "}
            </p>

            <p className="font-bold mt-10">
              This information presented on this page was collected from{" "}
              <a
                className="text-primary text-underline"
                href="https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-13-devices"
              >
                Chapter 13: Devices, of the EPA’s Pesticide Registration
                Manual{" "}
              </a>{" "}
              and/or{" "}
              <a
                className="text-primary text-underline"
                href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156"
              >
                40 CFR Part 156
              </a>
              . For more details, please visit the agency’s website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

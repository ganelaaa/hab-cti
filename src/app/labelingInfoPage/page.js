"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";


const sections = [
    { id: "overview", label: "Overview" },
    { id: "label-vs-labeling", label: "Label vs Labeling" },
    { id: "algaecide-label-requirements", label: "Algaecide Label Requirements" },
    { id: "front-panel-template", label: "Front Panel Template" },
    { id: "back-panel-template", label: "Back Panel Template" },
    { id: "example-labels", label: "Example Labels" },
    { id: "additional-documentation", label: "Additional Documentation" },
    { id: "label-review-training", label: "Pesticide Label Review Training" },
    { id: "additional-information", label: "Additional Information" },
    { id: "questions", label: "Questions about FIFRA product labeling?" },
];

const externalLinks = {
    labelingRequirements:
        "https://www.epa.gov/pesticide-registration/labeling-requirements",
    cfrPart156:
        "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156",
    cfrPart156Full:
        "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156?toc=1",
    cfr15610:
        "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156/subpart-A/section-156.10",
    labelReviewManual:
        "https://www.epa.gov/pesticide-registration/label-review-manual",
    labelReviewManualPdf:
        "https://www.epa.gov/system/files/documents/2024-12/label_review_manual_12122024.pdf",
    pesticideLabels:
        "https://www.epa.gov/pesticide-labels",
    npicStateAgencies: "https://npic.orst.edu/reg/state_agencies.html",
    ingredientStatement:
        "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156/subpart-A/section-156.10",
    workerProtectionStatements:
        "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156/subpart-K",
    subpartD:
        "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156/subpart-D",
    subpartE:
        "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156/subpart-E",
    subpartH:
        "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156/subpart-H",
    endangeredSpecies:
        "https://www.epa.gov/endangered-species",
    appril:
        "https://ordspub.epa.gov/ords/pesticides/f?p=APPRIL_PUBLIC:2",
    electronicSubmissionLabels:
        "https://www.epa.gov/pesticide-registration/electronic-submission-labels",
    safetyDataSheet:
        "https://www.osha.gov/safety-data-sheets",
    labelReviewTraining:
        "https://www.epa.gov/pesticide-labels/pesticide-label-review-training",
    pesticideIngredientsLabels:
        "https://www.epa.gov/pesticide-labels/searching-pesticide-ingredients-and-labels",
    pesticideLabelingQa:
        "https://www.epa.gov/pesticide-labels/pesticide-labeling-questions-answers",
    pesticideLabelingQaForm:
        "https://www.epa.gov/pesticide-labels/forms/contact-us-about-pesticide-labeling-questions",
    logosGraphicsChapter:
        "https://www.epa.gov/sites/default/files/2017-10/documents/chap-16-dec-2014.pdf",
};

function ExternalLink({ href, children, className = "" }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-primary text-underline ${className}`}
        >
            {children}
        </a>
    );
}

function MailLink({ email, children }) {
    return (
        <a href={`mailto:${email}`} className="text-primary text-underline">
            {children || email}
        </a>
    );
}

export default function LabelingPage() {
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

                <Link href="/" className="text-primary hover:underline">
                    Home
                </Link>

                <span>›</span>

                <Link href="/learnMore" className="text-primary hover:underline">
                    Learn More
                </Link>

                <span>›</span>

                <span className="text-gray-800">Product Labeling</span>
            </div>

            {/* Page Hero Title */}
            <InternalPageHero
                title="Product Labeling"
                subtitle="Pesticide Product Label Requirements"
                link={externalLinks.labelingRequirements}
            />

            {/* scroll left side */}
            <div className="mt-0 flex flex-row gap-10">
                <div className="mt-10 w-56 shrink-0">
                    <div className="sticky top-8">
                        <p className="mb-3 font-bold text-black">On this page</p>

                        <div className="flex flex-col border-l-2 border-gray-200">
                            {sections.map((section) => (
                                <p
                                    key={section.id}
                                    onClick={() => scrollTo(section.id)}
                                    className={`cursor-pointer py-2 pl-4 text-sm transition-colors duration-200 hover:text-primary ${activeSection === section.id
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

                <div className="min-w-0 flex-1">
                    {/* overview section */}
                    <div
                        id="overview"
                        className="mt-10 scroll-mt-28 border-b-4 border-primary-lighter"
                    >
                        <h1 className="font-bold text-primary">Overview</h1>

                        <div className="mb-8 text-lg">
                            <p>
                                FIFRA-approved product labels must be in accordance with the
                                requirements in{" "}
                                <ExternalLink href={externalLinks.cfrPart156}>
                                    40 CFR Part 156
                                </ExternalLink>
                                . Under FIFRA regulation, “the label is the law,” meaning it is
                                illegal to use a product in any way other than that prescribed by
                                its label. As such, it is imperative that applicants stringently
                                follow labeling guidelines.
                            </p>

                            <p className="mt-5">
                                Language used in labels must be on clear, contrasting
                                backgrounds in text no smaller than 6-point font. Labels must not
                                include false or misleading statements about product composition,
                                efficacy, endorsement, safety claims, comparative or qualitative
                                statements, or true statements used in such a way to give a false
                                or misleading impression to the purchaser. Labelling requirements
                                may differ by state, but do not preclude any of the FIFRA label
                                components. To determine the policy of an individual state, use
                                the external link to the{" "}
                                <ExternalLink href={externalLinks.npicStateAgencies}>
                                    National Pesticide Information Center
                                </ExternalLink>{" "}
                                or the internal link to the{" "}
                                <Link
                                    href="/regulationsDirectory"
                                    className="text-primary text-underline"
                                >
                                    US Regulatory Map
                                </Link>
                                .
                            </p>

                            <p className="mt-5">
                                The information highlighted in the algaecide labeling
                                requirements section provides a basic list of components.
                                However, each component must follow strict and comprehensive
                                guidelines that are detailed in both the{" "}
                                <ExternalLink href={externalLinks.cfrPart156}>
                                    40 CFR Part 156- Labeling Requirements for Pesticides and
                                    Devices
                                </ExternalLink>{" "}
                                and the EPA Office of Pesticide Programs’{" "}
                                <ExternalLink href={externalLinks.labelReviewManual}>
                                    Label Review Manual
                                </ExternalLink>
                                .
                            </p>
                        </div>
                    </div>

                    {/* label vs labeling section */}
                    <div
                        id="label-vs-labeling"
                        className="scroll-mt-28 border-b-4 border-primary-lighter"
                    >
                        <h1 className="font-bold text-primary">Label vs Labeling</h1>

                        <div className="mb-8 text-lg">
                            <ul className="ml-6 list-disc">
                                <li>
                                    <b>Label.</b> The term “label” is defined as “the written,
                                    printed, or graphic matter on, or attached to, the pesticide or
                                    device or any of its containers or wrappers.”
                                    <sup>1</sup>
                                </li>

                                <li className="mt-3">
                                    <b>Labeling.</b> The term “labeling” is defined as “all labels
                                    and all other written, printed, or graphic matter: (a)
                                    accompanying the pesticide or device at any time; or (b) to
                                    which reference is made on the label or in literature
                                    accompanying the pesticide or device, except to current
                                    official publications of the Environmental Protection Agency,
                                    the United States Departments of Agriculture and Interior, and
                                    the Department of Health and Human Services, State experiment
                                    stations, State agricultural colleges, and other similar
                                    Federal or State institutions or agencies authorized by law to
                                    conduct research in the field of pesticides”.<sup>1</sup>
                                </li>
                            </ul>

                            <p className="mt-6 text-base">
                                <sup>1</sup>This information was collected from the{" "}
                                <ExternalLink href={externalLinks.pesticideLabels}>
                                    EPA Pesticide Labels
                                </ExternalLink>{" "}
                                page.
                            </p>
                        </div>
                    </div>

                    {/* algaecide label requirements */}
                    <div
                        id="algaecide-label-requirements"
                        className="scroll-mt-28 border-b-4 border-primary-lighter"
                    >
                        <h1 className="font-bold text-primary">
                            Algaecide Label Requirements
                            <sup>2</sup>
                        </h1>

                        <div className="mb-8 text-lg">
                            <p className="font-bold">Front Panel Information</p>

                            <ul className="mt-3 ml-6 list-disc">
                                <li>Restricted Use Statement (if applicable)</li>
                                <li className="mt-3">Name, brand, or trademark</li>
                                <li className="mt-3">
                                    Ingredient statement
                                    <ul className="mt-3 ml-6 list-[circle]">
                                        <li>Name and percentage by weight of active ingredients</li>
                                        <li className="mt-3">
                                            Total percentage by weight of all inert ingredients
                                        </li>
                                        <li className="mt-3">
                                            If the pesticide contains arsenic in any form, a statement
                                            of the percentages of total and water-soluble arsenic
                                            calculated as elemental arsenic
                                        </li>
                                        <li className="mt-3">
                                            <ExternalLink href={externalLinks.ingredientStatement}>
                                                Example ingredient labeling
                                            </ExternalLink>
                                        </li>
                                    </ul>
                                </li>
                                <li className="mt-3">
                                    The statement “Keep out of reach of children.”
                                </li>
                                <li className="mt-3">
                                    Signal word based on acute toxicity (I. DANGER, II. WARNING,
                                    III. CAUTION, IV. None Required). Products classified as
                                    Toxicity Category I or II must also bear the corresponding
                                    Spanish signal word (“Peligro” for Toxicity Category I; “Aviso”
                                    for Toxicity Category II), followed by the statement: “Si usted
                                    no entiende la etiqueta, busque a alguien para que se la
                                    explique a usted en detalle. (If you do not understand the
                                    label, find someone to explain it to you in detail.) ”
                                </li>
                                <li className="mt-3">
                                    Skull &amp; Crossbones symbol and the word “Poison.”
                                </li>
                                <li className="mt-3">
                                    The statement “See other panel for precautionary statement.”
                                </li>
                                <li className="mt-3">First aid statement</li>
                                <li className="mt-3">
                                    Net weight or measure of contents expressed in conventional US
                                    units of measure
                                </li>
                            </ul>

                            <p className="mt-6 font-bold">
                                The following may be included on the front or back panel
                            </p>

                            <ul className="mt-3 ml-6 list-disc">
                                <li>
                                    Name and address of producer, registrant, or person for whom
                                    produced.
                                </li>
                                <li className="mt-3">Product registration number</li>
                                <li className="mt-3">
                                    Producing establishments&apos; registration number (It is not
                                    necessary to include this on the master label, which will be
                                    submitted to EPA, and a label can be approved without it.
                                    However, when the product becomes commercially available, it is
                                    required to be somewhere on the product container.{" "}
                                    <ExternalLink href={externalLinks.cfr15610}>
                                        40 CFR Part 156.10(f)
                                    </ExternalLink>
                                    )
                                    <ul className="mt-3 ml-6 list-[circle]">
                                        <li>
                                            The EPA establishment number identifies the final physical
                                            location where the pesticide product was produced or
                                            labeled. The final establishment where the product will be
                                            produced might not be known when the draft label is
                                            submitted, or the registrant may intend to place the
                                            establishment number directly on the container rather than
                                            the label, so the establishment number might not appear on
                                            the draft label submitted for review.
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <p className="mt-8 font-bold">Back Panel Information</p>

                            <ul className="mt-3 ml-6 list-disc">
                                <li>Handler PPE statement</li>

                                <li className="mt-3">
                                    Directions for use, including<sup>*</sup>
                                    <ul className="mt-3 ml-6 list-[circle]">
                                        <li>
                                            Statement of use classification (Restricted or General Use)
                                        </li>
                                        <li className="mt-3">
                                            The statement, “It is a violation of Federal law to use
                                            this product in a manner inconsistent with its labeling.”
                                        </li>
                                        <li className="mt-3">The site(s) of application</li>
                                        <li className="mt-3">
                                            The target pest(s) associated with each site
                                        </li>
                                        <li className="mt-3">
                                            The dosage rate associated with each site and pest
                                        </li>
                                        <li className="mt-3">
                                            The method of application, including instructions for
                                            dilution (if applicable), and the types of application
                                            apparatus or equipment required
                                        </li>
                                        <li className="mt-3">Prohibited application methods</li>
                                        <li className="mt-3">
                                            The frequency and timing of applications necessary to
                                            obtain effective results without causing unreasonable
                                            adverse effects on the environment
                                        </li>
                                        <li className="mt-3">Maximum application rates</li>
                                        <li className="mt-3">
                                            All restricted entry intervals pertaining to existing uses,
                                            as applicable
                                        </li>
                                        <li className="mt-3">
                                            Worker protection statements, meeting the requirements of{" "}
                                            <ExternalLink href={externalLinks.workerProtectionStatements}>
                                                subpart K
                                            </ExternalLink>
                                            .
                                            <ul className="mt-3 ml-6 list-disc">
                                                <li>Table detailing the criteria subject to WPS</li>
                                                <li className="mt-3">
                                                    Determining Restricted Entry Intervals
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="mt-3">
                                            Specific directions concerning the storage, residue
                                            removal, and disposal of the pesticide and its container in
                                            accordance with{" "}
                                            <ExternalLink href={externalLinks.subpartH}>
                                                subpart H
                                            </ExternalLink>
                                            .
                                            <ul className="mt-3 ml-6 list-disc">
                                                <li>
                                                    All products, except for residential/household-use
                                                    products, must bear the following statement: “Do not
                                                    contaminate water, food, or feed by storage and
                                                    disposal.”
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="mt-3">
                                            Any limitations or restrictions on use are required to
                                            prevent unreasonable adverse effects
                                        </li>
                                    </ul>
                                </li>

                                <li className="mt-3">
                                    Human hazard precautionary statements and warnings pursuant to{" "}
                                    <ExternalLink href={externalLinks.subpartD}>
                                        subpart D
                                    </ExternalLink>
                                </li>

                                <li className="mt-3">
                                    Physical or chemical hazard statements and associated graphics
                                    (if applicable), as well as measures to prevent them. Ex:
                                    Flammable
                                    <ul className="mt-3 ml-6 list-[circle]">
                                        <li>
                                            <ExternalLink href={externalLinks.logosGraphicsChapter}>
                                                Logos and graphics
                                            </ExternalLink>
                                            <sup>3</sup>
                                        </li>
                                    </ul>
                                </li>

                                <li className="mt-3">
                                    Environmental hazard and precautionary statements pursuant to{" "}
                                    <ExternalLink href={externalLinks.subpartE}>
                                        subpart E
                                    </ExternalLink>
                                </li>

                                <li className="mt-3">
                                    Container labeling pursuant to{" "}
                                    <ExternalLink href={externalLinks.subpartH}>
                                        subpart H
                                    </ExternalLink>
                                </li>

                                <li className="mt-3">Warranty statement</li>

                                <li className="mt-3">
                                    If applicable, Spray drift labeling, Endangered species
                                    statement: “ENDANGERED SPECIES PROTECTION REQUIREMENTS. This
                                    product may have effects on endangered species. When using this
                                    product, you must follow the measures contained in the
                                    Endangered Species Protection Bulletin for the county in which
                                    you are applying the product. To obtain Bulletins, no more than
                                    six months before using this product, consult{" "}
                                    <ExternalLink href={externalLinks.endangeredSpecies}>
                                        https://www.epa.gov/endangered-species
                                    </ExternalLink>{" "}
                                    or call 1-844-447-3813. You must use the Bulletin valid for the
                                    month in which you will apply the product.”
                                </li>
                            </ul>

                            <p className="mt-6 text-base">
                                <sup>*</sup> Directions for use and precautionary statements may
                                be affected when the product is subject to Worker Protection
                                Standards (WPS)
                            </p>

                            <p className="mt-3 text-base">
                                <sup>2</sup>Algaecide labeling requirements and all mentioned
                                subparts are from the EPA{" "}
                                <ExternalLink href={externalLinks.cfrPart156}>
                                    40 CFR Part 156 - Labeling Requirements for Pesticides and
                                    Devices
                                </ExternalLink>
                                .
                            </p>

                            <p className="mt-3 text-base">
                                <sup>3</sup>
                                Information on logos and graphics requirements can be found in{" "}
                                <ExternalLink href={externalLinks.logosGraphicsChapter}>
                                    Ch. 16 of the Label Review Manual
                                </ExternalLink>
                                .
                            </p>
                        </div>
                    </div>

                    {/* front panel template */}
                    <div
                        id="front-panel-template"
                        className="scroll-mt-28 border-b-4 border-primary-lighter"
                    >
                        <h1 className="font-bold text-primary">Front Panel Template</h1>

                        <div className="mb-8 text-lg">
                            <p>
                                <ExternalLink href={externalLinks.labelReviewManualPdf}>
                                    Front Panel Template
                                </ExternalLink>
                            </p>

                            <img
                                src="/assets/img/labeling-front-panel-template.png"
                                alt="Front Panel Template"
                                className="mx-auto mt-6 w-full max-w-3xl border border-gray-300"
                            />
                        </div>
                    </div>

                    {/* back panel template */}
                    <div
                        id="back-panel-template"
                        className="scroll-mt-28 border-b-4 border-primary-lighter"
                    >
                        <h1 className="font-bold text-primary">Back Panel Template</h1>

                        <div className="mb-8 text-lg">
                            <p>
                                <ExternalLink href={externalLinks.labelReviewManualPdf}>
                                    Back Panel Template
                                </ExternalLink>
                            </p>

                            <img
                                src="/assets/img/labeling-back-panel-template.jpg"
                                alt="Back Panel Template"
                                className="mx-auto mt-6 w-full max-w-3xl border border-gray-300"
                            />
                        </div>
                    </div>

                    {/* example labels */}
                    <div
                        id="example-labels"
                        className="scroll-mt-28 border-b-4 border-primary-lighter"
                    >
                        <h1 className="font-bold text-primary">Example Labels</h1>

                        <div className="mb-8 text-lg">
                            <p>
                                To view examples of approved labels, navigate to the EPA’s{" "}
                                <ExternalLink href={externalLinks.appril}>
                                    Active Pesticide Product Registration Informational Listing
                                    (APPRIL)
                                </ExternalLink>{" "}
                                and choose “Algaecide” in the pesticide category.
                            </p>
                        </div>
                    </div>

                    {/* additional documentation */}
                    <div
                        id="additional-documentation"
                        className="scroll-mt-28 border-b-4 border-primary-lighter"
                    >
                        <h1 className="font-bold text-primary">Additional Documentation</h1>

                        <div className="mb-8 text-lg">
                            <ul className="ml-6 list-disc">
                                <li>
                                    Certificate with Respect to Label Integrity. A docx file can
                                    be found on the{" "}
                                    <ExternalLink href={externalLinks.electronicSubmissionLabels}>
                                        Electronic Submission of Labels
                                    </ExternalLink>{" "}
                                    page.
                                </li>

                                <li className="mt-3">
                                    <ExternalLink href={externalLinks.safetyDataSheet}>
                                        Safety Data Sheet
                                    </ExternalLink>
                                </li>

                                <li className="mt-3">&nbsp;</li>
                            </ul>
                        </div>
                    </div>

                    {/* pesticide label review training */}
                    <div
                        id="label-review-training"
                        className="scroll-mt-28 border-b-4 border-primary-lighter"
                    >
                        <h1 className="font-bold text-primary">
                            Pesticide Label Review Training
                        </h1>

                        <div className="mb-8 text-lg">
                            <p>
                                Applicants are encouraged to complete the EPA’s{" "}
                                <ExternalLink href={externalLinks.labelReviewTraining}>
                                    Pesticide Label Review Training
                                </ExternalLink>
                                . The training contains five modules covering the four core
                                principles of product labeling: clarity, accuracy, consistency
                                with EPA policy, and enforceability. This training is especially
                                helpful, as it highlights the key aspects a label reviewer will
                                critique.
                            </p>

                            <p className="mt-6 text-base font-bold">
                                The information was collected from the EPA{" "}
                                <ExternalLink href={externalLinks.cfrPart156}>
                                    40 CFR Part 156 - Labeling Requirements for Pesticides and
                                    Devices
                                </ExternalLink>{" "}
                                and the Office of Pesticide Programs{" "}
                                <ExternalLink href={externalLinks.labelReviewManual}>
                                    Label Review Manual
                                </ExternalLink>
                                , unless otherwise specified. For more details, please visit the
                                website.
                            </p>
                        </div>
                    </div>

                    {/* additional information */}
                    <div
                        id="additional-information"
                        className="scroll-mt-28 border-b-4 border-primary-lighter"
                    >
                        <h1 className="font-bold text-primary">Additional Information</h1>

                        <div className="mb-8 text-lg">
                            <p>
                                Learn about how to search for information about pesticide
                                ingredients and labels on this{" "}
                                <ExternalLink href={externalLinks.pesticideIngredientsLabels}>
                                    EPA webpage
                                </ExternalLink>
                            </p>
                        </div>
                    </div>

                    {/* questions */}
                    <div id="questions" className="scroll-mt-28">
                        <h1 className="font-bold text-primary">
                            Questions about FIFRA product labeling?
                        </h1>

                        <div className="mb-8 text-lg">
                            <ul className="ml-6 list-disc">
                                <li>
                                    Email{" "}
                                    <MailLink email="pesticidequestions@epa.gov">
                                        pesticidequestions@epa.gov
                                    </MailLink>
                                </li>

                                <li className="mt-3">
                                    Complete the{" "}
                                    <ExternalLink href={externalLinks.pesticideLabelingQaForm}>
                                        Pesticide Labeling Questions &amp; Answers - Form
                                    </ExternalLink>
                                    .
                                </li>

                                <li className="mt-3">
                                    See the EPA’s{" "}
                                    <ExternalLink href={externalLinks.pesticideLabelingQa}>
                                        Pesticide Labeling Questions &amp; Answers
                                    </ExternalLink>{" "}
                                    page.
                                </li>

                                <li className="mt-3">
                                    Conventional Products Contact: RD Ombudsman,{" "}
                                    <MailLink email="OPP_RD_Ombudsman@epa.gov">
                                        OPP_RD_Ombudsman@epa.gov
                                    </MailLink>
                                </li>

                                <li className="mt-3">
                                    Antimicrobial Products Contact: Ombudsman,{" "}
                                    <MailLink email="pesticidequestions@epa.gov">
                                        pesticidequestions@epa.gov
                                    </MailLink>
                                </li>

                                <li className="mt-3">
                                    Biological/Biochemical Products Contact: BPPD Ombudsman,{" "}
                                    <MailLink email="BPPDquestions@epa.gov">
                                        BPPDquestions@epa.gov
                                    </MailLink>
                                </li>

                                <li className="mt-3">
                                    Pesticide Product Label System (PPLS) Contact: Abu Muyeen,{" "}
                                    <MailLink email="muyeen.abu@epa.gov">
                                        muyeen.abu@epa.gov
                                    </MailLink>
                                    , 202-564-1113
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";

const GLOSSARY_ENTRIES = [
    {
        "term": "Active Ingredient",
        "page": 1,
        "content": "Any substance (or group of structurally similar substances, if specified by the Agency) that will prevent, destroy, repel, or mitigate any pest, or that functions as a plant regulator, desiccant, defoliant, or nitrogen stabilizer, within the meaning of FIFRA sec. 2(b)."
    },
    {
        "term": "Acute dermal LD50",
        "page": 1,
        "content": "As defined in 40 CFR 152.3, a statistically derived estimate of the single dermal dose of a substance that would cause 50 percent mortality to the test population under specified conditions."
    },
    {
        "term": "Acute inhalation LC50",
        "page": 1,
        "content": "As defined in 40 CFR 152.3, a statistically derived estimate of the concentration of a substance that would cause 50 percent mortality to the test population under specified conditions."
    },
    {
        "term": "Acute oral LD50",
        "page": 1,
        "content": "As defined in 40 CFR 152.3, a statistically derived estimate of the single oral dose of a substance that would cause 50 percent mortality to the test population under specified conditions."
    },
    {
        "term": "Acute Toxicity",
        "page": 1,
        "content": "The potential for a substance to result in adverse effects to an organism soon after exposure. The acute toxicity of a compound is established through scientifically verifiable data from animal studies or human exposure tests."
    },
    {
        "term": "Additional use",
        "page": 1,
        "content": "A request to add another use or new use on the label for an active ingredient with currently EPA-registered products. New uses mean:\n1. any proposed use pattern that would require the establishment of, or the exemption from the requirement of, a tolerance or food additive regulation under section 408 of the Federal Food, Drug, and Cosmetic Act;\n2. any aquatic, terrestrial, outdoor, or forestry use pattern, if no product containing the active ingredient is currently registered for that use pattern; or\n3. any additional use pattern that would result in a significant increase in the level of exposure, or a change in the route of exposure, to the active ingredient of man or other organisms."
    },
    {
        "term": "Adjuvants",
        "page": 2,
        "content": "As per FIFRA pesticide regulations, adjuvants are chemicals added to a pesticide by users to improve the pesticide's efficacy. Agricultural chemical adjuvants are grouped according to their intended purpose in a tank mix. Such agents are often included in pesticide formulations as \"other ingredients,\" in which case the ingredient is reviewed during registration, and any necessary tolerances or exemptions from the requirement of a tolerance are established. Examples include acidifying agents, anti-foam agents, buffering agents, suspension agents, gelling agents, emulsifiers, etc. Pesticide Registration Manual Ch. 1 Overview"
    },
    {
        "term": "Administrator",
        "page": 2,
        "content": "The Administrator of the United States Environmental Protection Agency or their delegate."
    },
    {
        "term": "“Agency or The Agency”",
        "page": 2,
        "content": "When mentioned in EPA documents, “the Agency” refers to the EPA."
    },
    {
        "term": "Antimicrobial pesticide",
        "page": 2,
        "content": "Any substance intended to disinfect, sanitize, reduce, or mitigate growth or development of microbiological organisms or protect inanimate objects, industrial processes or systems, surfaces, water, or other chemical substances from contamination, fouling, or deterioration caused by bacteria, viruses, fungi, protozoa, algae, or slime. Registration Information by Type of Pesticide-Antimicrobial\n● Regulated by the EPA Antimicrobial Division"
    },
    {
        "term": "Applicant",
        "page": 2,
        "content": "Any person who applies for an experimental use permit pursuant to section 5 of the Act."
    },
    {
        "term": "Appurtenance",
        "page": 2,
        "content": "As defined in 40 CFR 165.3, any equipment or device that is used for the purpose of transferring a pesticide from a stationary pesticide container or to any refillable container, including but not limited to hoses, fittings, plumbing, valves, gauges, pumps, and metering devices."
    },
    {
        "term": "Batch",
        "page": 3,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: A specific quantity or lot of a test, control, or reference substance that has been characterized according to § 160.105(a).",
        "links": [
            {
                "phrase": "§ 160.105(a)",
                "href": "https://www.ecfr.gov/current/title-40/section-160.105#p-160.105(a)"
            }
        ]
    },
    {
        "term": "Biochemical pesticides",
        "page": 3,
        "content": "Biochemical Pesticides are substances that: (1) are naturally occurring chemicals or are synthetically derived equivalents; (2) have a history of exposure to humans and the environment demonstrating minimal toxicity, or in the case of a synthetically-derived biochemical pesticides, are equivalent to a naturally occurring chemical that have such a history; and (3) have a nontoxic mode of action to the target pest(s). Biochemical pesticides include, but are not limited to: (1) semiochemicals (insect pheromones and kairomones), (2) natural plant and insect regulators, (3) naturally occurring repellents and attractants, and (4) enzymes. Biochemical pesticides include substances, such as insect sex pheromones, which interfere with mating, as well as various scented plant extracts that attract insect pests to traps. Because it is sometimes difficult to determine whether a substance meets the criteria for classification as a biochemical pesticide, EPA has established the Biochemical Classification Committee to make such decisions."
    },
    {
        "term": "Biological control agent",
        "page": 3,
        "content": "As defined in 40 CFR 152.3, any living organism applied to or introduced into the environment that is intended to function as a pesticide against another organism declared to be a pest by the Administrator."
    },
    {
        "term": "Biopesticide",
        "page": 3,
        "content": "Pesticides derived from such natural materials as animals, plants, bacteria, and certain minerals. For example, canola oil and baking soda have pesticidal applications and are considered biopesticides. Biopesticides fall into three major classifications: Biochemical, Microbial, and Plant-Incorporated Protectants (PIPs). Registration Information by Type of Pesticide-Biopesticide\n● Regulated by the EPA Biopesticides and Pollution Prevention Division"
    },
    {
        "term": "Capacity",
        "page": 3,
        "content": "As defined in 40 CFR 165.3, as applied to containers, the rated capacity of the container."
    },
    {
        "term": "Carrier",
        "page": 4,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: Any material, including but not limited to feed, water, soil, nutrient media, with which the test substance is combined for administration to a test system."
    },
    {
        "term": "Chemigation",
        "page": 4,
        "content": "The application of pesticides through irrigation systems."
    },
    {
        "term": "Child-resistant packaging (CRP)",
        "page": 4,
        "content": "As defined in 40 CFR 157.21, packaging that is designed and constructed to be significantly difficult for children under 5 years of age to open or obtain a toxic or harmful amount of the substance contained therein within a reasonable time, and that is not difficult for normal adults to use properly."
    },
    {
        "term": "Chronic toxicity",
        "page": 4,
        "content": "The potential for a substance to result in adverse effects to an organism after long-term exposure. The chronic toxicity of a compound is established through scientifically verifiable data from animal studies or human exposure tests."
    },
    {
        "term": "Collateral labeling",
        "page": 4,
        "content": "Bulletins, leaflets, circulars, brochures, data sheets, flyers, or other written, printed, or graphic matter referenced on the label or accompanying the product are known as “collateral labeling.” Such labeling is subject to applicable requirements of FIFRA and the Agency’s regulations. In addition, collateral labeling may not bear claims or representations that substantially differ from those accepted in connection with registration of the product. FIFRA 12(a)(1)(B). Collateral labeling must be submitted along with the application for registration and must be accepted by EPA before it can be referenced on the label and/or distributed along with the product. However, official publications of certain federal and state agencies and institutions referenced on or accompanying a label or labeling are exempted by FIFRA 2(p)(2)(B) from the definition of label and labeling, and therefore do not require review. Label Review Manual Ch. 3- General Labeling Requirements."
    },
    {
        "term": "Company Number",
        "page": 4,
        "content": "A unique identifier assigned to a company that wishes to register a pesticide (e.g., herbicide, rodenticide, or antimicrobial) with the U.S. Environmental Protection Agency (EPA). These companies are commonly called registrants. A company number, as well as a Pesticide Producing Establishment number, is required for any company that wants to produce pesticides or pesticide devices. How to obtain a company number and register an official address"
    },
    {
        "term": "Complete protection time (CPT)",
        "page": 5,
        "content": "As defined in 40 CFR 158 subpart R, the time from application of a skin-applied insect repellent until efficacy failure, which is described in Product Performance Test Guideline 810.3700."
    },
    {
        "term": "Confidential Statement of Formula (CSF)",
        "page": 5,
        "content": "The confidential statement of formula (EPA Form 8570-4) is a crucial part of submissions related to new pesticide products. The form lists all the components and their percent by weight in your product, and various additional information. Pesticide Registration Manual: CSF Documents.\n● Two of these forms must be completed and submitted with the application.\n● Form must include\n○ All active ingredients\n○ All inert ingredients\n○ All impurities of toxicological significance associated with active ingredients\n○ All impurities found to be present in ≧ 0.1% by weight of the technical grade active ingredient\n○ Additionally, all inert ingredients that are used in a product with food uses must have a tolerance or exemption from a tolerance."
    },
    {
        "term": "Container handling/disposal statement",
        "page": 5,
        "content": "As defined in the EPA Label Review Manual, Ch. 13: Storage and Disposal: Container handling instructions include information on whether the container is refillable or nonrefillable, a reuse statement, a recycling/reconditioning statement, and information on how to remove residues from emptied pesticide containers and what to do with the pesticide container after it is emptied. Example of storage and disposal statement."
    },
    {
        "term": "Containment pad",
        "page": 5,
        "content": "As defined in 40 CFR 165.3, any structure that is designed and constructed to intercept and contain pesticides, rinsates, and equipment wash water at a pesticide dispensing area."
    },
    {
        "term": "Control substance",
        "page": 6,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: Any chemical substance or mixture, or any other material other than a test substance, feed, or water, that is administered to the test system in the course of a study for the purpose of establishing a basis for comparison with the test substance for known chemical or biological measurements."
    },
    {
        "term": "Conventional pesticide",
        "page": 6,
        "content": "All active ingredients other than biological pesticides and antimicrobial pesticides. Conventional active ingredients are generally produced synthetically, i.e., are synthetic chemicals that prevent, mitigate, destroy, or repel any pest; or that act as a plant growth regulator, desiccant, defoliant, or nitrogen stabilizer.\nRegistration Information by Type of Pesticide-Conventional\n● Regulated by the EPA Registration Division"
    },
    {
        "term": "Containment structure",
        "page": 6,
        "content": "As defined in 40 CFR 165.3, either a secondary containment unit or a containment pad."
    },
    {
        "term": "Cooperator",
        "page": 6,
        "content": "Any person who grants permission to a permittee or a permittee's designated participant for the use of an experimental use pesticide at an application site owned or controlled by the cooperator."
    },
    {
        "term": "Crisis exemption",
        "page": 6,
        "content": "An exemption authorized under FIFRA section 18, in accordance with §§ 166.40 through 40 CFR 166.53.",
        "links": [
            {
                "phrase": "§§ 166.40",
                "href": "https://www.ecfr.gov/current/title-40/section-166.40"
            },
            {
                "phrase": "40 CFR 166.53",
                "href": "https://www.ecfr.gov/current/title-40/section-166.53"
            }
        ]
    },
    {
        "term": "Custom blending",
        "page": 6,
        "content": "As defined in 40 CFR 165.3, the service of mixing pesticides to a customer's specifications, usually a pesticide(s)-fertilizer(s), pesticide-pesticide, or a pesticide-animal feed mixture, when:\n(1) The blend is prepared to the order of the customer and is not held in inventory by the blender;\n(2) The blend is to be used on the customer's property (including leased or rented property);\n(3) The pesticide(s) used in the blend bears end-use labeling directions that do not prohibit use of the product in such a blend;\n(4) The blend is prepared from registered pesticides, and\n(5) The blend is delivered to the end-user along with a copy of the end-use labeling of each pesticide used in the blend and a statement specifying the composition of the mixture."
    },
    {
        "term": "Differ only in ways",
        "page": 7,
        "content": "The Agency has interpreted the phrase “….or that differ only in ways that would not significantly increase the risk of unreasonable adverse effects on the environment….” with regard to a substantially similar or identical product to mean:\n● The proposed product must contain the same active ingredient,\n● have the same percentage or fall within the range of composition of currently registered products,\n● have the same chemical composition,\n● have similar inert ingredients and contain the same use patterns or fewer."
    },
    {
        "term": "Dilutable",
        "page": 7,
        "content": "As defined in 40 CFR 165.3, the pesticide product's labeling allows or requires the pesticide product to be mixed with a liquid diluent prior to application or use."
    },
    {
        "term": "Distribute or sell",
        "page": 7,
        "content": "As defined in 40 CFR 152.3, the acts of distributing, selling, offering for sale, holding for sale, shipping, holding for shipment, delivering for shipment, or receiving and (having so received) delivering or offering to deliver, or releasing for shipment to any person in any State."
    },
    {
        "term": "Distribution Code",
        "page": 7,
        "content": "A code used to refer to a pesticide registration application to the correct reviewing party. Use of the wrong code can result in processing delays. Using the Correct Distribution Code."
    },
    {
        "term": "Distributor label",
        "page": 8,
        "content": "A distributor label is used when a product is registered to one company, but is distributed or sold (known as “supplemental distribution”) by another company (known as the “distributor” or “sub-registrant”). 40 CFR 152.132. Distributor labels are not submitted for approval, but a Notice of Supplemental Distribution must be submitted to the EPA before supplemental distribution of the product. The registrant is responsible for the contents of both the distributor product and the distributor label. Label Review Manual Ch. 3- General Labeling Requirements.\n● A distributor label must be the same as that of the registered product label except for:\n○ Product name\n○ Distributor name and address\n○ EPA Establishment Number\n○ EPA Registration Number (a third set of numbers is added at the end denoting the distributor’s company number, e.g., EPA Reg. No. 1234-56-7890.)\n○ Product claims (specific claims may be deleted so long as no other changes are necessary, but new claims cannot be added)\n○ Warranty statements (if allowed by contract between the registrant and the distributor and such change is not false or misleading)\n● The term “supplemental distributor labeling” is sometimes used, but is not proper EPA terminology."
    },
    {
        "term": "Dry pesticide",
        "page": 8,
        "content": "As defined in 40 CFR 165.3, any pesticide that is in solid form and that has not been combined with liquids; this includes formulations such as dusts, wettable powders, dry flowables, water-soluble powders, granules, and dry baits."
    },
    {
        "term": "Ecological Risk Assessment",
        "page": 8,
        "content": "In accordance with FIFRA regulations, it determines what risks are posed by a pesticide and whether changes to the use or proposed use are necessary to protect the environment. There are three phases of assessment: Planning and scoping process, Problem formulation, Analysis, and Risk Characterization."
    },
    {
        "term": "Efficacy data",
        "page": 8,
        "content": "Data showing that the pesticide is effective in controlling the pests for which control claims are made on the product label. Efficacy data are routinely required to be submitted to support products that control pests of public health significance, including but not limited to products to control pathogenic bacteria, viruses, mosquitoes, ticks, roaches, fleas, rats, and mice. Efficacy data requirements related to these types of pest control products are detailed at 40 CFR §158.640. Also, refer to the OPPTS Harmonized Test Guidelines, Series 810 and Antimicrobial Science Policies, Disinfectant Technical Science Section (DIS/TSS) documents.\nAlthough efficacy data (product performance data) are not routinely required to be submitted for most insecticide, fungicide, or herbicide products, the applicant or registrant must conduct efficacy tests on each of its products in order to ascertain through testing that the product performs in accordance with its labeling and use directions claims.\n● Efficacy data may be required to be submitted on a case-by-case basis and must be kept in the applicant's or registrant's files.",
        "links": [
            {
                "phrase": "40 CFR §158.640",
                "href": "https://www.govinfo.gov/app/details/CFR-2007-title40-vol23/CFR-2007-title40-vol23-sec158-640"
            }
        ]
    },
    {
        "term": "Emergency condition",
        "page": 9,
        "content": "As defined in 40 CFR 166.3, an urgent, non-routine situation that requires the use of a pesticide(s) and shall be deemed to exist when:\n(1) No effective pesticides are available under the Act that have labeled uses registered for control of the pest under the conditions of the emergency; and (2) No economically or environmentally feasible alternative practices that provide adequate control are available; and (3) The situation:\n(i) Involves the introduction or dissemination of an invasive species or a pesticide new to or not theretofore known to be widely prevalent or distributed within or throughout the United States and its territories; or (ii) Will present significant risks to human health; or (iii) Will present significant risks to threatened or endangered species, beneficial organisms, or the environment; or (iv) Will cause significant economic loss due to:\n(A) An outbreak or an expected outbreak of a pest; or (B) A change in plant growth or development caused by unusual environmental conditions where such change can be rectified by the use of a pesticide(s)."
    },
    {
        "term": "Emergency exemption",
        "page": 10,
        "content": "A specific, quarantine, or public health exemption authorized under FIFRA section 18 and the regulations at §§ 166.20 through 40 CFR 166.35.",
        "links": [
            {
                "phrase": "§§ 166.20",
                "href": "https://www.ecfr.gov/current/title-40/section-166.20"
            },
            {
                "phrase": "40 CFR 166.35",
                "href": "https://www.ecfr.gov/current/title-40/section-166.35"
            }
        ]
    },
    {
        "term": "End-use product (EP)",
        "page": 10,
        "content": "As defined in 40 CFR 158 subpart D, any pesticide product whose labeling includes (1) directions for use of the product (as distributed or sold, or after combination by the user with other substances) for controlling pests or defoliating, desiccating, or regulating growth of plants, or as a nitrogen stabilizer, and (2) does not state that the product may be used to manufacture or formulate other pesticide products."
    },
    {
        "term": "Environmental Hazards Statement",
        "page": 10,
        "content": "As defined in the EPA Label Review Manual, Ch. 8: Environmental Hazards: The statement should appear under the label subheading “Environmental Hazards,” and advise on potential hazards associated with transport, use, storage, or spill of pesticide products, resulting in hazard to water, soil, air, beneficial insects, plants, and/or wildlife."
    },
    {
        "term": "EPA Section Seven Tracking System (SSTS)",
        "page": 10,
        "content": "E-filing system supporting FIFRA. SSTS is the only automated system that EPA uses to track pesticide-producing establishments and the number of pesticides they produce. SSTS records the registration of new establishments and records pesticide production at each establishment. It is a repository for information on the establishments that produce pesticides."
    },
    {
        "term": "Established level",
        "page": 10,
        "content": "As defined in 40 CFR 159.153, a tolerance, temporary tolerance, food additive regulation, action level, or other limitation on pesticide residues imposed by law, regulation, or other authority."
    },
    {
        "term": "Experimental animals",
        "page": 10,
        "content": "Individual animals or groups of animals, regardless of species, intended for use and used solely for research purposes. The term does not include animals intended to be used for any food purposes."
    },
    {
        "term": "Experimental Use Permit (EUP)",
        "page": 11,
        "content": "As defined in 40 CFR 172.2: A permit authorized under FIFRA section 5 that allows applicants to develop data to support an anticipated registration application and may involve a pesticide not registered with the Agency, or a registered pesticide for a use not previously approved in the registration of the pesticide. Pesticides under experimental use permits may not be sold or distributed other than through participants and, if sold or distributed through participants, may be used only at an application site of a cooperator and in accordance with the terms and conditions of the experimental use permit. Pesticide Registration Manual Ch. 12-Applying for an EUP"
    },
    {
        "term": "Exudate",
        "page": 11,
        "content": "As defined in 40 CFR 174.3, a substance gradually discharged or secreted across intact cellular membranes or cell walls and present in the intercellular spaces or on the exterior surfaces of the plant."
    },
    {
        "term": "Fast track amendments",
        "page": 11,
        "content": "If an amendment requests a change to a product that is \"substantially similar\" or \"identical\" to another product or \"differs only in ways that would not significantly increase the risk of unreasonable adverse effects on the environment\" from another product, the similar or identical product and its applicable data may be cited in lieu of submitting required product-specific data. This amendment includes labeling changes or basic alternate product formulation changes that do not require supporting data, and is also called a \"me-too\" amendment."
    },
    {
        "term": "Federal Food, Drug, and Cosmetic Act (FFDCA)",
        "page": 11,
        "content": "Section 408 of the Federal Food, Drug, and Cosmetic Act (FFDCA) authorizes EPA to set tolerances, or maximum residue limits, for pesticide residues on foods. FFDCA requires the EPA to set pesticide tolerances for all pesticides used in or on food or in a manner that will result in a residue in or on food or animal feed. A tolerance is the maximum permissible level for pesticide residues allowed in or on human food and animal feed. Summary of FFDCA"
    },
    {
        "term": "Federal Insecticide, Fungicide, and Rodenticide Act (FIFRA)",
        "page": 11,
        "content": "FIFRA authorizes the EPA to regulate the distribution, sale, production, and use of pesticides and pesticide devices in the United States. With certain exceptions, all pesticides distributed or sold in the United States must be registered (licensed) by the EPA. Summary of FIFRA"
    },
    {
        "term": "Final printed labeling",
        "page": 12,
        "content": "A final printed labeling is the label or labeling of a pesticide product when it is distributed or sold. Pursuant to 40 CFR 156.10(a)(6), with certain limited exceptions, “final printed labeling must be submitted and accepted prior to registration. However, final printed labeling need not be submitted until draft label texts have been provisionally accepted by the EPA.” Label Review Manual Ch. 3- General Labeling Requirements"
    },
    {
        "term": "First Aid Statement",
        "page": 12,
        "content": "As defined in the EPA Label Review Manual, Ch. 7, Section III.F: First aid statements advise on appropriate first aid actions for various routes of exposure and must provide instructions for the user, a physician, and a phone number to call for emergency information.\n● The first aid statement must appear under one of the following headings: “First Aid” or “Statement of Practical Treatment”.\n● The First Aid Statement must appear on the front panel of the label for all Toxicity Category I pesticides.\n● EPA may permit variations in the placement of the First Aid Statement as long as the reference statement “See First Aid (or Statement of Practical Treatment) on [identify the appropriate panel]” appears on the front panel, preferably near the “Poison” and skull and cross bones graphic.\n● First aid statements should be organized so that the most severe routes of exposure are listed first."
    },
    {
        "term": "First food use",
        "page": 12,
        "content": "As defined in 40 CFR 166.3, the use of a pesticide on a food or in a manner which otherwise would be expected to result in residues in a food, if no tolerance or exemption from the requirements of a tolerance for residues of the pesticide on any food has been established for the pesticide under section 408 of the Federal Food, Drug, and Cosmetic Act."
    },
    {
        "term": "Food plant",
        "page": 12,
        "content": "As defined in 40 CFR 174.3, a plant which either in part or in toto, is used as food."
    },
    {
        "term": "Food Use",
        "page": 12,
        "content": "A food use is a use in, on, or around or that may come into contact with food, including water for human consumption; feed, including water for animal consumption; or livestock unless a review of all available data supports the conclusion that the use will not result in residues in the food (including water for human consumption) or feed (including water for animal consumption)."
    },
    {
        "term": "Formal review",
        "page": 13,
        "content": "As defined in 40 CFR 159.153, a Special Review, Rebuttable Presumption Against Registration (RPAR), FIFRA section 6(c) suspension proceeding, or FIFRA section 6(b) cancellation proceeding, whether completed or not."
    },
    {
        "term": "Formulation",
        "page": 13,
        "content": "As defined in 40 CFR 158 subpart D, the process of mixing, blending, or dilution of one or more active ingredients with one or more other active or inert ingredients, without an intended chemical reaction, to obtain a manufacturing-use product or an end-use product, or the repackaging of any registered product."
    },
    {
        "term": "Fumigant",
        "page": 13,
        "content": "As defined in 40 CFR 156.203, any pesticide product that is a vapor or gas or forms a vapor or gas on application and whose method of pesticidal action is through the gaseous state."
    },
    {
        "term": "General storage and disposal statement",
        "page": 13,
        "content": "As defined in the EPA Label Review Manual, Ch. 13: Storage and Disposal\n● All products, except for residential/household-use products, must bear the following statement:\n● “Do not contaminate water, food, or feed by storage and disposal.”\n● Example of storage and disposal statement"
    },
    {
        "term": "Genetic engineering",
        "page": 13,
        "content": "As defined in 40 CFR 174.3, the modification of the genome of an organism using recombinant, synthesized, or amplified nucleic acids or other techniques excluded from the definition of conventional breeding."
    },
    {
        "term": "Genetic material necessary for the production",
        "page": 13,
        "content": "As defined in 40 CFR 174.3, both genetic material that encodes a substance or leads to the production of a substance, and regulatory regions. It does not include noncoding, nonexpressed nucleotide sequences."
    },
    {
        "term": "Good Laboratory Practice Inspection (GLP)",
        "page": 14,
        "content": "A GLP inspection and data audit is the process by which EPA verifies that the data from a completed study is consistent with the final report that was submitted to the EPA."
    },
    {
        "term": "Human and Domestic Animal Hazard Statement",
        "page": 14,
        "content": "As defined in the EPA Label Review Manual, Ch. 7, Section III.D: The statement should appear under the label subheading “Hazards to Human and Domestic Animals,” and hazards should be listed starting with the most severe routes of exposure, as classified by toxicity category."
    },
    {
        "term": "Human Health Risk Assessment",
        "page": 14,
        "content": "In accordance with FIFRA regulations, the process to estimate the nature and probability of adverse health effects in humans who may be exposed to chemicals in contaminated environmental media, now or in the future. There are four phases of assessment: Hazard Identification, Dose Response Assessment, Exposure Assessment, and Risk Characterization."
    },
    {
        "term": "Impurity",
        "page": 14,
        "content": "As defined in 40 CFR 158 subpart D, any substance (or group of structurally similar substances if specified by the EPA), in a pesticide product other than an active ingredient or an inert ingredient, including unreacted starting materials, side reaction products, contaminants, and degradation products."
    },
    {
        "term": "Impurity associated with an active ingredient",
        "page": 14,
        "content": "As defined in 40 CFR 158 subpart D, any impurity present in the technical grade of active ingredient, and any impurity that forms in the pesticide product through reactions between the active ingredient and any other component of the product or packaging of the product."
    },
    {
        "term": "Indian country",
        "page": 14,
        "content": "As defined in 40 CFR 171.3, means (1) all land within the limits of any Indian reservation under the jurisdiction of the United States Government, notwithstanding the issuance of any patent, and including rights-of-way running through the reservation. (2) All dependent Indian communities within the borders of the United States, whether within the original or subsequently acquired territory thereof, and whether within or without the limits of a State. (3) All Indian allotments, the Indian titles to which have not been extinguished, including rights-of-way running through the same."
    },
    {
        "term": "Indian tribe or tribe",
        "page": 15,
        "content": "As defined in 40 CFR 171.3, any Indian or Alaska Native Tribe, band, nation, pueblo, village, or community included in the list of Tribes published by the Secretary of the Interior pursuant to the Federally Recognized Indian Tribe List Act."
    },
    {
        "term": "Inert ingredient",
        "page": 15,
        "content": "As defined in 40 CFR 158 subpart D, any substance (or group of structurally similar substances if designated by the EPA), other than the active ingredient, which is intentionally included in a pesticide product."
    },
    {
        "term": "Initial Contents Screening",
        "page": 15,
        "content": "Pesticide Registration Manual Ch. 5-Registration Fees In accordance with FIFRA section 33(f)(4)(B), the EPA must conduct an initial contents screening of the application within 21 days of receiving a completed application and required registration fees.\n● Initial screening determines:\n○ whether the applicable registration service fee has been paid; or\n○ at least 25% of the applicable registration service fee has been paid, and the application contains a waiver or refund request for the outstanding amount and documentation establishing the basis for the waiver request; and\n○ that the application contains all the necessary forms, data, and draft labeling, formatted in accordance with guidance published by the Agency.\n○ If the application fails the screen and cannot be corrected by the applicant within the 21-day period, the Agency will reject the application not later than 10 days after making the determination and will retain 25% of the fee.\n● Often forgotten-Requires EPA Form 8570-34, which must always accompany the Data Matrix Form (EPA Form 8570-35)\n● The EPA has an internal worksheet used for the screening process available to guide applicants.",
        "links": [
            {
                "phrase": "Pesticide Registration Manual Ch. 5-Registration Fees",
                "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-5-registration-fees#initial"
            }
        ]
    },
    {
        "term": "Integrated system",
        "page": 15,
        "content": "As defined in 40 CFR 158 subpart D, a process for producing a pesticide product that: contains any active ingredient derived from a source that is not an EPA-registered product; or contains any active ingredient that was produced or acquired in a manner that does not permit its inspection by the Agency under FIFRA sec. 9(a) prior to its use in the process."
    },
    {
        "term": "Interregional Research Project No. 4 (IR-4)",
        "page": 16,
        "content": "Funded by the U.S. Department of Agriculture, IR-4 generates data to support minor use registrations and coordinates the development of information on the clearance of these pesticides."
    },
    {
        "term": "Label",
        "page": 16,
        "content": "As defined in FIFRA Section 2(p)(1): The written, printed, or graphic matter on, or attached to, the pesticide or device, or any of its containers or wrappers. There are 3 types of labels: master label, sub-label or split-label, and distributor label."
    },
    {
        "term": "Labelling",
        "page": 16,
        "content": "Defined in FIFRA Section 2(p): All labels and all other written, printed, or graphic matter accompanying the pesticide or device at any time, or to which reference is made on the label or in literature accompanying the pesticide or device, except to current official publications of the Environmental Protection Agency, the United States Departments of Agriculture and Interior, and the Department of Health and Human Services, State experiment stations, State agricultural colleges, and other similar Federal or State institutions or agencies authorized by law to conduct research in the field of pesticides. Label Review Manual Ch. 3- General Labeling Requirements"
    },
    {
        "term": "Manufacturing-use product (MP or MUP)",
        "page": 16,
        "content": "As defined in 40 CFR 162.151, any pesticide product other than a product to be labeled with directions for end use. This term includes any product intended for use as a pesticide after reformulation or repackaging. As defined in 40 CFR 158 subpart D, any pesticide product other than an end-use product. A product may consist of the technical grade of active ingredient only, or may contain inert ingredients, such as stabilizers or solvents."
    },
    {
        "term": "Master label",
        "page": 16,
        "content": "A master label contains all of the approved uses for a given pesticide product and all associated labeling. Master labels must be submitted for EPA approval. Approved master labels are stamped “ACCEPTED” and placed in the official record. Labeling for a given product must not contain any text beyond that which is approved in the master label (except for supplemental labeling). Label Review Manual Ch. 3- General Labeling Requirements"
    },
    {
        "term": "Maximum contaminant level (MCL)",
        "page": 17,
        "content": "As defined in 40 CFR 159.153, the maximum permissible level, established by EPA, for a contaminant in water that is delivered to any user of a public water system."
    },
    {
        "term": "Me-Too Product",
        "page": 17,
        "content": "A \"Me-Too\" pesticide registration application refers to a request to register a new pesticide product that is identical in its uses and formulation or substantially similar in its uses and formulation to one or more products currently registered and marketed in the United States, or differing only in ways that would not significantly increase the risk of unreasonable adverse effects on the environment. These applications are also called \"Fast Track New Products,\" though the preferred term consistent with FIFRA is \"identical or substantially similar product.\" For all \"me-toos, the Agency must also find that approving the registration or amendment in the manner proposed would not significantly increase the risk of any unreasonable adverse effect on the environment. Common terms used for some \"Me-Toos\" are:\n● Identical Repack Registrations A complete (100-percent) repackaging of an identical, already registered product, where the same label is used for the product, other than name, address, name of product, and registration number.\n● Old Chemical New Product Registrations A previously registered active ingredient that is being reformulated to make a new product with the same use pattern as the registered active ingredient. (Note: the applicant will be required to explain how the labeling has been derived and justify certain aspects of the labeling.)"
    },
    {
        "term": "Microbial pesticides",
        "page": 17,
        "content": "Microorganisms that produce a pesticidal effect that are: (1) eukaryotic microorganisms, including, but not limited to, protozoa, algae, and fungi; (2) prokaryotic microorganisms, including, but not limited to, bacteria; or (3) autonomous replicating microscopic elements, including, but not limited to, viruses. Microbial pesticides can control many different kinds of pests, although each separate active ingredient is relatively specific for its target pest(s). For example, there are fungi that control certain weeds and other fungi that kill specific insects. The most widely used microbial pesticides are subspecies and strains of Bacillus thuringiensis, or Bt. Each strain of this bacterium produces a different mix of proteins and specifically kills one or a few related species of insect larvae. While some Bt's control moth larvae found on plants, other Bt's are specific for larvae of flies and mosquitoes. The target insect species are determined by whether the particular Bt produces a protein that can bind to a larval gut receptor, thereby causing the insect larvae to starve."
    },
    {
        "term": "Minor Use",
        "page": 18,
        "content": "\"The use of a pesticide on an animal, on a commercial agricultural crop or site, or for the protection of public health\"(FIFRA section 2(ll)) under certain conditions. These conditions include where the total U.S. acreage for the crop is less than 300,000 acres, or the use does not provide sufficient economic incentive to support the initial or continuing registration of the pesticide for the use, provided additional criteria are met, such as that the pesticide plays a significant part in managing pest resistance or in an integrated pest management program."
    },
    {
        "term": "New Active Ingredient",
        "page": 18,
        "content": "As defined by FIFRA: An active ingredient that is not currently contained as an active ingredient in any registered pesticide products",
        "links": [
            {
                "phrase": "As defined by FIFRA",
                "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-5-registration-fees#newactive"
            }
        ]
    },
    {
        "term": "New chemical",
        "page": 18,
        "content": "An active ingredient not contained in any currently registered pesticide."
    },
    {
        "term": "New Product",
        "page": 18,
        "content": "A product that is not registered and can be either a Manufacturing Use Product (MP or MUP) or an End Use Product (EP). An MP or MUP is any pesticide product other than an end-use product. A product may consist of the technical grade of active ingredient only, or may contain inert ingredients such as stabilizers or solvents. 40 CFR 153(h). MPs are intended and labeled for formulation and repackaging into other pesticide products. An EP is a pesticide product whose labeling (1) includes directions for use of the product (as distributed or sold, or after combination by the user with other substances) for controlling pests or defoliating, desiccating, or regulating growth of plants, and (2) does not state that the product may be used to manufacture or formulate other pesticide products. 40 CFR 153(b).",
        "links": [
            {
                "phrase": "40 CFR 153(h)",
                "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-153"
            },
            {
                "phrase": "40 CFR 153(b)",
                "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-153"
            }
        ]
    },
    {
        "term": "New Use",
        "page": 18,
        "content": "As defined by FIFRA and defined in 40 CFR 152.3: New use, used with respect to a product containing a particular active ingredient, means:\n● any proposed use pattern that would require the establishment of, the increase in, or the exemption from the requirement of a tolerance regulation under section 408 of the Federal Food, Drug, and Cosmetic Act;\n● any aquatic, terrestrial, outdoor, or forestry use pattern, if no product containing the active ingredient is currently registered for that use pattern; or\n● any additional use pattern that would result in a significant increase in the level of exposure, or a change in the route of exposure, of the active ingredient to man or other organisms.",
        "links": [
            {
                "phrase": "As defined by FIFRA",
                "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-5-registration-fees#newuse"
            },
            {
                "phrase": "40 CFR 152.3",
                "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-152"
            }
        ]
    },
    {
        "term": "Nitrogen stabilizer",
        "page": 19,
        "content": "As defined by FIFRA: Any substance or mixture of substances intended for preventing or hindering the process of nitrification, denitrification, ammonia volatilization, or urease production through action upon soil bacteria.",
        "links": [
            {
                "phrase": "As defined by FIFRA",
                "href": "https://www.epa.gov/pesticide-registration/nitrogen-stabilizer-products-must-be-registered-under-fifra"
            }
        ]
    },
    {
        "term": "No Observable Adverse Effects Level (NOAEL)",
        "page": 19,
        "content": "A level of exposure that does not cause observable harm.\n● Established via animal testing to determine toxicity.\n○ Concentration harmful to animals = 100x less is ok for humans\n○ Or 1000x less for children and pregnant women\n● Dose levels used in the toxicity studies must be specified.\n● NOAEL is evaluated when setting tolerances for human health effects."
    },
    {
        "term": "Nominal concentration",
        "page": 19,
        "content": "As defined in 40 CFR 158 subpart D, the amount of an ingredient that is expected to be present in a typical sample of a pesticide product at the time the product is produced, expressed as a percentage by weight."
    },
    {
        "term": "Non-target organism",
        "page": 19,
        "content": "As defined in 40 CFR 159.153, any organism for which pesticidal control was either not intended or not legally permitted by application of a pesticide."
    },
    {
        "term": "Ornamental",
        "page": 19,
        "content": "As defined in 40 CFR 171.3, trees, shrubs, flowers, and other plantings intended primarily for aesthetic purposes in and around habitations, buildings, and surrounding grounds, including residences, parks, streets, and commercial, industrial, and institutional buildings."
    },
    {
        "term": "Other significant evidence",
        "page": 19,
        "content": "As defined in 40 CFR 154.3, factually significant information that relates to the uses of the pesticide and its adverse risk to man or to the environment, but does not include evidence based only on misuse of the pesticide unless such misuse is widespread and commonly recognized practice."
    },
    {
        "term": "Participant",
        "page": 20,
        "content": "Any person acting as a representative of the permittee and responsible for making available for use, or supervising the use or evaluation of, an experimental use pesticide to be applied at a specific application site."
    },
    {
        "term": "Permittee",
        "page": 20,
        "content": "Any applicant to whom an experimental use permit has been granted."
    },
    {
        "term": "Pest problem",
        "page": 20,
        "content": "As defined in 40 CFR 162.151, a pest infestation and its consequences, or any condition for which the use of plant regulators, defoliants, or dessicants would be appropriate."
    },
    {
        "term": "Pesticide",
        "page": 20,
        "content": "As defined by FIFRA: A substance intended to prevent, destroy, repel, or mitigate pests; a substance intended for use as a plant regulator, defoliant,t or desiccant; or any nitrogen stabilizer.\n● The EPA defines three major categories of pesticides: Conventional, Antimicrobial, and Biopesticides.",
        "links": [
            {
                "phrase": "As defined by FIFRA",
                "href": "https://www.epa.gov/pesticide-registration/how-register-pesticide-guide-applicants-new-process"
            }
        ]
    },
    {
        "term": "Pesticide disposal statement",
        "page": 20,
        "content": "As defined in the EPA Label Review Manual, Ch. 13: Storage and Disposal: Pesticide disposal instructions include information on how to dispose of leftover pesticide products. Pesticide disposal and container handling statements are generally specific to the uses of the product contained and the type of container itself. Chapter 13 of the Label Review Manual provides guidance for determining language on:\n○ Residential products\n○ Hazardous water or highly toxic products\n○ All other products (products labeled for all uses other than household or residential uses and for which pesticide disposal or container handling statements have not been specifically identified by EPA).\n● Example of storage and disposal statement"
    },
    {
        "term": "Performance standard",
        "page": 21,
        "content": "As defined in 40 CFR 158 subpart R, a benchmark or reference against which the efficacy of the pesticide is compared (including, but not limited to, the ability of the pesticide product to control, kill, or repel an invertebrate pest species)."
    },
    {
        "term": "Pest group labeling claim",
        "page": 21,
        "content": "As defined in 40 CFR 158 subpart R, a claim or statement on the labeling of the pesticide product that the product is effective against a group of related species or taxa demonstrating adequate similarity in basic biology and life history characteristics to permit identification of representative test species for the entire assemblage of taxa."
    },
    {
        "term": "Pest sub-group labeling claim",
        "page": 21,
        "content": "As defined in 40 CFR 158 subpart R, a claim or statement on the labeling of the pesticide product that the product is effective against a set of related species or taxa demonstrating adequate similarity in basic biology and life history characteristics to permit identification of representative test species and part of a larger identified taxonomic grouping (e.g., Biting flies) that includes other pest species, which may or may not have a specified pest group."
    },
    {
        "term": "Pesticide Producing Establishment",
        "page": 21,
        "content": "Section 7 of FIFRA requires that the production of pesticides, active ingredients, or devices be conducted in a registered “pesticide-producing or device-producing establishment.” Requires the submission of a producer establishment inspection form, EPA Form 3540-8, and an annual report, EPA Form 3540-16. Now completed electronically. FAQs"
    },
    {
        "term": "Pesticide Registration Improvement Act (PRIA or PRIA 5)",
        "page": 21,
        "content": "Enacted in 2004 and established a new system for registering pesticides, including registration service fees to be paid by applicants, and specified decision review times, along with funding for farmworker protection activities. Fees can be determined using the PRIA 5 Fee Determination Decision Tree. Registrants are required to pay fees based on pesticide type and associated action. Example of PRIA table section below.\nEPA No. New CR No. Action Decision Review Time (Months) Fee R060 30 New Active Ingredient, Non-food use; outdoor. 12 $23,052"
    },
    {
        "term": "Pesticide storage statement",
        "page": 22,
        "content": "As defined in the EPA Label Review Manual, Ch. 13: Storage and Disposal\n● Chemical-specific storage statements\n○ These products contain active ingredients for which storage instructions have been provided by the EPA. Refer to Table 1 in Chapter 13, Section IV of the Label Review Manual to determine appropriate language.\n● Non-chemical-specific storage statements\n○ These products contain active ingredients for which storage instructions have not been provided by the EPA. Refer to Chapter 13, Section IV.B of the Label Review Manual for a list of factors to consider in determining appropriate language.\n● Example of storage and disposal statement"
    },
    {
        "term": "Pesticide Use",
        "page": 22,
        "content": "As defined in 40 CFR 154.3, a use of a pesticide (described in terms of the application site and other applicable identifying factors) that is included in the labeling of a pesticide product which is registered, or for which an application for registration is pending, and the terms and conditions (or proposed terms and conditions) of registration for the use."
    },
    {
        "term": "Plant Incorporated Protectants (PIP)",
        "page": 22,
        "content": "Plant-incorporated protectants are pesticidal substances produced by plants and the genetic material necessary for the plant to produce the substance. Overview of PIPs"
    },
    {
        "term": "Plant or animal metabolite",
        "page": 22,
        "content": "As defined in 40 CFR 158 subpart O, a pesticide chemical residue that is the result of the biological breakdown of the parent pesticide within the plant or animal."
    },
    {
        "term": "Physical & Chemical Hazards Statement",
        "page": 22,
        "content": "As defined in the EPA Label Review Manual, Ch. 9: Physical and Chemical Hazards: The statement should appear under the label subheading “Physical and Chemical Hazards,” and address the flammability, explosive potential, and precautionary measures. Special hazard statements are required for certain fumigants."
    },
    {
        "term": "Preliminary Technical Screening",
        "page": 22,
        "content": "Pesticide Registration Manual Ch. 5-Registration Fees In accordance with FIFRA section 33(f)(4)(B), a preliminary technical screening must take place following the 21-day initial content screening.\n● Conducted no later than 45 days after the start of the decision review period, with decision review time periods equal to or less than 6 months and no later than 90 days after the start of the decision review period for actions with decision review time periods greater than 6 months.\n● Preliminary Technician Screening determines:\n○ The application and the data and information submitted with the application are accurate and complete, and\n○ the application, data, and information are consistent with the proposed labeling and any proposed tolerance or tolerance exemption, and\n○ The application, data, and information are such that is subject to full review could result in the granting of the application.",
        "links": [
            {
                "phrase": "Pesticide Registration Manual Ch. 5-Registration Fees",
                "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-5-registration-fees#tech-screen"
            }
        ]
    },
    {
        "term": "Primary Submitter",
        "page": 23,
        "content": "As defined in the CDX Pesticide Submission Portal (PSP), a primary submitter serves as the primary point of contact for a company. Primary Submitters have the following attributes:\n● Can sponsor Authorized Agents to submit on their behalf.\n● Can revoke an Authorized Agent’s access to the PSP application.\n● Can see all packages created for their company. However, to view the details of these packages, they must obtain the passphrase used to encrypt the package. Note: A passphrase is needed to view all created packages. Neither Primary Submitters nor Authorized Agents may view the details of a package without the package’s passphrase.\n● Can prepare and submit packages on behalf of their organization.\n● Can submit responses to DCIs.\n● There can be multiple Primary Submitters for a company.\n● Can add EPA companies and submit for multiple companies."
    },
    {
        "term": "Principal place of business",
        "page": 23,
        "content": "As defined in 40 CFR 171.3, the principal location, either residence or office, where a person conducts a business that involves the use of restricted-use pesticides. A person who applies restricted-use pesticides in more than one State or area of Indian country may designate a location within a State or area of Indian country as its principal place of business for that State or area of Indian country."
    },
    {
        "term": "Produce",
        "page": 24,
        "content": "As defined in 40 CFR 165.3, to manufacture, prepare, propagate, compound, or process any pesticide, including any pesticide produced pursuant to section 5 of FIFRA, and any active ingredient or device, or to package, repackage, label, relabel, or otherwise change the container of any pesticide or device."
    },
    {
        "term": "Producer",
        "page": 24,
        "content": "As defined in 40 CFR 165.3, any person, as defined by the Act, who produces any pesticide, active ingredient, or device (including packaging, repackaging, labeling, and relabeling)."
    },
    {
        "term": "Producer Establishment Inspections (PEI)",
        "page": 24,
        "content": "An inspection of an establishment where pesticides or devices are produced and held for distribution or sale. New establishments need to be registered electronically."
    },
    {
        "term": "Product chemistry",
        "page": 24,
        "content": "Applies to data on a product's composition and the physical and chemical characteristics of the active ingredient and products. These data include:\n● information on the starting materials, product, or formulating process;\n● information on possible formation of impurities;\n● results of preliminary analysis of product samples;\n● description of analytical methods to identify and quantify ingredients and validation data for such methods; and\n● information on stability, oxidizing and reducing action, flammability, explodability, storage stability, corrosion, dielectric breakdown voltage, octanol/water partition coefficient, vapor pressure, viscosity, and miscibility of the product."
    },
    {
        "term": "Production performance",
        "page": 24,
        "content": "Efficacy: A study to determine how efficacious a pesticide is towards its targeted pest(s)."
    },
    {
        "term": "Production",
        "page": 24,
        "content": "As defined by FIFRA: To manufacture, prepare, propagate, compound, process, package or repackage, label or relabel, or change of containers. EPA Establishment registration (obtain pesticide producing establishment number) must occur before production or distribution takes place."
    },
    {
        "term": "Quality assurance unit (QUA)",
        "page": 25,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: Any person or organizational element, except the study director, designated by testing facility management to perform the duties relating to quality assurance of the studies."
    },
    {
        "term": "Raw data",
        "page": 25,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: Any laboratory worksheets, records, memoranda, notes, or exact copies thereof that are the result of original observations and activities of a study and are necessary for the reconstruction and evaluation of the report of that study. In the event that exact transcripts of raw data have been prepared (e.g., tapes which have been transcribed verbatim, dated, and verified accurate by signature), the exact copy or exact transcript may be substituted for the original source as raw data. “Raw data” may include photographs, microfilm or microfiche copies, computer printouts, magnetic media, including dictated observations, and recorded data from automated instruments."
    },
    {
        "term": "Reduced risk pesticide",
        "page": 25,
        "content": "FIFRA section 3(c) (10) provides for expediting the review of certain types of applications for registration. This program is referred to as the Conventional Reduced Risk Pesticide Program (link to Conventional Reduced Risk Pesticide Program). The Reduced Risk program expedites the review and regulatory decision-making process of conventional pesticides that meet one or more of the following criteria:\n1. Reduce the risks of pesticides to human health.\n2. Reduce the risks of pesticides to nontarget organisms.\n3. Reduce the potential for contamination of groundwater, surface water, or other valued environmental resources.\n4. Broaden the adoption of integrated pest management strategies, or make such strategies more effective.\nThe goal of this program is to expedite registrations for pesticides considered to be reduced risk. This ensures that these reduced risk pesticide uses get into the marketplace and are available to growers and users as soon as possible. Expected participants in this program are the chemical companies and state or federal agencies that submit to the Agency initial registration and amended registration applications for pesticide products.\nThis program does not apply to biological or antimicrobial pesticides, which are handled through separate expediting processes."
    },
    {
        "term": "Regulated pest",
        "page": 26,
        "content": "As defined in 40 CFR 171.3, a particular species of pest specifically subject to Tribal, State, or Federal regulatory restrictions, regulations, or control procedures intended to protect the hosts, man, and/or the environment."
    },
    {
        "term": "Regulatory region",
        "page": 26,
        "content": "As defined in 40 CFR 174.3, genetic material that controls the expression of the genetic material that encodes a pesticidal substance or leads to the production of a pesticidal substance. Examples of regulatory regions include, but are not limited to, promoters, enhancers, and terminators."
    },
    {
        "term": "Registered or previously registered pesticide",
        "page": 26,
        "content": "Any pesticide containing an active ingredient contained in a product that is, or has ever been, an active ingredient in a product registered under sec. 3 of FIFRA. A registered pesticide that is the subject of an application for a new use falls within the category of “registered or previously registered pesticide.”"
    },
    {
        "term": "Reference dose (RfD)",
        "page": 26,
        "content": "The maximum amount of a chemical humans can be exposed to without adverse effects."
    },
    {
        "term": "Reference substance",
        "page": 26,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: Any chemical substance or mixture, or analytical standard, or material other than a test substance, feed, or water, that is administered to or used in analyzing the test system in the course of a study for the purposes of establishing a basis for comparison with the test substance for known chemical or biological measurements."
    },
    {
        "term": "Residue of concern",
        "page": 26,
        "content": "As defined in 40 CFR 158 subpart O, the parent pesticidal compound and its metabolites, degradates, and impurities of toxicological concern."
    },
    {
        "term": "Restricted-entry interval (REI)",
        "page": 26,
        "content": "As defined in 40 CFR 156.203, the time after the end of a pesticide application during which entry to the treated area is restricted."
    },
    {
        "term": "Restricted-use pesticide",
        "page": 27,
        "content": "A pesticide that is classified for restricted use under the provisions of section 3(d) of FIFRA and 40 CFR part 152, subpart I.",
        "links": [
            {
                "phrase": "40 CFR part 152, subpart I",
                "href": "https://www.ecfr.gov/current/title-40/part-152/subpart-I"
            }
        ]
    },
    {
        "term": "Rinsate",
        "page": 27,
        "content": "As defined in 40 CFR 165.3, the liquid resulting from the rinsing of the interior of any equipment or container that has come in direct contact with any pesticide."
    },
    {
        "term": "Scientific Advisory Panel (SAP)",
        "page": 27,
        "content": "FIFRA SAP provides independent scientific advice to the EPA on health and safety issues related to pesticides."
    },
    {
        "term": "Specimen",
        "page": 27,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: Any material derived from a test system for examination or analysis."
    },
    {
        "term": "Signal Words",
        "page": 27,
        "content": "As defined by EPA CFR 40, Part 156.64: Signal Words: Signal words are defined by toxicity category and required on all FIFRA product labels.\n● Toxicity category\n○ Toxicity Category I: “DANGER”\n○ Toxicity Category II: “WARNING”\n○ Toxicity Category III: “CAUTION”\n○ Toxicity Category IV: Not required to bear a signal word, but if a word is used, it should be “CAUTION.”"
    },
    {
        "term": "Significant economic loss",
        "page": 27,
        "content": "As defined in 40 CFR 166.3, compared to the situation without the pest emergency and despite the best efforts of the affected persons, the emergency conditions at the specific use site identified in the application are reasonably expected to cause losses meeting any of the following criteria:\n(1) For pest activity that primarily affects the current crop or other output, one or more of the following:\n(i) Yield loss greater than or equal to 20%. (ii) Economic loss, including revenue losses and cost increases, greater than or equal to 20% of gross revenues.\n(iii) Economic loss, including revenue losses and cost increases greater than or equal to 50% of net revenues.\n(2) For any pest activity where EPA determines that the criteria in paragraph (1) of this definition would not adequately describe the expected loss, substantial loss, or impairment of capital assets, or a loss that would affect the long-term financial viability expected from the productive activity."
    },
    {
        "term": "Similar composition",
        "page": 28,
        "content": "As defined in 40 CFR 162.151, a pesticide product that contains only the same active ingredient(s), or combinations of active ingredients, and which is in the same toxicity category."
    },
    {
        "term": "Similar product",
        "page": 28,
        "content": "As defined in 40 CFR 162.151, a pesticide product which, when compared to a federally registered product, has a similar composition and a similar use pattern."
    },
    {
        "term": "Similar species",
        "page": 28,
        "content": "As defined in 40 CFR 159.153, two or more species belonging to the same general taxonomic groups: The general taxonomic groups for purposes of this requirement are: mammals, birds, reptiles, amphibians, fish, aquatic invertebrates, insects, arachnids, aquatic plants (including macrophyte, floating, and submerged plants), and terrestrial (all non-aquatic) plants."
    },
    {
        "term": "Similar use pattern",
        "page": 28,
        "content": "As defined in 40 CFR 162.151, a use of a pesticide product that, when compared to a federally registered use of a product with a similar composition, does not require a change in precautionary labeling under part 156 of this chapter, and which is substantially the same as the federally registered use. Registrations involving changed use patterns are not included in this term.",
        "links": [
            {
                "phrase": "part 156 of this chapter",
                "href": "https://www.ecfr.gov/current/title-40/part-156"
            }
        ]
    },
    {
        "term": "Small business",
        "page": 28,
        "content": "A small business means a corporation, partnership, or unincorporated business that has 500 or fewer employees and, during the 3-year period before the most recent maintenance fee billing cycle, has average annual global gross revenue from pesticides that did not exceed $60 million (including any such revenue from all of its affiliates)."
    },
    {
        "term": "Special Local Needs (SLN) registration",
        "page": 29,
        "content": "In accordance with FIFRA section 24(c), a state can register a new pesticide product for any use or a federally registered product for an additional use in special, often emergency-related, situations.\n● Must demonstrate a “special local need” and a tolerance, exemption from a tolerance, or other clearance under FFDCA\n● State-specific permit, the EPA can reject the request\n● Requires EPA form 8570-25"
    },
    {
        "term": "Special review",
        "page": 29,
        "content": "As defined in 40 CFR 166.3, any interim administrative review of the risks and benefits of the use of a pesticide conducted pursuant to the provisions of part 154 of this chapter, or § 162.11 of this chapter, prior to November 27, 1985, or any subsequent version of those rules.",
        "links": [
            {
                "phrase": "part 154 of this chapter",
                "href": "https://www.ecfr.gov/current/title-40/part-154"
            },
            {
                "phrase": "§ 162.11",
                "href": "https://www.ecfr.gov/current/title-40/section-162.11"
            }
        ]
    },
    {
        "term": "Sponsor",
        "page": 29,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: A sponsor is a person who initiates and supports, by provision of financial or other resources, for a study; a person who submits a study to the EPA in support of an application for a research or marketing permit; or a testing facility, if it both initiates and actually conducts the study."
    },
    {
        "term": "Starting material",
        "page": 29,
        "content": "As defined in 40 CFR 158 subpart D, a substance used to synthesize or purify a technical grade of active ingredient (or the practical equivalent of the technical grade ingredient if the technical grade cannot be isolated) by chemical reaction."
    },
    {
        "term": "Study",
        "page": 29,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: Any experiment at one of more test sites, in which a test substance is studied in a test system under laboratory conditions or in the environment to determine or help predict its effects, metabolism, product performance (efficacy studies only as required by 40 CFR 158.400 or 161.640, as applicable), environmental and chemical fate, persistence and residue, or other characteristics in humans, other living organisms, or media. The term “study” does not include basic exploratory studies carried out to determine whether a test substance or a test method has any potential utility.",
        "links": [
            {
                "phrase": "40 CFR 158.400",
                "href": "https://www.ecfr.gov/current/title-40/section-158.400"
            },
            {
                "phrase": "161.640",
                "href": "https://www.ecfr.gov/current/title-40/section-161.640"
            }
        ]
    },
    {
        "term": "Study director",
        "page": 30,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: The individual responsible for the overall conduct of a study."
    },
    {
        "term": "Sub-label or Split-label",
        "page": 30,
        "content": "Contains a subset of the approved uses under a given master label, but is a complete, standalone label, containing all of the required labeling elements. A registrant may distribute or sell a product under a sub-label provided that, in limiting the uses identified on the label, no changes would be necessary to the precautionary statements, use classification, or packaging of the product. 40 CFR 152.130(b). Since sub-labels only contain text that already appears on the master label, they are not stamped “ACCEPTED” separately. Final printed labeling must be submitted according to 40 CFR 156.10(a)(6). Label Review Manual Ch. 3- General Labeling Requirements\n● A distributor product with a sub-label containing an alternate brand name must meet the requirements of 40 CFR 152.132 and 40 CFR 156.10(b)(2)(ii).\n○ Indicate when the sub-label does not contain the entire use profile of the product.\n○ Annotate specific label changes on the sub-label.\n○ If proposed changes to a sub-label require changes to the master label, the registrant must submit a new master label incorporating and annotating any additions or changes.\n○ Indicate at the top of the label whether it is a “Sub-Label” or “Split-Label,” for example: SUB-LABEL - Revises Master Label dated XX-XX-XX.",
        "links": [
            {
                "phrase": "40 CFR 152.130(b)",
                "href": "https://www.ecfr.gov/current/title-40/section-152.130"
            },
            {
                "phrase": "40 CFR 156.10(a)(6)",
                "href": "https://www.ecfr.gov/current/title-40/section-156.10"
            },
            {
                "phrase": "40 CFR 152.132",
                "href": "https://www.ecfr.gov/current/title-40/section-152.132"
            },
            {
                "phrase": "40 CFR 156.10(b)(2)(ii)",
                "href": "https://www.ecfr.gov/current/title-40/section-156.10"
            }
        ]
    },
    {
        "term": "Supplemental labeling",
        "page": 30,
        "content": "Supplemental labeling contains modifications to the pesticide label since the last approved master label (e.g., new use, change application timing). Supplemental labels must be submitted for EPA approval, and approved labels are stamped “ACCEPTED” and placed in the official record. Supplemental labels are partial labels distributed with the product by the registrant or distributors in addition to the complete product label. Since these are partial labels, they must bear a statement referring the user to the product label for complete directions, precautions, and a statement that both the product label and supplemental labeling must be in the possession of the user when using the product. Compliance with both the product label and supplemental labeling is required to safely and effectively use the product. Label Review Manual Ch. 3- General Labeling Requirements\n● Supplemental labeling must include:\n○ Product name\n○ EPA Registration Number\n○ Restricted use classification statement (if applicable)\n○ “It is a violation of Federal law to use this product in a manner inconsistent with its labeling.”\n○ “This labeling must be in possession of the user at the time of application.”\n○ “Read the label affixed to the container for [product name] before applying.”\n○ Use of [product name] according to this labeling is subject to the use precautions and limitations imposed by the label affixed to the container for [product name].”"
    },
    {
        "term": "Suspension concentrate",
        "page": 31,
        "content": "As defined in 40 CFR 165.3, a stable suspension of solid particulate active ingredients in a liquid intended for dilution with water before use."
    },
    {
        "term": "Tamper-evident device",
        "page": 31,
        "content": "As defined in 40 CFR 165.3, a device that can be visually inspected to determine if a container has been opened."
    },
    {
        "term": "Technically feasible",
        "page": 31,
        "content": "As defined in 40 CFR 157.21, when applied to child-resistant packaging, means that the technology exists to produce the child-resistant packaging for a particular pesticide."
    },
    {
        "term": "Technical Grade Active Ingredient (TGAI)",
        "page": 31,
        "content": "As defined in 40 CFR Subpart D 158.300: A material containing an active ingredient that contains no inert ingredient, other than one used for purification of the active ingredient, and is produced on a commercial or pilot plant production scale (whether or not it is ever held for sale)."
    },
    {
        "term": "Testing facility",
        "page": 31,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: A person who actually conducts a study, i.e., actually uses the test substance in a test system. “Testing facility” encompasses only those operational units that are being or have been used to conduct studies."
    },
    {
        "term": "Test substance",
        "page": 32,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: A substance or mixture administered or added to a test system in a study, which substance or mixture:\n1. Is the subject of an application for a research or marketing permit supported by the study, or is the contemplated subject of such an application, or\n2. Is an ingredient, impurity, degradation product, metabolite, or radioactive isotope of a substance described by paragraph (1) of this definition, or some other substance related to a substance described by that paragraph, which is used in the study to assist in characterizing the toxicity, metabolism, or other characteristics of a substance described by that paragraph."
    },
    {
        "term": "Test system",
        "page": 32,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: Any animal, plant, microorganism, chemical, or physical matrix, including but not limited to soil or water, or subparts thereof, to which the test, control, or reference substance is administered or added for study. “Test system” also includes appropriate groups or components of the system not treated with the test, control, or reference substance."
    },
    {
        "term": "“The label is the law.”",
        "page": 32,
        "content": "Meaning the directions on the label of a pesticide are the law. This addresses: product use, application, cautionary warnings, appropriate PPE, handling and storage safety, proper disposal, conditions of use (i.e., may not be used under windy conditions, do not use before rain events, etc); etc.\n● How EPA communicates the Tolerance (dietary risk), Occupational risk, and Environmental risk with end-users.\n● The approved use of the product as prescribed by the label. It is illegal to use a product in any way other than that prescribed by the label."
    },
    {
        "term": "Tolerance",
        "page": 32,
        "content": "The maximum permissible level for pesticide residues allowed in or on human food and animal feed. Referred to as maximum residue limits (MRL) in many other countries. About Pesticide Tolerances"
    },
    {
        "term": "Tolerance exemption",
        "page": 32,
        "content": "A formal determination by the EPA pursuant to FFDCA section 408(c), 21 U.S.C 346a(c), that no tolerance is needed for a given pesticide chemical residue in or on a particular food commodity. For purposes of this part, the term “tolerance” shall include an exemption from the requirement of a tolerance."
    },
    {
        "term": "Toxicity",
        "page": 33,
        "content": "The property of a pesticide that refers to the degree to which the pesticide, and its degradates and metabolites, are able to cause an adverse physiological effect on an organism."
    },
    {
        "term": "Toxicity Category",
        "page": 33,
        "content": "As defined by EPA CFR 40, Part 156.62: Toxicity Category: Toxicity is classified into 4 categories (I, II, III, IV) based on five hazard indicators (Oral LD50, Dermal LD50, Inhalation LD50, Eye Irritation, and Skin Irritation). Signal words, on product labeling, are based on these four categories."
    },
    {
        "term": "Toxicity criterion",
        "page": 33,
        "content": "As defined in 40 CFR 157.22, based upon testing with an appropriate test species, the product meets any of the following toxicity criteria:\n(1) The pesticide has an acute oral LD50 of 1.5 g/kg or less;\n(2) The pesticide has an acute dermal LD50 of 2000 mg/kg or less;\n(3) The pesticide has an acute inhalation LC50 of 2 mg/liter or less;\n(4) The pesticide is corrosive to the eye (causes irreversible destruction of ocular tissue) or causes corneal involvement or irritation persisting for 21 days or more;\n(5) The pesticide is corrosive to the skin (causes tissue destruction into the dermis and/or scarring) or causes severe skin irritation (severe erythema or edema) at 72 hours; or\n(6) The pesticide or device has such characteristics that, based upon human toxicological data, use history, accident data, or such other evidence as is available, the Agency determines there is serious hazard of accidental injury or illness which child-resistant packaging could reduce; and use criterion."
    },
    {
        "term": "Treated area",
        "page": 33,
        "content": "Any area to which a pesticide is being directed or has been directed."
    },
    {
        "term": "Treated articles",
        "page": 34,
        "content": "An article or substance treated with or containing a biocide to protect the treated article or substance itself. Example: Odor-blocking garbage bag."
    },
    {
        "term": "Unit packaging",
        "page": 34,
        "content": "As defined in 40 CFR 157.21, a package that is labeled with directions to use the entire contents of the package in a single application."
    },
    {
        "term": "Unreasonable adverse effects on the environment",
        "page": 34,
        "content": "As defined by FIFRA regulations: Any reasonable risk to man or the environment, taking into account the economic, social, and environmental costs and benefits of the use of any pesticide. Or, a human dietary risk from residues that result from the use of a pesticide in or on any food, inconsistent with the standard under section 408 of the Federal Food, Drug, and Cosmetic Act. Summary of FIFRA"
    },
    {
        "term": "Use, as in “to use a pesticide”",
        "page": 34,
        "content": "As defined in 40 CFR 171.3, means any of the following:\n(1) Pre-application activities involving mixing and loading the pesticide.\n(2) Applying the pesticide, including, but not limited to, supervising the use of a pesticide by a noncertified applicator.\n(3) Other pesticide-related activities, including, but not limited to, transporting or storing pesticide containers that have been opened, cleaning equipment, and disposing of excess pesticides, spray mix, equipment wash waters, pesticide containers, and other pesticide-containing materials."
    },
    {
        "term": "Use criterion",
        "page": 34,
        "content": "As defined in 40 CFR 157.22, the product's labeling either directly recommends residential use or reasonably can be interpreted to permit residential use."
    },
    {
        "term": "Use-specific instructions",
        "page": 34,
        "content": "As defined in 40 CFR 171.3, the information and requirements specific to a particular pesticide product or work site that an applicator needs in order to use the pesticide in accordance with applicable requirements and without causing unreasonable adverse effects."
    },
    {
        "term": "Validated test",
        "page": 35,
        "content": "As defined in 40 CFR 154.3, a test determined by the EPA to have been conducted and evaluated in a manner consistent with accepted scientific procedures."
    },
    {
        "term": "Value for pesticide purposes",
        "page": 35,
        "content": "As defined in 40 CFR 172.1, a characteristic of a substance or mixture of substances that produces an efficacious action on a pest."
    },
    {
        "term": "Vector",
        "page": 35,
        "content": "As defined in 40 CFR 158 subpart R, any organism capable of transmitting the causative agent of human and/or animal disease, including but not limited to mosquitoes and ticks."
    },
    {
        "term": "Vehicle",
        "page": 35,
        "content": "As defined in EPA 40 CFR Part 160: Good Laboratory Practice Standards: Any agent that facilitates the mixture, dispersion, or solubilization of a test substance with a carrier."
    },
    {
        "term": "Waiver",
        "page": 35,
        "content": "An applicant that meets the definition of a small business, a corporation, partnership or un-incorporated business of 500 employees or fewer and during the 3-year period prior to the most recent maintenance fee billing cycle beginning January 15, has an average annual global gross revenue from pesticides of i.) less than $10 million (including any such revenue from all of its affiliates) is eligible for a seventy-five percent (75%) waiver of the pesticide registration service fee, or ii.) has an average annual global gross revenue from pesticides that did not exceed $60 million (including any such revenue from all of its affiliates) is eligible for a fifty percent (50%) waiver."
    },
    {
        "term": "Washwater",
        "page": 35,
        "content": "As defined in 40 CFR 165.3, the liquid resulting from the rinsing of the exterior of any equipment or containers that have or may have come in direct contact with any pesticide or system maintenance compound, such as oil or antifreeze."
    },
    {
        "term": "Water reference level",
        "page": 35,
        "content": "As defined in 40 CFR 159.153, whichever of the two levels specified is lower:\n(1)Ten percent of the maximum contaminant level (MCL) established by EPA, or if no MCL has been established by EPA, 10 percent of the most recent draft or final long-term health advisory level (HAL) established by EPA, or if EPA has not published or proposed an MCL or HAL, the lowest detectable amount of the pesticide.\n(2) The ambient water quality criteria for the protection of aquatic life, established by EPA pursuant to section 304(a) of the Clean Water Act."
    },
    {
        "term": "Web-distributed labeling",
        "page": 36,
        "content": "If a label references a company’s website, either by listing a web address or URL, including a Quick Response Code (QR Code), or using similar identifiers that direct to a website, then the website becomes “labeling” under FIFRA and is subject to EPA review. PR Notice 2014-1. Web-distributed labeling for pesticides."
    }
];

const LINK_PHRASES = [
    {
        "phrase": "40 CFR 152.132",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-152"
    },
    {
        "phrase": "40 CFR 152.130(b)",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-152"
    },
    {
        "phrase": "40 CFR 156.10(b)(2)(ii)",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156"
    },
    {
        "phrase": "40 CFR 156.10(a)(6)",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156"
    },
    {
        "phrase": "40 CFR 152.3",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-152/subpart-A/section-152.3"
    },
    {
        "phrase": "40 CFR 154.3",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-154/subpart-A/section-154.3"
    },
    {
        "phrase": "40 CFR 157.21",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-157"
    },
    {
        "phrase": "40 CFR 157.22",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-157/subpart-B/section-157.22"
    },
    {
        "phrase": "40 CFR 158 subpart D",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-D"
    },
    {
        "phrase": "40 CFR 158 subpart O",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-O"
    },
    {
        "phrase": "40 CFR 158 subpart R",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-R/section-158.1701"
    },
    {
        "phrase": "40 CFR 159.153",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-159/subpart-D/section-159.153"
    },
    {
        "phrase": "40 CFR 162.151",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-162/subpart-D/section-162.151"
    },
    {
        "phrase": "40 CFR 165.3",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-165/subpart-A/section-165.3"
    },
    {
        "phrase": "40 CFR 166.3",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-166/subpart-A/section-166.3"
    },
    {
        "phrase": "40 CFR 171.3",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-171/subpart-A/section-171.3"
    },
    {
        "phrase": "40 CFR 172.1",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-172/subpart-A/section-172.1"
    },
    {
        "phrase": "40 CFR 174.3",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-174/subpart-A/section-174.3"
    },
    {
        "phrase": "40 CFR Subpart D 158.300",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-D/section-158.300"
    },
    {
        "phrase": "EPA 40 CFR Part 160: Good Laboratory Practice Standards",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-160"
    },
    {
        "phrase": "EPA CFR 40, Part 156.62: Toxicity Category",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156/subpart-D/section-156.62"
    },
    {
        "phrase": "EPA CFR 40, Part 156.64: Signal Words",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-156/subpart-D/section-156.64"
    },
    {
        "phrase": "FIFRA Section 2(p)(1)",
        "href": "https://www.epa.gov/laws-regulations/summary-federal-insecticide-fungicide-and-rodenticide-act"
    },
    {
        "phrase": "FIFRA Section 2(p)",
        "href": "https://www.epa.gov/laws-regulations/summary-federal-insecticide-fungicide-and-rodenticide-act"
    },
    {
        "phrase": "FIFRA sec. 2(b)",
        "href": "https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-158/subpart-D"
    },
    {
        "phrase": "FIFRA section 24(c)",
        "href": "https://www.epa.gov/pesticide-registration/guidance-fifra-24c-registrations"
    },
    {
        "phrase": "FIFRA regulations",
        "href": "https://www.epa.gov/pesticide-science-and-assessing-pesticide-risks/overview-risk-assessment-pesticide-program#human_health"
    },
    {
        "phrase": "Summary of FFDCA",
        "href": "https://www.epa.gov/laws-regulations/summary-federal-food-drug-and-cosmetic-act"
    },
    {
        "phrase": "Summary of FIFRA",
        "href": "https://www.epa.gov/laws-regulations/summary-federal-insecticide-fungicide-and-rodenticide-act"
    },
    {
        "phrase": "About Pesticide Tolerances",
        "href": "https://www.epa.gov/pesticide-tolerances/about-pesticide-tolerances"
    },
    {
        "phrase": "Label Review Manual Ch. 3- General Labeling Requirements",
        "href": "https://www.epa.gov/pesticide-registration/label-review-manual"
    },
    {
        "phrase": "Label Review Manual Ch. 3-General Labeling Requirements",
        "href": "https://www.epa.gov/pesticide-registration/label-review-manual"
    },
    {
        "phrase": "EPA Label Review Manual, Ch. 13: Storage and Disposal",
        "href": "https://www.epa.gov/sites/default/files/2017-10/documents/chap-13-jul-2013.pdf"
    },
    {
        "phrase": "EPA Label Review Manual, Ch. 7, Section III.D",
        "href": "https://www.epa.gov/sites/default/files/2018-04/documents/chap-07-mar-2018.pdf"
    },
    {
        "phrase": "EPA Label Review Manual, Ch. 7, Section III.F",
        "href": "https://www.epa.gov/sites/default/files/2018-04/documents/chap-07-mar-2018.pdf"
    },
    {
        "phrase": "EPA Label Review Manual, Ch. 8: Environmental Hazards",
        "href": "https://www.epa.gov/sites/default/files/2015-03/documents/chap-08-sep-2012.pdf"
    },
    {
        "phrase": "EPA Label Review Manual, Ch. 9: Physical and Chemical Hazards",
        "href": "https://www.epa.gov/sites/default/files/2015-03/documents/chap-09-sep-2012.pdf"
    },
    {
        "phrase": "Registration Information by Type of Pesticide-Antimicrobial",
        "href": "https://www.epa.gov/pesticide-registration/antimicrobial-pesticide-registration"
    },
    {
        "phrase": "Registration Information by Type of Pesticide-Conventional",
        "href": "https://www.epa.gov/pesticide-registration/conventional-pesticide-registration"
    },
    {
        "phrase": "Registration Information by Type of Pesticide-Biopesticide",
        "href": "https://www.epa.gov/pesticide-registration/biopesticide-registration"
    },
    {
        "phrase": "Regulated by the EPA Antimicrobial Division",
        "href": "https://www.epa.gov/pesticide-contacts/contacts-office-pesticide-programs-antimicrobials-division"
    },
    {
        "phrase": "Regulated by the EPA Biopesticides and Pollution Prevention Division",
        "href": "https://www.epa.gov/pesticide-contacts/contacts-office-pesticide-programs-biopesticides-and-pollution-prevention"
    },
    {
        "phrase": "Regulated by the EPA Registration Division",
        "href": "https://www.epa.gov/pesticide-contacts/contacts-office-pesticide-programs-registration-division"
    },
    {
        "phrase": "Pesticide Registration Manual Ch. 1 Overview",
        "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-1-overview-requirements-pesticide"
    },
    {
        "phrase": "Pesticide Registration Manual Ch. 12-Applying for an EUP",
        "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-12-applying-experimental-use-permit"
    },
    {
        "phrase": "Pesticide Registration Manual Ch. 5-Registration Fees",
        "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-5-registration-fees"
    },
    {
        "phrase": "Pesticide Registration Manual: CSF Documents",
        "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-confidential-statement-formula-documents"
    },
    {
        "phrase": "EPA Form 8570-4",
        "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-20-forms-and-how-obtain-them#epa"
    },
    {
        "phrase": "EPA Form 8570-34",
        "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-20-forms-and-how-obtain-them#epa"
    },
    {
        "phrase": "EPA Form 8570-35",
        "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-20-forms-and-how-obtain-them#epa"
    },
    {
        "phrase": "EPA Form 3540-8",
        "href": "https://www.epa.gov/compliance/epa-form-3540-8-application-registration-pesticide-producing-and-device-producing"
    },
    {
        "phrase": "EPA Form 3540-16",
        "href": "https://www.epa.gov/compliance/epa-form-3540-16-pesticide-report-pesticide-producing-and-device-producing"
    },
    {
        "phrase": "EPA form 8570-25",
        "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-20-forms-and-how-obtain-them#epa"
    },
    {
        "phrase": "How to obtain a company number and register an official address",
        "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-how-obtain-company-number-and-register#whatis"
    },
    {
        "phrase": "Example of storage and disposal statement",
        "href": "https://www.epa.gov/pesticide-labels/label-review-training-module-3-special-issues-page-30"
    },
    {
        "phrase": "Harmonized Test Guidelines, Series 810",
        "href": "https://www.epa.gov/test-guidelines-pesticides-and-toxic-substances/series-810-product-performance-test-guidelines"
    },
    {
        "phrase": "Antimicrobial Science Policies",
        "href": "https://www.epa.gov/pesticide-registration/efficacy-requirements-antimicrobial-pesticides"
    },
    {
        "phrase": "Disinfectant Technical Science Section (DIS/TSS) documents",
        "href": "https://www.epa.gov/pesticide-registration/efficacy-requirements-antimicrobial-pesticides"
    },
    {
        "phrase": "CDX Pesticide Submission Portal (PSP)",
        "href": "https://cdx.epa.gov/"
    },
    {
        "phrase": "internal worksheet",
        "href": "https://www.epa.gov/sites/default/files/2014-03/documents/pria21day_wrksht.pdf"
    },
    {
        "phrase": "PRIA 5 Fee Determination Decision Tree",
        "href": "https://www.epa.gov/pria-fees/pria-5-fee-determination-decision-tree"
    },
    {
        "phrase": "R060",
        "href": "https://www.epa.gov/pria-fees/r060-pria-fee-category"
    },
    {
        "phrase": "FAQs",
        "href": "https://www.epa.gov/compliance/pesticide-producing-establishments-frequent-questions"
    },
    {
        "phrase": "Now completed electronically",
        "href": "https://www.epa.gov/compliance/electronic-reporting-pesticide-establishments"
    },
    {
        "phrase": "need to be registered electronically",
        "href": "https://www.epa.gov/compliance/electronic-reporting-pesticide-establishments"
    },
    {
        "phrase": "Overview of PIPs",
        "href": "https://www.epa.gov/regulation-biotechnology-under-tsca-and-fifra/overview-plant-incorporated-protectants"
    },
    {
        "phrase": "Conventional Reduced Risk Pesticide Program",
        "href": "https://www.epa.gov/pesticide-registration/conventional-reduced-risk-pesticide-program"
    },
    {
        "phrase": "SAP",
        "href": "https://www.epa.gov/sap"
    },
    {
        "phrase": "Section 7 of FIFRA",
        "href": "https://www.epa.gov/compliance/pesticide-establishment-registration-and-reporting"
    },
    {
        "phrase": "Web-distributed labeling for pesticides",
        "href": "https://www.epa.gov/pesticide-labels/web-distributed-labeling-pesticides"
    },
    {
        "phrase": "Using the Correct Distribution Code",
        "href": "https://www.epa.gov/pesticide-registration/pesticide-registration-manual-chapter-21-directions-submitting-applications#code"
    }
];

const sortedLinkPhrases = [...LINK_PHRASES].sort(
    (a, b) => b.phrase.length - a.phrase.length
);

function slugify(value) {
    return value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function getFirstLetter(term) {
    const firstLetter = term.replace(/[“”"']/g, "").charAt(0).toUpperCase();
    return /[A-Z]/.test(firstLetter) ? firstLetter : "#";
}

function renderLinkedText(text, entryLinks = []) {
    const linkPhrases = [...entryLinks, ...sortedLinkPhrases].sort(
        (a, b) => b.phrase.length - a.phrase.length
    );

    const nodes = [];
    const lowerText = text.toLowerCase();
    let index = 0;

    while (index < text.length) {
        const match = linkPhrases.find((item) =>
            lowerText.startsWith(item.phrase.toLowerCase(), index)
        );

        if (match) {
            const matchedText = text.slice(index, index + match.phrase.length);

            nodes.push(
                <a
                    key={`link-${index}-${match.phrase}`}
                    href={match.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary-darker"
                >
                    {matchedText}
                </a>
            );

            index += match.phrase.length;
            continue;
        }

        let nextIndex = index + 1;

        while (
            nextIndex < text.length &&
            !linkPhrases.some((item) =>
                lowerText.startsWith(item.phrase.toLowerCase(), nextIndex)
            )
        ) {
            nextIndex += 1;
        }

        nodes.push(text.slice(index, nextIndex));
        index = nextIndex;
    }

    return nodes;
}

function parseListLine(line) {
    const orderedMatch = line.match(/^(\d+)\.\s+(.*)$/);

    if (orderedMatch) {
        return {
            type: "ol",
            text: orderedMatch[2],
            level: 0,
        };
    }

    const parenthesizedOrderedMatch = line.match(/^\((\d+)\)\s*(.*)$/);

    if (parenthesizedOrderedMatch) {
        return {
            type: "ol",
            text: parenthesizedOrderedMatch[2],
            level: 0,
        };
    }

    const topBulletMatch = line.match(/^●\s+(.*)$/);

    if (topBulletMatch) {
        return {
            type: "ul",
            text: topBulletMatch[1],
            level: 0,
        };
    }

    const nestedBulletMatch = line.match(/^○\s+(.*)$/);

    if (nestedBulletMatch) {
        return {
            type: "ul",
            text: nestedBulletMatch[1],
            level: 1,
        };
    }

    const unorderedMatch = line.match(/^(\s*)-\s+(.*)$/);

    if (unorderedMatch) {
        return {
            type: "ul",
            text: unorderedMatch[2],
            level: unorderedMatch[1].length > 0 ? 1 : 0,
        };
    }

    return null;
}

function GlossaryDefinition({ content, links = [] }) {
    const lines = content
        .split("\n")
        .map((line) => line.trimEnd())
        .filter(Boolean);

    const blocks = [];
    let listType = null;
    let listItems = [];

    const flushList = () => {
        if (!listItems.length) return;

        blocks.push({
            type: listType,
            items: listItems,
        });

        listType = null;
        listItems = [];
    };

    lines.forEach((line) => {
        const listLine = parseListLine(line.trim());

        if (listLine) {
            if (listType && listType !== listLine.type) {
                flushList();
            }

            listType = listLine.type;
            listItems.push({
                text: listLine.text,
                level: listLine.level,
            });

            return;
        }

        flushList();

        blocks.push({
            type: "p",
            text: line.trim(),
        });
    });

    flushList();

    return (
        <div className="mt-3 text-base leading-7 text-gray-800">
            {blocks.map((block, index) => {
                if (block.type === "ol") {
                    return (
                        <ol
                            key={`ol-${index}`}
                            className="mt-3 ml-6 list-decimal space-y-1"
                        >
                            {block.items.map((item, itemIndex) => (
                                <li key={`ol-${index}-${itemIndex}`}>
                                    {renderLinkedText(item.text, links)}
                                </li>
                            ))}
                        </ol>
                    );
                }

                if (block.type === "ul") {
                    return (
                        <ul key={`ul-${index}`} className="mt-3 ml-6 list-disc space-y-1">
                            {block.items.map((item, itemIndex) => (
                                <li
                                    key={`ul-${index}-${itemIndex}`}
                                    className={item.level > 0 ? "ml-6 list-[circle]" : ""}
                                >
                                    {renderLinkedText(item.text, links)}
                                </li>
                            ))}
                        </ul>
                    );
                }

                return (
                    <p key={`p-${index}`} className={index === 0 ? "" : "mt-4"}>
                        {renderLinkedText(block.text, links)}
                    </p>
                );
            })}
        </div>
    );
}

const ENTRIES_PER_PAGE = 10;
function PaginationControls({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <nav
            aria-label="Glossary pagination"
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded border border-gray-300 px-3 py-2 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:text-gray-400"
            >
                Previous
            </button>

            {pageNumbers.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    aria-current={currentPage === page ? "page" : undefined}
                    className={`rounded border px-3 py-2 text-sm font-semibold ${currentPage === page
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 text-primary hover:bg-primary-lighter"
                        }`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded border border-gray-300 px-3 py-2 text-sm font-semibold text-primary disabled:cursor-not-allowed disabled:text-gray-400"
            >
                Next
            </button>
        </nav>
    );
}

export default function GlossaryPage() {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pendingScrollTerm, setPendingScrollTerm] = useState(null);
    const [pendingScrollLetter, setPendingScrollLetter] = useState(null);
    const [activeTerm, setActiveTerm] = useState(slugify(GLOSSARY_ENTRIES[0].term));

    const filteredEntries = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) return GLOSSARY_ENTRIES;

        return GLOSSARY_ENTRIES.filter((entry) =>
            `${entry.term} ${entry.content}`.toLowerCase().includes(normalizedQuery)
        );
    }, [query]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredEntries.length / ENTRIES_PER_PAGE)
    );

    const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
    const endIndex = Math.min(startIndex + ENTRIES_PER_PAGE, filteredEntries.length);

    const paginatedEntries = useMemo(() => {
        return filteredEntries.slice(startIndex, endIndex);
    }, [filteredEntries, startIndex, endIndex]);

    const paginatedGroupedEntries = useMemo(() => {
        return paginatedEntries.reduce((groups, entry) => {
            const key = getFirstLetter(entry.term);

            if (!groups[key]) {
                groups[key] = [];
            }

            groups[key].push(entry);
            return groups;
        }, {});
    }, [paginatedEntries]);

    const groupedEntries = useMemo(() => {
        return filteredEntries.reduce((groups, entry) => {
            const key = getFirstLetter(entry.term);

            if (!groups[key]) {
                groups[key] = [];
            }

            groups[key].push(entry);
            return groups;
        }, {});
    }, [filteredEntries]);

    useEffect(() => {
        setCurrentPage(1);
    }, [query]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    useEffect(() => {
    if (!pendingScrollTerm) return;

    const id = slugify(pendingScrollTerm);

    requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        setActiveTerm(id);
        setPendingScrollTerm(null);
    });
}, [pendingScrollTerm, paginatedEntries]);

    useEffect(() => {
    const handleScroll = () => {
        for (const entry of paginatedEntries) {
            const id = slugify(entry.term);
            const element = document.getElementById(id);

            if (element) {
                const rect = element.getBoundingClientRect();

                if (rect.top <= 160 && rect.bottom >= 160) {
                    setActiveTerm(id);
                    break;
                }
            }
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
}, [paginatedEntries]);
    const goToPage = (page) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(nextPage);

    requestAnimationFrame(() => {
        document.getElementById("glossary-results")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
};

    const scrollTo = (term) => {
        const targetIndex = filteredEntries.findIndex((entry) => entry.term === term);

        if (targetIndex === -1) return;

        const targetPage = Math.floor(targetIndex / ENTRIES_PER_PAGE) + 1;

        setCurrentPage(targetPage);
        setPendingScrollTerm(term);
    };

    const alphabetLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const availableLetters = useMemo(() => {
        return new Set(filteredEntries.map((entry) => getFirstLetter(entry.term)));
    }, [filteredEntries]);

    const scrollInsideMain = (element, offset = 0) => {
        const container = mainScrollRef.current;

        if (!element || !container) return;

        const containerRect = container.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        container.scrollTo({
            top: container.scrollTop + elementRect.top - containerRect.top - offset,
            behavior: "smooth",
        });
    };

const scrollToLetter = (letter) => {
    const targetIndex = filteredEntries.findIndex(
        (entry) => getFirstLetter(entry.term) === letter
    );

    if (targetIndex === -1) return;

    const targetPage = Math.floor(targetIndex / ENTRIES_PER_PAGE) + 1;

    setCurrentPage(targetPage);

    setPendingScrollLetter({
        letter,
        targetPage,
        timestamp: Date.now(),
    });
};

useEffect(() => {
    if (!pendingScrollLetter) return;
    if (currentPage !== pendingScrollLetter.targetPage) return;

    const timeoutId = window.setTimeout(() => {
        const section = document.getElementById(
            `glossary-section-${pendingScrollLetter.letter}`
        );

        if (!section) return;

        const yOffset = -120;
        const y =
            section.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });

        setPendingScrollLetter(null);
    }, 50);

    return () => window.clearTimeout(timeoutId);
}, [pendingScrollLetter, currentPage, paginatedGroupedEntries]);

    return (
        <div className="px-6 py-10 tracking-wide md:px-12 lg:px-20">
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

                <span className="text-gray-800">Glossary</span>
            </div>

            <InternalPageHero
                title="Glossary"
                subtitle="Alphabetized terms and definitions - Use this glossary to review terms, definitions, and related regulatory language."
            />

            <div className="mt-10 flex flex-col gap-10 lg:flex-row">
                <aside className="w-full shrink-0 lg:sticky lg:top-8 lg:w-[280px] lg:self-start">
                    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                        <label
                            htmlFor="glossary-search"
                            className="mb-2 block text-sm font-bold text-gray-900"
                        >
                            Search glossary
                        </label>

                        <div className="relative w-full overflow-hidden rounded-md">
                            <div className="relative flex h-10 w-full overflow-hidden rounded-md border border-gray-300 bg-white focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-lighter">
                                <input
                                    id="glossary-search"
                                    type="text"
                                    role="searchbox"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search by term or definition"
                                    className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 pr-10 text-sm leading-5 text-gray-900 outline-none placeholder:text-xs placeholder:text-gray-500 focus:border-0 focus:outline-none focus:ring-0"
                                />

                                <svg
                                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                                    aria-hidden="true"
                                    focusable="false"
                                    role="img"
                                >
                                    <use href="/assets/img/sprite.svg#search"></use>
                                </svg>
                            </div>
                        </div>

                        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                            <span>
                                {filteredEntries.length}{" "}
                                {filteredEntries.length === 1 ? "term" : "terms"}
                            </span>

                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery("")}
                                    className="font-semibold text-primary underline underline-offset-2"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        <nav
                            aria-label="Glossary alphabet navigation"
                            className="mt-2 border-t border-gray-200 pt-4"
                        >
                            <div className="grid grid-cols-6 gap-2">
                                {alphabetLetters.map((letter) => {
                                    const isAvailable = availableLetters.has(letter);

                                    return (
                                        <button
                                            key={letter}
                                            type="button"
                                            disabled={!isAvailable}
                                            onClick={() => scrollToLetter(letter)}
                                            className={`rounded border px-1 py-1 !text-xs font-bold ${isAvailable
                                                ? "border-primary text-primary hover:bg-primary-lighter"
                                                : "cursor-not-allowed border-gray-200 text-gray-300"
                                                }`}
                                        >
                                            {letter}
                                        </button>
                                    );
                                })}
                            </div>
                        </nav>

                        <nav
                            aria-label="Glossary term navigation"
                            className="mt-5 max-h-[48vh] overflow-y-auto border-l-2 border-gray-200"
                        >
                            {Object.entries(groupedEntries).map(([letter, entries]) => (
                                <div key={letter} className="mb-4">
                                    <p className="mb-1 pl-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                                        {letter}
                                    </p>

                                    {entries.map((entry) => {
                                        const id = slugify(entry.term);
                                        const isActive = activeTerm === id;

                                        return (
                                            <button
                                                key={entry.term}
                                                type="button"
                                                onClick={() => scrollTo(entry.term)}
                                                className={`block w-full py-1.5 pl-4 pr-2 text-left !text-xs font-medium hover:bg-primary-lighter hover:text-primary-darker ${isActive ? "bg-primary-lighter text-primary-darker" : "text-primary"
                                                    }`}
                                            >
                                                {entry.term}
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </nav>
                    </div>
                </aside>

                <main
                    id="glossary-results"
                    className="min-w-0 flex-1 scroll-mt-24"
                >
                    {filteredEntries.length === 0 ? (
                        <div className="mt-10 rounded border border-gray-200 bg-gray-50 p-8 text-gray-700">
                            No glossary terms match your search.
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
                                <p>
                                    Showing {startIndex + 1}–{endIndex} of {filteredEntries.length} terms
                                </p>

                                <p>
                                    Page {currentPage} of {totalPages}
                                </p>
                            </div>

                            <div className="mt-5 space-y-4">
                                {Object.entries(paginatedGroupedEntries).map(([letter, entries]) => (
                                    <section
                                        key={letter}
                                        id={`glossary-section-${letter}`}
                                        className="scroll-mt-28"
                                    >
                                        <div className="mb-4 text-3xl font-bold text-primary flex items-center gap-4">
                                            <h2 className="!mb-0 text-3xl font-bold text-primary">
                                                {letter}
                                            </h2>
                                            <div className="h-px flex-1 bg-gray-200" />
                                        </div>

                                        <div className="space-y-4">
                                            {entries.map((entry) => (
                                                <article
                                                    key={entry.term}
                                                    id={slugify(entry.term)}
                                                    className="scroll-mt-28 pb-5"
                                                >
                                                    <h2 className="!mb-0 text-2xl font-bold text-black">
                                                        {entry.term}
                                                    </h2>

                                                    <GlossaryDefinition
                                                        content={entry.content}
                                                        links={entry.links || []}
                                                    />
                                                </article>
                                            ))}
                                        </div>
                                    </section>
                                ))}
                            </div>

                            <PaginationControls
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={goToPage}
                            />
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}
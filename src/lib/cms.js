export const GET_ALL_AGENCY_POSTS = `
query GetAllAgencyPosts {
  agencies(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      databaseId
      title
      agencyInternalConnector {
        featuredImage {
          node {
            sourceUrl
          }
        }
        cardDescription
        isPrimary
        agencyType
        backgroundText
        permitsApplicable
        regulatoryApplication
      }
    }
  }
}
`;

export async function getAllAgencyPosts() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_ALL_AGENCY_POSTS }),
      cache: "no-store",
    });

    if (!res.ok)
      throw new Error(`WordPress responded with status ${res.status}`);

    const { data } = await res.json();
    return data?.agencies?.nodes || [];
  } catch (error) {
    console.error("Error fetching dynamic agency posts:", error);
    return []; // Return empty array so Promise.all won't crash the homepage
  }
}

export const GET_HOMEPAGE_DATA = `
query GetHomepageData {
  page(id: "46", idType: DATABASE_ID) {
    homepageSlideshowFields {
      # Slide 1 Fields
      slide1Image {
        node {
          sourceUrl
        }
      }
      slide1Label
      slide1Line1
      slide1Line2

      # Slide 2 Fields
      slide2Image {
        node {
          sourceUrl
        }
      }
      slide2Tag
      slide2Title
      slide2Description01
      slide2Description02

      # Slide 3 Fields
      slide3Image {
        node {
          sourceUrl
        }
      }
      slide3Tag
      slide3Title
      slide3Description01
      slide3Description02

      # Slide 4 Fields
      slide4Image {
        node {
          sourceUrl
        }
      }
      slide4Tag
      slide4Title
      slide4Description01
      slide4Description02
    }
  }
}
`;

export const GET_DISCLAIMER_DATA = `
query GetDisclaimerData {
  page(id: "324", idType: DATABASE_ID) {
    homepageDisclaimer {
      sectionTitle
      attentionTitleHeader
      contentUpdatedText
      attentionDescriptionText
    }
  }
}
`;

// export const GET_RESEARCH_PAGE_DATA = `
// query GetResearchPageData {
//   page(id: "335", idType: DATABASE_ID) {
//     researchRequirements{
//       pageTitle
//       pageSubtitle
//       overviewTitle
//       overviewDescription
//       section01Title
//       section02Title
//       section02Description
//       additionalTitle
//       additionalDescription
//       conventionalJson
//       biochemicalJson
//       microbialJson
//     }
//   }
// }
// `;

export const GET_EXPERIMENTAL_USE_DATA = `
query GetExperimentalUseData {
  page(id: "374", idType: DATABASE_ID) { 
    fieldStudiesExperimentalUse {
      pageTitle
      pageSubtitle
      overviewTitle
      overviewDescription
      eupApplicationTitle
      eupApplicationDescription
      confidentialStatementTitle
      confidentialStatementDescription
      requiredFormsTitle
      requiredFormsDescription
      additionalResourcesTitle
      additionalResourcesDescription
      questionsTitle
      questionsDescription
    }
  }
}
`;

export const GET_AGENCY_BY_ID = `
query GetAgencyBySlug($slug: ID!) {
  agency(id: $slug, idType: DATABASE_ID) {
    title
    agencyInternalConnector {
      backgroundText
      implementingAgency
      regulatoryApplication
      permitsApplicable
      contacts
      agencyhomepagelink
      agencySubtitle
      beginningCitation
      endCitation
    }
  }
}
`;

export const GET_ALL_STRATEGY_POSTS = `
query GetAllStrategyPosts {
  # Setting orderby DATE ensures your uploads stay chronological
  strategies(first: 100, where: { orderby: { field: DATE, order: ASC } }) {
    nodes {
      databaseId
      title
      controlStrategiesConnector {
        strategyDescription
        learnMoreLink
        
        # WPGraphQL will now return your exact human-readable label string here!
        mainTab 
        
        subTabLabel
        tabThumbnail {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;

export const GET_ALL_KEY_TOOLS = `
query GetAllKeyTools {
  keyTools(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      databaseId
      title
      # FIXED: Matched exactly to your ACF group name
      quickAccessKeyToolsConnector {
        toolCategory
        toolDescription
        toolLink
        toolIcon
      }
    }
  }
}
`;

// Replace GET_HOMEPAGE_DATA and getHomepageFields with this:

export const GET_ALL_SLIDES = `
query GetAllSlides {
  slides(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      databaseId
      title
      slideConnector {
        isWelcomeSlide
        slideLabel
        slideTag
        slideTitle
        # 1. FIXED: Replaced the two fields with your new single WYSIWYG field
        slideDescription01
        slideImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
}
`;
export const GET_HOMEPAGE_SECTION_HEADERS = `
query GetHomepageSectionHeaders {
  # IMPORTANT: Replace "YOUR_PAGE_ID" with the actual ID of the page you created (e.g., "46")
  page(id: "480", idType: DATABASE_ID) {
    homepageSectionHeaders {
      section01Label
      section01Title
      section01Description
      
      section02Label
      section02Title
      section02Description
      
      section03Label
      section03Title
      section03Description
      
      section04Label
      section04Title
      section04Description
      
      section05Label
      section05Title
      # Assuming section 5 also has a description based on your pattern
      section05Description 
    }
  }
}
`;

export const GET_STATE_POLICIES_DATA = `
query GetStatePoliciesandPermitsData {
  page(id: "840", idType: DATABASE_ID) {
    statePoliciesandPermitsFields {
      pageTitle
      pageDescription
      linkALabel
      linkBLabel
    }
  }
}
`;

export const GET_STATE_LINK_A_DETAILS = `
query GetStateLinkADetails($id: ID!) {
  stateDirectory(id: $id, idType: SLUG) {
    title
    slug

    stateRegulationsConnector {
      pageFields: linkAPage {
        heroImageText
        introText

        section01Title
        section01Text

        section02Title
        section02Text

        section03Title
        section03Text

        section04Title
        section04Text

        section05Title
        section05Text

        section06Title
        section06Text

        section07Title
        section07Text

        section08Title
        section08Text

        section09Title
        section09Text
      }
    }
  }
}
`;

export const GET_STATE_LINK_B_DETAILS = `
query GetStateLinkBDetails($id: ID!) {
  stateDirectory(id: $id, idType: SLUG) {
    title
    slug

    stateRegulationsConnector {
      pageFields: linkBPage {
        heroImageText
        introText

        section01Title
        section01Text

        section02Title
        section02Text

        section03Title
        section03Text

        section04Title
        section04Text

        section05Title
        section05Text

        section06Title
        section06Text

        section07Title
        section07Text

        section08Title
        section08Text

        section09Title
        section09Text
      }
    }
  }
}
`;

export const GET_FAQ_ITEMS = `
query GetFaqs {
  faqItems(
    first: 100
    where: {
      orderby: {
        field: MENU_ORDER
        order: ASC
      }
    }
  ) {
    nodes {
      id
      title
      content
      menuOrder
    }
  }
}
`;

export const GET_FUNDING_PAGE_DATA = `
query GetFundingPageData {
  page(id: "572", idType: DATABASE_ID) {
    fundingPageFields {
      heroTitle
      heroDescription
      grantInfoTitle
      grantInfoDescription
      noticeTitle
      noticeLoiDeadline
      noticeProposalDeadline
      noticeEmail
      applyNowLink
      webinarVideoUrl
      webinarSlidesPdfUrl
      
      # Repeater with WYSIWYG for description
      otherFundingOpportunities
    }
  }
}
`;

// Query for Funding Tiers CPT
export const GET_ALL_FUNDING_TIERS = `
query GetAllFundingTiers {
  fundingTiers(first: 20, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
    nodes {
      databaseId
      title
      fundingTierConnector {
        tierLabel
        tierTitle
        tierImage {
          node {
            sourceUrl
          }
        }
        bulletPoints # Contains HTML from WYSIWYG
      }
    }
  }
}
`;

export const GET_RESEARCH_PAGE_DATA = `
query GetResearchPageData {
  page(id: "335", idType: DATABASE_ID) { 
    researchRequirements {
      pageTitle
      pageSubtitle
      section1Title
      section1Body
      section2Title
      section2LinkText
      section2LinkUrl
      guidanceActiveText
      guidanceEnduseText
      section3Title
      resourcesTitle
      resourcesBody
      convExpJson
      convFullJson
      bioExpJson
      bioFullJson
      microExpJson
      microFullJson
      minExpJson
      minFullJson
    }
  }
}
`;

export async function getResearchRequirementsFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_RESEARCH_PAGE_DATA }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);

    const { data } = await res.json();
    return data?.page?.researchRequirements || null;
  } catch (error) {
    console.error("Research Requirements Fetch Error:", error);
    return null;
  }
}

export async function getFundingPageFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_FUNDING_PAGE_DATA }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`WordPress API returned status ${res.status}`);

    const { data } = await res.json();
    return data?.page?.fundingPageFields || null;
  } catch (error) {
    console.error("Funding Page Fetch Error:", error);
    return null;
  }
}

export async function getAllFundingTiers() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_ALL_FUNDING_TIERS }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`WordPress API returned status ${res.status}`);

    const { data } = await res.json();
    return data?.fundingTiers?.nodes || [];
  } catch (error) {
    console.error("Error fetching dynamic funding tiers:", error);
    return [];
  }
}

export async function getstatePoliciesandPermitsFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: GET_STATE_POLICIES_DATA,
      }),

      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status}`);
    }

    const { data } = await res.json();

    return data?.page?.statePoliciesandPermitsFields || null;
  } catch (error) {
    console.error("Error pulling State Policies and Permits CMS data:", error);

    return null;
  }
}

export async function getStateLinkDetails(stateName, pageType) {
  try {
    const query =
      pageType === "link-a"
        ? GET_STATE_LINK_A_DETAILS
        : pageType === "link-b"
          ? GET_STATE_LINK_B_DETAILS
          : null;

    if (!query) {
      console.error(`Invalid state page type: ${pageType}`);
      return null;
    }

    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query,
        variables: {
          id: stateName,
        },
      }),

      cache: "no-store",
    });

    const responseText = await res.text();

    let payload;

    try {
      payload = JSON.parse(responseText);
    } catch {
      throw new Error(
        `WordPress returned a non-JSON response (${res.status}): ${responseText.slice(
          0,
          500,
        )}`,
      );
    }

    if (!res.ok || payload.errors?.length) {
      const graphQLErrors = payload.errors
        ?.map((error) => error.message)
        .join(" | ");

      throw new Error(graphQLErrors || `WordPress API error: ${res.status}`);
    }

    const state = payload.data?.stateDirectory || null;

    if (!state) {
      console.error(`No State Directory post found for slug [${stateName}]`);

      return null;
    }

    console.log(
      `[State CMS] ${stateName}/${pageType}:`,
      state.stateRegulationsConnector?.pageFields,
    );

    return state;
  } catch (error) {
    console.error(
      `Error pulling ${pageType} CMS data for state [${stateName}]:`,
      error,
    );

    return null;
  }
}

export async function getHomepageSectionHeaders() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_HOMEPAGE_SECTION_HEADERS }),
      cache: "no-store", // Ensures fresh data is fetched instantly when updated in WP
    });

    if (!res.ok) throw new Error(`WordPress API returned status ${res.status}`);

    const { data } = await res.json();
    return data?.page?.homepageSectionHeaders || null;
  } catch (error) {
    console.error("Homepage Section Headers Fetch Error:", error);
    return null;
  }
}

export async function getAllSlides() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_ALL_SLIDES }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`WordPress API returned status ${res.status}`);

    const { data } = await res.json();
    return data?.slides?.nodes || [];
  } catch (error) {
    console.error("Slideshow Fetch Error:", error);
    return [];
  }
}

export async function getAllKeyTools() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_ALL_KEY_TOOLS }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { data } = await res.json();
    return data?.keyTools?.nodes || [];
  } catch (error) {
    console.error("Error fetching dynamic key tools list:", error);
    return [];
  }
}

export async function getAllStrategyPosts() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_ALL_STRATEGY_POSTS }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { data } = await res.json();
    return data?.strategies?.nodes || [];
  } catch (error) {
    console.error("Error fetching dynamic strategies list:", error);
    return [];
  }
}

export async function getAgencyData(id) {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_AGENCY_BY_ID,
        variables: { slug: id },
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { data } = await res.json();
    return data?.agency || null;
  } catch (error) {
    console.error(`Error loading agency content for ID (${id}):`, error);
    return null;
  }
}

export async function getExperimentalUseFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_EXPERIMENTAL_USE_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { data } = await res.json();
    return data?.page?.fieldStudiesExperimentalUse || null;
  } catch (error) {
    console.error("Experimental Use Page Fetch Error:", error);
    return null;
  }
}

// export async function getResearchRequirementsFields() {
//   try {
//     const res = await fetch('https://cms.habctrl.info/graphql', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ query: GET_RESEARCH_PAGE_DATA }),
//       cache: 'no-store', // Ensures changes update instantly on refresh
//     });
//     if (!res.ok) throw new Error(`Status ${res.status}`);
//     const { data } = await res.json();
//     return data?.page?.researchRequirements || null;
//   } catch (error) {
//     console.error("Research Requirements Fetch Error:", error);
//     return null;
//   }
// }

export async function getDisclaimerFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_DISCLAIMER_DATA }),
    });

    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { data } = await res.json();
    return data?.page?.homepageDisclaimer || null;
  } catch (error) {
    console.error("Disclaimer Fetch Error:", error);
    return null; // Safe fallback returns null so the layout renders defaults gracefully
  }
}

export const GET_PRIVACY_DATA = `
query GetPrivacyData {
  page(id: "1048", idType: DATABASE_ID) {
    homepagePrivacyPolicy {
      privacyHeader
      privacyDate
      privacyInformation
    }
  }
}
`;

export async function getPrivacyFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_PRIVACY_DATA }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { data } = await res.json();
    return data?.page?.homepagePrivacyPolicy || null;
  } catch (error) {
    console.error("Privacy Fetch Error:", error);
    return null;
  }
}

export async function getStrategiesFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_STRATEGIES_DATA }),
      signal: AbortSignal.timeout(5000), // Drop connection if it hangs over 5 seconds
    });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data?.page?.homepageStrategiesFields || null;
  } catch (error) {
    console.warn(
      "Strategies fetch timed out, using frontend defaults instead.",
    );
    return null; // Return null so the component safely reads its static fallback variables
  }
}

export async function getFaqItems() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_FAQ_ITEMS,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status}`);
    }

    const result = await res.json();

    if (result.errors?.length) {
      throw new Error(result.errors.map((error) => error.message).join(" | "));
    }

    return result.data?.faqItems?.nodes || [];
  } catch (error) {
    console.error("Error fetching FAQ items:", error);

    return [];
  }
}

export async function getHomepageFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: GET_HOMEPAGE_DATA }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`WordPress API returned status ${res.status}`);
    }

    const { data } = await res.json();
    // FIXED: Matched to the group name in your query layout above
    return data?.page?.homepageSlideshowFields || null;
  } catch (error) {
    console.error("CMS Fetch Error:", error);
    return null;
  }
}

export const GET_ALL_GLOSSARY_POSTS = `
query GetAllGlossaryPosts($first: Int!, $after: String) {
  glossaryEntries(
    first: $first
    after: $after
    where: {
      orderby: {
        field: TITLE
        order: ASC
      }
    }
  ) {
    nodes {
      databaseId
      title
      content(format: RENDERED)
    }

    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`;

export async function getAllGlossaryPosts() {
  const allEntries = [];

  let after = null;
  let hasNextPage = true;

  try {
    while (hasNextPage) {
      const res = await fetch("https://cms.habctrl.info/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GET_ALL_GLOSSARY_POSTS,
          variables: {
            first: 100,
            after,
          },
        }),
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`WordPress responded with status ${res.status}`);
      }

      const result = await res.json();

      if (result.errors?.length) {
        throw new Error(result.errors.map((error) => error.message).join(", "));
      }

      const connection = result.data?.glossaryEntries;

      if (!connection) {
        break;
      }

      const entries = connection.nodes.map((node) => ({
        id: node.databaseId,
        term: node.title || "",
        content: node.content || "",
      }));

      allEntries.push(...entries);

      hasNextPage = connection.pageInfo?.hasNextPage === true;

      after = connection.pageInfo?.endCursor || null;

      // Prevent an accidental infinite request loop.
      if (hasNextPage && !after) {
        break;
      }
    }

    return allEntries;
  } catch (error) {
    console.error("Error fetching glossary entries:", error);

    return [];
  }
}

export const GET_PRIVACY_PAGE_DATA = `
query GetPrivacyPageData {
  page(id: "1057", idType: DATABASE_ID) {
    fullPrivacyPolicy {
      title
      lastUpdated
      introText
      sectionOneTitle
      sectionOneInformation
      sectionTwoTitle
      sectionTwoInformation
      sectionThreeTitle
      sectionThreeInformation
      sectionFourTitle
      sectionFourInformation
      sectionFiveTitle
      sectionFiveInformation
      sectionSixTitle
      sectionSixInformation
      contactUs
      contactUsInformation
    }
  }
}
`;

export async function getPrivacyPageFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_PRIVACY_PAGE_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "Privacy GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.fullPrivacyPolicy || null;
  } catch (error) {
    console.error("Privacy Page Fetch Error:", error);
    return null;
  }
}
export const GET_HABS101_DATA = `
query GetHabs101Data {
  page(id: "1162", idType: DATABASE_ID) {
    habs101FullPage {
      pageTitle
      overviewTitle
      overviewText
      learnMoreTitle
      learnMoreText
    }
  }
}
`;

export async function getHabs101Fields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_HABS101_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "HABs 101 GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.habs101FullPage || null;
  } catch (error) {
    console.error("HABs 101 Fetch Error:", error);
    return null;
  }
}

// Questions shown in the "Identify Data Requirements" flowchart on /researchRequirements.
// One "researchQuestions" entry per box. Each entry has up to 6 answer buttons,
// stored as flat ACF fields: option1Label, option1Key, option1Heading,
// option1Description, option1IsDefault ... option6IsDefault.
const RESEARCH_OPTION_SLOTS = [1, 2, 3, 4, 5, 6];

export const GET_RESEARCH_QUESTIONS = `
query GetResearchQuestions {
  researchQuestions(first: 50, where: { orderby: [{ field: MENU_ORDER, order: ASC }, { field: DATE, order: ASC }] }) {
      nodes {
      databaseId
      title
      researchQuestionConnector {
        boxHelperText
        panelQuestion
        tableRole
        ${RESEARCH_OPTION_SLOTS.map(
          (n) =>
            `option${n}Label option${n}Key option${n}Heading option${n}Description option${n}IsDefault`,
        ).join("\n        ")}
      }
    }
  }
}
`;

export async function getResearchQuestions() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_RESEARCH_QUESTIONS }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);

    const { data } = await res.json();

    // Turn the flat option fields into an "options" list; empty slots are skipped.
    return (data?.researchQuestions?.nodes || []).map((node) => {
      const fields = node.researchQuestionConnector || {};

      const options = RESEARCH_OPTION_SLOTS.map((n) => ({
        optionLabel: fields[`option${n}Label`],
        optionKey: fields[`option${n}Key`],
        optionPanelHeading: fields[`option${n}Heading`],
        optionDescription: fields[`option${n}Description`],
        isDefault: fields[`option${n}IsDefault`],
      })).filter((option) => option.optionLabel);

      return {
        ...node,
        researchQuestionConnector: { ...fields, options },
      };
    });
  } catch (error) {
    // The page falls back to its built-in questions when this is empty.
    console.error("Research Questions Fetch Error:", error);
    return [];
  }
}

export const GET_BIOPESTICIDE_DATA = `
query GetBiopesticideData {
  page(id: "1256", idType: DATABASE_ID) {
    biopesticideRegistrationInfoPage {
      pageTitle
      pageSubtitle
      introText
      overviewText
      dataTopText
      figureCaption
      dataBottomText
      tableFootNotes
      additionalDetailsText
      eupText
      additionalInfoText
      dataRequirementsTable
      contactsTable
    }
  }
}
`;

export async function getBiopesticideFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_BIOPESTICIDE_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "Biopesticide GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.biopesticideRegistrationInfoPage || null;
  } catch (error) {
    console.error("Biopesticide Fetch Error:", error);
    return null;
  }
}

export const GET_CONVENTIONAL_DATA = `
query GetConventionalData {
  page(id: "1274", idType: DATABASE_ID) {
    conventionalPesticideRegistrationInfoPage {
      introText
      pageTitle
      pageSubtitle
      overviewText
      dataTopText
      tableFootNotes
      eupText
      additionalInfoText
      endangeredSpeciesText
      contactsTable
      dataRequirementsTable
    }
  }
}
`;

export async function getConventionalFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GET_CONVENTIONAL_DATA,
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "Conventional GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.conventionalPesticideRegistrationInfoPage || null;
  } catch (error) {
    console.error("Conventional Fetch Error:", error);
    return null;
  }
}

export const GET_PHYSICAL_DEVICES_DATA = `
query GetPhysicalDevicesData {
  page(id: "1276", idType: DATABASE_ID) {
    physicalDevicesInfoPage {
      pageTitle
      pageSubtitle
      introText
      overviewText
      regulationText
      labelingText
      determinationText
      additionalInfoText
      questionsText
    }
  }
}
`;

export async function getPhysicalDevicesFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_PHYSICAL_DEVICES_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "Physical Devices GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.physicalDevicesInfoPage || null;
  } catch (error) {
    console.error("Physical Devices Fetch Error:", error);
    return null;
  }
}

export const GET_MINIMUM_RISK_DATA = `
query GetMinimumRiskData {
  page(id: "1278", idType: DATABASE_ID) {
      minimumRiskPesticideRegistrationInfoPage {
      pageTitle
      pageSubtitle
      introText
      overviewText
      statePoliciesText
      tableFooter
      additionalInfoText
      questionsText
      activeIngredientsTable
      inertIngredientsTable
    }
  }
}
`;

export async function getMinimumRiskFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_MINIMUM_RISK_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "Minimum Risk GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.minimumRiskPesticideRegistrationInfoPage || null;
  } catch (error) {
    console.error("Minimum Risk Fetch Error:", error);
    return null;
  }
}

export const GET_PESTICIDE_INGREDIENTS_DATA = `
query GetPesticideIngredientsData {
  page(id: 1370, idType: DATABASE_ID) {
    pesticideIngredientsInfoPage {
      pageTitle
      pageSubtitle
      introText
      overviewText
      activeText
      inertText
      endangeredSpeciesText
      additionalInfoText
      questionsText
      citationText
    }
  }
}
`;

export async function getPesticideIngredientsFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ query: GET_PESTICIDE_INGREDIENTS_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "Pesticide Ingredients GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.pesticideIngredientsInfoPage || null;
  } catch (error) {
    console.error("Pesticide Ingredients Fetch Error:", error);
    return null;
  }
}
export const GET_GETTING_APPROVAL_DATA = `
query GetGettingApprovalData {
  page(id: 1390, idType: DATABASE_ID) {
    gettingApprovalInfoPage {
      pageTitle
      pageSubtitle
      questionHeading
      meetingHeading
      meetingIntro
      meetingBody
      websiteLink
    }
  }
}
`;

export async function getGettingApprovalFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_GETTING_APPROVAL_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "Getting Approval GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.gettingApprovalInfoPage || null;
  } catch (error) {
    console.error("Getting Approval Fetch Error:", error);
    return null;
  }
}

export const GET_PESTICIDE_REGISTRATION_DATA = `
query GetPesticideRegistrationData {
  page(id: 1402, idType: DATABASE_ID) {
    pesticideRegistrationInfoPage {
      pageTitle
      pageSubtitle
      introText
      overviewText
      stepsText
      dataTopText
      dataTableHtml
      dataBottomText
      additionalInfoText
      questionsText
      citationText
    }
  }
}
`;

export async function getPesticideRegistrationFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_PESTICIDE_REGISTRATION_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "Pesticide Registration GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.pesticideRegistrationInfoPage || null;
  } catch (error) {
    console.error("Pesticide Registration Fetch Error:", error);
    return null;
  }
}

export const GET_LABELING_DATA = `
query GetLabelingData {
  page(id: 1417, idType: DATABASE_ID) {
    labelingInfoPage {
      pageTitle
      pageSubtitle
      overviewText
      labelVsLabelingText
      frontPanelText
      frontTemplateText
      backPanelText
      backTemplateText
      exampleLabelsText
      additionalDocsText
      trainingText
      additionalInfoText
      questionsText
    }
  }
}
`;

export async function getLabelingFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_LABELING_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "Labeling GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.labelingInfoPage || null;
  } catch (error) {
    console.error("Labeling Fetch Error:", error);
    return null;
  }
}

export const GET_TOLERANCES_DATA = `
query GetTolerancesData {
  page(id: 1434, idType: DATABASE_ID) {
    tolerancesInfoPage {
      pageTitle
      pageSubtitle
      introText
      overviewText
      settingText
      requiredDataTop
      requiredDataTables
      standardizedText
      resourcesText
      questionsText
      citationText: citationsText
    }
  }
}
`;

export async function getTolerancesFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_TOLERANCES_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "Tolerances GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.tolerancesInfoPage || null;
  } catch (error) {
    console.error("Tolerances Fetch Error:", error);
    return null;
  }
}

export const GET_GLP_DATA = `
query GetGlpData {
  page(id: 1449, idType: DATABASE_ID) {
    glpInfoPage {
      pageTitle
      pageSubtitle
      introText
      overviewText
      dataRequiringText
      additionalRequiredText
      exemptText
      resourcesText
      questionsText
      citationText
    }
  }
}
`;

export async function getGlpFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_GLP_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const json = await res.json();
    if (json.errors)
      console.error(
        "GLP GraphQL errors:",
        json.errors.map((e) => e.message).join(" | "),
      );
    return json.data?.page?.glpInfoPage || null;
  } catch (error) {
    console.error("GLP Fetch Error:", error);
    return null;
  }
}

// ---- Toxicology Data page ----
const TOXICOLOGY_PAGE_ID = "1248";

export const GET_TOXICOLOGY_PAGE_DATA = `
query GetToxicologyPageData {
  page(id: "${TOXICOLOGY_PAGE_ID}", idType: DATABASE_ID) {
    toxicologyPage {
      pageTitle pageSubtitle sourceNote
      overviewTitle overviewDescription
      dataRequirementsTitle dataRequirementsDescription
      categoriesTitle categoriesDescription
      tableTitle tableSource tableJson tableFootnote1 tableFootnote2
      labsTitle labsDescription
      additionalInfoTitle additionalInfoDescription
      questionsTitle questionsDescription
      citationTitle citationDescription
    }
  }
}`;

export async function getToxicologyPageFields() {
  try {
    const res = await fetch("https://cms.habctrl.info/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GET_TOXICOLOGY_PAGE_DATA }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { data } = await res.json();
    return data?.page?.toxicologyPage || null;
  } catch (error) {
    console.error("Toxicology Page Fetch Error:", error);
    return null;
  }
}

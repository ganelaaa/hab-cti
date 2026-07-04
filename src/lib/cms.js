
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
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_ALL_AGENCY_POSTS }),
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`WordPress responded with status ${res.status}`);
    
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

export const GET_RESEARCH_PAGE_DATA = `
query GetResearchPageData {
  page(id: "335", idType: DATABASE_ID) { 
    researchRequirements{
      pageTitle
      pageSubtitle
      overviewTitle
      overviewDescription
      section01Title
      section02Title
      section02Description
      additionalTitle
      additionalDescription
      conventionalJson
      biochemicalJson
      microbialJson
    }
  }
}
`;

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

export async function getAllSlides() {
  try {
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_ALL_SLIDES }),
      cache: 'no-store', 
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
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_ALL_KEY_TOOLS }),
      cache: 'no-store',
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
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_ALL_STRATEGY_POSTS }),
      cache: 'no-store',
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
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: GET_AGENCY_BY_ID,
        variables: { slug: id }
      }),
      cache: 'no-store',
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
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_EXPERIMENTAL_USE_DATA }),
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { data } = await res.json();
    return data?.page?.fieldStudiesExperimentalUse || null;
  } catch (error) {
    console.error("Experimental Use Page Fetch Error:", error);
    return null;
  }
}


export async function getResearchRequirementsFields() {
  try {
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_RESEARCH_PAGE_DATA }),
      cache: 'no-store', // Ensures changes update instantly on refresh
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { data } = await res.json();
    return data?.page?.researchRequirements || null;
  } catch (error) {
    console.error("Research Requirements Fetch Error:", error);
    return null;
  }
}

export async function getDisclaimerFields() {
  try {
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_DISCLAIMER_DATA }),
    });
    
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const { data } = await res.json();
    return data?.page?.homepageDisclaimerFields || null;
  } catch (error) {
    console.error("Disclaimer Fetch Error:", error);
    return null; // Safe fallback returns null so the layout renders defaults gracefully
  }
}

export async function getStrategiesFields() {
  try {
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: GET_STRATEGIES_DATA }),
      signal: AbortSignal.timeout(5000), // Drop connection if it hangs over 5 seconds
    });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data?.page?.homepageStrategiesFields || null;
  } catch (error) {
    console.warn("Strategies fetch timed out, using frontend defaults instead.");
    return null; // Return null so the component safely reads its static fallback variables
  }
}


export async function getHomepageFields() {
  try {
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: GET_HOMEPAGE_DATA }),
      cache: 'no-store', 
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
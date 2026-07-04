
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

export const GET_NAVIGATION_DATA = `
query GetNavigationData {
  page(id: "103", idType: DATABASE_ID) {
    quickAccessToKeyTools {
      # === Laws & Permits Section ===
      lawsPermitsCard01Title
      lawsPermitsCard01Description
      lawsPermitsCard01Link
      lawsPermitsCard01Icon
      lawsPermitsCard02Title
      lawsPermitsCard02Description
      lawsPermitsCard02Link
      lawsPermitsCard02Icon
      lawsPermitsCard03Title
      lawsPermitsCard03Description
      lawsPermitsCard03Link
      lawsPermitsCard03Icon
      lawsPermitsCard04Title
      lawsPermitsCard04Description
      lawsPermitsCard04Link
      lawsPermitsCard04Icon
      lawsPermitsCard05Title
      lawsPermitsCard05Description
      lawsPermitsCard05Link
      lawsPermitsCard05Icon

      # === Literature Section ===
      literatureCardTitle01
      literatureCardDescription01
      literatureCardLink01
      literatureCardIcon01
      literatureCardTitle02
      literatureCardDescription02
      literatureCardLink02
      literatureCardIcon02
      literatureCardTitle03
      literatureCardDescription03
      literatureCardLink03
      literatureCardIcon03
      literatureCardTitle04
      literatureCardDescription04
      literatureCardLink04
      literatureCardIcon04

      # === Products Section ===
      productsCardTitle01
      productsCardDescription01
      productsCardLink01
      productsCardIcon01
      productsCardTitle02
      productsCardDescription02
      productsCardLink02
      productsCardIcon02
    }
  }
}
`;


export const GET_STRATEGIES_DATA = `
query GetStrategiesData {
  page(id: "248", idType: DATABASE_ID) {
    homepageControlStrategies {
      sectionTitle
      sectionDescription
      
      # Main Tab Names
      tab01
      tab02
      tab03
      tab04

      # --- Tab 01 Sub Tabs (1 - 4) ---
      tab01SubTab01Label
      tab01SubTab01Description
      tab01SubTab01Link
      tab01SubTab01Image { node { sourceUrl } }
      tab01SubTab02Label
      tab01SubTab02Description
      tab01SubTab02Link
      tab01SubTab02Image { node { sourceUrl } }
      tab01SubTab03Label
      tab01SubTab03Description
      tab01SubTab03Link
      tab01SubTab03Image { node { sourceUrl } }
      tab01SubTab04Label
      tab01SubTab04Description
      tab01SubTab04Link
      tab01SubTab04Image { node { sourceUrl } }

      # --- Tab 02 Sub Tabs (1 - 4) ---
      tab02SubTab01Label
      tab02SubTab01Description
      tab02SubTab01Link
      tab02SubTab01Image { node { sourceUrl } }
      tab02SubTab02Label
      tab02SubTab02Description
      tab02SubTab02Link
      tab02SubTab02Image { node { sourceUrl } }
      tab02SubTab03Label
      tab02SubTab03Description
      tab02SubTab03Link
      tab02SubTab03Image { node { sourceUrl } }
      tab02SubTab04Label
      tab02SubTab04Description
      tab02SubTab04Link
      tab02SubTab04Image { node { sourceUrl } }

      # --- Tab 03 Sub Tab (1) ---
      tab03SubTab01Label
      tab03SubTab01Description
      tab03SubTab01Link
      tab03SubTab01Image { node { sourceUrl } }

      # --- Tab 04 Sub Tab (1) ---
      tab04SubTab01Label
      tab04SubTab01Description
      tab04SubTab01Link
      tab04SubTab01Image { node { sourceUrl } }
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

export async function getNavigationFields() {
  try {
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: GET_NAVIGATION_DATA }),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`WordPress API returned status ${res.status}`);
    }

    const { data } = await res.json();
    // FIXED: Matched to the group name in your query layout above
    return data?.page?.quickAccessToKeyTools || null;
  } catch (error) {
    console.error("Navigation CMS Fetch Error:", error);
    return null; 
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
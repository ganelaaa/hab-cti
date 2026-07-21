import Image from 'next/image';

const GET_ABOUT_PAGE_DATA = `
  query TestAboutData {
    page(id: "5", idType: DATABASE_ID) {
      aboutPageFields {
        heroBackgroundImage {
          node {
            sourceUrl
          }
        }
        heroSubtitle1
        heroSubtitle2
        introductionParagraph1
        introductionParagraph2
        missionStatement
        email
        fundingText
      }
    }
    partners {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        partnerData {
          partnerNameLine1
          partnerNameLine2
          partnerFields
        }
      }
    }
    teamMembers {
      nodes {
        title
        featuredImage {
          node {
            sourceUrl
          }
        }
        teamMemberFields {
          jobRoles
        }
      }
    }
  }
`;

async function getAboutData() {
  try {
    const res = await fetch('https://cms.habctrl.info/graphql', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: GET_ABOUT_PAGE_DATA }),
      cache: 'no-store' 
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("CMS connection error:", error);
    return null;
  }
}

export default async function About() {
  const data = await getAboutData();
  
  // Safe extraction fallbacks
  const fields = data?.page?.aboutPageFields || {};
  const partnerNodes = data?.partners?.nodes || [];
  const teamNodes = data?.teamMembers?.nodes || [];

  const heroBg = fields.heroBackgroundImage?.node?.sourceUrl || '/aboutHero.png';
  const subtitle1 = fields.heroSubtitle1 || 'US Harmful Algal Bloom - Control';
  const subtitle2 = fields.heroSubtitle2 || 'Technologies & Regulatory Logistics';
  
  // Mapped exactly to your provided query fields
  const intro1 = fields.introductionParagraph1 || 'The United States HAB Control Technologies & Regulatory Logistics (US HAB CTRL) streamlines the vetting process for novel harmful algal bloom (HAB) control technologies. Our goal is to help the research community and funding agencies to identify and advance solutions that are feasible, environmentally acceptable, scalable, and cost-effective for controlling the impacts of both freshwater and marine HABS.';
  const intro2 = fields.introductionParagraph2 || 'We accelerate the development and assessment of strategies that eliminate or reduce harmful algae and their toxins through biological, chemical, or physical means. Our work is guided by an Advisory and Review Board with representatives from the U.S. Army Corps of Engineers, Environmental Protection Agency (EPA), U.S. Geological Survey (USGS), National Oceanic and Atmospheric Administration (NOAA), state agencies, academic institutions, non-governmental organizations, and industry.';
  const mission = fields.missionStatement || 'Our mission is to advance the development and use of effective, science-based technologies that control or reduce HABs and their toxins. We aim to expand the range of proven control options available and to simplify the licensing and permitting processes required for their deployment. By doing so, we support a more effective and coordinated national response of the growing challenge of HABs.';
  const contactEmail = fields.email || 'USHABCTI@umces.edu';
  const fundingHtml = fields.fundingText || 'The U.S. Harmful Algal Bloom-Control Tecnologies Incubator is supported by funding from <b>NOAA\'s National Centres for Coastal Ocean Science (NCCOS)</b> (NA22NOS4780172)';

  return (
    <div className="tracking-wide px-20">
      <div className="flex flex-row justify-between items-center mt-5">
        <div className="flex flex-row items-center hover:scale-105 transition-all duration-300 cursor-pointer w-fit">
          <svg className="usa-icon text-gray-500 w-4 h-4" aria-hidden="true" focusable="false" role="img">
            <use href="/assets/img/sprite.svg#arrow_back"></use>
          </svg>
          <a className="text-black ml-2 text-sm relative group" href="/">
            About
            <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-700" />
          </a>
        </div>

        {/* <div className="bg-red-600 text-white font-mono text-xs px-3 py-1 rounded-full animate-pulse uppercase tracking-widest font-bold shadow-md">
          GIT REPLACEMENT CHECK
        </div> */}
      </div>

      <div className="relative text-white mt-4 overflow-hidden h-75 rounded-lg">
        <div
          className="absolute inset-0 bg-cover bg-center kenburns-loop"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        <div className="absolute inset-0 bg-black opacity-65 z-0" />
        <div className="relative z-10 py-16 px-1 text-center mt-7">
          <h1 className="!text-5xl font-bold !mb-0 !mt-3">About</h1>
          <p className="text-lg !mt-3 text-gray-200">{subtitle1}</p>
          <p className="text-lg !mt-0 text-gray-200">{subtitle2}</p>
        </div>
      </div>

      <div className="py-20 text-lg tracking-wide font-light">
        <p>{intro1}</p>
        <p className="mt-6">{intro2}</p>

        <div className="flex flex-row gap-50 mt-18">
          <h1 className="font-bold text-2xl whitespace-nowrap">Our Mission</h1>
          <p>{mission}</p>
        </div>

        <div className="flex flex-row gap-50 mt-15">
          <h1 className="font-bold text-2xl whitespace-nowrap">Our Partners</h1>
          <div className="flex flex-row gap-10">
            {partnerNodes.map((partner, index) => (
              <div key={index} className="flex flex-row items-center gap-6">
                <img 
                  src={partner.featuredImage?.node?.sourceUrl || '/fallback-logo.png'} 
                  className="w-20 h-20 object-contain shrink-0" 
                  alt={partner.title || "Partner Logo"} 
                />
                <div className="text-primary font-bold">
                  <p>{partner.partnerData?.partnerNameLine1}</p>
                  <p>{partner.partnerData?.partnerNameLine2}</p>
                  <p>({partner.partnerData?.partnerFields || partner.title})</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-4 text-lg">
        <p className="font-bold !text-4xl">The Team</p>
        <div className="flex flex-row mt-8 gap-8">
          {teamNodes.map((member, index) => (
            <div key={index} className="flex-1">
              <img 
                src={member.featuredImage?.node?.sourceUrl || '/fallback-avatar.jpg'} 
                className="w-full h-64 object-cover" 
                alt={member.title}
              />
              <div className="mt-5 ml-1.5">
                <p className="font-bold text-xl">{member.title}</p>
                <div 
                  className="text-base text-gray-700 mt-2"
                  dangerouslySetInnerHTML={{ __html: member.teamMemberFields?.jobRoles || '' }} 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-8 mt-5">
          <div className="flex flex-row items-start gap-30">
            <h1 className="text-2xl font-bold whitespace-nowrap">Contact Us</h1>
            <div>
              <p className="whitespace-nowrap mt-9">
                Please send comments or questions to <b>{contactEmail}</b>
              </p>
            </div>
          </div>

          <div className="flex flex-row items-start gap-30 pb-20">
            <h1 className="text-2xl font-bold whitespace-nowrap">Funding</h1>
            <div>
              <div 
                className="mt-5 ml-12" 
                dangerouslySetInnerHTML={{ __html: fundingHtml }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
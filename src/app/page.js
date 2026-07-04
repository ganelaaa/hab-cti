import Hero from "@/components/home/hero.js";
import Navigation from "@/components/home/navigation.js";
import Agencies from "@/components/home/agencies.js";
import Strategies from "@/components/home/strategies.js";
import Disclaimer from "@/components/home/disclaimer.js";


import { 
  getAllSlides,
  getHomepageSectionHeaders,
  getAllStrategyPosts,
  getAllAgencyPosts,
  getDisclaimerFields,
  getAllKeyTools
} from "@/lib/cms";

export default async function Home() {
  // Fetch all five streams concurrently in parallel
  const [
    allSlides, 
    allKeyTools,
    allAgencies,
    allStrategyPosts,
    disclaimerData,
    sectionHeaders

  ] = await Promise.all([
    getAllSlides(),
    getAllKeyTools(),
    getAllAgencyPosts(),
    getAllStrategyPosts(),
    getDisclaimerFields(),
    getHomepageSectionHeaders()
  ]);

  return (
    <main>
      <Hero slidesList={allSlides} />
      <Navigation 
      toolsList={allKeyTools} 
      headerData={{
          label: sectionHeaders?.section01Label,
          title: sectionHeaders?.section01Title,
          description: sectionHeaders?.section01Description
        }}
      
      />
      {/* <Agencies permittingCms={permittingData} complianceCms={complianceData} /> */}
      <Agencies 
      allAgencies={allAgencies} 
      headerData={{
          label: sectionHeaders?.section02Label,
          title: sectionHeaders?.section02Title,
          description: sectionHeaders?.section02Description,
          label2: sectionHeaders?.section03Label,
          title2: sectionHeaders?.section03Title,
          description2: sectionHeaders?.section03Description
        }}
      
      />
      {/* Injected consolidated control strategies data fields */}
      <Strategies strategiesList={allStrategyPosts} 
      headerData={{
          label: sectionHeaders?.section04Label,
          title: sectionHeaders?.section04Title,
          description: sectionHeaders?.section04Description
        }}
      
      />
      <Disclaimer cms={disclaimerData} 
      headerData={{
          label: sectionHeaders?.section05Label,
          title: sectionHeaders?.section05Title,
          description: sectionHeaders?.section05Description
        }}
      
      />
    </main>
  );
}
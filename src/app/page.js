import Hero from "@/components/home/hero.js";
import Navigation from "@/components/home/navigation.js";
import Agencies from "@/components/home/agencies.js";
import Strategies from "@/components/home/strategies.js";
import Disclaimer from "@/components/home/disclaimer.js";


import { 
  getAllSlides,
  getHomepageFields, 
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
    disclaimerData

  ] = await Promise.all([
    getAllSlides(),
    getAllKeyTools(),
    getAllAgencyPosts(),
    getAllStrategyPosts(),
    getDisclaimerFields()
  ]);

  return (
    <main>
      <Hero slidesList={allSlides} />
      <Navigation toolsList={allKeyTools} />
      {/* <Agencies permittingCms={permittingData} complianceCms={complianceData} /> */}
      <Agencies allAgencies={allAgencies} />
      {/* Injected consolidated control strategies data fields */}
      <Strategies strategiesList={allStrategyPosts} />
      <Disclaimer cms={disclaimerData} />
    </main>
  );
}
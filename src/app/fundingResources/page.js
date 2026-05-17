import FundingHero from "@/components/fundingResources/fundingHero.js";
import FundingTiers from "@/components/fundingResources/fundingTiers.js";
import FundingReview from "@/components/fundingResources/fundingReview.js";
import FundingSources from "@/components/fundingResources/fundingSources.js";
import FundingOpportunities from "@/components/fundingResources/fundingOpportunities.js";

export default function FundingResources() {
  return (
    <div>
      <FundingHero />
      <FundingTiers />
      <FundingReview />
      <FundingSources />
      <FundingOpportunities />
    </div>
  );
}

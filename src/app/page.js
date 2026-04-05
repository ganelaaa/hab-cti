import Hero from "@/components/hero.js";
import ResourceNavigation from "@/components/resourceNavigation.js";
import ProcessingStrategies from "@/components/processingPermits.js";
import ControlStrategies from "@/components/controlStrategies.js";
import Disclaimer from "@/components/disclaimer.js";

export default function Home() {
  return (
    <main>
      <Hero />
      <ResourceNavigation />
      <ProcessingStrategies />
      <ControlStrategies />
      <Disclaimer />
    </main>
  );
}

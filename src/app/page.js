import Hero from "@/components/home/hero.js";
import ResourceNavigation from "@/components/home/resourceNavigation.js";
import ProcessingStrategies from "@/components/home/processingPermits.js";
import ControlStrategies from "@/components/home/controlStrategies.js";
import Disclaimer from "@/components/home/disclaimer.js";

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

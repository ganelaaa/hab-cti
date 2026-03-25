import Navbar from "@/components/navbar.js";
import Hero from "@/components/hero.js";
import ResourceNavigation from "@/components/resourceNavigation.js";
import ProcessingStrategies from "@/components/processingPermits.js";
import ControlStrategies from "@/components/controlStrategies.js";
import Disclaimer from "@/components/disclaimer.js";
import Footer from "@/components/footer.js";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ResourceNavigation />
      <ProcessingStrategies />
      <ControlStrategies />
      <Disclaimer />
      <Footer />
    </main>
  );
}

export default function Habs101() {
  return (
    <div className="px-20 py-10 tracking-wide">
      {/* Breadcrumb */}
      <div className="flex flex-row gap-2 text-sm text-gray-500 mb-8">
        <svg
          className="usa-icon text-gray-500"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>
        <a href="/" className="text-primary hover:underline">
          Home
        </a>
        <span>›</span>
        <span className="text-primary">Literature</span>
        <span>›</span>
        <span className="text-gray-800">HABs 101</span>
      </div>

      <div className="mb-8 mt-10">
        <h1 className="text-primary font-bold">Harmful Algal Blooms </h1>

        <p className="mt-10">
          <b>Overview</b>
        </p>
        <p className="mt-5">
          Harmful algal blooms (HABs) are a natural phenomenon in which
          microscopic algal cells reproduce rapidly, causing a population
          explosion. Blooms can vary in magnitude, reaching cell concentrations
          in the millions per liter. The massive number of cells can cause water
          to appear discolored. The best-known example of this discoloration is
          red tide.{" "}
        </p>

        <p className="mt-5">
          High temperatures and excess nutrients drive the formation and
          proliferation of HABs. However, blooms do not occur exclusively in
          warm waters. Algal blooms form in marine, brackish, and freshwater
          environments ranging from tropical seas to polar regions. Various
          algal taxa form blooms. Dinoflagellates, cyanobacteria, diatoms, and
          raphidophytes are among the most common HAB taxa.
        </p>

        <p className="mt-5">
          Blooms are considered harmful when they create toxins. Algal toxins
          can cause illness in fish, birds, and mammals, including humans.
          Diarrhetic shellfish poisoning results from eating seafood
          contaminated with algal toxins. Algal toxins like those produced by
          red tide may aerosolize and cause respiratory illness. Other algal
          toxin-related illnesses, such as ciguatera, can be life-threatening.
        </p>

        <p className="mt-10">
          <b>Learn More</b>
        </p>
        <p className="mt-5">Visit the links below to learn more about HABs</p>

        <p className="mt-5 text-underline text-primary">
          <a href="https://hab.whoi.edu/">
            U.S. National Office for Harmful Algal Blooms
          </a>
        </p>
        <p className="mt-5 text-underline text-primary">
          <a href="https://www.epa.gov/habs">EPA - HABs in Waterbodies</a>
        </p>
        <p className="mt-5 text-underline text-primary">
          <a href="https://www.noaa.gov/what-is-harmful-algal-bloom">
            {" "}
            NOAA - What is a Harmful Algal Bloom
          </a>
        </p>

        <ul className="list-disc ml-6">
          <li>
            <p className="mt-5 text-underline text-primary">
              <a href="https://habsos.noaa.gov/what-are-habs">
                Harmful Algal BloomS Observing System
              </a>
            </p>
          </li>
          <li>
            <a
              className="text-underline text-primary"
              href="https://coastalscience.noaa.gov/science-areas/habs/"
            >
              National Centers for Coastal Ocean Science - Harmful Algal Blooms
            </a>
          </li>
        </ul>

        <p className="mt-5 text-underline text-primary">
          <a href="https://hab.ioc-unesco.org/">
            Intergovernmental Oceanographic Commission - HABs Programme
          </a>
        </p>
        <p className="mt-5 text-underline text-primary">
          <a href="https://www.cdc.gov/harmful-algal-blooms/about/index.html">
            CDC - Harmful Algal Blooms and Your Health
          </a>
        </p>
        <p className="mt-5 text-underline text-primary">
          <a href="https://www.niehs.nih.gov/health/topics/agents/algal-blooms">
            National Institute of Environmental Health Sciences
          </a>
        </p>
        <p className="mt-5 text-underline text-primary">
          <a href="https://www.avma.org/resources-tools/animal-health-and-welfare/animal-health/harmful-algal-blooms-habs">
            American Veterinary Medical Association
          </a>
        </p>
      </div>
    </div>
  );
}

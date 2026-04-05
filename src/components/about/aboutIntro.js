export default function AboutIntro() {
  return (
    <div className="px-20 py-20">
      <p>
        The{" "}
        <b>
          United States Harmful Algal Bloom-Control Technologies Incubator (US
          HAB-CTI)
        </b>{" "}
        streamlines the vetting process for novel harmful algal bloom (HAB)
        control technologies. Ourgoal is to help the research community and
        funding agencies to identify and advance solutions that are feasible,
        enviornmentally acceptable, scalable, and cost-effective for controlling
        the impacts of both freshwater and marine HABS.
      </p>
      <p className="mt-6">
        We accelerate the development and assessment of strategies that
        eliminate or reduce harmful alagae and their toxins through biological,
        chemical, or physicla means. our work is guided by an Advisory and
        Review Board with representatives from the U.S. Army Corps of Engineers,
        Environmental Protection Agency (EPA), U.S. Geological Survey (USGS),
        National Oceanic and Atmospheric Administartion (NOAA), state agencies,
        academic institutions, non-governmental organizations, and industry.
      </p>

      {/* Our Mission */}
      <div className="flex flex-row gap-50 mt-18">
        <h1 className="font-bold text-4xl">Our Mission</h1>
        <p>
          Our mission is to advance the development and use of effective,
          science-based technologies that control or reduce HABs and their
          toxins. We aim to expand the range of proven control options available
          and to simplify the licensiing and permitting the processes required
          for their deployment. By doing so, we support a more effective and
          coordinated national response ot the growing challenege of HABs.
        </p>
      </div>

      {/* Our Partners */}
      <div className="flex flex-row gap-12 mt-18">
        <h1 className="font-bold text-4xl">Our Partners</h1>
        <div className="ml-16 flex flex-row gap-10">
          <img src="/NOAA.svg" className="w-24 h-24 object-contain" />{" "}
          <img src="/IMET.jpg" className="w-24 h-24 object-contain" />{" "}
          <img src="/mote.png" className="w-24 h-24 object-contain" />{" "}
        </div>
      </div>
    </div>
  );
}

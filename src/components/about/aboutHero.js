export default function AboutHero() {
  return (
    <div className="tracking-wide">
      {/* link to go back to home */}
      <div className="flex flex-row mt-5 ml-4 font-light">
        <svg
          className="usa-icon text-gray-500"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>
        <a className="text-black ml-2 hover:text-primary text-sm" href="/">
          About Us
        </a>
      </div>

      {/* about background image */}
      <div className="relative mt-8">
        <img src="/about-hero.jpg" className="w-full object-cover h-105" />
        <div className="absolute inset-0 bg-black opacity-80 z-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
          <h1 className="!text-6xl font-bold">About</h1>
          <p className="text-xl">US Harmful Algal Bloom - Control</p>
          <p className="text-xl">Technlogies Incubator</p>
        </div>
      </div>
    </div>
  );
}

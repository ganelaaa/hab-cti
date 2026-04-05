export default function AboutHero() {
  return (
    <div>
      {/* link to go back to home */}
      <div className="flex flex-row mt-10 ml-4">
        <svg
          className="usa-icon text-gray-500 mt-1"
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#arrow_back"></use>
        </svg>
        <a className="text-black ml-2 hover:text-primary text-lg" href="/">
          About Us
        </a>
      </div>

      {/* about background image */}
      <div className="relative mt-8">
        <img src="/about-hero.jpg" className="w-full object-cover h-105" />
        <div className="absolute inset-0 bg-black opacity-50 z-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
          <h1 className="!text-6xl font-bold">About</h1>
          <p className="text-xl">US Harmful Algal Bloom-Control</p>
          <p className="text-xl">Technlogies Incubator</p>
        </div>
      </div>
    </div>
  );
}

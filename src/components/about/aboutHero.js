export default function AboutHero() {
  return (
    <div className="tracking-wide">
      {/* link to go back to home */}
      <div className="flex flex-row mt-8 ml-20 font-light">
        <div className="hover:scale-105 transition-all duration-initial cursor-pointer">
          <svg
            className="usa-icon text-gray-500 mb-0.5 text-sm"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use href="/assets/img/sprite.svg#arrow_back"></use>
          </svg>
          <a className="text-black ml-2 hover:text-primary" href="/">
            About Us
          </a>
        </div>
      </div>

      <div className="px-20 pt-4 pb-4 tracking-wide">
        <div className="relative text-white min-h-64 rounded-lg overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center kenburns-loop"
            style={{ backgroundImage: "url('/about-hero.jpg')" }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-65 z-0" />
          {/* Content */}
          <div className="relative z-10 py-16 px-1 text-center">
            <h1 className="!text-6xl font-bold">About</h1>
            <p className="text-xl mt-3">US Harmful Algal Bloom - Control</p>
            <p className="text-xl">Technologies Incubator</p>
          </div>
        </div>
      </div>
    </div>
  );
}

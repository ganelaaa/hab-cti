export default function Hero() {
  return (
    <div className="px-20 py-4">
      <div
        className="relative text-white min-h-64 rounded-lg overflow-hidden"
        style={{
          backgroundImage: "url('https://placehold.co/1400x500/1b4332/1b4332')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 py-24 px-20 text-center">
          <div>
            <p className="text-green-300 text-xs">WELCOME TO</p>
            <div className="font-bold text-xl">
              <h1>US Harmful Algal Bloom-Control</h1>
              <h1>Technologies Incubator Clearinghouse</h1>
            </div>
          </div>
          <p className="border-t px-3 py-5">
            A collection of HAB control regulations and permitting information
            to help users navigate algaecide use in marine and freshwater
          </p>
        </div>
      </div>
    </div>
  );
}

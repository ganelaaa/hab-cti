export default function Navbar() {
  return (
    <div
      className="flex flex-row items-center justify-between px-20 py-3"
      style={{ backgroundColor: "var(--primary-darkest)" }}
    >
      {/* Logo and Title */}
      <div className="flex flex-row items-center gap-3">
        <img
          src="/logo.png"
          alt="US HAB-CTI Logo"
          className="w-10 h-10 rounded-full"
        />
        <div className="text-primary">
          <p>US HAB-CTI</p>
          <p className="italic text-xs">Clearinghouse</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex flex-row gap-10 text-gray-600">
        <a href="#" className="hover:text-blue-400 text-sm">
          Home
        </a>
        <a href="#" className="hover:text-blue-400 text-sm">
          About
        </a>
        <a href="#" className="hover:text-blue-400 text-sm">
          Funding Resources
        </a>
        <a href="#" className="hover:text-blue-400 text-sm">
          HABs 101
        </a>
        <a href="#" className="hover:text-blue-400 text-sm">
          FAQs
        </a>
      </nav>

      {/* Search bar */}
      <div className="flex flex-row items-center border-4 border-blue-700 rounded-lg gap-2 bg-white w-86">
        <span className="text-gray-400 text-sm"></span>
        <svg
          style={{ width: "24px", height: "24px" }}
          aria-hidden="true"
          focusable="false"
          role="img"
        >
          <use href="/assets/img/sprite.svg#search"></use>
        </svg>
        <input
          type="search"
          placeholder="Quick search"
          className="flex text-xs bg-transparent text-gray-600"
        />
        <span className="bg-blue-800 text-white text-xs px-2 py-1 rounded-md font-bold">
          ⌘ + K
        </span>
      </div>
    </div>
  );
}

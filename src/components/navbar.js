import Link from "next/link";

export default function Navbar() {
  return (
    <div
      className="flex flex-row items-center justify-between px-20 py-3 tracking-wide shadow-sm border-b border-gray-200 rounded-b-lg"
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
        <Link className="hover:text-blue-400 text-sm" href="/">
          Home
        </Link>
        <Link className="hover:text-blue-400 text-sm" href="/about">
          About
        </Link>
        <Link className="hover:text-blue-400 text-sm" href="/">
          Funding Resources
        </Link>
        <Link className="hover:text-blue-400 text-sm" href="/">
          HABs 101
        </Link>
        <Link className="hover:text-blue-400 text-sm" href="/">
          FAQs
        </Link>
      </nav>

      {/* Search bar */}
      <div className="flex flex-row items-center border-t-2 border-r-2 border-l-2 border-b-2 border-primary rounded-lg gap-2 bg-white w-86 focus-within:ring-2 focus-within:ring-primary">
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
          className=" navbar-search flex text-xs bg-transparent text-gray-600 outline-none"
        />
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Funding Resources", href: "/fundingResources" },
    { label: "HABs 101", href: "#" },
    { label: "FAQs", href: "#" },
  ];
  return (
    <div className="flex flex-row items-center justify-between px-20 py-3 tracking-wide shadow-sm border-b border-gray-200 rounded-b-lg">
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
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`relative text-sm group transition-colors duration-200 hover:text-primary ${
              pathname === link.href ? "text-primary" : ""
            }`}
          >
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 origin-center ${
                pathname === link.href ? "scale-x-100" : "scale-x-0"
              }`}
            />
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Search bar */}
      <div className="flex flex-row items-center border-t-2 border-r-2 border-l-2 border-b-2 border-primary rounded-lg gap-2 bg-white w-86">
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
          className=" navbar-search flex text-xs bg-transparent text-gray-600"
        />
      </div>
    </div>
  );
}

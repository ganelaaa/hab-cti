"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Funding Resources", href: "/fundingResources" },
    { label: "HABs 101", href: "/habs101" },
    { label: "FAQs", href: "/faq" },
    { label: "Glossary", href: "/glossary" },
  ];

  const isActiveLink = (href) => pathname === href;

  const NavLink = ({ link, mobile = false }) => (
    <Link
      href={link.href}
      onClick={() => setIsMenuOpen(false)}
      className={`relative text-sm transition-colors duration-200 hover:text-primary ${
        mobile ? "block rounded-md px-3 py-2" : "pb-3"
      } ${isActiveLink(link.href) ? "text-primary" : "text-gray-600"}`}
    >
      {!mobile && (
        <>
          <span className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-full origin-center bg-primary transition-transform duration-300 ${
              isActiveLink(link.href) ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </>
      )}

      {link.label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 rounded-b-lg border-b border-gray-200 bg-white tracking-wide shadow-sm">
      <div className="flex w-full flex-wrap items-center gap-4 px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-10 xl:px-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 flex-row items-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:opacity-80"
        >
          <Image
            src="/logo.png"
            alt="US HAB-CTI Logo"
            width={52}
            height={52}
            className="h-12 w-12 shrink-0 rounded-full sm:h-13 sm:w-13"
            priority
          />

          <div className="text-primary">
            <p className="text-sm font-semibold sm:text-base">US HAB CTRL</p>
            <div className="mt-0.5 leading-tight">
              <p className="text-[11px] italic sm:text-xs">
                HAB Control Technologies
              </p>
              <p className="text-[11px] italic sm:text-xs">
                & Regulatory Logistics
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="ml-2 hidden flex-row items-center gap-4 text-gray-600 lg:flex xl:ml-6 xl:gap-8">
          {links.map((link) => (
            <span key={link.label} className="group">
              <NavLink link={link} />
            </span>
          ))}
        </nav>

        {/* Search Bar - visible from medium screens */}
        <div className="ml-auto hidden w-40 flex-row items-center gap-2 rounded-lg border border-primary bg-white px-3 py-2 md:flex lg:w-44 xl:w-56 2xl:w-72">
          <svg
            className="h-5 w-5 shrink-0"
            aria-hidden="true"
            focusable="false"
            role="img"
          >
            <use href="/assets/img/sprite.svg#search"></use>
          </svg>

          <input
            type="search"
            placeholder="Quick search"
            className="navbar-search min-w-0 flex-1 bg-transparent text-xs text-gray-600 outline-none"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 p-2 text-gray-700 transition-colors hover:bg-gray-50 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg
            className="h-6 w-6"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Nav */}
        <div
          className={`w-full border-t border-gray-200 pt-3 lg:hidden ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <nav className="flex flex-col gap-1 pb-3">
            {links.map((link) => (
              <NavLink key={link.label} link={link} mobile />
            ))}
          </nav>

          {/* Search Bar inside menu only for small screens */}
          <div className="flex w-full flex-row items-center gap-2 rounded-lg border border-primary bg-white px-3 py-2 md:hidden">
            <svg
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
              focusable="false"
              role="img"
            >
              <use href="/assets/img/sprite.svg#search"></use>
            </svg>

            <input
              type="search"
              placeholder="Quick search"
              className="navbar-search min-w-0 flex-1 bg-transparent text-xs text-gray-600 outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

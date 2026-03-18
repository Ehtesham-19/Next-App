"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Categories",
    href: "/#categories",
  },
  {
    label: "Products",
    href: "/#products",
  },
  {
    label: "Reviews",
    href: "/#reviews",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

function isActiveLink(pathname, href) {
  if (href.includes("#")) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#9DC3EA]/30 bg-gradient-to-r from-[#001A57] via-[#003A8C] to-[#00529F] backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-[92%] max-w-6xl items-center justify-between gap-4">
        <Link
          href="/"
          className="text-lg font-black uppercase tracking-[0.08em] text-[#F3F8FF]"
          aria-label="Go to homepage"
        >
          BluePeak Sports
        </Link>

        <nav className="hidden items-center gap-3 md:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isActiveLink(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[#F3F8FF]/20 text-white"
                    : "text-[#DCEBFF] hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/#products"
            className="hidden rounded-lg bg-gradient-to-r from-[#FFD56A] to-[#E5AE00] px-4 py-2 text-xs font-semibold text-[#001A57] sm:inline-flex"
          >
            Shop Now
          </Link>

          <button
            type="button"
            className="inline-flex rounded p-1 text-slate-200 transition hover:bg-white/10 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((previous) => !previous)}
          >
            <span className="sr-only">Toggle menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <nav
        className={`mx-auto grid w-[92%] max-w-6xl overflow-hidden transition-all duration-200 md:hidden ${
          isMenuOpen ? "max-h-40 pb-3" : "max-h-0"
        }`}
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => {
          const active = isActiveLink(pathname, link.href);

          return (
            <Link
              key={`mobile-${link.href}`}
              href={link.href}
              className={`mb-1 rounded-lg px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-[#F3F8FF]/20 text-white"
                  : "text-[#DCEBFF] hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

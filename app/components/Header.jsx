"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AUTH_ROUTES = ["/login", "/logout", "/password"];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about/profile", label: "Profile" },
  { href: "/products", label: "Products" },
  { href: "/logout", label: "Logout" },
  { href: "/user", label: "Users" },
];

function Header() {
  const pathname = usePathname();
  const hideOnAuthRoutes = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isActiveRoute = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getLinkClasses = (href) => {
    const base = "ml-4 rounded px-3 py-1 transition-colors";
    return isActiveRoute(href)
      ? `${base} bg-white text-black font-semibold`
      : `${base} text-white/80 hover:text-white hover:bg-white/10`;
  };

  if (hideOnAuthRoutes) {
    return null;
  }

  return (
    <div className="bg-black text-white  flex items-center justify-center gap-4 p-x-6">
      <h1>My App</h1>
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={getLinkClasses(link.href)}
          aria-current={isActiveRoute(link.href) ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

export default Header;

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
  isPage?: boolean;
}

const navLinks: NavLink[] = [
  { href: "#servicios", label: "Servicios" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${isScrolled
          ? "py-3 bg-white/70 dark:bg-[#0F141A]/75 backdrop-blur-xl border-b border-white/50 dark:border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.06),inset_0_-1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.25),inset_0_-1px_0_rgba(255,255,255,0.03)]"
          : "py-5 bg-transparent"
        }
      `}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg md:text-xl font-semibold text-[#2c2c2c] dark:text-[#E5E7EB] hover:opacity-80 transition-opacity"
        >
          NeumorStudio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isPage ? (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-[#2c2c2c] dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm text-slate-600 dark:text-slate-300 hover:text-[#2c2c2c] dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            )
          ))}

          {/* CTA Button */}
          <a
            href="#contacto"
            onClick={(e) => handleLinkClick(e, "#contacto")}
            className="
              inline-flex items-center justify-center
              rounded-full px-5 py-2
              text-sm font-medium
              bg-[#2c2c2c] text-white
              dark:bg-[#E5E7EB] dark:text-[#0F141A]
              hover:opacity-90
              transition-all duration-150
              shadow-[4px_4px_12px_rgba(0,0,0,0.15)]
              dark:shadow-[4px_4px_12px_rgba(0,0,0,0.3)]
            "
          >
            Solicitar propuesta
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 dark:text-slate-300"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="px-4 py-4 space-y-4 bg-white/80 dark:bg-[#0F141A]/85 backdrop-blur-xl border-b border-white/40 dark:border-white/5">
          {navLinks.map((link) => (
            link.isPage ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm text-slate-600 dark:text-slate-300 hover:text-[#2c2c2c] dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block text-sm text-slate-600 dark:text-slate-300 hover:text-[#2c2c2c] dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            )
          ))}
          <a
            href="#contacto"
            onClick={(e) => handleLinkClick(e, "#contacto")}
            className="
              block text-center
              rounded-full px-5 py-2.5
              text-sm font-medium
              bg-[#2c2c2c] text-white
              dark:bg-[#E5E7EB] dark:text-[#0F141A]
            "
          >
            Solicitar propuesta
          </a>
        </div>
      </div>
    </nav>
  );
}

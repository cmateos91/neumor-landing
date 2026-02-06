"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DesignSwitcher } from "./DesignSwitcher";

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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`ng-navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg md:text-xl font-semibold text-[#2c2c2c] dark:text-[#E5E7EB] 
                     hover:opacity-80 transition-opacity relative z-10"
        >
          NeumorStudio
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-sm text-slate-600 dark:text-slate-300 
                         hover:text-[#2c2c2c] dark:hover:text-white 
                         transition-colors relative z-10 px-3 py-2 rounded-lg
                         hover:bg-white/10 dark:hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}

          <DesignSwitcher />
          
          <button
            onClick={() => scrollToSection("#contacto")}
            className="ng-btn-primary text-sm"
          >
            Solicitar propuesta
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300
                     hover:bg-white/10 dark:hover:bg-white/5 transition-colors relative z-10"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300 ease-out
          ${isMobileMenuOpen ? "max-h-64 opacity-100 mt-2" : "max-h-0 opacity-0"}
        `}
      >
        <div className="mx-4 p-4 ng-card space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-300
                         hover:bg-white/10 dark:hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex items-center justify-between gap-4 px-2">
            <DesignSwitcher />
            <button
              onClick={() => scrollToSection("#contacto")}
              className="ng-btn-primary text-sm flex-1 justify-center"
            >
              Solicitar propuesta
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

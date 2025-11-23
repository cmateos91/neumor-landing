"use client";

import { useEffect, useState } from "react";
import { toggleTheme } from "@/lib/toggleTheme";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const stored = localStorage.getItem("theme");

    if (stored === "dark") {
      root.classList.add("dark");
      setDark(true);
      return;
    }

    if (stored === "light") {
      root.classList.remove("dark");
      setDark(false);
      return;
    }

    const prefersDark = window.matchMedia?.(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      root.classList.add("dark");
      setDark(true);
    } else {
      root.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const handleToggle = () => {
    const next = !dark;
    setDark(next);
    toggleTheme(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`
        relative h-[2.2rem] w-[4.2rem] rounded-full
        flex items-center
        transition-all duration-300
        shadow-[inset_4px_4px_10px_rgba(0,0,0,0.25),inset_-4px_-4px_10px_rgba(255,255,255,0.4)]
        ${dark ? "bg-[#151C23]" : "bg-[#ECEEF3]"}
      `}
    >
      <span
        className={`
          absolute flex items-center justify-center h-7 w-7 rounded-full
          transition-all duration-300
          text-lg
          ${dark ? "left-[2.2rem]" : "left-[0.2rem]"}
          ${dark ? "text-yellow-300" : "text-slate-600"}
          ${dark ? "bg-[#0D1117]" : "bg-[#FFFFFF]"}
          shadow-[4px_4px_10px_rgba(0,0,0,0.25),-4px_-4px_10px_rgba(255,255,255,0.9)]
        `}
      >
        {dark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 18a6 6 0 100-12 6 6 0 000 12zM12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}

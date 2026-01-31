"use client";

import { useState } from "react";
import { useTheme, themeConfig, DesignTheme } from "../theme/ThemeContext";

export function DesignSwitcher() {
  const { designTheme, setDesignTheme, isDark, setIsDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = Object.entries(themeConfig) as [DesignTheme, typeof themeConfig[DesignTheme]][];

  return (
    <div className="relative">
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 px-3 py-2 rounded-full
          design-switcher-btn
          transition-all duration-200
        "
        aria-label="Cambiar diseño"
      >
        <span className="text-lg">{themeConfig[designTheme].emoji}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {themeConfig[designTheme].name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Overlay para cerrar */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel de opciones */}
          <div className="
            absolute right-0 top-full mt-2 z-50
            w-64 p-3 rounded-2xl
            design-switcher-panel
            shadow-2xl
          ">
            <p className="text-xs uppercase tracking-wider opacity-60 mb-3 px-2">
              Diseño visual
            </p>
            
            <div className="space-y-1">
              {themes.map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => {
                    setDesignTheme(key);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                    transition-all duration-150
                    design-switcher-option
                    ${designTheme === key ? "design-switcher-option-active" : ""}
                  `}
                >
                  <span className="text-xl">{config.emoji}</span>
                  <div className="text-left">
                    <div className="font-medium text-sm">{config.name}</div>
                    <div className="text-xs opacity-60">{config.description}</div>
                  </div>
                  {designTheme === key && (
                    <svg className="w-4 h-4 ml-auto text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {/* Separador */}
            <div className="my-3 border-t border-current opacity-10" />

            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="
                w-full flex items-center justify-between px-3 py-2.5 rounded-xl
                design-switcher-option
              "
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{isDark ? "🌙" : "☀️"}</span>
                <span className="font-medium text-sm">
                  {isDark ? "Modo oscuro" : "Modo claro"}
                </span>
              </div>
              <div className={`
                w-10 h-6 rounded-full p-1 transition-colors
                ${isDark ? "bg-emerald-500" : "bg-gray-300"}
              `}>
                <div className={`
                  w-4 h-4 rounded-full bg-white shadow transition-transform
                  ${isDark ? "translate-x-4" : "translate-x-0"}
                `} />
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

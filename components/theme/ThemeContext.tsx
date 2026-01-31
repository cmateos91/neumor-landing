"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type DesignTheme = "neumorphic" | "glassmorphism" | "brutalist" | "aurora" | "minimal";

interface ThemeContextType {
  designTheme: DesignTheme;
  setDesignTheme: (theme: DesignTheme) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themeConfig: Record<DesignTheme, { name: string; emoji: string; description: string }> = {
  neumorphic: { name: "Neumórfico", emoji: "🫧", description: "Suave y elegante" },
  glassmorphism: { name: "Cristal", emoji: "💎", description: "Transparente y moderno" },
  brutalist: { name: "Brutal", emoji: "🔲", description: "Crudo y directo" },
  aurora: { name: "Aurora", emoji: "🌈", description: "Vibrante y colorido" },
  minimal: { name: "Minimal", emoji: "◽", description: "Limpio y simple" },
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [designTheme, setDesignThemeState] = useState<DesignTheme>("neumorphic");
  const [isDark, setIsDarkState] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Cargar tema de diseño
    const savedDesign = localStorage.getItem("designTheme") as DesignTheme;
    if (savedDesign && themeConfig[savedDesign]) {
      setDesignThemeState(savedDesign);
    }
    // Cargar dark mode
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDarkState(isDarkMode);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Actualizar clase del body
    document.body.setAttribute("data-design", designTheme);
    localStorage.setItem("designTheme", designTheme);
  }, [designTheme, mounted]);

  const setDesignTheme = (theme: DesignTheme) => {
    setDesignThemeState(theme);
  };

  const setIsDark = (dark: boolean) => {
    setIsDarkState(dark);
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ designTheme, setDesignTheme, isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

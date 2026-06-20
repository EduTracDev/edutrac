"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ThemeColors {
  primary: string;
  primaryHover: string;
}

interface ThemeContextType {
  theme: ThemeColors;
  setSchoolTheme: (colors: ThemeColors) => void;
}

const defaultTheme: ThemeColors = {
  primary: "#923CF9",
  primaryHover: "#7e2ed4",
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setSchoolTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);

  const setSchoolTheme = (colors: ThemeColors) => {
    setTheme(colors);
  };

  useEffect(() => {
    // These match the custom fallback slots in globals.css
    document.documentElement.style.setProperty("--color-dynamic-brand", theme.primary);
    document.documentElement.style.setProperty("--color-dynamic-brand-hover", theme.primaryHover);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setSchoolTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useSchoolTheme = () => useContext(ThemeContext);
import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "../utils/theme";

const ThemeContext = createContext();

export const ThemeProviderWrapper = ({ children }) => {
  const [themeMode, setThemeMode] = useState("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode") || "system";
    if (savedTheme === "system") {
      const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      setThemeMode(preferredTheme);
    } else {
      setThemeMode(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleTheme = (mode) => {
    setThemeMode(mode);
  };

  const appliedTheme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

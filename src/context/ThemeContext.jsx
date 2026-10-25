import { createContext, useContext } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const isDark = false;
  const toggleTheme = () => {};

  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = "light";
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useTheme() {
  return useContext(ThemeContext);
}

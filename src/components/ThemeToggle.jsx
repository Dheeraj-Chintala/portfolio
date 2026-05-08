import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className="fixed top-4 right-5 z-[9999] w-11 h-11 rounded-full flex items-center justify-center shadow-lg border transition-all duration-300 cursor-pointer backdrop-blur-md"
      style={{
        background: "var(--theme-toggle-bg)",
        borderColor: "var(--theme-toggle-border)",
        color: "var(--theme-toggle-text)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--theme-toggle-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--theme-toggle-bg)")}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Sun size={20} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Moon size={20} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

import { Mouse } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";

export default function Home() {
  const { isDark } = useTheme();
  const [svgColor, setSvgColor] = useState("1e1b4b");

  useEffect(() => {
    // Read color from CSS variable
    const root = getComputedStyle(document.documentElement);
    const color = root.getPropertyValue("--typing-svg-color").trim();
    if (color) {
      setSvgColor(color);
    }
  }, [isDark]);

  return (
    <div className="w-3/4 flex flex-col items-center justify-center gap-5 text-center px-4">
      <br />
      <br />
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-bold transition-colors duration-300"
        style={{
          fontFamily: "'Boldonse', system-ui",
          color: "var(--color-text-primary)",
          textShadow: "var(--hero-text-shadow)",
        }}
      >
        Hi, I'm Dheeraj
      </motion.h1>

      {/* Desktop typing SVG */}
      <motion.img
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="hidden md:block"
        src={`https://readme-typing-svg.demolab.com?font=Fira+Code&size=40&duration=4000&pause=800&color=${svgColor}&center=true&vCenter=true&width=700&lines=Android+App+Developer;Full+Stack+Developer;UI%2FUX+Designer`}
        alt="Typing SVG Desktop"
      />

      {/* Mobile typing SVG */}
      <motion.img
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="block md:hidden"
        src={`https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&duration=4000&pause=800&color=${svgColor}&center=true&vCenter=true&width=300&lines=Android+App+Developer;Full+Stack+Developer;UI%2FUX+Designer`}
        alt="Typing SVG Mobile"
      />

      {/* Subheading */}
      <div className="max-w-xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="myfont text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto text-center leading-relaxed transition-colors duration-300"
          style={{ color: "var(--color-text-subheading)" }}
        >
          Crafting next-generation digital experiences with cutting-edge
          technology and innovative design solutions
        </motion.h2>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <button
          className="cursor-pointer font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
          style={{
            background: "var(--color-btn-primary-bg)",
            color: "var(--color-primary-btn-text)",
            boxShadow: isDark ? "none" : "var(--color-shadow-cta)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-btn-primary-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-btn-primary-bg)")}
          onClick={() =>
            (window.location.href = "https://www.github.com/Dheeraj-Chintala")
          }
        >
          View My Work
        </button>
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/DheerajResume.pdf";
            link.download = "DheerajResume.pdf";
            link.click();
          }}
          className="cursor-pointer font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
          style={
            isDark
              ? { border: "1px solid var(--color-border-btn-outline)", color: "var(--color-text-primary)" }
              : {
                  border: "2px solid var(--color-border-btn-outline)",
                  color: "var(--color-border-btn-outline)",
                  background: "var(--color-btn-secondary-bg)",
                  boxShadow: "var(--color-shadow-btn)",
                }
          }
        >
          Download CV
        </button>
      </div>

      {/* Mouse Icon */}
      <Mouse
        size={50}
        className="mt-12 animate-bounce transition-colors duration-300"
        style={{ color: "var(--color-text-subheading)" }}
      />
    </div>
  );
}

import React from "react";
import "./App.css";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import FloatingNav from "./components/FloatingNav";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./components/Home";
import BubblesBackground from "./components/BubblesBackground";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import SocialLinks from "./components/SocialLinks";

function AppContent() {
  const { isDark } = useTheme();

  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-500"
      style={{ color: "var(--color-text-primary)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <BubblesBackground />
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Floating Nav */}
      <FloatingNav />

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Home */}
        <section
          id="home"
          className="min-h-screen md:h-screen w-full flex items-center justify-center px-4 select-none transition-colors duration-500"
          style={{ backgroundColor: "var(--color-bg-home-overlay)" }}
        >
          <Home />
        </section>

        {/* About */}
        <section
          id="about"
          className="py-16 md:h-screen w-full flex items-center justify-center px-4 select-none overflow-y-auto transition-colors duration-500"
          style={{ background: "var(--gradient-section-about)" }}
        >
          <About />
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="py-16 md:h-screen w-full flex items-center justify-center px-4 select-none overflow-y-auto"
        >
          <Skills />
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="py-16 md:h-screen w-full flex items-baseline justify-center px-4 select-none transition-colors duration-500"
          style={{ background: "var(--gradient-section-projects)" }}
        >
          <Projects />
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="w-full flex items-center justify-center select-none transition-colors duration-500"
          style={{ background: "var(--color-bg-footer)" }}
        >
          <SocialLinks />
        </section>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

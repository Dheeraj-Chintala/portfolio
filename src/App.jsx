import React, { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import FloatingNav from "./components/FloatingNav";
import Home from "./components/Home";
import BubblesBackground from "./components/BubblesBackground";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import LoadingScreen from "./components/LoadingScreen";

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-500"
      style={{ color: "var(--color-text-primary)" }}
    >
      {/* Minimal Designed Loading Screen with Numbers Counter */}
      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      {/* Background (desktop only to prevent mobile scroll lag & battery drain) */}
      <div className="hidden md:block absolute inset-0 -z-10">
        <BubblesBackground />
      </div>

      {/* Floating Nav */}
      <FloatingNav />

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Home */}
        <section
          id="home"
          className="relative min-h-screen md:h-screen w-full flex items-center justify-center select-none overflow-hidden transition-colors duration-500"
        >
          <Home isLoaded={isLoaded} />
        </section>

        {/* About */}
        <section
          id="about"
          className="py-24 min-h-screen w-full flex items-center justify-center px-4 select-none transition-colors duration-500"
          style={{ background: "var(--gradient-section-about)" }}
        >
          <About />
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="py-20 min-h-screen w-full flex items-center justify-center px-0 select-none transition-colors duration-500 overflow-hidden"
          style={{ background: "var(--gradient-section-about)" }}
        >
          <Skills />
        </section>

        {/* Experience & Work */}
        <section
          id="experience"
          className="py-16 min-h-screen w-full flex items-center justify-center px-0 select-none transition-colors duration-500 overflow-hidden"
          style={{ background: "var(--gradient-section-about)" }}
        >
          <Experience />
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="py-20 min-h-screen w-full flex items-center justify-center px-0 select-none transition-colors duration-500 overflow-hidden"
          style={{ background: "var(--gradient-section-projects)" }}
        >
          <Projects />
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="w-full flex items-center justify-center select-none transition-colors duration-500 overflow-hidden"
          style={{ background: "var(--gradient-section-about)" }}
        >
          <Contact />
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

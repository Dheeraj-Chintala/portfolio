import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import FloatingNav from "./components/FloatingNav";
import Home from "./components/Home";
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
      className="relative min-h-screen overflow-hidden transition-colors duration-500 selection:bg-black selection:text-white"
      style={{ color: "var(--color-text-primary)" }}
    >
      {/* Minimal Designed Loading Screen with Numbers Counter */}
      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      {/* Floating Nav */}
      <FloatingNav />

      {/* Content Sections */}
      <div className="relative z-10 selection:bg-black selection:text-white">
        {/* Home */}
        <section
          id="home"
          className="relative min-h-screen md:h-screen w-full flex items-center justify-center overflow-hidden transition-colors duration-500"
        >
          <Home isLoaded={isLoaded} />
        </section>

        {/* About */}
        <section
          id="about"
          className="py-24 min-h-screen w-full flex items-center justify-center px-4 transition-colors duration-500"
          style={{ background: "var(--gradient-section-about)" }}
        >
          <About />
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="py-20 min-h-screen w-full flex items-center justify-center px-0 transition-colors duration-500 overflow-hidden"
          style={{ background: "var(--gradient-section-about)" }}
        >
          <Skills />
        </section>

        {/* Experience & Work */}
        <section
          id="experience"
          className="py-16 min-h-screen w-full flex items-center justify-center px-0 transition-colors duration-500 overflow-hidden"
          style={{ background: "var(--gradient-section-about)" }}
        >
          <Experience />
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="py-20 min-h-screen w-full flex items-center justify-center px-0 transition-colors duration-500 overflow-hidden"
          style={{ background: "var(--gradient-section-projects)" }}
        >
          <Projects />
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="w-full flex items-center justify-center transition-colors duration-500 overflow-hidden"
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

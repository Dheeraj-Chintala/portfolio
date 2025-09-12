import React from "react";
import "./App.css";
import FloatingNav from "./components/FloatingNav";
import Home from "./components/Home";
import BubblesBackground from "./components/BubblesBackground";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import SocialLinks from "./components/SocialLinks";
function App() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <BubblesBackground />
      </div>

      {/* Floating Nav */}
      <FloatingNav />

      {/* Content Sections */}
      <div className="relative z-10">
        {/* Home */}
        <section
          id="home"
          className="min-h-screen md:h-screen w-full flex items-center justify-center bg-black/10  px-4 select-none"
        >
          <Home />
        </section>

        {/* About */}
        <section
          id="about"
          className="py-16 md:h-screen w-full flex items-center justify-center  px-4 bg-cover bg-center bg-[url('/purple.jpg')] select-none  overflow-y-auto"
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
          className="py-16 md:h-screen w-full flex items-baseline justify-center  px-4 bg-cover bg-center bg-[url('/purple.jpg')] select-none"
        >
          <Projects />
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="py-16 md:py-0 w-full flex items-center justify-center  select-none "
        >
          <SocialLinks />
        </section>
      </div>
    </div>
  );
}

export default App;

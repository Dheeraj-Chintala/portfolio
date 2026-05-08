import { motion } from "framer-motion";
import Progress from "./Progress";

export default function About() {
  const pillStyle = {
    background: "var(--gradient-pill)",
    color: "var(--color-pill-text)",
    border: "1px solid var(--color-border-pill-light)",
    fontWeight: "var(--pill-font-weight)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.2 } }}
      className="rounded-2xl w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-10 items-center backdrop-blur-md"
      style={{
        border: "1px solid var(--color-border-glass)",
        background: "var(--color-bg-surface)",
        boxShadow: "var(--color-shadow-card)",
      }}
    >
      {/* About Me */}
      <div id="aboutme">
        <h1
          className="text-2xl md:text-4xl font-bold mb-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          About Me
        </h1>
        <p
          className="text-sm md:text-base text-justify"
          style={{ color: "var(--color-text-body)" }}
        >
          I'm a passionate full-stack developer with extensive experience in
          building efficient, user-friendly, and scalable applications. I
          specialize in React, NodeJS, and Flutter, having developed 10+
          Android apps, including AI-integrated solutions that enhance user
          experience and automation. I recently completed a 2-month internship
          focused on integrating AI into Android applications, where I was
          recognized as "Intern of the Year" for my contributions. My expertise
          spans modern web and mobile technologies, cloud platforms, and design
          systems, coupled with strong skills in Data Structures and Algorithms,
          enabling me to craft optimized and high-performing solutions. Beyond
          development, I actively contribute to open-source projects, mentor
          aspiring developers, and constantly explore emerging technologies to
          drive impactful digital solutions.
        </p>
        <br />
        <div className="flex flex-wrap gap-3">
          {["10+ Apps Developed", "Open Source Contributor", "AI Integration"].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                style={pillStyle}
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Core Expertise */}
      <div id="expertise" className="max-w-lg">
        <h1
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ color: "var(--color-text-heading)" }}
        >
          Core Expertise
        </h1>
        <Progress />
      </div>
    </motion.div>
  );
}

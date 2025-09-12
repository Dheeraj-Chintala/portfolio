import Progress from "./Progress";

export default function About() {
  return (
    <div className="rounded-xl w-full md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-10 border border-blue-300 items-center backdrop-blur">
      {/* About Me */}
      <div id="aboutme">
        <h1 className="text-2xl md:text-4xl font-bold mb-2 text-gray-300">
          About Me
        </h1>
        <p className="text-sm md:text-base  text-gray-400 text-justify">
          I’m a passionate full-stack developer with extensive experience in
          building efficient, user-friendly, and scalable applications. I
          specialize in React, Node.js, and Flutter, having developed 10+
          Android apps, including AI-integrated solutions that enhance user
          experience and automation. I recently completed a 2-month internship
          focused on integrating AI into Android applications, where I was
          recognized as “Intern of the Year” for my contributions. My expertise
          spans modern web and mobile technologies, cloud platforms, and design
          systems, coupled with strong skills in Data Structures and Algorithms,
          enabling me to craft optimized and high-performing solutions. Beyond
          development, I actively contribute to open-source projects, mentor
          aspiring developers, and constantly explore emerging technologies to
          drive impactful digital solutions.
        </p>
        <br></br>

        <div className="flex flex-wrap gap-3">
          <span
            className="
                bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                text-cyan-300 border border-cyan-400/40
                px-3 py-1 rounded-full text-xs font-medium
                shadow-sm
              "
          >
            10+ Apps Developed
          </span>{" "}
          <span
            className="
                bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                text-cyan-300 border border-cyan-400/40
                px-3 py-1 rounded-full text-xs font-medium
                shadow-sm
              "
          >
            Open Source Contributor
          </span>
          <span
            className="
  bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                text-cyan-300 border border-cyan-400/40
                px-3 py-1 rounded-full text-xs font-medium
                shadow-sm"
          >
            AI Integration
          </span>
        </div>
      </div>

      {/* Core Expertise */}
      <div id="expertise" className="max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Core Expertise</h1>
        <Progress />
      </div>
    </div>
  );
}

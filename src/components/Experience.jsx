import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { GitBranch } from "lucide-react";

const MAIN_TRACK = [
  {
    id: "cothon",
    step: "01",
    period: "Dec 2024 – Feb 2025",
    role: "Android Developer Intern",
    company: "Cothon Solutions",
    location: "Hyderabad, India",
    type: "Intern of the Year 🏆",
    slug: "cothon-android-intern",
    summary:
      "Engineered fluid Flutter apps and integrated client-side AI; honored with the company's Intern of the Year award.",
    highlights: [
      "Developed Flutter applications, integrated AI capabilities using TensorFlow and Google ML Kit, and improved debugging and testing workflows.",
      "Collaborated through Git-based version control, issue tracking, and peer code reviews.",
      "Recognized and awarded as Intern of the Year for outstanding dedication, technical delivery, and team collaboration.",
    ],
    skills: [
      "Flutter",
      "Dart",
      "TensorFlow",
      "Google ML Kit",
      "Android SDK",
      "Git & Code Reviews",
      "State Management",
    ],
  },
  {
    id: "etailed-intern",
    step: "02",
    period: "Jan 2026 – Feb 2026",
    role: "Software Engineering Intern",
    company: "E-Tailed Digital India",
    location: "Hyderabad, India",
    type: "Full-Time Conversion",
    slug: "etailed-swe-intern",
    summary:
      "Contributed to enterprise backend systems, resulting in immediate promotion to full-time Backend Engineer.",
    highlights: [
      "Contributed to application and backend development, gaining hands-on experience with business software and development workflows.",
      "Built database integrations, designed clean REST API endpoints, and refined operational services.",
      "Converted to a full-time Backend Engineer following the internship in recognition of consistent code quality and problem solving.",
    ],
    skills: [
      "Backend Architecture",
      "REST APIs",
      "Database Schemas",
      "Enterprise Software",
      "Agile Workflows",
    ],
  },
  {
    id: "etailed-fulltime",
    step: "03",
    period: "Mar 5, 2026 – Present",
    role: "Backend Engineer",
    company: "E-Tailed Digital India",
    location: "Hyderabad, India",
    type: "Full-time (Current)",
    slug: "etailed-backend-engineer",
    summary:
      "Architecting backend services, scalable REST APIs, and a comprehensive enterprise CRM platform.",
    highlights: [
      "Develop backend services, APIs, database integrations, and mission-critical business application features.",
      "Build a CRM platform supporting lead management, branch and product/team organization, automated lead assignment, and executive follow-ups.",
      "Contribute across the software lifecycle, including implementation, automated testing, CI/CD deployment, and cloud infrastructure.",
    ],
    skills: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "REST APIs",
      "CRM Architecture",
      "Database Integrations",
      "CI/CD",
    ],
  },
];

const PARALLEL_BRANCH = {
  id: "freelance",
  period: "2025 – Present",
  role: "Video Editor & Graphic Designer",
  company: "Freelance Creative Work",
  location: "Remote / Worldwide",
  type: "Freelancing (Part-time)",
  slug: "freelance-creative",
  summary:
    "Parallel creative freelancing in video editing, commercial reels, motion graphics, and comprehensive brand identity design.",
  highlights: [
    "Produced dynamic video edits, commercial reels, motion graphics, sound design, and promotional media for creators and brands.",
    "Designed comprehensive brand identities, vector logos, social media visual assets, poster graphics, and UI layouts emphasizing modern typography and color balance.",
    "Combined technical precision with creative pacing across DaVinci Resolve, Premiere Pro, After Effects, Figma, and Affinity Studio.",
  ],
  skills: [
    "Video Editing",
    "DaVinci Resolve",
    "Motion Graphics",
    "Graphic Design",
    "Figma",
    "Affinity Studio",
    "Visual Storytelling",
  ],
};

export default function Experience() {
  const [activeJob, setActiveJob] = useState(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (timelineRef.current) {
        setLineHeight(timelineRef.current.getBoundingClientRect().height);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 70%"],
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "q" || e.key === "Q") {
        setActiveJob(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full px-4 sm:px-8 md:px-12 lg:px-16 py-12 sm:py-20 flex flex-col items-start justify-center relative"
    >
      {/* Work & Experience Section Heading */}
      <div className="w-full text-left -mb-1 sm:-mb-1.5 md:-mb-2 select-none pt-2 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-tight inline-block origin-bottom-left pt-1"
          style={{
            fontFamily: "'Boldonse', system-ui, sans-serif",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 90%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 90%)",
          }}
        >
          Work &amp; Experience
        </motion.h2>
      </div>

      {/* Main Open Timeline (Outer Box Removed) */}
      <div className="w-full relative z-20 py-8 sm:py-14">
        <div ref={timelineRef} className="relative w-full">
          {/* Main Vertical Central Line (Dark Palette) */}
          <div className="absolute top-6 bottom-6 left-6 sm:left-1/2 sm:-translate-x-1/2 w-0.5 bg-slate-300 pointer-events-none rounded-full" />

          {/* Animated Dark Gradient Beam */}
          <motion.div
            style={{
              height: beamHeight,
              opacity: beamOpacity,
            }}
            className="absolute top-6 left-6 sm:left-1/2 sm:-translate-x-1/2 w-0.5 bg-gradient-to-b from-slate-950 via-slate-800 to-black rounded-full pointer-events-none z-10 shadow-[0_0_8px_rgba(0,0,0,0.5)]"
          />

          {/* Timeline Milestones */}
          <div className="space-y-16 sm:space-y-24 md:space-y-28">
            {/* Step 01: Android Developer Intern */}
            <div
              onClick={() => setActiveJob(MAIN_TRACK[0])}
              className="relative grid grid-cols-[auto_1fr] sm:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8 md:gap-14 py-4 sm:py-6 px-2 sm:px-6 rounded-2xl hover:bg-slate-900/[0.04] transition-all duration-200 cursor-pointer group"
            >
              {/* Left Column: Time Only (Thin/Medium Mono, No Badges, No Milestone text) */}
              <div className="hidden sm:block text-right">
                <span className="font-mono text-base sm:text-xl md:text-2xl font-light text-slate-800 tracking-tight block group-hover:text-black transition-colors">
                  {MAIN_TRACK[0].period}
                </span>
              </div>

              {/* Center Stepper Node */}
              <div className="relative flex items-center justify-center z-20">
                <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-slate-950 text-white border-2 border-white shadow-lg flex items-center justify-center font-mono font-bold text-xs sm:text-base transition-all duration-200 group-hover:scale-115 group-hover:bg-black group-hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  {MAIN_TRACK[0].step}
                </div>
              </div>

              {/* Right Column: Thin Font Role Name & Company (No Badges) */}
              <div className="text-left pl-2 sm:pl-0">
                <span className="sm:hidden font-mono text-xs font-light text-slate-500 block mb-1">
                  {MAIN_TRACK[0].period}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-900 tracking-tight group-hover:text-black transition-colors leading-tight">
                  {MAIN_TRACK[0].role}
                </h3>
                <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg text-slate-600 font-normal mt-1.5 flex-wrap">
                  <span className="font-medium text-slate-800">{MAIN_TRACK[0].company}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-mono text-xs sm:text-sm">
                    {MAIN_TRACK[0].location}
                  </span>
                </div>
              </div>
            </div>

            {/* BRANCH OUT: Video Editor & Graphic Designer (Distinct Parallel Branch Off Main Stepper) */}
            <div className="relative">
              <div
                onClick={() => setActiveJob(PARALLEL_BRANCH)}
                className="relative grid grid-cols-[auto_1fr] sm:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8 md:gap-14 py-4 sm:py-6 px-2 sm:px-6 rounded-2xl hover:bg-slate-900/[0.04] transition-all duration-200 cursor-pointer group"
              >
                {/* Left Column: Empty on desktop (Date moved to right side) */}
                <div className="hidden sm:block" />

                {/* Center Column: Junction on main vertical stepper & Dotted Branch Line to right */}
                <div className="relative flex items-center justify-center w-11 h-11 sm:w-16 sm:h-16 z-20">
                  {/* Small junction node centered on the main stepper spine */}
                  <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-white shadow-xs z-20" />

                  {/* Dotted Branch Line: Starts from the exact middle of the stepper and connects to the branch node */}
                  <div className="absolute left-1/2 top-1/2 w-16 sm:w-28 pointer-events-none z-10 overflow-visible">
                    <svg
                      className="w-full h-8 overflow-visible -translate-y-1/2"
                      viewBox="0 0 100 20"
                      fill="none"
                    >
                      <path
                        d="M 0 10 L 85 10"
                        stroke="#475569"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                      />
                    </svg>
                  </div>
                </div>

                {/* Right Column: Branched Node & Details with Date & Meaningful Label */}
                <div className="flex items-center gap-4 sm:gap-6 pl-2 sm:pl-0">
                  {/* The Branch Node (Offset from spine, sitting directly on the branch track) */}
                  <div className="shrink-0 w-10 h-10 sm:w-13 sm:h-13 rounded-full bg-slate-900 text-white border-2 border-dashed border-slate-400 shadow-md flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:bg-black group-hover:border-slate-200 z-20">
                    <GitBranch size={18} className="text-slate-300 group-hover:text-white" />
                  </div>

                  <div className="text-left flex-1 min-w-0">
                    {/* Date on Right Side & Meaningful Label */}
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="font-mono text-xs sm:text-sm font-light text-slate-700 tracking-tight">
                        {PARALLEL_BRANCH.period}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-800 text-[11px] sm:text-xs font-mono font-medium">
                        <GitBranch size={12} className="text-slate-700" />
                        <span>Creative Endeavour</span>
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-900 tracking-tight group-hover:text-black transition-colors leading-tight">
                      {PARALLEL_BRANCH.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg text-slate-600 font-normal mt-1.5 flex-wrap">
                      <span className="font-medium text-slate-800">{PARALLEL_BRANCH.company}</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-slate-500 font-mono text-xs sm:text-sm">
                        {PARALLEL_BRANCH.location}
                      </span>
                      <span className="text-slate-400 font-mono text-xs">
                        (Freelancing Part-time)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 02: Software Engineering Intern */}
            <div
              onClick={() => setActiveJob(MAIN_TRACK[1])}
              className="relative grid grid-cols-[auto_1fr] sm:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8 md:gap-14 py-4 sm:py-6 px-2 sm:px-6 rounded-2xl hover:bg-slate-900/[0.04] transition-all duration-200 cursor-pointer group"
            >
              {/* Left Column: Time Only (No Badges, No Milestone text) */}
              <div className="hidden sm:block text-right">
                <span className="font-mono text-base sm:text-xl md:text-2xl font-light text-slate-800 tracking-tight block group-hover:text-black transition-colors">
                  {MAIN_TRACK[1].period}
                </span>
              </div>

              {/* Center Stepper Node */}
              <div className="relative flex items-center justify-center z-20">
                <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-slate-950 text-white border-2 border-white shadow-lg flex items-center justify-center font-mono font-bold text-xs sm:text-base transition-all duration-200 group-hover:scale-115 group-hover:bg-black group-hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  {MAIN_TRACK[1].step}
                </div>
              </div>

              {/* Right Column: Thin Font Role Name & Company (No Badges) */}
              <div className="text-left pl-2 sm:pl-0">
                <span className="sm:hidden font-mono text-xs font-light text-slate-500 block mb-1">
                  {MAIN_TRACK[1].period}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-900 tracking-tight group-hover:text-black transition-colors leading-tight">
                  {MAIN_TRACK[1].role}
                </h3>
                <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg text-slate-600 font-normal mt-1.5 flex-wrap">
                  <span className="font-medium text-slate-800">{MAIN_TRACK[1].company}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-mono text-xs sm:text-sm">
                    {MAIN_TRACK[1].location}
                  </span>
                </div>
              </div>
            </div>

            {/* Step 03: Backend Engineer */}
            <div
              onClick={() => setActiveJob(MAIN_TRACK[2])}
              className="relative grid grid-cols-[auto_1fr] sm:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8 md:gap-14 py-4 sm:py-6 px-2 sm:px-6 rounded-2xl hover:bg-slate-900/[0.04] transition-all duration-200 cursor-pointer group"
            >
              {/* Left Column: Time Only (No Badges, No Milestone text) */}
              <div className="hidden sm:block text-right">
                <span className="font-mono text-base sm:text-xl md:text-2xl font-light text-slate-800 tracking-tight block group-hover:text-black transition-colors">
                  {MAIN_TRACK[2].period}
                </span>
              </div>

              {/* Center Stepper Node */}
              <div className="relative flex items-center justify-center z-20">
                <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-slate-950 text-white border-2 border-white shadow-lg flex items-center justify-center font-mono font-bold text-xs sm:text-base transition-all duration-200 group-hover:scale-115 group-hover:bg-black group-hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                  {MAIN_TRACK[2].step}
                </div>
              </div>

              {/* Right Column: Thin Font Role Name & Company (No Badges) */}
              <div className="text-left pl-2 sm:pl-0">
                <span className="sm:hidden font-mono text-xs font-light text-slate-500 block mb-1">
                  {MAIN_TRACK[2].period}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-slate-900 tracking-tight group-hover:text-black transition-colors leading-tight">
                  {MAIN_TRACK[2].role}
                </h3>
                <div className="flex items-center gap-2 text-sm sm:text-base md:text-lg text-slate-600 font-normal mt-1.5 flex-wrap">
                  <span className="font-medium text-slate-800">{MAIN_TRACK[2].company}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-mono text-xs sm:text-sm">
                    {MAIN_TRACK[2].location}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Draggable Terminal Style UI Window (Wider, Shorter, Real Window Ratio) */}
      <AnimatePresence>
        {activeJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-3 sm:p-5 select-none">
            {/* Scrim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveJob(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs pointer-events-auto"
            />

            {/* Draggable Terminal Window Container (Wider: max-w-4xl, Shorter: max-h-[50vh]) */}
            <motion.div
              drag
              dragMomentum={false}
              dragElastic={0.05}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-3xl sm:max-w-4xl bg-[#0c1017] text-slate-200 border border-slate-700/90 rounded-xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden pointer-events-auto z-10 font-mono"
            >
              {/* Terminal Titlebar (Drag Handle) - Traffic Lights Only, No Cross / Drag text on top right */}
              <div className="px-4 py-3 bg-[#161b22] border-b border-slate-800 flex items-center justify-between cursor-grab active:cursor-grabbing select-none">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveJob(null)}
                    className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] hover:brightness-125 transition-all cursor-pointer flex items-center justify-center group/btn"
                    title="Close (Esc)"
                  >
                    <span className="opacity-0 group-hover/btn:opacity-100 text-[9px] text-black font-bold leading-none">
                      ×
                    </span>
                  </button>
                  <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                  <span className="ml-3 text-xs sm:text-sm text-slate-400 font-mono truncate">
                    dheeraj@work: ~/{activeJob.slug}.sh
                  </span>
                </div>

                {/* Empty clean right corner */}
                <div className="w-8" />
              </div>

              {/* Terminal Body: Single Column Sequential Execution, Scrollable */}
              <div className="p-5 sm:p-7 text-xs sm:text-sm font-mono overflow-y-auto max-h-[52vh] space-y-6 [scrollbar-width:thin] [scrollbar-color:#334155_transparent]">
                {/* Command 1: cat role.env */}
                <div className="space-y-2">
                  <div className="text-slate-400 flex items-center gap-1.5 flex-wrap">
                    <span className="text-emerald-400 font-bold">dheeraj@portfolio</span>
                    <span className="text-slate-500">:</span>
                    <span className="text-slate-300 font-bold">~</span>
                    <span className="text-slate-400">$ cat role.env</span>
                  </div>
                  <div className="pl-3 sm:pl-4 space-y-1 text-slate-300 bg-[#090d13]/90 p-3.5 rounded-lg border border-slate-800/80">
                    <p>
                      <span className="text-slate-500">ROLE=</span>
                      <span className="text-white font-medium">&quot;{activeJob.role}&quot;</span>
                    </p>
                    <p>
                      <span className="text-slate-500">ORG=</span>
                      <span className="text-emerald-400 font-medium">&quot;{activeJob.company}&quot;</span>
                    </p>
                    <p>
                      <span className="text-slate-500">LOCATION=</span>
                      <span className="text-slate-400">&quot;{activeJob.location}&quot;</span>
                    </p>
                    <p>
                      <span className="text-slate-500">PERIOD=</span>
                      <span className="text-slate-200">&quot;{activeJob.period}&quot;</span>
                    </p>
                  </div>
                </div>

                {/* Command 2: cat tech_stack.txt */}
                <div className="space-y-2">
                  <div className="text-slate-400 flex items-center gap-1.5 flex-wrap">
                    <span className="text-emerald-400 font-bold">dheeraj@portfolio</span>
                    <span className="text-slate-500">:</span>
                    <span className="text-slate-300 font-bold">~</span>
                    <span className="text-slate-400">$ cat tech_stack.txt</span>
                  </div>
                  <div className="pl-3 sm:pl-4 flex flex-wrap gap-2 pt-1">
                    {activeJob.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-slate-800/90 text-slate-300 text-xs border border-slate-700/80 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Command 3: cat deliverables.log */}
                <div className="space-y-2">
                  <div className="text-slate-400 flex items-center gap-1.5 flex-wrap">
                    <span className="text-emerald-400 font-bold">dheeraj@portfolio</span>
                    <span className="text-slate-500">:</span>
                    <span className="text-slate-300 font-bold">~</span>
                    <span className="text-slate-400">$ cat deliverables.log</span>
                  </div>
                  <ul className="pl-3 sm:pl-4 space-y-2.5 text-slate-300 text-xs sm:text-sm">
                    {activeJob.highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="text-emerald-400 font-bold select-none shrink-0 mt-0.5">
                          [✓]
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Active Prompt with Blinking Cursor */}
                <div className="pt-2 text-slate-400 flex items-center gap-1.5 border-t border-slate-800/70">
                  <span className="text-emerald-400 font-bold">dheeraj@portfolio</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-slate-300">$</span>
                  <span className="w-2 h-4 bg-emerald-400 inline-block animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

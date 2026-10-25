import { motion } from "framer-motion";
import ImageGrid from "./originkit/ui/image-grid";

const TECH_STACK_IMAGES = [
  // Mobile & Core
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg", name: "Flutter" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg", name: "Dart" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg", name: "Kotlin" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg", name: "Android" },
  { src: "/riverpod.png", name: "Riverpod" },

  // Frontend & Web Frameworks
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", name: "React" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", name: "Next.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", name: "TypeScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", name: "JavaScript" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg", name: "Redux" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", name: "Tailwind CSS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", name: "HTML5" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg", name: "CSS3" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg", name: "Vite" },

  // Backend, Databases & Cloud
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", name: "Node.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", name: "Express.js" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", name: "Python" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", name: "Docker" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg", name: "Supabase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", name: "Firebase" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", name: "PostgreSQL" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", name: "MongoDB" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", name: "AWS" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", name: "Linux" },

  // Design, Video & Dev Tools
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", name: "Git" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", name: "GitHub" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", name: "VS Code" },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", name: "Figma" },
  { src: "/davinci-resolve.png", name: "DaVinci Resolve" },
  { src: "/affinity-studio.svg", name: "Affinity Studio" },
];

export default function Skills() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 flex flex-col items-start justify-center relative">
      {/* Animated Tech Stack Heading - Left Aligned with 60% Opacity, Tucked Under Div */}
      <div className="w-full text-left -mb-1 sm:-mb-1.5 md:-mb-2 select-none pt-2 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-tight inline-block origin-bottom-left pt-1"
          style={{
            fontFamily: "'Boldonse', system-ui, sans-serif",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 90%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 90%)",
          }}
        >
          Tech Stack
        </motion.h2>
      </div>

      {/* Mobile-Optimized Lightweight Native Grid (Prevents touch-trapping & WebGL overhead on phones) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full block md:hidden rounded-3xl border border-slate-200/90 bg-white/80 backdrop-blur-xl shadow-lg p-4 sm:p-5 relative z-20"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {TECH_STACK_IMAGES.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 border border-slate-200/70 shadow-2xs transition-all active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center p-1.5 shrink-0 shadow-2xs">
                <img
                  src={tech.src}
                  alt={tech.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-bold text-slate-800 truncate">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Desktop/Tablet: Originkit ImageGrid Interactive Canvas with Tilted White Tooltips */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        className="w-full hidden md:block h-[540px] md:h-[620px] rounded-3xl overflow-hidden border border-slate-200/90 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] relative z-20"
      >
        <ImageGrid
          images={TECH_STACK_IMAGES}
          cell={86}
          cardSize={66}
          magnify={2.9}
          radius={250}
          drain={10}
          assemble={true}
          showTooltip={true}
        />
      </motion.div>
    </div>
  );
}

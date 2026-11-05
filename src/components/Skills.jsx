import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ImageGrid from "./originkit/ui/image-grid";

function TechIcon({ src, name }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current?.naturalWidth !== 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center p-1.5 shrink-0 shadow-2xs relative overflow-hidden">
      {!loaded && <div className="absolute inset-0 bg-slate-100 animate-pulse" />}
      <img
        ref={imgRef}
        src={src}
        alt={name}
        className={`w-full h-full object-contain transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

const TECH_STACK_IMAGES = [
  // Mobile & Core
  { src: "/tech/flutter.svg", name: "Flutter" },
  { src: "/tech/dart.svg", name: "Dart" },
  { src: "/tech/kotlin.svg", name: "Kotlin" },
  { src: "/tech/android.svg", name: "Android" },
  { src: "/riverpod.png", name: "Riverpod" },

  // Frontend & Web Frameworks
  { src: "/tech/react.svg", name: "React" },
  { src: "/tech/nextjs.svg", name: "Next.js" },
  { src: "/tech/typescript.svg", name: "TypeScript" },
  { src: "/tech/javascript.svg", name: "JavaScript" },
  { src: "/tech/redux.svg", name: "Redux" },
  { src: "/tech/tailwindcss.svg", name: "Tailwind CSS" },
  { src: "/tech/html5.svg", name: "HTML5" },
  { src: "/tech/css3.svg", name: "CSS3" },
  { src: "/tech/vite.svg", name: "Vite" },

  // Backend, Databases & Cloud
  { src: "/tech/nodejs.svg", name: "Node.js" },
  { src: "/tech/express.svg", name: "Express.js" },
  { src: "/tech/python.svg", name: "Python" },
  { src: "/tech/docker.svg", name: "Docker" },
  { src: "/tech/supabase.svg", name: "Supabase" },
  { src: "/tech/firebase.svg", name: "Firebase" },
  { src: "/tech/postgresql.svg", name: "PostgreSQL" },
  { src: "/tech/mongodb.svg", name: "MongoDB" },
  { src: "/tech/aws.svg", name: "AWS" },
  { src: "/tech/linux.svg", name: "Linux" },

  // Design, Video & Dev Tools
  { src: "/tech/git.svg", name: "Git" },
  { src: "/tech/github.svg", name: "GitHub" },
  { src: "/tech/vscode.svg", name: "VS Code" },
  { src: "/tech/figma.svg", name: "Figma" },
  { src: "/davinci-resolve.png", name: "DaVinci Resolve" },
  { src: "/affinity-studio.svg", name: "Affinity Studio" },
];

export default function Skills() {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-6 flex flex-col items-start justify-center relative">
      {/* Animated Tech Stack Heading - Left Aligned, reduced opacity on desktop, static on small devices */}
      <div className="w-full text-left -mb-1 sm:-mb-1.5 md:-mb-2 pt-2 relative z-10">
        <motion.h2
          initial={!isDesktop ? false : { opacity: 0, y: 24 }}
          whileInView={!isDesktop ? undefined : { opacity: 0.5, y: 0 }}
          animate={!isDesktop ? { opacity: 0.5, y: 0 } : undefined}
          viewport={!isDesktop ? undefined : { once: true, amount: 0.3 }}
          transition={!isDesktop ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-tight inline-block origin-bottom-left pt-1"
          style={{
            fontFamily: "'Boldonse', system-ui, sans-serif",
          }}
        >
          Tech Stack
        </motion.h2>
      </div>

      {/* Mobile-Optimized Lightweight Native Grid (Directly visible, no animating in on small devices) */}
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="w-full block md:hidden rounded-3xl border border-slate-200/90 bg-white/80 backdrop-blur-xl shadow-lg p-4 sm:p-5 relative z-20"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {TECH_STACK_IMAGES.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-slate-50/90 border border-slate-200/70 shadow-2xs transition-all active:scale-95"
            >
              <TechIcon src={tech.src} name={tech.name} />
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
        {isDesktop && (
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
        )}
      </motion.div>
    </div>
  );
}

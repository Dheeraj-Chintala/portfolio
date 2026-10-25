import { motion } from "framer-motion";
import ChromaGrid from "./ChromaGrid";
import GlowingButton from "./GlowingButton";

const PROJECTS_DATA = [
  {
    image: "/pr1.png",
    title: "Quick 3D",
    subtitle: "2D to 3D STL Converter • React & Python",
    accent: "#0284c7",
    url: "https://quick3d.vercel.app/",
  },
  {
    image: "/pr2.png",
    title: "Flutter Text Utils",
    subtitle: "Open Source Pub Package • Dart Toolkit",
    accent: "#10b981",
    url: "https://pub.dev/packages/flutter_text_utils",
  },
  {
    image: "/pr3.png",
    title: "Savour-AI",
    subtitle: "AI Food Discovery & Reels UI • Flutter",
    accent: "#f97316",
    url: "https://github.com/Dheeraj-Chintala/Savour-AI",
  }
];

export default function Projects() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-12 flex flex-col items-start justify-center relative">
      {/* Featured Projects Heading - Tucked Under Div */}
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
          Featured Projects
        </motion.h2>
      </div>

      {/* React Bits ChromaGrid Interactive Spotlight Grid */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full relative z-20"
      >
        <ChromaGrid items={PROJECTS_DATA} className="w-full" />
      </motion.div>

      {/* GitHub CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full flex justify-center mt-12"
      >
        <GlowingButton
          label="View More on GitHub"
          onClick={() => window.open("https://github.com/Dheeraj-Chintala", "_blank")}
        />
      </motion.div>
    </div>
  );
}

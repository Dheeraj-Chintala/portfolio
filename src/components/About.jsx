import { motion } from "framer-motion";
import { Smartphone, Globe, Video, Palette } from "lucide-react";
import TiltedCard, { TiltedCardLayer } from "./TiltedCard";

const roles = [
  {
    num: "01",
    title: "Android Developer",
    subtitle: "Mobile & AI",
    caption: "Android Developer",
    imageSrc: "/abstract-android.jpg",
    skills: ["Flutter", "Dart", "Supabase"],
    icon: Smartphone,
  },
  {
    num: "02",
    title: "Full Stack Web Developer",
    subtitle: "Web Architecture",
    caption: "Full Stack Web Developer",
    imageSrc: "/abstract-web.jpg",
    skills: ["React", "Node.js", "Vite"],
    icon: Globe,
  },
  {
    num: "03",
    title: "Video Editor",
    subtitle: "Motion & Cinema",
    caption: "Video Editor",
    imageSrc: "/abstract-video.jpg",
    skills: ["DaVinci Resolve", "Motion Graphics"],
    icon: Video,
  },
  {
    num: "04",
    title: "Graphic Designer",
    subtitle: "UI/UX & Identity",
    caption: "Graphic Designer",
    imageSrc: "/abstract-design.jpg",
    skills: ["Affinity", "UI/UX", "Brand"],
    icon: Palette,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function About() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative flex flex-col items-center justify-center py-8">
      {/* "ABOUT ME" watermark behind cards: smooth fade in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 0.5, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -top-4 sm:-top-5 md:-top-6 lg:-top-6 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 w-full flex justify-center pt-2"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 88%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 88%)",
        }}
      >
        <span
          className="text-4xl sm:text-6xl md:text-8xl lg:text-[7.5rem] xl:text-[9.2rem] font-black uppercase tracking-wider sm:tracking-widest text-slate-900 leading-[1.12] py-2 whitespace-nowrap block text-center drop-shadow-sm"
          style={{
            fontFamily: "'Boldonse', system-ui, sans-serif",
          }}
        >
          ABOUT ME
        </span>
      </motion.div>

      {/* Four Cards in a 4-Column Layout (animated on appear scroll, one after another) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10 pt-14 md:pt-20"
      >
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <motion.div
              key={role.title}
              variants={cardVariants}
              className="w-full flex justify-center"
            >
              <TiltedCard
                containerWidth="100%"
                containerHeight="430px"
                imageWidth="100%"
                imageHeight="430px"
                imageSrc={role.imageSrc}
                altText={role.title}
                captionText={role.caption}
                showTooltip={true}
                rotateAmplitude={24}
                scaleOnHover={1.06}
                perspective={600}
                parallax={3.0}
                radius={24}
                glare={0.5}
                shadow={0.4}
                intro={false}
                className="w-full"
              >
                {/* Background Scrim Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/35 to-transparent pointer-events-none rounded-[24px]" />

                {/* Parallax Layer 1: Top Bar (Depth 28) */}
                <TiltedCardLayer
                  depth={28}
                  className="pointer-events-none p-6 flex items-start justify-between z-10"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg">
                    <IconComponent size={20} />
                  </div>
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-sm">
                    {role.num}
                  </span>
                </TiltedCardLayer>

                {/* Parallax Layer 2: Bottom Info & Skills (Depth 52) */}
                <TiltedCardLayer
                  depth={52}
                  className="pointer-events-none p-6 flex flex-col justify-end z-20"
                >
                  <div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-sky-300 font-bold block mb-1">
                      {role.subtitle}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-snug mb-3 drop-shadow-md">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/20">
                      {role.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltedCardLayer>
              </TiltedCard>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

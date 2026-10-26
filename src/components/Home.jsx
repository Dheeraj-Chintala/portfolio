import { useState } from "react";
import { Mouse } from "lucide-react";
import { motion } from "framer-motion";
import CloudSky from "./originkit/ui/cloud-sky";
import TechText from "./TechText";
import BlurText from "./BlurText";

const HERO_ROLES = [
  "Android App Developer",
  "Full Stack Web Developer",
  "Graphic Designer",
  "Video Editor",
];

export default function Home({ isLoaded = true }) {
  const [textLayout, setTextLayout] = useState(null);

  return (
    <div className="relative w-full min-h-screen md:h-screen flex items-center justify-center overflow-hidden">
      {/* Originkit Cloud Sky Background (pure, no overlay layers) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <CloudSky
          background="#0284c7"
          baseColor="#bae6fd"
          accentColor="#ffffff"
          density={65}
          speed={55}
          size={130}
          clouds={{
            softness: 100,
            shadow: 85,
            cirrus: 45,
          }}
          sun={{
            x: 75,
            y: 88,
            glow: "rgba(255, 245, 210, 0.9)",
          }}
          pointer={{
            parallax: 300,
            wind: 95,
            damping: 24,
          }}
        />

        {/* Minimal reduced bottom fade into next section */}
        <div
          className="absolute bottom-0 inset-x-0 h-10 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent, #ffffff)",
          }}
        />
      </div>

      {/* Small devices: Mascot GIF placed on top right corner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -8 }}
        animate={
          isLoaded
            ? {
              opacity: 1,
              scale: 1,
              y: [-4, 4, -4],
            }
            : { opacity: 0, scale: 0.8, y: -8 }
        }
        whileTap={{
          scale: 0.88,
          rotate: [0, -12, 12, -6, 6, 0],
          transition: { duration: 0.35 },
        }}
        transition={{
          y: { repeat: Infinity, duration: 2.8, ease: "easeInOut" },
          opacity: { duration: 0.6 },
          scale: { duration: 0.6 },
        }}
        className="sm:hidden absolute top-4 right-4 z-30 w-14 h-14 pointer-events-auto select-none cursor-pointer drop-shadow-md flex items-center justify-center"
      >
        <img
          src="/bloub-capsule-excite-encre.gif"
          alt="Excited capsule mascot"
          className="w-full h-full object-contain select-none pointer-events-none"
        />
      </motion.div>

      {/* Foreground Hero Content */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center gap-5 text-center px-4 pt-20 pb-16 md:pt-24 md:pb-16 pointer-events-auto">
        {/* React Bits TechText for "Hi, I'm Dheeraj" with Excited Capsule floating aside text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-5xl h-32 sm:h-40 md:h-48 lg:h-56 flex items-center justify-center mt-3 sm:mt-5 overflow-visible"
        >
          {isLoaded && (
            <TechText
              key="tech-text-intro"
              text="Hi, I'm Dheeraj"
              fontSize={120}
              color="#0f172a"
              accentColor="#0284c7"
              fontFamily="'Boldonse', system-ui, sans-serif"
              fontWeight={800}
              align="center"
              draggable={true}
              clickKick={true}
              selection={true}
              labels={true}
              sweep={true}
              speed={1}
              intro="type"
              introDuration={1.8}
              className="w-full h-full"
              onLayout={setTextLayout}
            />
          )}

          {isLoaded && textLayout && (() => {
            const capH = textLayout.capHeight || textLayout.height * 0.78 || 70;
            const capsuleFrameSize = Math.max(50, Math.min(125, Math.round(capH * 1.5)));
            // Position cleanly to the right of text with 16px gap, never overlapping text
            const posX = textLayout.right + 16;

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [-5, 5, -5],
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -10, 10, -6, 6, 0],
                  transition: { duration: 0.45, ease: "easeInOut" },
                }}
                whileTap={{ scale: 0.92 }}
                transition={{
                  y: {
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    delay: 1.5,
                  },
                  opacity: { duration: 0.45, delay: 1.1 },
                  scale: { duration: 0.55, delay: 1.1, ease: [0.34, 1.56, 0.64, 1] },
                }}
                className="hidden sm:flex absolute pointer-events-auto select-none z-20 items-center justify-center cursor-pointer"
                style={{
                  left: `${posX}px`,
                  top: `${textLayout.midY}px`,
                  transform: "translateY(-50%)",
                  width: `${capsuleFrameSize}px`,
                  height: `${capsuleFrameSize}px`,
                }}
              >
                <img
                  src="/bloub-capsule-excite-encre.gif"
                  alt="Excited capsule mascot"
                  className="w-full h-full object-contain drop-shadow-md select-none pointer-events-none"
                />
              </motion.div>
            );
          })()}
        </motion.div>

        {/* Tier 2: React Bits BlurText: Revealed after name is typed */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.35 }}
          className="flex justify-center items-center w-full min-h-[44px]"
        >
          {isLoaded && (
            <BlurText
              texts={HERO_ROLES}
              delay={50}
              animateBy="words"
              direction="left"
              loop={true}
              loopDelay={2}
              className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 justify-center font-mono drop-shadow-sm text-center"
            />
          )}
        </motion.div>

        {/* Tier 3: Subheading value proposition */}
        <div className="max-w-2xl text-center px-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 1.75 }}
            className="myfont text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto text-center leading-relaxed font-semibold transition-colors duration-300"
            style={{
              color: "#1e1b4b",
              textShadow: "none",
            }}
          >
            Crafting next-generation digital experiences with cutting-edge
            technology and innovative design solutions
          </motion.h2>
        </div>

        {/* Tier 4: Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 2.15 }}
          className="flex flex-wrap justify-center gap-5 mt-4"
        >
          <button
            className="cursor-pointer font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            style={{
              background: "#0f172a",
              color: "#ffffff",
              boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.25)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "#1e293b")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "#0f172a")
            }
            onClick={() =>
              (window.location.href = "https://www.github.com/Dheeraj-Chintala")
            }
          >
            View My Work
          </button>
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = "/DheerajResume.pdf";
              link.download = "DheerajResume.pdf";
              link.click();
            }}
            className="cursor-pointer font-bold py-3 px-8 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
            style={{
              border: "1px solid #0f172a",
              color: "#0f172a",
              background: "rgba(255, 255, 255, 0.85)",
            }}
          >
            Download CV
          </button>
        </motion.div>

        {/* Tier 5: Mouse Scroll Indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0, y: 10 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="mt-8 cursor-pointer flex flex-col items-center gap-1 group"
        >
          <Mouse
            size={36}
            className="animate-bounce transition-all duration-300 group-hover:scale-110"
            style={{ color: "#1e1b4b" }}
          />
          <span
            className="text-xs uppercase tracking-widest font-mono opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ color: "#1e1b4b" }}
          >
            Scroll
          </span>
        </motion.a>
      </div>
    </div>
  );
}

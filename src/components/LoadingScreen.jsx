import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CRITICAL_IMAGES = [
  "/bloub-capsule-excite-encre.gif",
  "/abstract-android.jpg",
  "/abstract-web.jpg",
  "/abstract-video.jpg",
  "/abstract-design.jpg",
  "/projects/dailyex.jpg",
  "/projects/pr1.png",
  "/projects/pr2.png",
  "/projects/pr3.png",
  "/projects/bookit.png",
  "/spiderman-poster.jpg",
];

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    let loadedCount = 0;
    const total = CRITICAL_IMAGES.length;
    let targetProgress = 15; // Start with initial aesthetic tick

    // Preload critical above-the-fold & first-interaction assets in parallel
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      const onDone = () => {
        loadedCount++;
        // Target progress based on actual asset arrival (15% to 100%)
        targetProgress = Math.max(targetProgress, Math.round(15 + (loadedCount / total) * 85));
      };
      img.onload = onDone;
      img.onerror = onDone;
      img.src = src;
    });

    // Safety fallback: ensure loading curtain never hangs on sluggish networks
    const forceTimer = setTimeout(() => {
      targetProgress = 100;
    }, 2200);

    let current = 0;
    const interval = setInterval(() => {
      if (current < targetProgress) {
        // Smooth non-linear catchup
        const step = Math.max(1, Math.ceil((targetProgress - current) / 6));
        current = Math.min(100, current + step);
        setProgress(current);
      }

      if (current >= 100) {
        clearInterval(interval);
        clearTimeout(forceTimer);
        // Brief pause at 100% before smooth curtain lift
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = "unset";
        }, 220);
      }
    }, 24);

    return () => {
      clearInterval(interval);
      clearTimeout(forceTimer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (onComplete) onComplete();
      }}
    >
      {!isDone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] bg-[#090d14] text-white flex flex-col items-center justify-center p-6 select-none pointer-events-auto"
        >
          {/* Minimalist Centered Counter */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-baseline">
              <span className="text-6xl sm:text-8xl md:text-9xl font-extralight tracking-tighter tabular-nums font-mono text-white leading-none">
                {progress < 10 ? `0${progress}` : progress}
              </span>
              <span className="text-xl sm:text-2xl font-light font-mono text-slate-500 ml-1.5">
                %
              </span>
            </div>

            {/* Hairline 1px Progress Track */}
            <div className="w-36 sm:w-48 h-[1px] bg-slate-800/90 relative overflow-hidden rounded-full">
              <div
                className="h-full bg-white transition-all duration-75 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

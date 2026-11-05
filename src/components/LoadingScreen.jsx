import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      // Dynamic non-linear progression
      const increment = Math.floor(Math.random() * 6) + 3;
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Brief pause at 100% before smooth curtain lift
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = "unset";
        }, 220);
      }
    }, 24);

    return () => {
      clearInterval(interval);
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

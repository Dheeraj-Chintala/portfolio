import React, { useState, useEffect } from "react";
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
      const increment = Math.floor(Math.random() * 6) + 2;
      current = Math.min(100, current + increment);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Brief pause at 100% before smooth curtain lift
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = "unset";
        }, 280);
      }
    }, 28);

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
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] bg-[#090d14] text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none pointer-events-auto"
        >
          {/* Top Bar: Minimal Brand & Status */}
          <div className="w-full flex items-center justify-between text-xs font-mono tracking-widest text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-slate-300 font-medium">DHEERAJ CHINTALA</span>
            </div>
            <span className="text-slate-500 hidden sm:inline-block">PORTFOLIO // 2026</span>
          </div>

          {/* Center / Counter Area: Large Minimal Monospace Numbers */}
          <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 my-auto">
            {/* Left Context / Micro Status */}
            <div className="space-y-1 font-mono text-xs text-slate-500 uppercase tracking-widest">
              <p className="text-slate-400">
                {progress < 35
                  ? "SYSTEM_INIT"
                  : progress < 70
                    ? "LOADING_COMPONENTS"
                    : progress < 100
                      ? "FINALIZING_INTERFACE"
                      : "READY"}
              </p>
              <p className="text-slate-600">SOFTWARE &amp; CREATIVE</p>
            </div>

            {/* Right: Big Minimalist Numbers */}
            <div className="flex items-baseline">
              <span className="text-7xl sm:text-9xl md:text-[11rem] font-extralight tracking-tighter tabular-nums font-mono text-white leading-none">
                {progress < 10 ? `0${progress}` : progress}
              </span>
              <span className="text-2xl sm:text-4xl font-light font-mono text-slate-500 ml-2">
                %
              </span>
            </div>
          </div>

          {/* Bottom Bar: Hairline 1px Progress Track & Location */}
          <div className="w-full space-y-3">
            <div className="w-full h-[1px] bg-slate-800/90 relative overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 tracking-wider">
              <span>HYDERABAD, INDIA</span>
              <span>[ 17.3850° N, 78.4867° E ]</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smartphone,
  Globe,
  Video,
  Palette,
  X,
  ExternalLink,
  Minus,
  Square,
  Image as ImageIcon,
} from "lucide-react";
import TiltedCard, { TiltedCardLayer } from "./TiltedCard";
import ProgressiveImage from "./common/ProgressiveImage";

/**
 * DYNAMIC ROLE OVERLAY DATA
 * --------------------------------------------------------------------------
 * Flexibly customize windows for each role!
 * The window is entirely covered with the image, with a clean Windows Light UI.
 *
 * Properties for each window:
 *  - id: unique string
 *  - title: filename displayed in Windows titlebar (e.g. "Mobile_App.png")
 *  - image: high-resolution image URL (Unsplash or local /public image)
 *  - headline: minimal caption title
 *  - description: short subtitle / tags
 *  - link: navigable URL
 *  - linkText: label for navigable button
 * --------------------------------------------------------------------------
 */
export const ROLE_WINDOWS_DATA = {
  // 01: Android Developer
  "01": [
    {
      id: "android-win-1",
      title: "Quicko_Ride_Hailing_App.png",
      headline: "Quicko - Ride Hailing Platform",
      description: "Flutter, Supabase, Razorpay, Firebase Cloud Messaging",
      image: "/windows/androidrole/quicko.png",
      link: "https://github.com/Dheeraj-Chintala",
      linkText: "View Project",
    },
    {
      id: "android-win-2",
      title: "DailyExpress_Delivery_App.png",
      headline: "Daily Express - Dairy Delivery Platform",
      description: "Flutter, Supabase, Riverpod, Razorpay",
      image: "/windows/androidrole/dailyexpress.png",
      link: "https://play.google.com/store/apps/details?id=com.dailyexpress.app",
      linkText: "View App",
    },
    {
      id: "android-win-3",
      title: "NestMate_Mobile_App.png",
      headline: "NestMate - Property Management",
      description: "Flutter, Mobile UI, Backend Integration",
      image: "/windows/androidrole/nestmate.png",
      link: "https://github.com/Dheeraj-Chintala",
      linkText: "View Project",
    },
    {
      id: "android-win-4",
      title: "CRM_Mobile_App.png",
      headline: "CRM - Business Management Application",
      description: "Flutter, API Integration, Mobile Development",
      image: "/windows/androidrole/crm.png",
      link: "https://github.com/Dheeraj-Chintala",
      linkText: "View Project",
    },
  ],

  // 02: Full Stack Web Developer
  "02": [
    {
      id: "web-win-1",
      title: "Quick3D_Web_Application.png",
      headline: "Quick 3D - Image to STL Converter",
      description: "React, FastAPI, Python, Three.js, Docker",
      image: "/windows/fullstackrole/quick.png",
      link: "https://quick3d.vercel.app/",
      linkText: "Launch Web App",
    },
    {
      id: "web-win-2",
      title: "Bilwa_Web_Platform.png",
      headline: "Bilwa - Web Application",
      description: "Full Stack Development, React, API Integration",
      image: "/windows/fullstackrole/bilwa.png",
      link: "https://github.com/Dheeraj-Chintala",
      linkText: "View Project",
    },
    {
      id: "web-win-3",
      title: "Navogiz_Web_Platform.png",
      headline: "Navogiz - Web Platform",
      description: "Frontend Development, Backend Integration, Responsive UI",
      image: "/windows/fullstackrole/navogiz.png",
      link: "navogiz.com",
      linkText: "View Site",
    },
  ],

  // 03: Video Editor
  "03": [
    {
      id: "video-win-1",
      title: "E_Tailed_Commercial_Edit.png",
      headline: "E-Tailed India - Entire Commercial Video Page",
      description: "DaVinci Resolve, Commercial Editing, Motion Design",
      image: "/windows/videorole/etailed.png",
      link: "https://www.instagram.com/etailedindia/",
      linkText: "View Work",
    },
    {
      id: "video-win-2",
      title: "Nails_Promotional_Edit.png",
      headline: "Nail Art client Promotional Video",
      description: "DaVinci Resolve, Product Editing, Visual Storytelling",
      image: "/windows/videorole/nails.png",
      link: "https://www.instagram.com/nailashes_kokapet/",
      linkText: "View Work",
    },
    {
      id: "video-win-3",
      title: "Salon_Promotional_Edit.png",
      headline: "Salon client Promotional Video",
      description: "DaVinci Resolve, Commercial Editing, Color Grading",
      image: "/windows/videorole/salon.png",
      link: "https://www.instagram.com/nsalon_kokapet/",
      linkText: "View Work",
    },
  ],

  // 04: Graphic Designer
  "04": [
    {
      id: "design-win-1",
      title: "E_Tailed_Brand_Design.png",
      headline: "E-Tailed India - Brand & Marketing Design",
      description: "Affinity Designer, Branding, Visual Communication",
      image: "/windows/designrole/etailed.png",
      link: "https://drive.google.com/drive/folders/1Zf_zRcW9lvDJwkTINUaoI3br9x7AczoL?usp=sharing",
      linkText: "View Work",
    },
    {
      id: "design-win-2",
      title: "Brochure_Design.png",
      headline: "Brochure & Editorial Design",
      description: "Affinity Designer, Typography, Print Layout",
      image: "/windows/designrole/brochure.png",
      link: "https://drive.google.com/drive/folders/1Zf_zRcW9lvDJwkTINUaoI3br9x7AczoL?usp=sharing",
      linkText: "View Work",
    },
    {
      id: "design-win-3",
      title: "Game_Graphic_Design.png",
      headline: "Game & Digital Artwork",
      description: "Graphic Design, Digital Illustration, Visual Composition",
      image: "/windows/designrole/game.png",
      link: "https://drive.google.com/drive/folders/1Zf_zRcW9lvDJwkTINUaoI3br9x7AczoL?usp=sharing",
      linkText: "View Work",
    },
  ],
};

const roles = [
  {
    num: "01",
    title: "Android Developer",
    subtitle: "Mobile & AI",
    caption: "Click to explore Android projects",
    imageSrc: "/abstract-android.jpg",
    skills: ["Flutter", "Dart", "Supabase"],
    icon: Smartphone,
  },
  {
    num: "02",
    title: "Full Stack Web Developer",
    subtitle: "Web Architecture",
    caption: "Click to explore Web projects",
    imageSrc: "/abstract-web.jpg",
    skills: ["React", "Node.js", "Vite"],
    icon: Globe,
  },
  {
    num: "03",
    title: "Video Editor",
    subtitle: "Motion & Cinema",
    caption: "Click to explore Video works",
    imageSrc: "/abstract-video.jpg",
    skills: ["DaVinci Resolve", "Motion Graphics"],
    icon: Video,
  },
  {
    num: "04",
    title: "Graphic Designer",
    subtitle: "UI/UX & Identity",
    caption: "Click to explore Design works",
    imageSrc: "/abstract-design.jpg",
    skills: ["Affinity", "UI/UX", "Brand"],
    icon: Palette,
  },
];

// Optimized silky-smooth container stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

// Optimized GPU-accelerated card entry (pure opacity & subtle y, no heavy scale redraw)
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

// Wide scattered desktop window coordinates tailored by window count to avoid heavy overlap (>20-25%)
const DESKTOP_POSITIONS_BY_COUNT = {
  1: [{ x: 0, y: 0 }],
  2: [
    { x: -220, y: -25 },
    { x: 220, y: 25 },
  ],
  3: [
    { x: -280, y: -85 }, // Window 1: wide upper-left
    { x: 280, y: -75 },  // Window 2: wide upper-right
    { x: 10, y: 115 },   // Window 3: center-lower bridging both
  ],
  4: [
    { x: -310, y: -115 }, // Window 1: Top-Left quadrant
    { x: 290, y: -105 },  // Window 2: Top-Right quadrant
    { x: -220, y: 125 },  // Window 3: Bottom-Left quadrant
    { x: 230, y: 115 },   // Window 4: Bottom-Right quadrant
  ],
  5: [
    { x: -330, y: -125 }, // Top-Left
    { x: 310, y: -115 },  // Top-Right
    { x: -240, y: 125 },  // Bottom-Left
    { x: 250, y: 120 },   // Bottom-Right
    { x: 10, y: 0 },      // Center
  ],
};

export default function About() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [activeWindows, setActiveWindows] = useState([]);
  const [windowOrder, setWindowOrder] = useState([]);
  const [windowPositions, setWindowPositions] = useState({});
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);

  // Responsive screen detection: disable windows display on small devices (< 768px)
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSelectedRole(null);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Background preloading for window images during idle periods
  useEffect(() => {
    const idleTimer = setTimeout(() => {
      Object.values(ROLE_WINDOWS_DATA).forEach((wins) => {
        wins.forEach((win) => {
          if (win.image) {
            const img = new Image();
            img.src = win.image;
          }
        });
      });
    }, 1800);
    return () => clearTimeout(idleTimer);
  }, []);

  const handleRoleHover = (roleNum) => {
    const wins = ROLE_WINDOWS_DATA[roleNum] || [];
    wins.forEach((w) => {
      if (w.image) {
        const img = new Image();
        img.src = w.image;
      }
    });
  };

  // Initialize windows and calculate wide scattered positions when a role card is clicked
  useEffect(() => {
    if (selectedRole) {
      const wins = ROLE_WINDOWS_DATA[selectedRole.num] || [];
      setActiveWindows(wins);
      setWindowOrder(wins.map((w) => w.id));

      const count = wins.length;
      const posList =
        DESKTOP_POSITIONS_BY_COUNT[count] ||
        DESKTOP_POSITIONS_BY_COUNT[4] ||
        [];

      const posMap = {};
      wins.forEach((w, idx) => {
        posMap[w.id] = posList[idx % posList.length] || { x: 0, y: 0 };
      });
      setWindowPositions(posMap);
    } else {
      setActiveWindows([]);
      setWindowOrder([]);
      setWindowPositions({});
    }
  }, [selectedRole]);

  // Lock background scroll and hide navbar when windows overlay is open
  useEffect(() => {
    if (selectedRole) {
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.classList.add("overlay-active");
      document.body.setAttribute("data-overlay-open", "true");

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        document.body.classList.remove("overlay-active");
        document.body.removeAttribute("data-overlay-open");
      };
    }
  }, [selectedRole]);

  // Keyboard shortcut (Escape) to close overlay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedRole(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Bring clicked window to top
  const bringToFront = (id) => {
    setWindowOrder((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [...filtered, id];
    });
  };

  // Close an individual window
  const closeWindow = (id) => {
    setActiveWindows((prev) => {
      const remaining = prev.filter((w) => w.id !== id);
      if (remaining.length === 0) {
        setSelectedRole(null);
      }
      return remaining;
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative flex flex-col items-center justify-center py-8">
      {/* "ABOUT ME" watermark behind cards: smooth fade in on desktop, static on small devices */}
      <motion.div
        initial={isMobile ? false : { opacity: 0, y: 20 }}
        whileInView={isMobile ? undefined : { opacity: 0.5, y: 0 }}
        animate={isMobile ? { opacity: 0.5, y: 0 } : undefined}
        viewport={isMobile ? undefined : { once: false, amount: 0.15 }}
        transition={isMobile ? { duration: 0 } : { duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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

      {/* Four Cards in a 4-Column Layout */}
      <motion.div
        variants={isMobile ? undefined : containerVariants}
        initial={isMobile ? false : "hidden"}
        whileInView={isMobile ? undefined : "visible"}
        viewport={isMobile ? undefined : { once: true, amount: 0.18 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full relative z-10 pt-14 md:pt-20"
      >
        {roles.map((role) => {
          const IconComponent = role.icon;
          return (
            <motion.div
              key={role.title}
              variants={isMobile ? undefined : cardVariants}
              initial={isMobile ? false : undefined}
              animate={isMobile ? { opacity: 1, y: 0 } : undefined}
              className="w-full flex justify-center"
              onMouseEnter={() => handleRoleHover(role.num)}
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
                rotateAmplitude={18}
                scaleOnHover={1.05}
                perspective={650}
                parallax={2.6}
                radius={24}
                glare={0.3}
                shadow={0.35}
                smoothness={0.7}
                intro={false}
                className="w-full cursor-default md:cursor-pointer"
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth < 768) return;
                  setSelectedRole(role);
                }}
              >
                {/* Background Scrim Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/35 to-transparent pointer-events-none rounded-[24px]" />

                {/* Parallax Layer 1: Top Bar (Depth 35) */}
                <TiltedCardLayer
                  depth={35}
                  className="pointer-events-none p-6 flex items-start justify-between z-10"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-md">
                    <IconComponent size={20} />
                  </div>
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/15 border border-white/25 text-white shadow-sm">
                    {role.num}
                  </span>
                </TiltedCardLayer>

                {/* Parallax Layer 2: Bottom Info & Skills (Depth 68) */}
                <TiltedCardLayer
                  depth={68}
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
                          className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-white shadow-xs"
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

      {/* Windows 11 Light Mode Overlapping Scattered Window Overlays (Desktop Only) */}
      <AnimatePresence>
        {!isMobile && selectedRole && (
          <div
            className="hidden md:flex fixed inset-0 z-[120] items-center justify-center p-3 sm:p-6 overscroll-contain pointer-events-none"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Subtle Scrim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedRole(null)}
              className="absolute inset-0 bg-slate-900/35 backdrop-blur-xs pointer-events-auto cursor-pointer"
            />

            {/* Floating Top Header: Esc and Role Pill Side by Side */}
            <div className="absolute top-4 sm:top-6 inset-x-0 z-[60] flex items-center justify-center gap-2.5 px-4 pointer-events-none">
              <div className="px-4 py-1.5 rounded-full bg-white/95 border border-slate-200/90 shadow-xl backdrop-blur-md text-xs font-mono text-slate-600 pointer-events-auto flex items-center gap-2.5">
                <span className="font-semibold text-slate-900">{selectedRole.title}</span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span className="text-slate-500 hidden sm:inline text-[11px]">
                  Click window to focus • Drag to reposition
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-rose-600 text-slate-700 hover:text-white border border-slate-200/90 shadow-xl text-xs font-mono font-medium transition-all pointer-events-auto cursor-pointer flex items-center gap-1.5 active:scale-95"
                title="Close (Esc)"
              >
                <X size={14} />
                <span>Esc</span>
              </button>
            </div>

            {/* Scattered Overlapping Windows Desktop Workspace (No Tilt, Wide Spread) */}
            <div className="relative w-full max-w-7xl h-[82vh] flex items-center justify-center pointer-events-none">
              {activeWindows.map((win, index) => {
                const zIndex = windowOrder.indexOf(win.id) + 10;
                const isTop = windowOrder[windowOrder.length - 1] === win.id;

                // Position dynamically assigned per window ID to scatter evenly across quadrants
                const basePos = windowPositions[win.id] || { x: 0, y: 0 };
                const spreadScale = typeof window !== "undefined"
                  ? Math.min(1, Math.max(0.72, (window.innerWidth - 80) / 1340))
                  : 1;

                const pos = {
                  x: Math.round(basePos.x * spreadScale),
                  y: Math.round(basePos.y * spreadScale),
                };

                return (
                  <motion.div
                    key={win.id}
                    drag
                    dragMomentum={false}
                    dragElastic={0.06}
                    initial={{
                      opacity: 0,
                      scale: 0.94,
                      x: pos.x * 1.2,
                      y: pos.y * 1.2 + 25,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: pos.x,
                      y: pos.y,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.94,
                      y: 20,
                    }}
                    transition={{
                      type: "spring",
                      damping: 28,
                      stiffness: 320,
                      delay: index * 0.06,
                    }}
                    style={{
                      zIndex: isTop ? 50 : zIndex,
                    }}
                    onPointerDown={() => bringToFront(win.id)}
                    className={`absolute w-[88vw] sm:w-[440px] md:w-[475px] lg:w-[510px] rounded-xl bg-white border ${
                      isTop
                        ? "border-slate-300 shadow-[0_25px_70px_rgba(0,0,0,0.18),0_4px_16px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.04)]"
                        : "border-slate-200 shadow-[0_12px_36px_rgba(0,0,0,0.11),0_0_0_1px_rgba(0,0,0,0.03)] opacity-[0.98]"
                    } overflow-hidden pointer-events-auto transition-shadow duration-200 group`}
                  >
                    {/* Windows 11 Light Titlebar with Highlighted Color Controls */}
                    <div className="h-10 px-3.5 bg-[#f4f4f5] border-b border-slate-200/90 flex items-center justify-between select-none cursor-grab active:cursor-grabbing">
                      <div className="flex items-center gap-2 min-w-0 pr-2">
                        <ImageIcon size={14} className="text-slate-800 shrink-0" />
                        <span className={`text-xs font-semibold tracking-tight truncate ${isTop ? "text-slate-900" : "text-slate-600"}`}>
                          {win.title}
                        </span>
                      </div>

                      {/* Normal Windows Caption Buttons: standard hover (no color change), "-" and "X" both close */}
                      <div className="flex items-center h-full -mr-3.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeWindow(win.id);
                          }}
                          className="w-11 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-black/[0.06] active:bg-black/[0.04] transition-colors cursor-pointer"
                          title="Minimize"
                        >
                          <Minus size={13} strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          className="w-11 h-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-black/[0.06] active:bg-black/[0.04] transition-colors"
                          title="Maximize"
                        >
                          <Square size={11} strokeWidth={2} />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeWindow(win.id);
                          }}
                          className="w-12 h-full flex items-center justify-center bg-[#e81123] text-white hover:bg-[#c42b1c] active:bg-[#a81a13] transition-colors cursor-pointer"
                          title="Close"
                        >
                          <X size={14} strokeWidth={2.2} />
                        </button>
                      </div>
                    </div>

                    {/* Window Body: High-Res Image with Progressive Shimmer & Smooth Fade */}
                    <div className="relative w-full h-[260px] sm:h-[300px] md:h-[330px] lg:h-[350px] bg-slate-100 overflow-hidden">
                      <ProgressiveImage
                        src={win.image}
                        alt={win.headline}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                        loading="eager"
                      />

                      {/* Windows 11 Light Acrylic Bottom Bar: Headline, Description & Navigable Link */}
                      <div className="absolute inset-x-0 bottom-0 py-3 px-3.5 sm:px-4 bg-white/95 backdrop-blur-md border-t border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2.5 pointer-events-auto">
                        <div className="min-w-0 pr-2">
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight truncate">
                            {win.headline}
                          </h4>
                          <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">
                            {win.description}
                          </p>
                        </div>

                        {win.link && (
                          <a
                            href={win.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-semibold shadow-xs transition-all active:scale-95 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>{win.linkText || "Visit"}</span>
                            <ExternalLink size={12} className="text-slate-300" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

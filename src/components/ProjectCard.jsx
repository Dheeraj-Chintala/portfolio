import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

export default function ProjectCard({
  imageSrc,
  title,
  description,
  pills = [],
  buttons = [],
}) {
  const { isDark } = useTheme();

  const pillStyle = {
    background: "var(--gradient-pill)",
    color: "var(--color-pill-text)",
    border: "1px solid var(--color-border-pill-light)",
    fontWeight: "var(--pill-font-weight)",
  };

  const primaryBtnStyle = {
    background: "var(--color-btn-primary-bg)",
    color: "var(--color-primary-btn-text)",
    boxShadow: isDark ? "none" : "var(--color-shadow-cta-sm)",
  };

  const secondaryBtnStyle = isDark
    ? { border: "var(--border-secondary-btn)", color: "var(--color-accent-cyan)" }
    : {
        border: "var(--border-secondary-btn)",
        color: "var(--color-accent-indigo)",
        background: "var(--color-btn-secondary-bg-2)",
      };

  const cardStyle = {
    background: "var(--glass-project-card-bg)",
    border: "1px solid var(--color-border-card-visible)",
  };

  return (
    <motion.div
      className="project-card relative flex flex-col backdrop-blur-xl p-6 rounded-2xl md:w-96 h-[34rem]"
      style={cardStyle}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      whileHover={{ y: -12, transition: { duration: 0.2 } }}
    >
      {/* Image */}
      <div className="relative mb-6 rounded-xl overflow-hidden h-40">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover object-top rounded-xl transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Title & Description */}
      <h3
        className="orbitron text-xl font-bold mb-3 transition-colors duration-300"
        style={{ color: "var(--color-text-heading)" }}
      >
        {title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-4 line-clamp-4 transition-colors duration-300"
        style={{ color: "var(--color-text-body)" }}
      >
        {description}
      </p>

      {/* Pills */}
      {pills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {pills.map((pill, index) => (
            <span key={index} className="px-3 py-1 rounded-full text-xs font-medium shadow-sm" style={pillStyle}>
              {pill}
            </span>
          ))}
        </div>
      )}

      {/* Buttons */}
      {buttons.length > 0 && (
        <div className="flex gap-4 mt-auto">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              className="whitespace-nowrap px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
              style={btn.type === "primary" ? primaryBtnStyle : secondaryBtnStyle}
              onMouseEnter={(e) => {
                if (btn.type === "primary") {
                  e.currentTarget.style.background = "var(--color-btn-primary-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (btn.type === "primary") {
                  e.currentTarget.style.background = "var(--color-btn-primary-bg)";
                }
              }}
            >
              {btn.icon && btn.icon}
              {btn.label}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

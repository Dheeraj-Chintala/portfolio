import React from "react";
import { motion } from "framer-motion";

const SkillCard = ({ icon, label }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
      className="flex flex-col items-center gap-2 p-3 rounded-xl w-full md:w-auto min-w-[120px] md:min-w-[150px]"
      style={{
        border: "1px solid var(--color-border-glass)",
        backdropFilter: "blur(8px)",
        background: "var(--color-bg-skill)",
        boxShadow: "var(--color-shadow-card-sm)",
      }}
    >
      <div className="text-4xl md:text-5xl">{icon}</div>
      <span
        className="text-sm md:text-base font-semibold transition-colors duration-300"
        style={{ color: "var(--color-text-skill-label)" }}
      >
        {label}
      </span>
    </motion.div>
  );
};

export default SkillCard;

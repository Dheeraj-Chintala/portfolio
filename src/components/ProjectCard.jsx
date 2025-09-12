import React from "react";
import { motion } from "framer-motion";

// Animation variant
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function ProjectCard({ 
  imageSrc, 
  title, 
  description, 
  pills = [], 
  buttons = [] 
}) {
  return (
    <motion.div
      className="
        project-card relative flex flex-col
        bg-gradient-to-b from-white-600/30 to-blue-600/20
        border  border-blue-300 backdrop-blur-xl p-6 rounded-2xl shadow-lg
        transition-transform duration-300  hover:shadow-cyan-400/40
         md:w-96 h-[34rem]  
        
      "
       initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
    >
      {/* Image */}
      <div className="relative mb-6 rounded-xl overflow-hidden h-40">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover object-top rounded-xl transform transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Title & Description */}
      <h3 className="orbitron text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
        {description}
      </p>

      {/* Pills */}
      {pills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {pills.map((pill, index) => (
            <span
              key={index}
              className="
                bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                text-cyan-300 border border-cyan-400/40
                px-3 py-1 rounded-full text-xs font-medium
                shadow-sm
              "
            >
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
              className={`
              whitespace-nowrap px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 h-15
                transition-all duration-300 shadow-md cursor-pointer  
                ${
                  btn.type === "primary"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-cyan-400/50"
                    : "border border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10"
                }
              `}
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

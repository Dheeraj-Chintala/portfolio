import React from "react";
import { motion } from "framer-motion";

const SkillCard = ({ icon, label }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className="flex flex-col items-center gap-2 p-3 rounded-xl shadow-md backdrop-blur border border-blue-200 
                 w-full md:w-auto min-w-[120px] md:min-w-[150px]"
    >
      <div className="text-4xl md:text-5xl">{icon}</div>
      <span className="text-sm md:text-base font-semibold text-gray-500">{label}</span>
    </motion.div>
  );
};

export default SkillCard;

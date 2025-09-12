import React from "react";
import { FaGithub} from "react-icons/fa";

const GlowingButton = ({ label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`relative  px-6 py-3 font-semibold rounded-lg text-white 
                 bg-gradient-to-r from-blue-500 to-blue-400 shadow-lg
                 transition-all duration-300 cursor-pointer hover:shadow-red-400/50
                  
                 after:from-blue-400 after:to-cyan-500 after:opacity-50 
                
                 ${className}`}
    >
 {label}
    </button>
  );
};

export default GlowingButton;

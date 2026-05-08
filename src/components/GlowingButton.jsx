import React from "react";
import { FaGithub} from "react-icons/fa";

const GlowingButton = ({ label, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-8 py-3 font-bold rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${className}`}
      style={{
        background: "var(--color-btn-primary-bg)",
        color: "var(--color-primary-btn-text)",
        boxShadow: "var(--color-shadow-cta-sm)",
      }}
    >
      {label}
    </button>
  );
};

export default GlowingButton;

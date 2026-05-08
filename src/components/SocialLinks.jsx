import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  const links = [
    { href: "https://github.com/Dheeraj-Chintala", icon: <FaGithub size={32} /> },
    { href: "https://www.linkedin.com/in/dheeraj-kumar-a34066250/", icon: <FaLinkedin size={32} /> },
    { href: "https://www.instagram.com/dheeraj_chinthala/", icon: <FaInstagram size={32} /> },
    { href: "https://leetcode.com/u/dheeraj1-/", icon: <SiLeetcode size={32} /> },
    { href: "mailto:dheerajch153@gmail.com", icon: <MdEmail size={32} /> },
  ];

  return (
    <footer
      className="w-full py-6 flex flex-col items-center space-y-4 transition-colors duration-300"
      style={{
        background: "var(--color-bg-footer)",
        borderTop: "var(--footer-border-top)",
        boxShadow: "var(--color-shadow-footer)",
        color: "var(--color-text-secondary)",
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-6">
        {links.map(({ href, icon }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-110 hover:[color:var(--color-icon-hover)]"
            style={{ color: "var(--color-text-social-icon)" }}
          >
            {icon}
          </a>
        ))}
      </div>

      <p className="text-sm" style={{ color: "var(--color-footer-line1)" }}>
        © 2025 Dheeraj Kumar. All rights reserved.
      </p>
      <p className="text-xs" style={{ color: "var(--color-footer-line2)" }}>
        Made with ❤️ using React &amp; Tailwind
      </p>
    </footer>
  );
}

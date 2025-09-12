import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  const links = [
    {
      href: "https://github.com/Dheeraj-Chintala",
      icon: <FaGithub size={32} />,
      color: "hover:text-cyan-400 text-gray-300",
    },
    {
      href: "https://www.linkedin.com/in/dheeraj-kumar-a34066250/",
      icon: <FaLinkedin size={32} />,
      color: "hover:text-blue-400 text-gray-300",
    },
    {
      href: "https://www.instagram.com/dheeraj_chinthala/",
      icon: <FaInstagram size={32} />,
      color: "hover:text-pink-500 text-gray-300",
    },
    {
      href: "https://leetcode.com/u/dheeraj1-/",
      icon: <SiLeetcode size={32} />,
      color: "hover:text-yellow-400 text-gray-300",
    },
    {
      href: "mailto:dheerajch153@gmail.com",
      icon: <MdEmail size={32} />,
      color: "hover:text-green-400 text-gray-300",
    },
  ];

  return (
    <footer className="w-full  bg-gray-900 text-gray-400 py-6 flex flex-col items-center space-y-4 mt-10">
      {/* Social Links */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {links.map(({ href, icon, color }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors duration-300 ${color}`}
          >
            {icon}
          </a>
        ))}
      </div>

      {/* Footer Text */}
      <p className="text-sm text-gray-500">
        © 2025 Dheeraj Kumar. All rights reserved.
      </p>
      <p className="text-xs text-gray-600">
        Made with ❤️ using React & Tailwind
      </p>
    </footer>
  );
}

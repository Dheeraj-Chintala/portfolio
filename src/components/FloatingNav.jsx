import { createElement } from "react";
import { Home, User, Code2, Briefcase, FileText, Mail } from "lucide-react";

const desktopLinks = [
  { href: "#home", Icon: Home, label: "Home" },
  { href: "#about", Icon: User, label: "About" },
  { href: "#skills", Icon: Code2, label: "Skills" },
  { href: "#experience", Icon: Briefcase, label: "Experience" },
  { href: "#projects", Icon: FileText, label: "Projects" },
  { href: "#contact", Icon: Mail, label: "Contact" },
];

const mobileLinks = [
  { href: "#home", Icon: Home },
  { href: "#about", Icon: User },
  { href: "#skills", Icon: Code2 },
  { href: "#experience", Icon: Briefcase },
  { href: "#projects", Icon: FileText },
  { href: "#contact", Icon: Mail },
];

export default function FloatingNav() {
  const glassStyle = {
    background: "rgba(255, 255, 255, 0.45)",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    boxShadow:
      "0 20px 40px rgba(15, 23, 42, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.95), inset 0 -1px 2px rgba(15, 23, 42, 0.04)",
  };

  return (
    <>
      {/* Desktop Glass Navbar */}
      <nav
        className="hidden md:flex fixed top-4 right-6 md:right-8 z-50
                    justify-between items-center
                    backdrop-blur-2xl rounded-full px-3 py-2 gap-2 transition-all duration-300"
        style={glassStyle}
      >
        {desktopLinks.map(({ href, Icon, label }) => (
          <a
            key={href}
            href={href}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-slate-700 transition-all duration-200 hover:bg-white/70 hover:text-slate-950 hover:shadow-sm"
          >
            {createElement(Icon, {
              size: 17,
              className: "transition-transform duration-200 group-hover:scale-115 text-slate-600 group-hover:text-sky-600",
            })}
            <span className="text-xs font-semibold tracking-wide">{label}</span>
          </a>
        ))}
      </nav>

      {/* Mobile Glass Navbar */}
      <nav
        className="flex md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000]
                    justify-between items-center max-w-[92vw]
                    backdrop-blur-2xl rounded-full px-4 py-2 gap-3 sm:px-5 sm:py-2.5 sm:gap-5 transition-all duration-300 shadow-xl"
        style={glassStyle}
      >
        {mobileLinks.map(({ href, Icon }) => (
          <a
            key={href}
            href={href}
            className="p-2 rounded-full text-slate-700 transition-all duration-200 hover:bg-white/70 active:scale-95"
          >
            {createElement(Icon, {
              size: 20,
              className: "transition-transform duration-150 hover:scale-115 text-slate-700",
            })}
          </a>
        ))}
      </nav>
    </>
  );
}

import { createElement } from "react";
import { Home, User, Briefcase, FileText, Mail } from "lucide-react";

const desktopLinks = [
  { href: "#home", Icon: Home, label: "Home" },
  { href: "#about", Icon: User, label: "About" },
  { href: "#skills", Icon: Briefcase, label: "Skills" },
  { href: "#projects", Icon: FileText, label: "Projects" },
  { href: "#contact", Icon: Mail, label: "Contact" },
];

const mobileLinks = [
  { href: "#home", Icon: Home },
  { href: "#about", Icon: User },
  { href: "#skills", Icon: Briefcase },
  { href: "#projects", Icon: FileText },
  { href: "#contact", Icon: Mail },
];

export default function FloatingNav() {
  const navStyle = {
    border: "1px solid var(--color-border-glass-nav)",
    background: "var(--color-bg-surface-solid)",
    boxShadow: "var(--color-shadow-nav)",
  };

  const linkClass = "flex items-center gap-2 transition-colors duration-200 hover:opacity-80";

  return (
    <>
      <div
        className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50
                    justify-between items-center
                    backdrop-blur-xl rounded-full px-6 py-3 gap-6 transition-all duration-300"
        style={navStyle}
      >
        {desktopLinks.map(({ href, Icon, label }) => (
          <a key={href} href={href} className={linkClass} style={{ color: "var(--color-text-secondary)" }}>
            {createElement(Icon, {
              size: 20,
              className: "transition-transform duration-150 hover:scale-125",
            })}
            <span style={{ color: "var(--color-text-heading)" }}>{label}</span>
          </a>
        ))}
      </div>

      <div
        className="flex md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-[1000]
                    justify-between items-center
                    backdrop-blur-md rounded-full px-6 py-3 gap-6 transition-all duration-300"
        style={navStyle}
      >
        {mobileLinks.map(({ href, Icon }) => (
          <a key={href} href={href} style={{ color: "var(--color-text-secondary)" }}>
            {createElement(Icon, {
              size: 24,
              className: "transition-transform duration-150 hover:scale-125",
            })}
          </a>
        ))}
      </div>
    </>
  );
}

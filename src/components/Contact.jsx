import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Copy, Check, Send, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const emailAddress = "dheerajch153@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setStatus({ state: "idle", message: "" });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "290e1d49-25cd-4f39-abf9-2c5a7dd67651",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: `${formData.name} via Portfolio`,
          subject: `Portfolio Contact from ${formData.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus({
          state: "success",
          message: "Thank you! Your message has been sent successfully. I'll get back to you shortly.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          state: "error",
          message: result.message || "Failed to send message. Please try again.",
        });
      }
    } catch {
      setStatus({
        state: "error",
        message: "Failed to send message. Please check your connection or email directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socials = [
    {
      name: "GitHub",
      href: "https://github.com/Dheeraj-Chintala",
      icon: FaGithub,
      handle: "@Dheeraj-Chintala",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/dheeraj-kumar-a34066250/",
      icon: FaLinkedin,
      handle: "Dheeraj Kumar",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/dheeraj_chinthala/",
      icon: FaInstagram,
      handle: "@dheeraj_chinthala",
    },
    {
      name: "LeetCode",
      href: "https://leetcode.com/u/dheeraj1-/",
      icon: SiLeetcode,
      handle: "dheeraj1-",
    },
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-16 pb-24 sm:pb-16 flex flex-col items-start justify-center relative">
      {/* Contact Section Heading - Tucked Under Div */}
      <div className="w-full text-left -mb-1 sm:-mb-1.5 md:-mb-2 select-none pt-2 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-tight inline-block origin-bottom-left pt-1"
          style={{
            fontFamily: "'Boldonse', system-ui, sans-serif",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 90%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 90%)",
          }}
        >
          Contact
        </motion.h2>
      </div>

      {/* Ultra-Premium Minimalist Glass Canvas */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.95)] p-4 sm:p-8 md:p-14 relative z-20 overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-start">
          {/* Left Column: Bold statement & Direct email & Socials */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-8">
            <div className="space-y-2.5 sm:space-y-4">
              {/* Live Status Pill */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-slate-900 text-[11px] sm:text-xs font-bold tracking-wide bg-slate-100/90 border border-slate-200/80">
                Available for Projects &amp; Roles
              </div>

              {/* Bold Headline */}
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.18]">
                Let&apos;s build something great.
              </h3>
            </div>

            {/* Hero Interactive Email Pill - Compact Single Row on Mobile */}
            <div className="p-3 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 group">
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <Mail size={18} className="text-slate-900 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Email directly
                  </p>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-xs sm:text-base font-extrabold text-slate-900 hover:text-sky-600 transition-colors truncate block font-mono"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title={copied ? "Copied to clipboard!" : "Copy email address"}
                  className="p-2 sm:p-2.5 rounded-xl bg-white hover:bg-slate-900 hover:text-white text-slate-800 border border-slate-200 shadow-xs transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                >
                  {copied ? (
                    <Check size={14} className="text-emerald-500" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className="p-2 sm:p-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-95 cursor-pointer shadow-xs"
                  title="Compose Email"
                >
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Minimal Social Link Cards */}
            <div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 sm:mb-2.5">
                Elsewhere on the web
              </p>
              {/* Desktop 2x2 Grid */}
              <div className="hidden sm:grid sm:grid-cols-2 gap-2 sm:gap-3">
                {socials.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl bg-white hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200/80 shadow-2xs hover:shadow-md transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className="text-base sm:text-lg shrink-0 text-slate-700 group-hover:text-white transition-colors" />
                      <span className="text-xs font-bold truncate">
                        {name}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={13}
                      className="text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
                    />
                  </a>
                ))}
              </div>

              {/* Mobile Sleek Single-Row Pill Bar */}
              <div className="grid grid-cols-4 gap-2 sm:hidden">
                {socials.map(({ name, href, icon: Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center py-2.5 px-1 rounded-xl bg-slate-50/90 hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200/70 shadow-2xs transition-all active:scale-95 group text-center cursor-pointer"
                  >
                    <Icon className="text-base text-slate-700 group-hover:text-white transition-colors mb-1" />
                    <span className="text-[10px] font-bold tracking-tight truncate w-full px-0.5">
                      {name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Ultra-Clean Minimal Form */}
          <div className="lg:col-span-6 w-full">
            <div className="p-0 sm:p-7 md:p-9 sm:rounded-2xl sm:bg-white sm:border sm:border-slate-200/90 sm:shadow-sm">
              <h4 className="text-base sm:text-xl font-extrabold text-slate-900 mb-3 sm:mb-6 tracking-tight">
                Drop a line
              </h4>

              {status.state === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5"
                >
                  <Check size={18} className="text-emerald-600 shrink-0" />
                  <span>{status.message}</span>
                </motion.div>
              )}

              {status.state === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5"
                >
                  <span className="shrink-0 font-bold">⚠️</span>
                  <span>{status.message}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400 disabled:opacity-60"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400 disabled:opacity-60"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={3}
                    placeholder="How can I help you?"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    disabled={isSubmitting}
                    className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400 resize-none disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98] group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Minimal Footer Signature */}
        <div className="mt-8 pt-5 sm:mt-12 sm:pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-slate-500 gap-1.5 sm:gap-3">
          <p>© 2026 Dheeraj Kumar. All rights reserved.</p>
          <p>Hyderabad, India • IST (UTC+5:30)</p>
        </div>
      </motion.div>
    </div>
  );
}

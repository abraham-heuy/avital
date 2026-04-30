// Navigation.tsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/logo.png";

gsap.registerPlugin(ScrollTrigger);

interface MegaMenuItem {
  title: string;
  description: string;
  link: string;
}

const megaMenuData: Record<string, MegaMenuItem[]> = {
  Services: [
    { title: "1:1 Consultation", description: "Personalized expert guidance", link: "#services" },
    { title: "Code Review", description: "Optimize your code quality", link: "#services" },
    { title: "Architecture Design", description: "Scalable system planning", link: "#services" },
    { title: "Career Coaching", description: "Interview & resume prep", link: "#services" },
  ],
  Projects: [
    { title: "AI & Machine Learning", description: "Intelligent systems", link: "#projects" },
    { title: "Web Development", description: "Full-stack applications", link: "#projects" },
    { title: "Mobile Apps", description: "iOS & Android", link: "#projects" },
    { title: "Blockchain", description: "Web3 solutions", link: "#projects" },
  ],
  Resources: [
    { title: "Blog", description: "Tech insights", link: "/blogs" },
    { title: "Success Stories", description: "Success stories", link: "/success-stories" },
    { title: "Community", description: "Join our network", link: "/community" },
    { title: "Events", description: "Workshops & webinars", link: "/events" },
  ],
  FAQs: [
    { title: "General Questions", description: "Common questions about Avital", link: "/faqs" },
    { title: "Pricing & Packages", description: "Pricing plans and discounts", link: "/faqs" },
    { title: "Technical Support", description: "Tech stack and project help", link: "/faqs" },
    { title: "Consultants", description: "About our consultants", link: "/faqs" },
  ],
};

export const Navigation = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const navItems = ["Services", "Projects", "Resources", "FAQs"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [scrolled]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setTimeout(() => ScrollTrigger.refresh(), 50);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (item: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setActiveMegaMenu(item);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setActiveMegaMenu(null), 200);
    setHoverTimeout(timeout);
  };

  const handleNavigation = (link: string) => {
    setIsMobileMenuOpen(false);
    setActiveMegaMenu(null);
    if (link.startsWith("/")) {
      navigate(link);
    } else if (link.startsWith("#")) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/main");
        setTimeout(() => {
          document.querySelector(link)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans ${
          scrolled
            ? "bg-canvas/90 backdrop-blur-md border-b border-fog-gray"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="cursor-pointer flex-shrink-0"
              onClick={() => navigate("/main")}
            >
              <div className="relative w-24 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-accent-lime/20 blur-2xl" />
                <img
                  src={logo}
                  alt="Avital Logo"
                  className="relative w-full h-full object-contain drop-shadow-soft"
                />
              </div>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <div
                  key={item}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`px-5 py-2 text-ink-soft font-medium rounded-organic transition-all duration-300 hover:bg-fog-lime hover:text-ink ${
                      activeMegaMenu === item ? "bg-fog-lime text-ink" : ""
                    }`}
                  >
                    {item}
                  </button>
                  {activeMegaMenu === item && (
                    <div
                      className="absolute top-full left-0 mt-2 w-[500px] rounded-organic overflow-hidden z-50 shadow-soft"
                      style={{
                        background: "rgba(248,244,236,0.98)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(199,243,107,0.3)",
                      }}
                    >
                      <div className="grid grid-cols-2 gap-0">
                        {megaMenuData[item].map((menuItem) => (
                          <button
                            key={menuItem.title}
                            onClick={() => handleNavigation(menuItem.link)}
                            className="flex flex-col items-start gap-1 p-4 transition-all duration-300 text-left hover:bg-fog-lime group"
                          >
                            <div className="font-display font-semibold text-ink group-hover:text-accent-limeStrong transition-colors">
                              {menuItem.title}
                            </div>
                            <div className="text-sm text-ink-faint group-hover:text-ink-soft">
                              {menuItem.description}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Buttons (new lime style) */}
            <div className="hidden lg:flex items-center gap-4">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate("/login")}
                className="px-6 py-2 rounded-pill border border-accent-lime text-accent-limeStrong font-semibold hover:bg-fog-lime transition-all duration-300"
              >
                Login
              </motion.button>
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => handleNavigation("#contact")}
                className="px-6 py-2 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold shadow-glow hover:scale-105 transition-all duration-300"
              >
                Get Started →
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-ink focus:outline-none relative z-50 w-10 h-10 flex items-center justify-center rounded-full hover:bg-fog-gray transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-ink transform transition-all duration-300 origin-left ${isMobileMenuOpen ? "rotate-45 translate-x-0.5" : ""}`} />
                <span className={`w-full h-0.5 bg-ink transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`w-full h-0.5 bg-ink transform transition-all duration-300 origin-left ${isMobileMenuOpen ? "-rotate-45 translate-x-0.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (themed) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{
            background: "rgba(248,244,236,0.98)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex flex-col h-full pt-24 px-6 pb-8 overflow-y-auto">
            {navItems.map((item, idx) => (
              <div
                key={item}
                className="border-b border-fog-gray pb-4 opacity-0 translate-y-4 animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: "forwards" }}
              >
                <div className="text-lg font-display font-bold text-accent-limeStrong mb-3">
                  {item}
                </div>
                <div className="grid gap-2">
                  {megaMenuData[item].map((menuItem, menuIdx) => (
                    <button
                      key={menuItem.title}
                      onClick={() => handleNavigation(menuItem.link)}
                      className="flex flex-col items-start gap-1 p-3 rounded-organic transition-all duration-300 text-left w-full hover:bg-fog-lime opacity-0 translate-y-4 animate-fadeInUp"
                      style={{ animationDelay: `${idx * 0.05 + menuIdx * 0.03}s`, animationFillMode: "forwards" }}
                    >
                      <div className="font-medium text-ink text-sm">{menuItem.title}</div>
                      <div className="text-xs text-ink-faint">{menuItem.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={() => navigate("/login")}
              className="w-full mt-6 px-6 py-3 rounded-pill border border-accent-lime text-accent-limeStrong font-semibold hover:bg-fog-lime transition-all duration-300 opacity-0 translate-y-4 animate-fadeInUp"
              style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
            >
              Login
            </button>
            <button
              onClick={() => handleNavigation("#contact")}
              className="w-full mt-3 px-6 py-3 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold shadow-glow transition-all duration-300 opacity-0 translate-y-4 animate-fadeInUp"
              style={{ animationDelay: "0.45s", animationFillMode: "forwards" }}
            >
              Get Started →
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};
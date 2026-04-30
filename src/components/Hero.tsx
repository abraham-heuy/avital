// Hero.tsx – cards now transparent (no white background)
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; // removed Navigation
import "swiper/css";
import "swiper/css/pagination";

const descriptions = [
  {
    title: "Expert Consultation",
    tag: "On‑demand",
    content:
      "Connect 1:1 with a student consultant who has already shipped real products, aced technical interviews, and navigated the same academic and technical challenges you face right now. Get instant clarity on your blockers, whether it's a tricky bug, a confusing concept, or a career decision. Sessions include live screen sharing, code walkthroughs, and a written summary with actionable next steps.",
  },
  {
    title: "Final Year Project Guidance",
    tag: "Most popular",
    content:
      "End‑to‑end mentorship for your capstone or final year project. We help you choose a feasible topic, define clear requirements, design a robust architecture, implement key features, write documentation, and prepare for your defense presentation. Weekly milestone check‑ins ensure you stay on track, and our consultants share real‑world best practices that impress professors.",
  },
  {
    title: "Project Architecture Review",
    tag: "Deep dive",
    content:
      "Before you write a single line of production code, let our experts review your system design, database schema, API contracts, and folder structure. We provide a written report with actionable recommendations to avoid costly rewrites, improve scalability, and ensure your project is built on a solid foundation.",
  },
  {
    title: "Code Optimization & Debugging",
    tag: "Quick turnaround",
    content:
      "Stuck on a cryptic bug? Slow queries ruining your performance? Send us your code or share your screen, and we'll diagnose the root cause, fix it properly, and explain why it happened. We also perform code quality audits, refactor messy logic, and teach you debugging techniques you'll use for life.",
  },
  {
    title: "Career & Interview Preparation",
    tag: "Career track",
    content:
      "From resume teardowns and LinkedIn makeovers to live mock interviews (technical + behavioural) with real‑time feedback, we prepare you for internship and graduate roles. Get company‑specific prep, portfolio reviews, salary negotiation strategies, and insider advice from people who recently landed offers at top tech companies.",
  },
  {
    title: "Group Workshops & Study Sessions",
    tag: "Collaborative",
    content:
      "Learn hard topics together in small cohorts (max 8 students). Our workshops cover algorithms, system design, full‑stack frameworks, exam prep, and more. Each session is led by a consultant, recorded for later review, and includes shared notes, resource packs, and a Q&A forum. Custom sessions available on request for your class or student group.",
  },
];

export const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToProjects = () =>
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative overflow-hidden pt-20 sm:pt-20 lg:pt-20">
      {/* Artistic decorations – unchanged */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, #A6A6A6 0.8px, transparent 0.8px)`,
            backgroundSize: "22px 22px",
          }}
        />
        {/* top-left wavy line */}
        <motion.svg
          className="absolute left-[-5%] top-[5%] w-48 sm:w-64 opacity-30"
          viewBox="0 0 200 100"
          animate={{ x: [0, 6, 0], y: [0, 3, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M12,48 C48,12 68,18 96,46 C124,74 148,70 176,44"
            fill="none"
            stroke="#C7F36B"
            strokeWidth="1.2"
            strokeDasharray="4 8 2 6"
            strokeLinecap="round"
          />
        </motion.svg>
        {/* right-side scribble */}
        <motion.svg
          className="absolute right-[-5%] top-[15%] w-40 sm:w-56 opacity-25"
          viewBox="0 0 180 140"
          animate={{ x: [0, -5, 0], y: [0, 4, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M22,70 C38,32 62,22 88,44 C114,66 134,58 156,38"
            fill="none"
            stroke="#FFD699"
            strokeWidth="1.1"
            strokeDasharray="3 7 2 8"
            strokeLinecap="round"
          />
          <path
            d="M28,98 C54,78 78,86 104,102 C130,118 150,112 168,94"
            fill="none"
            stroke="#C7F36B"
            strokeWidth="1.15"
            strokeDasharray="4 6 1 7"
            strokeLinecap="round"
            opacity="0.7"
          />
        </motion.svg>
        {/* small ring bottom-left */}
        <motion.svg
          className="absolute left-[2%] bottom-[15%] w-20 sm:w-28 opacity-30"
          viewBox="0 0 100 100"
          animate={{ rotate: [-5, 0, -5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse
            cx="50"
            cy="50"
            rx="34"
            ry="28"
            fill="none"
            stroke="#B8B8B8"
            strokeWidth="1.2"
            strokeDasharray="3 7"
          />
          <path
            d="M28,52 C40,36 62,34 78,48"
            fill="none"
            stroke="#C7F36B"
            strokeWidth="1.0"
            strokeDasharray="2 6"
            opacity="0.7"
          />
        </motion.svg>
        {/* tiny square bottom-right */}
        <motion.svg
          className="absolute right-[5%] bottom-[20%] w-16 sm:w-24 opacity-25"
          viewBox="0 0 90 90"
          animate={{ rotate: [8, 12, 8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect
            x="18"
            y="18"
            width="54"
            height="54"
            rx="8"
            fill="none"
            stroke="#D8D0C4"
            strokeWidth="1.15"
            strokeDasharray="4 8"
          />
          <path
            d="M32,45 L58,45"
            stroke="#FFD699"
            strokeWidth="1.0"
            strokeDasharray="2 5"
            opacity="0.8"
          />
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* LEFT COLUMN – unchanged */}
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-sketch font-bold leading-tight"
            >
              <span className="text-ink">Your Final Year Project,</span>
              <br />
              <span className="bg-gradient-to-r from-accent-lime to-accent-limeStrong bg-clip-text text-transparent">
                DONE
              </span>{" "}
              <span className="text-ink-soft">Right.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-5 space-y-3 text-ink-soft max-w-xl"
            >
              <p className="text-base sm:text-lg leading-relaxed font-sketch">
                <span className="font-bold text-accent-limeStrong">DESIGNED</span> •{" "}
                <span className="font-bold text-accent-limeStrong">BUILT</span> •{" "}
                <span className="font-bold text-accent-limeStrong">EXPERIENCED</span>
                <br />
                by developers who help <span className="font-bold text-accent-limeStrong">YOU</span> present
                confidently and <span className="font-bold text-accent-limeStrong">STAND OUT</span>.
              </p>
              <p className="text-sm sm:text-base font-sketch">
                You are hiring the <span className="font-bold text-accent-limeStrong">BEST</span>. We build with you,
                so you don't just submit – you understand and grow.
              </p>
              <p className="text-sm sm:text-base font-sketch">
                <span className="font-semibold text-accent-limeStrong">CUSTOM</span> solutions.{" "}
                <span className="font-semibold text-accent-limeStrong">CLEAR</span> documentation. On‑time delivery.
                A project <span className="font-semibold text-accent-limeStrong">YOU UNDERSTAND</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              <button
                onClick={scrollToContact}
                className="px-5 py-2.5 rounded-pill bg-gradient-to-r from-accent-lime to-accent-limeStrong text-ink font-bold shadow-glow hover:scale-105 transition-all duration-300 font-sketch text-sm sm:text-base"
              >
                Get Started →
              </button>
              <button
                onClick={scrollToProjects}
                className="px-5 py-2.5 rounded-pill border border-accent-lime text-accent-limeStrong font-semibold hover:bg-fog-lime transition-all duration-300 font-sketch text-sm sm:text-base"
              >
                View Offers →
              </button>
            </motion.div>
          </div>

          {/* RIGHT COLUMN – CARDS with transparent background */}
          <div className="flex-1">
            {isMobile ? (
              // Mobile: horizontal swiper with autoplay – transparent cards, hidden scrollbar
              <div className="h-[190px] w-full">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={16}
                  slidesPerView={1.2}
                  centeredSlides={true}
                  pagination={{ clickable: true, dynamicBullets: true }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={true}
                  className="service-carousel h-full"
                >
                  {descriptions.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="rounded-organic border border-fog-lime p-4 h-full flex flex-col shadow-soft scrollbar-hide">
                        <span className="inline-block px-3 py-1 rounded-full bg-fog-lime text-accent-limeStrong text-xs font-semibold uppercase mb-2 w-fit">
                          {item.tag}
                        </span>
                        <h3 className="text-base font-display font-bold text-ink mb-2">
                          {item.title}
                        </h3>
                        <p className="text-ink-soft text-xs leading-relaxed flex-1 overflow-y-auto scrollbar-hide">
                          {item.content}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              // DESKTOP: vertical Swiper – full content, no arrows, transparent cards
              <div className="relative -mb-8">
                <div className="absolute -inset-1 rounded-blob border-2 border-accent-lime/30 border-dashed pointer-events-none" />
                <div className="absolute -inset-2 rounded-blob border border-fog-gray pointer-events-none" />
                <Swiper
                  modules={[Pagination, Autoplay]}
                  direction="vertical"
                  spaceBetween={16}
                  slidesPerView={2.2}
                  centeredSlides={false}
                  pagination={{ clickable: true, dynamicBullets: false }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  loop={true}
                  className="desktop-vertical-carousel h-[540px]"
                >
                  {descriptions.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="rounded-organic border border-fog-lime p-3 hover:border-accent-lime/50 transition-all duration-300 h-full flex flex-col">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-fog-lime text-accent-limeStrong text-[11px] font-semibold uppercase mb-1.5 w-fit">
                          {item.tag}
                        </span>
                        <h3 className="text-base font-display font-bold text-ink mb-1">
                          {item.title}
                        </h3>
                        <p className="text-ink-soft text-xs leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        /* Hide scrollbar for Chrome/Safari */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Mobile swiper styles – no navigation arrows */
        .service-carousel .swiper-pagination-bullet {
          background: #A6E200;
          opacity: 0.5;
        }
        .service-carousel .swiper-pagination-bullet-active {
          opacity: 1;
          background: #A6E200;
        }
        .service-carousel .swiper-button-prev,
        .service-carousel .swiper-button-next {
          display: none !important;
        }

        /* Desktop vertical carousel – no arrows, hidden scrollbar */
        .desktop-vertical-carousel {
          overflow-y: visible;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .desktop-vertical-carousel::-webkit-scrollbar {
          display: none;
        }
        .desktop-vertical-carousel .swiper-pagination {
          right: 4px;
          left: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .desktop-vertical-carousel .swiper-pagination-bullet {
          background: #A6E200;
          opacity: 0.5;
          margin: 0 !important;
          width: 8px;
          height: 8px;
        }
        .desktop-vertical-carousel .swiper-pagination-bullet-active {
          opacity: 1;
          background: #A6E200;
        }
        .desktop-vertical-carousel .swiper-button-prev,
        .desktop-vertical-carousel .swiper-button-next {
          display: none !important;
        }
      `}</style>
    </section>
  );
};
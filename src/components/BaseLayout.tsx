import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  // Helper to get random position on screen (for static elements)
  const randomPos = (min = 5, max = 90) => `${Math.random() * (max - min) + min}%`

  // Letters of "avital" to scatter (lowercase, hand‑drawn feel)
  const letters = ['a', 'v', 'i', 't', 'a', 'l']

  return (
<div className="relative min-h-screen w-full overflow-hidden bg-canvas">
      {/* ===== BACKGROUND SYSTEM ===== */}
      <div className="absolute inset-0 z-0">
        {/* base gradient (radial, soft) */}
        <div className="absolute inset-0 bg-canvas-gradient opacity-100" />

        {/* left‑to‑right gradient wash — faded lime → peach */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-accent-lime/8 via-transparent to-accent-peach/6 opacity-90"
          style={{ mixBlendMode: 'multiply' }}
        />

        {/* artistic wash (existing) */}
        <div className="absolute inset-0 bg-art-wash opacity-95" />

        {/* texture dots (denser) */}
        <div className="absolute inset-0 bg-dot-pattern bg-dots opacity-[0.08]" />

        {/* stronger dot field (fine grain) */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, #A6A6A6 0.6px, transparent 0.6px)`,
            backgroundSize: '14px 14px',
          }}
        />

        {/* centre glowing anchor (lime) */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-[380px] h-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-lime blur-3xl"
          animate={{ scale: [1, 1.12, 1], opacity: [0.04, 0.10, 0.04] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* secondary glow (peach) */}
        <motion.div
          className="absolute left-[65%] top-[40%] w-[280px] h-[280px] rounded-full bg-accent-peach blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* ===== ART LAYER – geometric shapes, dotted lines, scattered letters ===== */}
      <div className="pointer-events-none absolute inset-0 z-0">

        {/* original dot pattern (muted) */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: `radial-gradient(circle, #B5B5B5 1.2px, transparent 1.2px)`,
            backgroundSize: '28px 28px',
          }}
        />

        {/* secondary dot pattern (grey) */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(circle, #8C8C8C 0.8px, transparent 0.8px)`,
            backgroundSize: '22px 22px',
          }}
        />

        {/* ---- BIG ORGANIC BLOBS ---- */}
        <motion.svg
          className="absolute left-[-12%] top-[-10%] w-[75vw] max-w-[600px] opacity-40"
          viewBox="0 0 700 520"
          animate={{ y: [0, 12, 0], rotate: [-5, -2, -5] }}
          transition={{ duration: 18, repeat: Infinity }}
        >
          <path
            d="M106,165C150,74,261,18,371,44C483,69,599,152,575,248C551,344,402,415,285,401C167,387,60,329,106,165Z"
            fill="#C7F36B"
            fillOpacity="0.10"
          />
        </motion.svg>

        <motion.svg
          className="absolute right-[-8%] bottom-[-5%] w-[65vw] max-w-[500px] opacity-35"
          viewBox="0 0 500 500"
          animate={{ x: [0, -12, 0], y: [0, -8, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        >
          <path
            d="M360,420C280,450 180,460 120,400C60,340 30,240 80,160C130,80 240,30 340,90C440,150 460,280 420,360C390,400 380,410 360,420Z"
            fill="#FFD699"
            fillOpacity="0.08"
          />
        </motion.svg>

        {/* ---- GEOMETRIC SHAPES – DOTTED BORDERS ---- */}

        {/* 1. Dotted rectangle (top‑left area, mobile friendly) */}
        <motion.div
          className="absolute w-12 h-8 sm:w-16 sm:h-10 border border-dotted border-ink-faint rounded-sm opacity-40"
          style={{ left: '8%', top: '18%', transform: 'rotate(8deg)' }}
          animate={{ y: [0, -6, 0], rotate: [8, 13, 8] }}
          transition={{ duration: 9, repeat: Infinity }}
        />

        {/* 2. Dotted square (upper right) */}
        <motion.div
          className="absolute w-16 h-16 sm:w-20 sm:h-20 border-2 border-dotted border-accent-lime rounded-md opacity-35"
          style={{ left: '75%', top: '12%', transform: 'rotate(-5deg)' }}
          animate={{ y: [0, 7, 0], rotate: [-5, 0, -5], opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, delay: 0.5 }}
        />

        {/* 3. Dotted circle (lower left) */}
        <motion.div
          className="absolute w-18 h-18 sm:w-24 sm:h-24 border border-dotted border-accent-peach rounded-full opacity-35"
          style={{ left: '12%', top: '72%' }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1.2 }}
        />

        {/* 4. Dotted rotated ellipse (center‑right) */}
        <motion.div
          className="absolute w-20 h-10 sm:w-28 sm:h-14 border-2 border-dotted border-ink-faint rounded-full opacity-30"
          style={{ left: '60%', top: '35%', transform: 'rotate(-12deg)' }}
          animate={{ x: [0, 8, 0], rotate: [-12, -5, -12] }}
          transition={{ duration: 13, repeat: Infinity, delay: 0.8 }}
        />

        {/* 5. Dotted triangle (bottom right) – SVG for precise shape */}
        <motion.svg
          className="absolute w-16 h-16 sm:w-22 sm:h-22 opacity-45"
          style={{ left: '82%', top: '68%', transform: 'rotate(10deg)' }}
          viewBox="0 0 100 100"
          animate={{ y: [0, -7, 0], rotate: [10, 16, 10] }}
          transition={{ duration: 9, repeat: Infinity, delay: 2 }}
        >
          <polygon
            points="50,10 90,80 10,80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeDasharray="4 6"
            className="text-accent-lime"
          />
        </motion.svg>

        {/* 6. Dotted hexagon (top‑left area) */}
        <motion.svg
          className="absolute w-14 h-14 sm:w-20 sm:h-20 opacity-35"
          style={{ left: '28%', top: '8%', transform: 'rotate(-8deg)' }}
          viewBox="0 0 100 100"
          animate={{ rotate: [-8, -2, -8] }}
          transition={{ duration: 11, repeat: Infinity, delay: 1.5 }}
        >
          <polygon
            points="50,5 90,25 90,75 50,95 10,75 10,25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 6"
            className="text-ink-faint"
          />
        </motion.svg>

        {/* 7. Dotted parallelogram (middle left) */}
        <motion.div
          className="absolute w-12 h-8 sm:w-18 sm:h-12 border border-dotted border-accent-peach rounded opacity-40"
          style={{ left: '18%', top: '45%', transform: 'skewY(6deg) rotate(-3deg)' }}
          animate={{ x: [0, 6, 0], skewY: [6, 10, 6] }}
          transition={{ duration: 12, repeat: Infinity, delay: 0.3 }}
        />

        {/* 8. Dotted double‑line cross (center) */}
        <motion.svg
          className="absolute w-10 h-10 sm:w-14 sm:h-14 opacity-35"
          style={{ left: '44%', top: '25%' }}
          viewBox="0 0 40 40"
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" className="text-ink-faint" />
          <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4" className="text-ink-faint" />
        </motion.svg>

        {/* 9. Dotted diamond (upper center‑right, smaller on mobile) */}
        <motion.div
          className="absolute w-10 h-10 sm:w-14 sm:h-14 border border-dotted border-accent-lime transform rotate-45 opacity-30"
          style={{ left: '55%', top: '22%' }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2.5 }}
        />

        {/* 10. Dotted trapezoid (bottom center) – using clip-path */}
        <motion.div
          className="absolute w-16 h-8 sm:w-24 sm:h-12 border-2 border-dotted border-ink-faint opacity-30"
          style={{
            left: '40%',
            top: '85%',
            transform: 'rotate(5deg)',
            clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0 100%)',
            background: 'transparent'
          }}
          animate={{ x: [0, -6, 0], rotate: [5, 8, 5] }}
          transition={{ duration: 11, repeat: Infinity, delay: 1 }}
        />

        {/* 11. Dotted arc / semicircle (right center) */}
        <motion.svg
          className="absolute w-16 h-10 sm:w-20 sm:h-14 opacity-35"
          style={{ left: '92%', top: '42%' }}
          viewBox="0 0 60 60"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 0.7 }}
        >
          <path
            d="M10,50 A25,25 0 0,1 50,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeDasharray="3 6"
            className="text-accent-peach"
          />
        </motion.svg>

        {/* 12. Dotted cube (isometric, top‑right) */}
        <motion.svg
          className="absolute w-16 h-16 sm:w-24 sm:h-24 opacity-40"
          style={{ left: '68%', top: '5%', transform: 'rotate(15deg)' }}
          viewBox="0 0 100 100"
          animate={{ rotate: [15, 20, 15] }}
          transition={{ duration: 9, repeat: Infinity, delay: 0.6 }}
        >
          <path d="M25 38 L50 26 L75 38 L50 50 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="4 6" className="text-ink-faint" />
          <path d="M25 38 L25 60 L50 72 L50 50" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" className="text-accent-lime" />
          <path d="M75 38 L75 60 L50 72" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 6" className="text-ink-faint" />
        </motion.svg>

        {/* ---- SCATTERED LETTERS (lowercase, cursive, artistic) ---- */}
        {letters.map((letter, i) => {
          const left = randomPos()
          const top = randomPos()
          const rotate = (Math.random() * 10 - 5).toFixed(0) 
                    const sizeClass = i % 2 === 0 ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-2xl'
          return (
            <motion.div
              key={i}
              className="absolute select-none opacity-25"
              style={{
                left,
                top,
                transform: `rotate(${rotate}deg)`,
                fontFamily: '"Comic Sans MS", "Trebuchet MS", cursive',
                color: '#252525',
                fontSize: sizeClass,
              }}
              animate={{ y: [0, -4, 0], opacity: [0.14, 0.28, 0.14] }}
              transition={{ duration: 8 + (i * 2), repeat: Infinity, delay: i * 0.8 }}
            >
              {letter}
            </motion.div>
          )
        })}

        {/* ---- EXTRA RANDOM DOTS (small, lime / peach / grey) ---- */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full"
            style={{
              left: randomPos(),
              top: randomPos(),
              backgroundColor: i % 3 === 0 ? '#C7F36B' : i % 3 === 1 ? '#FFD699' : '#9E9E9E',
              opacity: 0.3,
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        {/* ---- RIBBON WAVES (decorative) ---- */}
        <motion.svg
          className="absolute right-[-10%] top-[6%] w-[65vw] max-w-[480px] opacity-35"
          viewBox="0 0 600 420"
          animate={{ x: [0, 12, 0], rotate: [5, 2, 5] }}
          transition={{ duration: 22, repeat: Infinity }}
        >
          <path
            d="M70,120C132,56,208,36,278,62C346,87,382,158,448,176 M510,210C550,230,580,260,590,300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 9 2 7"
            className="text-ink-faint opacity-70"
          />
        </motion.svg>

        <motion.svg
          className="absolute bottom-[6%] left-[4%] w-[92vw] max-w-[760px] opacity-40"
          viewBox="0 0 700 180"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        >
          <path
            d="M30,100 C100,20 200,160 300,90 C400,20 500,160 650,90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="5 8 2 6"
            className="text-ink-faint opacity-70"
          />
        </motion.svg>

        {/* ---- SKETCHY EXTRA MARKS ---- */}
        <svg className="absolute left-[6%] top-[44%] w-20 sm:w-28 opacity-35 rotate-[-5deg]">
          <path d="M10,30 Q30,5 50,30 T90,30" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 5" className="text-ink-faint" />
        </svg>

        <svg className="absolute right-[18%] top-[60%] w-16 sm:w-22 opacity-30 rotate-[10deg]">
          <circle cx="30" cy="30" r="20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 6" className="text-accent-lime" />
        </svg>

        {/* ---- EXTRA FINE GRAIN (low opacity) ---- */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle, #8C8C8C 0.5px, transparent 0.5px)`,
            backgroundSize: '26px 26px',
          }}
        />
      </div>

      {/* CONTENT */}
      <main className="relative z-10 flex items-center justify-center h-full">
        {children}
      </main>
    </div>
  )
}
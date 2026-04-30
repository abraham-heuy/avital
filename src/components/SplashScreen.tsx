import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main');
    }, 5200);

    return () => clearTimeout(timer);
  }, [navigate]);

  const letters = 'AVITAL'.split('');

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#F8F4EC]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
    >
      {/* BACKGROUND GRADIENTS */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#F8F4EC]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF8] via-[#F8F4EC] to-[#EAF8C5]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.88),rgba(248,244,236,0.96)_36%,rgba(248,244,236,1)_72%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(199,243,107,0.12),transparent_24%),radial-gradient(circle_at_82%_16%,rgba(255,214,153,0.10),transparent_22%),radial-gradient(circle_at_78%_82%,rgba(199,243,107,0.08),transparent_25%),radial-gradient(circle_at_20%_80%,rgba(184,184,184,0.05),transparent_26%)]" />
      </div>

      {/* ART LAYER */}
      <div className="absolute inset-0 pointer-events-none">
        {/* soft dot texture */}
        <div
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage: `radial-gradient(circle, #A6A6A6 0.8px, transparent 0.8px)`,
            backgroundSize: '22px 22px',
          }}
        />

        {/* distributed tiny dots */}
        {[
          { left: '8%', top: '14%' },
          { left: '14%', top: '36%' },
          { left: '22%', top: '78%' },
          { left: '34%', top: '18%' },
          { left: '46%', top: '72%' },
          { left: '58%', top: '16%' },
          { left: '66%', top: '34%' },
          { left: '74%', top: '74%' },
          { left: '86%', top: '22%' },
          { left: '90%', top: '58%' },
        ].map((dot, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#B5B5B5] opacity-35"
            style={dot}
          />
        ))}

        {/* top-left blob */}
        <motion.svg
          className="absolute left-[-10%] top-[-8%] w-[64vw] max-w-[580px] min-w-[240px] opacity-50 sm:opacity-42"
          viewBox="0 0 700 560"
          initial={{ rotate: -8 }}
          animate={{ rotate: [-8, -6, -8], y: [0, 3, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M104,175C142,92,235,34,339,45C445,56,594,132,580,241C566,351,425,419,297,403C168,387,63,282,104,175Z"
            fill="#C7F36B"
            fillOpacity="0.08"
          />
          <path
            d="M146,164C193,109,260,82,342,92C425,102,507,152,514,222C521,292,461,339,378,341C295,343,214,315,166,272C118,229,104,218,146,164Z"
            fill="none"
            stroke="#B8B8B8"
            strokeWidth="1.35"
            strokeDasharray="5 8 2 7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </motion.svg>

        {/* upper-right ribbon */}
        <motion.svg
          className="absolute right-[-10%] top-[5%] w-[56vw] max-w-[480px] min-w-[220px] opacity-50 sm:opacity-42"
          viewBox="0 0 620 420"
          initial={{ rotate: 8 }}
          animate={{ rotate: [8, 6, 8], x: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M62,124C118,58,208,38,285,62C352,83,382,155,448,174C512,191,565,175,578,145"
            fill="none"
            stroke="#B8B8B8"
            strokeWidth="1.5"
            strokeDasharray="4 9 2 7"
            strokeLinecap="round"
          />
          <path
            d="M88,185C156,142,224,140,289,170C357,201,410,247,469,260C523,272,561,255,576,236"
            fill="none"
            stroke="#D8D0C4"
            strokeWidth="1.15"
            strokeDasharray="3 7"
            strokeLinecap="round"
            opacity="0.7"
          />
        </motion.svg>

        {/* tilted sketch ring */}
        <motion.svg
          className="absolute left-[5%] top-[26%] w-32 h-32 sm:w-40 sm:h-40 opacity-70"
          viewBox="0 0 180 180"
          initial={{ rotate: -16 }}
          animate={{ rotate: [-16, -13, -16] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ellipse
            cx="90"
            cy="90"
            rx="64"
            ry="50"
            fill="none"
            stroke="#B8B8B8"
            strokeWidth="1.4"
            strokeDasharray="4 7 2 8"
            strokeLinecap="round"
          />
          <path
            d="M50,91 C72,70 109,68 132,88"
            fill="none"
            stroke="#C7F36B"
            strokeWidth="1.15"
            strokeDasharray="3 7"
            strokeLinecap="round"
            opacity="0.7"
          />
        </motion.svg>

        {/* cube top-right */}
        <motion.svg
          className="absolute right-[10%] top-[27%] w-16 h-16 sm:w-20 sm:h-20 opacity-60"
          viewBox="0 0 100 100"
          initial={{ rotate: 12 }}
          animate={{ rotate: [12, 16, 12] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M24 35 L50 22 L76 35 L50 48 Z"
            fill="none"
            stroke="#B8B8B8"
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeDasharray="4 7"
          />
          <path
            d="M24 35 L24 62 L50 76 L50 48"
            fill="none"
            stroke="#D8D0C4"
            strokeWidth="1.1"
            strokeLinejoin="round"
            strokeDasharray="4 7"
          />
          <path
            d="M76 35 L76 62 L50 76"
            fill="none"
            stroke="#B8B8B8"
            strokeWidth="1.1"
            strokeLinejoin="round"
            strokeDasharray="4 7"
          />
        </motion.svg>

        {/* tiny tilted square bottom-left */}
        <motion.svg
          className="absolute left-[17%] bottom-[14%] w-16 h-16 sm:w-20 sm:h-20 opacity-55"
          viewBox="0 0 90 90"
          initial={{ rotate: -11 }}
          animate={{ rotate: [-11, -8, -11] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <rect
            x="17"
            y="17"
            width="56"
            height="56"
            rx="10"
            fill="none"
            stroke="#B8B8B8"
            strokeWidth="1.2"
            strokeDasharray="4 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28,45 L62,45"
            stroke="#C7F36B"
            strokeWidth="1.1"
            strokeDasharray="2 5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </motion.svg>

        {/* upper small arc */}
        <motion.svg
          className="absolute left-[50%] top-[11%] w-[28vw] max-w-[240px] min-w-[130px] opacity-40"
          viewBox="0 0 260 160"
          style={{ transform: 'translateX(-50%)' }}
          initial={{ rotate: -3 }}
          animate={{ rotate: [-3, -1, -3], y: [0, 2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M30,106 C64,44 108,26 145,42 C182,58 197,104 228,116"
            fill="none"
            stroke="#D8D0C4"
            strokeWidth="1.2"
            strokeDasharray="3 7"
            strokeLinecap="round"
          />
        </motion.svg>

        {/* small wave top-left */}
        <svg className="absolute left-[6%] top-[46%] w-24 sm:w-32 opacity-45 rotate-[-8deg]">
          <path
            d="M8,40 C22,12 38,68 52,40 C66,12 82,68 96,40"
            fill="none"
            stroke="#C7F36B"
            strokeWidth="1.25"
            strokeDasharray="3 6"
            strokeLinecap="round"
          />
        </svg>

        {/* small wave upper-right */}
        <svg className="absolute right-[12%] top-[46%] w-28 sm:w-36 opacity-42 rotate-[8deg]">
          <path
            d="M8,42 C24,14 40,70 56,42 C72,14 88,70 104,42"
            fill="none"
            stroke="#B8B8B8"
            strokeWidth="1.25"
            strokeDasharray="3 6"
            strokeLinecap="round"
          />
        </svg>

        {/* bottom-left big wavy line */}
        <motion.svg
          className="absolute left-[1%] bottom-[9%] w-[82vw] max-w-[650px] min-w-[260px] opacity-55 sm:opacity-48"
          viewBox="0 0 700 180"
          initial={{ rotate: -7 }}
          animate={{ rotate: [-7, -5, -7], y: [0, -2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M28,108
               C76,42 116,44 157,102
               C196,156 238,159 286,106
               C334,55 381,53 420,99
               C462,149 516,154 565,104
               C608,62 651,63 679,96"
            fill="none"
            stroke="#B8B8B8"
            strokeWidth="1.55"
            strokeDasharray="5 9 2 7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* center-back scribble loop */}
        <motion.svg
          className="absolute left-1/2 top-[21%] w-[42vw] max-w-[360px] min-w-[180px] opacity-30 sm:opacity-34"
          viewBox="0 0 500 500"
          initial={{ rotate: -2 }}
          animate={{ rotate: [-2, 0, -2] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transform: 'translateX(-50%)' }}
        >
          <path
            d="M90,250
               C70,170 130,95 216,92
               C310,88 368,144 379,219
               C390,294 347,372 258,389
               C171,405 108,354 90,250Z"
            fill="none"
            stroke="#D8D0C4"
            strokeWidth="1.2"
            strokeDasharray="4 9 2 8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>

        {/* right-side sketchy stack */}
        <motion.svg
          className="absolute right-[8%] bottom-[22%] w-24 h-24 sm:w-40 sm:h-40 opacity-55"
          viewBox="0 0 160 160"
          initial={{ rotate: 13 }}
          animate={{ rotate: [13, 10, 13] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M28,44 L120,28"
            stroke="#B8B8B8"
            strokeWidth="1.2"
            strokeDasharray="3 7"
            strokeLinecap="round"
          />
          <path
            d="M28,78 L118,62"
            stroke="#D8D0C4"
            strokeWidth="1.15"
            strokeDasharray="3 7"
            strokeLinecap="round"
          />
          <path
            d="M28,112 L108,96"
            stroke="#B8B8B8"
            strokeWidth="1.2"
            strokeDasharray="3 7"
            strokeLinecap="round"
          />
          <path
            d="M52,26 C82,40 94,58 103,86 C109,105 109,118 102,132"
            fill="none"
            stroke="#C7F36B"
            strokeWidth="1.1"
            strokeDasharray="2 6"
            strokeLinecap="round"
            opacity="0.7"
          />
        </motion.svg>

        {/* tiny cube bottom-right */}
        <motion.svg
          className="absolute right-[15%] bottom-[10%] w-14 h-14 sm:w-18 sm:h-18 opacity-50"
          viewBox="0 0 100 100"
          initial={{ rotate: -8 }}
          animate={{ rotate: [-8, -4, -8] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M26 38 L50 26 L74 38 L50 50 Z"
            fill="none"
            stroke="#B8B8B8"
            strokeWidth="1.15"
            strokeLinejoin="round"
            strokeDasharray="4 7"
          />
          <path
            d="M26 38 L26 60 L50 72 L50 50"
            fill="none"
            stroke="#D8D0C4"
            strokeWidth="1.05"
            strokeLinejoin="round"
            strokeDasharray="4 7"
          />
          <path
            d="M74 38 L74 60 L50 72"
            fill="none"
            stroke="#B8B8B8"
            strokeWidth="1.05"
            strokeLinejoin="round"
            strokeDasharray="4 7"
          />
        </motion.svg>

        {/* gentle wash behind text */}
        <motion.div
          className="absolute left-1/2 top-1/2 -z-10 h-56 w-56 sm:h-72 sm:w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C7F36B] opacity-8 blur-3xl"
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.06, 0.1, 0.06],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-[92vw] px-4 text-center sm:px-5">
        <div className="flex justify-center gap-1 sm:gap-2">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              className="text-5xl text-[#252525] sm:text-7xl md:text-8xl"
              style={{
                fontFamily: '"Comic Sans MS", "Trebuchet MS", cursive',
                display: 'inline-block',
              }}
              initial={{ opacity: 0, y: 20, rotate: -10 }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: [-6 + i * 2, -2 + i * 2],
              }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
            >
              {l}
            </motion.span>
          ))}
        </div>

        <motion.div
          className="mx-auto mt-3 h-[2px] bg-gradient-to-r from-transparent via-[#C7F36B] to-transparent"
          style={{ width: '52%' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6 }}
        />

        <motion.p
          className="mt-5 text-sm text-[#2A2A2A] sm:text-lg"
          style={{
            fontFamily: '"Comic Sans MS", "Trebuchet MS", cursive',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          student tech consultation
        </motion.p>

        <motion.p
          className="mt-2 text-xs text-[#6C6C6C] sm:text-sm"
          style={{
            fontFamily: '"Comic Sans MS", "Trebuchet MS", cursive',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2 }}
        >
          for complex projects
        </motion.p>

        <motion.div
          className="mt-8 flex justify-center gap-2 sm:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-[#C7F36B]"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};
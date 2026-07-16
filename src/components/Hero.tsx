"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  // Generate random static values for floating background stars (avoiding hydration mismatches)
  const stars = [
    { left: "10%", top: "20%", delay: 0, size: 20, duration: 10 },
    { left: "85%", top: "15%", delay: 2, size: 14, duration: 12 },
    { left: "20%", top: "75%", delay: 4, size: 26, duration: 14 },
    { left: "75%", top: "80%", delay: 1, size: 18, duration: 11 },
    { left: "5%", top: "50%", delay: 3, size: 22, duration: 13 },
    { left: "90%", top: "60%", delay: 5, size: 20, duration: 9 },
  ];

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F2] to-[#FFF0ED] dark:from-[#1E110B] dark:via-[#160B05] dark:to-[#0D0502]">
      
      
      {/* Floating Background Particles (Stars) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((s, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-300/40 dark:text-amber-500/20"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-full h-full fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Floating Sparkles & Soft Glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-amber-400/5 dark:bg-amber-500/3 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-orange-400/5 dark:bg-orange-500/3 blur-3xl" />

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 text-center">
        {/* Glowing Sparkle Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: 0.6,
          }}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/70 dark:bg-zinc-900/60 shadow-md border border-white/50 dark:border-zinc-800/40 flex items-center justify-center text-amber-500 mb-8"
        >
          <Sparkles className="w-8 h-8 md:w-10 md:h-10 fill-current animate-pulse" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-orange-500 dark:to-yellow-500 drop-shadow-sm"
        >
          Happy Birthday,<br />Divya! ✨
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="mt-6 font-sans text-lg md:text-xl lg:text-2xl font-light text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto"
        >
          A special surprise made just for you to celebrate your special day.
        </motion.p>

        {/* Glowing Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
          className="mt-12"
        >
          <motion.button
            onClick={onExplore}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(245, 158, 11, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-sans text-md font-semibold tracking-wide shadow-lg shadow-amber-500/25 border border-amber-400/20 cursor-pointer flex items-center gap-2 group transition-all duration-300"
          >
            <span>Open Your Surprise</span>
            <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 8, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-6 flex flex-col items-center gap-1 text-amber-600/60 font-sans text-xs uppercase tracking-widest cursor-pointer"
        onClick={onExplore}
      >
        <span>Scroll to Begin</span>
        <ChevronDown className="w-3.5 h-3.5" />
      </motion.div>
    </section>
  );
}

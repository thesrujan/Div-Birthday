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
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden py-12 md:py-20 bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F2] to-[#FFF0ED] dark:from-[#1E110B] dark:via-[#160B05] dark:to-[#0D0502]">
      
      
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
          className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/70 dark:bg-zinc-900/60 shadow-md border border-white/50 dark:border-zinc-800/40 flex items-center justify-center text-amber-500 mb-2 md:mb-3"
        >
          <Sparkles className="w-5 h-5 md:w-7 md:h-7 fill-current animate-pulse" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="font-script text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap font-normal tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 dark:from-amber-300 dark:via-orange-300 dark:to-rose-400 drop-shadow-lg filter pb-2 px-2"
        >
          Happy Birthday, Divya ✨
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="mt-1 md:mt-2 mb-8 md:mb-10 font-sans text-xs md:text-sm lg:text-base font-light text-zinc-700 dark:text-zinc-300 whitespace-nowrap px-4"
        >
          A special surprise for your special day
        </motion.p>

        {/* Happy Birthday Video */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="w-full max-w-3xl aspect-video rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-2 md:border-4 border-amber-200/50 dark:border-zinc-800/50 bg-black group relative z-20"
        >
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/videos/happy-birthday-divya.mp4#t=0.1"
          >
            <source src="/videos/happy-birthday-divya.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>

      {/* Connecting gradient line to next section */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-amber-500/60 via-amber-500/30 to-transparent" />
    </section>
  );
}

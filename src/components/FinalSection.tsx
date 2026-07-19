"use client";

import { motion } from "framer-motion";
import { Sparkles, Gift } from "lucide-react";
import confetti from "canvas-confetti";
import { birthdayData } from "@/config/birthdayData";

export default function FinalSection() {
  const triggerGrandFinale = () => {
    // 1. Fireworks effect
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // random fireworks
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#ffca3a", "#ff9f1c", "#ffafcc", "#b5e2fa", "#c5fad5"]
      });
      confetti({ 
        ...defaults, 
        particleCount, 
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#ffca3a", "#ff9f1c", "#ffafcc", "#b5e2fa", "#c5fad5"]
      });
    }, 250);

    // 2. Star blasts from bottom
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.8 },
        colors: ["#ffca3a", "#ff9f1c", "#ffafcc", "#b5e2fa", "#c5fad5"],
        scalar: 2,
      });
    }, 500);

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
        colors: ["#ffca3a", "#ff9f1c", "#ffafcc", "#b5e2fa", "#c5fad5"],
        scalar: 2.2,
      });
    }, 1500);
  };

  // Generate coordinates for stars
  const stars = [
    { left: "12%", top: "15%", delay: 0.2, scale: 0.8 },
    { left: "85%", top: "25%", delay: 0.5, scale: 1 },
    { left: "25%", top: "70%", delay: 1.2, scale: 0.6 },
    { left: "70%", top: "75%", delay: 0.8, scale: 0.9 },
    { left: "5%", top: "45%", delay: 1.5, scale: 0.7 },
    { left: "92%", top: "50%", delay: 0.1, scale: 0.8 },
    { left: "45%", top: "10%", delay: 0.6, scale: 0.5 },
    { left: "60%", top: "85%", delay: 1.1, scale: 0.7 },
  ];

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF9F2] via-[#FFFEFA] to-[#FFF5ED] dark:from-[#1E110B] dark:via-[#160B05] dark:to-[#0D0502] overflow-hidden">
      
      {/* Starry Sky Twinkling Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((s, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-300 dark:text-amber-250/30"
            style={{
              left: s.left,
              top: s.top,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [s.scale * 0.8, s.scale * 1.2, s.scale * 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-4 h-4 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Background Soft Blurs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-amber-400/5 dark:bg-amber-500/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-orange-400/5 dark:bg-orange-500/2 blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center max-w-xl px-6 text-center">
        
        {/* Floating Golden/Orange Gift Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-amber-500 mb-8"
        >
          <Gift className="w-16 h-16 fill-none stroke-current drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" />
        </motion.div>

        {/* Large Message */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-600 to-amber-700 dark:from-amber-400 dark:via-orange-500 dark:to-yellow-500 drop-shadow-sm leading-tight"
        >
          Wishing You A Wonderful Year Ahead! ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 font-sans text-md md:text-lg font-light text-zinc-700 dark:text-zinc-300 max-w-sm"
        >
          Thank you for making every chat so bright. Happy Birthday.
        </motion.p>

        {/* Final Surprise Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12"
        >
          <motion.button
            onClick={triggerGrandFinale}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(245, 158, 11, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-sans text-md font-semibold tracking-wider shadow-lg shadow-amber-500/25 border border-amber-400/20 cursor-pointer flex items-center gap-2"
          >
            <span className="text-red-400 animate-pulse text-lg">❤️</span>
            <span>One More Surprise</span>
            <Sparkles className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Footer credits */}
      <div className="absolute bottom-6 font-sans text-[10px] text-zinc-400 dark:text-zinc-650 tracking-widest uppercase">
        Special gift for a special person 🎁
      </div>
    </section>
  );
}

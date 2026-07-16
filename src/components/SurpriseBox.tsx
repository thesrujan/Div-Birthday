"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Star } from "lucide-react";
import confetti from "canvas-confetti";

export default function SurpriseBox() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Launch a premium multi-directional confetti blast
    const duration = 2.5 * 1000;
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
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <section className="relative py-24 px-4 bg-gradient-to-tr from-[#F1EAFF] via-[#FFFBFD] to-[#FFE8EC] dark:from-[#0F0C1E] dark:via-[#130312] dark:to-[#1F0C20] overflow-hidden flex flex-col items-center justify-center min-h-[600px]">
      
      {/* Decorative stars */}
      <div className="absolute top-1/4 left-1/4 text-yellow-400/30 animate-pulse pointer-events-none">
        <Star className="w-6 h-6 fill-current" />
      </div>
      <div className="absolute bottom-1/4 right-1/4 text-yellow-400/30 animate-pulse pointer-events-none" style={{ animationDelay: "1s" }}>
        <Star className="w-5 h-5 fill-current" />
      </div>

      <div className="max-w-md w-full flex flex-col items-center z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-3 py-1.5 rounded-full">
            Special Gift
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 text-zinc-950 dark:text-white">
            Unwrap Your Surprise
          </h2>
          <p className="font-sans text-zinc-650 dark:text-zinc-400 mt-4 font-light text-sm">
            I prepared a little something special inside this box. Click to open it!
          </p>
        </motion.div>

        {/* Gift Box Interaction Wrapper */}
        <div className="h-96 w-full flex flex-col items-center justify-center relative">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Closed pulsing gift box */
              <motion.div
                key="closed-box"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleOpen}
                className="cursor-pointer flex flex-col items-center justify-center group"
              >
                {/* 3D Gift box CSS mockup */}
                <div className="relative w-40 h-40 flex flex-col items-center">
                  {/* Gift Box Lid */}
                  <motion.div 
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-44 h-10 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg shadow-md z-10 relative border-b border-rose-350"
                  >
                    {/* Ribbon knot */}
                    <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 w-10 h-6 bg-yellow-400 rounded-full border-2 border-white dark:border-zinc-900 shadow-sm" />
                    {/* Vertical Ribbon */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-yellow-400" />
                  </motion.div>

                  {/* Gift Box Body */}
                  <div className="w-40 h-32 bg-gradient-to-r from-rose-500 to-pink-600 rounded-b-xl shadow-lg relative overflow-hidden flex items-center justify-center border-t border-rose-450">
                    {/* Vertical ribbon */}
                    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-yellow-400" />
                    {/* Horizontal ribbon */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-yellow-400" />
                    
                    <Gift className="w-12 h-12 text-white/90 relative z-10" />
                  </div>
                </div>

                <p className="font-serif text-lg font-bold text-rose-500 mt-8 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors animate-pulse">
                  Tap to Unwrap 🎁
                </p>
              </motion.div>
            ) : (
              /* Opened box with revealed message */
              <motion.div
                key="open-message"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="w-full max-w-md bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-rose-100 dark:border-zinc-800 shadow-2xl relative"
              >
                {/* Ribbon details inside card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center border-4 border-white dark:border-zinc-950 shadow-md">
                  <Star className="w-5 h-5 text-white fill-current animate-spin" style={{ animationDuration: "12s" }} />
                </div>

                <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white mt-4">
                  One Last Birthday Wish... ❤️
                </h3>
                
                {/* Scrollable Container for Surprise Message */}
                <div className="max-h-64 overflow-y-auto mt-4 pr-2 text-left scrollbar-thin scrollbar-thumb-rose-200 dark:scrollbar-thumb-zinc-700 space-y-4">
                  <p className="font-sans text-base md:text-lg font-bold leading-relaxed text-zinc-900 dark:text-white">
                    Will you make me the happiest person by saying YES to a date with me?
                  </p>
                  <p className="font-sans text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 italic">
                    So... what do you say? 😉✨
                  </p>
                  <p className="font-sans text-sm text-rose-500 font-semibold">
                    don&apos;t say "Nodana antha" 😂
                  </p>
                </div>

                <p className="font-serif text-sm font-bold text-rose-500 mt-6 tracking-wide">
                  Happy Birthday, Divya! ❤️
                </p>

                {/* Reset button to close box and let them open it again */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-6 text-xs font-sans text-zinc-400 hover:text-rose-500 cursor-pointer transition-colors hover:underline"
                >
                  Wrap it back up
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";

export default function Reasons() {
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const toggleFlip = (index: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Pre-generate soft celebratory colors (gold, amber, cream)
  const cardStyles = [
    "from-amber-50 to-orange-100/50 dark:from-zinc-900/60 dark:to-amber-950/20",
    "from-yellow-50 to-amber-100/50 dark:from-zinc-900/60 dark:to-yellow-950/20",
    "from-orange-50 to-yellow-100/50 dark:from-zinc-900/60 dark:to-orange-950/20",
    "from-cream-50 to-amber-100/30 dark:from-zinc-900/60 dark:to-zinc-800/30",
  ];

  return (
    <section className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-[#FFF5ED] via-[#FFFEFA] to-[#FFF9F2] dark:from-[#1E110B] dark:via-[#130602] dark:to-[#1A0C05] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-400/5 dark:bg-amber-500/2 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-full">
            Key Highlights
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 text-zinc-950 dark:text-white">
            Reasons You Make Every Day Brighter
          </h2>
          <p className="font-sans text-zinc-655 dark:text-zinc-400 mt-4 max-w-md mx-auto font-light">
            Click on the cards to reveal the little qualities that make you such a wonderful person to talk to.
          </p>
        </motion.div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {birthdayData.reasons.map((reason, index) => {
            const isFlipped = !!flippedCards[index];
            const colorStyle = cardStyles[index % cardStyles.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (index % 5) * 0.05 }}
                className="perspective-1000 aspect-square w-full cursor-pointer"
                onClick={() => toggleFlip(index)}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative w-full h-full transform-style-3d duration-500 select-none"
                >
                  
                  {/* Front Side */}
                  <div className={`absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br ${colorStyle} border border-white/60 dark:border-zinc-800/40 shadow-sm flex flex-col items-center justify-center p-4 hover:shadow-md hover:border-amber-300 dark:hover:border-amber-950/40 transition-all duration-300`}>
                    <motion.div
                      animate={isFlipped ? {} : { scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.15 }}
                      className="text-amber-500/80 dark:text-amber-500/60"
                    >
                      <Star className="w-8 h-8 fill-current" />
                    </motion.div>
                    <span className="font-serif text-sm font-bold text-zinc-500 dark:text-zinc-400 mt-3">
                      Quality #{index + 1}
                    </span>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-white dark:bg-zinc-900 border border-amber-100 dark:border-zinc-800 shadow-lg flex items-center justify-center p-4 text-center overflow-hidden">
                    <div className="absolute inset-2 border border-amber-50/50 dark:border-zinc-800/50 rounded-2xl pointer-events-none" />
                    
                    <p className="font-serif text-xs md:text-sm leading-relaxed text-zinc-800 dark:text-zinc-200 font-semibold italic max-h-full overflow-y-auto pr-1">
                      {reason}
                    </p>
                  </div>

                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Global CSS for 3D Flips */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
}

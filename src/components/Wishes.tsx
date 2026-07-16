"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";

export default function Wishes() {
  const [typedText, setTypedText] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const wishMessage = "To my favorite person in the entire universe: May your birthday be filled with endless smiles, pure happiness, and all the love you deserve. You make the world a more beautiful place just by being in it. I am so incredibly grateful to celebrate another year of your beautiful life with you. Happy Birthday, Sophia! 🎂✨";

  useEffect(() => {
    if (isInView && !hasTyped) {
      setHasTyped(true);
      let i = 0;
      const interval = setInterval(() => {
        setTypedText(wishMessage.slice(0, i + 1));
        i++;
        if (i >= wishMessage.length) {
          clearInterval(interval);
        }
      }, 40); // typing speed 40ms per letter

      return () => clearInterval(interval);
    }
  }, [isInView, hasTyped]);

  const triggerHeartConfetti = () => {
    const scalar = 2.5;
    const heart = confetti.shapeFromPath({
      path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    });

    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0.8,
      decay: 0.94,
      startVelocity: 30,
      shapes: [heart],
      scalar,
    };

    confetti({
      ...defaults,
      particleCount: 50,
      colors: ["#ff0a43", "#ff6b8b", "#ff9eb5"],
    });

    confetti({
      ...defaults,
      particleCount: 30,
      colors: ["#f72585", "#7209b7", "#b5179e"],
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative py-24 px-4 bg-gradient-to-br from-[#FFF5F8] via-[#FFF0F2] to-[#F5E6EC] dark:from-[#180A1A] dark:via-[#130310] dark:to-[#160517] overflow-hidden flex flex-col items-center justify-center min-h-[500px]"
    >
      <div className="max-w-2xl w-full flex flex-col items-center z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-3 py-1.5 rounded-full">
            Birthday Wishes
          </span>
        </motion.div>

        {/* Wishes Card */}
        <div className="w-full bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/50 dark:border-zinc-800/40 shadow-xl relative min-h-[220px] flex items-center justify-center">
          <p className="font-serif text-lg md:text-xl leading-relaxed text-zinc-800 dark:text-zinc-200 font-medium tracking-wide">
            {typedText}
            {typedText.length < wishMessage.length && hasTyped && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1.5 h-6 bg-rose-500 ml-1"
              />
            )}
          </p>
        </div>

        {/* Glowing Heart Animation below */}
        {typedText.length === wishMessage.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
            className="mt-12 flex flex-col items-center gap-4 cursor-pointer"
            onClick={triggerHeartConfetti}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                filter: [
                  "drop-shadow(0px 0px 8px rgba(244, 63, 94, 0.4))",
                  "drop-shadow(0px 0px 30px rgba(244, 63, 94, 0.9))",
                  "drop-shadow(0px 0px 8px rgba(244, 63, 94, 0.4))",
                ],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 text-rose-500 fill-current hover:text-rose-600 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
            <span className="font-sans text-xs font-semibold text-rose-500/80 dark:text-rose-400/80 tracking-wider uppercase animate-pulse">
              Tap the heart for magic
            </span>
          </motion.div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";
import confetti from "canvas-confetti";

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [typedText, setTypedText] = useState("");

  const handleOpenLetter = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Star/Circle festive confetti explosion
    const end = Date.now() + 0.8 * 1000;
    const colors = ["#ffca3a", "#ff9f1c", "#ffafcc", "#b5e2fa", "#c5fad5"];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0.2, y: 0.8 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 0.8, y: 0.8 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  useEffect(() => {
    if (!isOpen) return;
    let i = 0;
    const text = birthdayData.loveLetter;
    const interval = setInterval(() => {
      setTypedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 25); // typing speed

    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center bg-gradient-to-tr from-[#FFFDF8] via-[#FFF9F2] to-[#FFF5ED] dark:from-[#1E110B] dark:via-[#160B05] dark:to-[#0D0502] overflow-hidden">
      
      
      {/* Decorative corner borders */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-24 h-24 border-amber-300/40 border-t-2 border-l-2 rounded-tl-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-amber-300/40 border-b-2 border-r-2 rounded-br-full" />
      </div>

      <div className="max-w-2xl w-full flex flex-col items-center z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-full">
            Birthday Note
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 text-zinc-950 dark:text-white">
            A Special Note For You
          </h2>
        </motion.div>

        {/* Envelope Container */}
        <div className="relative w-full max-w-lg flex flex-col items-center justify-center min-h-[400px]">
          
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Closed Envelope with Star Seal */
              <motion.div
                key="closed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onClick={handleOpenLetter}
                className="w-full h-[350px] md:h-[400px] bg-[#FFFBF7] dark:bg-zinc-900 border-2 border-amber-200 dark:border-zinc-800 shadow-2xl rounded-3xl cursor-pointer flex flex-col items-center justify-center p-6 text-center select-none group border-dashed relative overflow-hidden"
              >
                {/* Envelope Flap Mockup */}
                <div className="absolute top-0 inset-x-0 h-1/2 border-b-2 border-amber-100 dark:border-zinc-800/40 bg-[#FFFEFA] dark:bg-zinc-800/20 rounded-t-3xl clip-path-flap" />
                
                <div className="z-10 flex flex-col items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 hover:from-yellow-350 hover:to-amber-450 shadow-xl rounded-full flex items-center justify-center border-4 border-white dark:border-zinc-800"
                  >
                    <Sparkles className="w-8 h-8 text-white fill-current" />
                  </motion.div>
                  <p className="font-serif text-lg font-bold text-zinc-700 dark:text-zinc-300 mt-6 group-hover:text-amber-600 transition-colors">
                    Click to Open the Envelope
                  </p>
                  <p className="font-sans text-xs text-zinc-400 dark:text-zinc-500 mt-2 tracking-wide font-light">
                    Made especially for Divya
                  </p>
                </div>
              </motion.div>
            ) : (
              /* Opened Letter */
              <motion.div
                key="opened"
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="w-full bg-[#FFFEFC] dark:bg-zinc-900 shadow-2xl rounded-3xl p-8 border border-amber-100 dark:border-zinc-800 flex flex-col relative min-h-[450px]"
              >
                {/* Corner details */}
                <div className="absolute top-4 left-4 text-amber-300 dark:text-amber-900/50">✨</div>
                <div className="absolute top-4 right-4 text-amber-300 dark:text-amber-900/50">✨</div>
                <div className="absolute bottom-4 left-4 text-amber-300 dark:text-amber-900/50">✨</div>
                <div className="absolute bottom-4 right-4 text-amber-300 dark:text-amber-900/50">✨</div>

                {/* Contents */}
                <div className="flex-1 font-serif text-md md:text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap font-medium tracking-wide italic max-h-[50vh] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-amber-200 dark:scrollbar-thumb-zinc-700">
                  {typedText}
                  {typedText.length < birthdayData.loveLetter.length && (
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-1.5 h-5 bg-amber-500 ml-0.5"
                    />
                  )}
                </div>

                {typedText.length === birthdayData.loveLetter.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="self-center mt-6 text-2xl text-amber-400"
                  >
                    ✦
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

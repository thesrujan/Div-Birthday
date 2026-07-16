"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Key, Flower, Heart, X } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";

export default function EasterEggs() {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const handleEggClick = (index: number) => {
    // Pick a message from the configuration
    const msg = birthdayData.easterEggs[index % birthdayData.easterEggs.length];
    setActiveMessage(msg);
  };

  // 3 Easter Eggs placed at different scroll depths on the page
  const eggs = [
    {
      top: "120vh",
      left: "4%",
      icon: <Flower className="w-4 h-4 text-pink-300 dark:text-pink-900/40 hover:text-pink-500" />,
      label: "A hidden rose",
    },
    {
      top: "240vh",
      right: "4%",
      icon: <Key className="w-4 h-4 text-amber-300 dark:text-amber-900/40 hover:text-amber-500" />,
      label: "A secret key",
    },
    {
      top: "380vh",
      left: "3%",
      icon: <Sparkles className="w-4 h-4 text-purple-300 dark:text-purple-900/40 hover:text-purple-500" />,
      label: "A tiny sparkle",
    },
  ];

  return (
    <>
      {/* Hidden Clickable Eggs along the side margins */}
      <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-30">
        {eggs.map((egg, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleEggClick(idx)}
            style={{
              position: "absolute",
              top: egg.top,
              left: egg.left ? egg.left : undefined,
              right: egg.right ? egg.right : undefined,
            }}
            whileHover={{ scale: 1.25 }}
            whileTap={{ scale: 0.9 }}
            className="pointer-events-auto cursor-pointer p-2 rounded-full bg-white/10 dark:bg-zinc-900/10 hover:bg-white/30 dark:hover:bg-zinc-800/30 border border-transparent hover:border-rose-250 backdrop-blur-[2px] transition-all duration-300 shadow-sm opacity-50 hover:opacity-100 flex items-center justify-center group"
            title="What's this?"
          >
            {egg.icon}
          </motion.button>
        ))}
      </div>

      {/* Secret Message Modal Popups */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMessage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 120 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-[#FFF5F6] dark:bg-zinc-950 border border-rose-200 dark:border-rose-950/60 rounded-3xl p-6 shadow-2xl relative text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveMessage(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-rose-500 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mx-auto w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/40 flex items-center justify-center text-rose-500 mb-4 animate-bounce">
                <Heart className="w-5 h-5 fill-current" />
              </div>

              <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-white">
                You Found A Secret Note! 💌
              </h4>

              <p className="font-sans text-sm font-medium text-zinc-700 dark:text-zinc-300 mt-4 leading-relaxed italic">
                &ldquo;{activeMessage}&rdquo;
              </p>

              <button
                onClick={() => setActiveMessage(null)}
                className="mt-6 w-full py-2.5 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-white font-sans text-xs font-semibold tracking-wider uppercase cursor-pointer hover:shadow-md transition-shadow"
              >
                Close Note
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

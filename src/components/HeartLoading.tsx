"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeartLoadingProps {
  onFinish: () => void;
}

export default function HeartLoading({ onFinish }: HeartLoadingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500); // Brief pause at 100%
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F2] to-[#FFF5ED] dark:from-[#1E110B] dark:via-[#160B05] dark:to-[#0D0502]"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="relative flex flex-col items-center max-w-xs px-4 text-center">
        {/* Pulsing Glowing SVG Star */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 360],
            filter: [
              "drop-shadow(0px 0px 8px rgba(245, 158, 11, 0.3))",
              "drop-shadow(0px 0px 25px rgba(245, 158, 11, 0.7))",
              "drop-shadow(0px 0px 8px rgba(245, 158, 11, 0.3))"
            ]
          }}
          transition={{
            scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 6, repeat: Infinity, ease: "linear" }
          }}
          className="w-20 h-20 text-amber-500 fill-current"
        >
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168-7.334-3.856-7.334 3.856 1.4-8.168-5.934-5.787 8.2-1.192z" />
          </svg>
        </motion.div>

        {/* Loading Header */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 font-serif text-2xl font-bold tracking-wide text-amber-600 dark:text-amber-400"
        >
          For Sweety Cuety ✨
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.4 }}
          className="mt-2 font-sans text-xs font-light tracking-widest uppercase text-amber-500/80 dark:text-amber-300/80"
        >
          Preparing your surprise...
        </motion.p>

        {/* Custom Progress Bar */}
        <div className="relative w-48 h-[6px] mt-6 overflow-hidden rounded-full bg-amber-100 dark:bg-amber-950/50">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>

        <motion.span 
          className="mt-2 font-sans text-xs font-medium text-amber-600/75 dark:text-amber-400/75"
        >
          {progress}%
        </motion.span>
      </div>
    </motion.div>
  );
}

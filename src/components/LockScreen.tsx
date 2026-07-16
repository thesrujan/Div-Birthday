"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── UNLOCK DATE: July 27, 2026 at 12:00 AM (Midnight, Local Time) ───
// Month is 0-indexed in JS (6 = July)
const UNLOCK_DATE = new Date(2026, 6, 27, 0, 0, 0);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [unlocked, setUnlocked] = useState(false);
  const [stars] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 2,
    }))
  );

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = UNLOCK_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setUnlocked(true);
        setTimeout(onUnlock, 2500); // wait for "Happy Birthday" animation then reveal
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [onUnlock]);

  const units = [
    { val: timeLeft.days, label: "Days" },
    { val: timeLeft.hours, label: "Hours" },
    { val: timeLeft.minutes, label: "Mins" },
    { val: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <AnimatePresence>
      {!unlocked ? (
        <motion.div
          key="locked"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, #1a0533 0%, #0d0118 50%, #000000 100%)",
          }}
        >
          {/* Starfield */}
          <div className="absolute inset-0 pointer-events-none">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: star.size,
                  height: star.size,
                }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.4, 1] }}
                transition={{
                  duration: star.duration,
                  delay: star.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-purple-700/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-rose-700/10 blur-3xl" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
            {/* Moon emoji */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl md:text-7xl mb-6"
            >
              🌙
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="font-serif text-3xl md:text-5xl font-bold text-white mb-3"
            >
              Something Special is Coming
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="font-sans text-sm md:text-base text-purple-200 mb-10 font-light"
            >
              Your birthday surprise unlocks at midnight on July 27th ❤️
            </motion.p>

            {/* Countdown tiles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex gap-3 md:gap-5"
            >
              {units.map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-serif text-3xl md:text-4xl font-bold text-white border border-white/10 shadow-lg"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {String(val).padStart(2, "0")}
                  </div>
                  <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-purple-300 mt-2 font-medium">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="font-sans text-xs text-purple-300 mt-10 tracking-wide"
            >
              ✨ Come back when the clock strikes midnight ✨
            </motion.p>
          </div>
        </motion.div>
      ) : (
        // Birthday reveal animation
        <motion.div
          key="unlocked"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, #1a0533 0%, #0d0118 50%, #000000 100%)",
          }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
            className="text-center"
          >
            <div className="text-7xl md:text-9xl mb-6">🎂</div>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white">
              Happy Birthday,
              <br />
              <span className="text-rose-400">Divya! ❤️</span>
            </h1>
            <p className="text-purple-200 mt-4 font-sans text-lg">Your surprise is ready...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

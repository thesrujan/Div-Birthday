"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Petal {
  id: number;
  x: number; // initial horizontal position (%)
  size: number; // size in pixels
  delay: number; // animation delay (s)
  duration: number; // animation duration (s)
  rotation: number; // initial rotation (deg)
  rotationSpeed: number; // rotation speed multiplier
  horizontalAmplitude: number; // horizontal sway distance
  type: "rose" | "cherry" | "sunflower";
}

export default function FlowerBackground() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Generate random falling flower petals
    const petalTypes: ("rose" | "cherry" | "sunflower")[] = ["rose", "cherry", "sunflower"];
    const generated: Petal[] = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random start left%
      size: Math.random() * 18 + 12, // 12px to 30px
      delay: Math.random() * 8, // staggered start up to 8s
      duration: Math.random() * 12 + 10, // fall speed 10s to 22s
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1, // positive or negative rotation speed
      horizontalAmplitude: Math.random() * 40 + 20, // horizontal sway
      type: petalTypes[Math.floor(Math.random() * petalTypes.length)],
    }));
    setPetals(generated);
  }, []);

  // SVG Paths for different beautiful flowers
  const renderFlowerSVG = (type: "rose" | "cherry" | "sunflower", size: number) => {
    switch (type) {
      case "rose":
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-rose-450 dark:text-rose-600/60 opacity-80"
          >
            {/* Elegant watercolor rose path */}
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
            {/* Center petals */}
            <path
              d="M12 6c-3.31 0-6 2.69-6 6 0 2.3 1.3 4.3 3.2 5.3l1.8-1.8C9.8 14.8 9 13.5 9 12c0-1.66 1.34-3 3-3s3 1.34 3 3c0 1.5-.8 2.8-2 3.5l1.8 1.8c1.9-1 3.2-3 3.2-5.3 0-3.31-2.69-6-6-6z"
              fill="currentColor"
            />
          </svg>
        );
      case "cherry":
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-pink-400 dark:text-pink-500/50 opacity-70"
          >
            {/* 5 petal blossom shape */}
            <path
              d="M12 1c.5 2.5 2.5 4.5 4.5 4.5s2.5-2 2.5-2.5 0-2.5-2.5-2.5-4 .5-4.5.5zm8 10c-2.5-.5-4.5 1.5-4.5 3.5s2 2.5 2.5 2.5 2.5 0 2.5-2.5-.5-4-.5-4.5zm-14.5 4.5c0-2 2-4 4.5-4.5s.5 4 .5 4.5 0 2.5-2.5 2.5-2.5-2.5-2.5-2.5zm1-11c2.5.5 2.5 2.5 2.5 2.5s-2 2.5-2.5 2.5-2.5 0-2.5-2.5.5-4 .5-4.5zm5.5 13c-.5-2.5-2.5-2.5-2.5-2.5s-2.5 2-2.5 2.5 0 2.5 2.5 2.5 4-.5 4.5-.5z"
              fill="currentColor"
            />
            {/* Center pistil */}
            <circle cx="12" cy="12" r="2" fill="#EAB308" />
          </svg>
        );
      case "sunflower":
      default:
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-amber-300 dark:text-amber-500/50 opacity-85"
          >
            {/* Sunflower/Daisy multiple petals */}
            <path
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="12" cy="12" r="4" fill="currentColor" className="text-amber-500/90 dark:text-amber-600/70" />
            <path
              d="M12 2v6M12 16v6M2 12h6M16 12h6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M19.07 4.93l-4.24 4.24M9.17 14.83l-4.24 4.24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background Subtle Large SVG Flower Corners */}
      <div className="absolute top-[10%] left-[-5%] md:left-[-2%] opacity-15 dark:opacity-10 text-rose-300 pointer-events-none">
        <svg width="220" height="220" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0C55 20 70 35 90 35C70 35 55 50 50 70C45 50 30 35 10 35C30 35 45 20 50 0Z" />
          <path d="M50 30C52 40 60 48 70 48C60 48 52 56 50 66C48 56 40 48 30 48C40 48 48 40 50 30Z" className="text-yellow-300" />
        </svg>
      </div>

      <div className="absolute bottom-[20%] right-[-8%] md:right-[-3%] opacity-15 dark:opacity-10 text-pink-300 pointer-events-none">
        <svg width="280" height="280" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C 60 30, 80 30, 90 50 C 80 70, 60 70, 50 90 C 40 70, 20 70, 10 50 C 20 30, 40 30, 50 10 Z" />
          <circle cx="50" cy="50" r="10" className="text-amber-400" />
        </svg>
      </div>

      <div className="absolute top-[50%] right-[-5%] opacity-10 dark:opacity-5 text-amber-200 pointer-events-none">
        <svg width="180" height="180" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0C55 20 70 35 90 35C70 35 55 50 50 70C45 50 30 35 10 35C30 35 45 20 50 0Z" />
        </svg>
      </div>

      <div className="absolute bottom-[5%] left-[-3%] opacity-15 dark:opacity-10 text-rose-200 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="30" />
          <circle cx="20" cy="50" r="20" />
          <circle cx="80" cy="50" r="20" />
          <circle cx="50" cy="20" r="20" />
          <circle cx="50" cy="80" r="20" />
          <circle cx="50" cy="50" r="8" className="text-yellow-400" />
        </svg>
      </div>

      {/* Interactive Falling Petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            y: -50,
            x: `${petal.x}vw`,
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: [
              `${petal.x}vw`,
              `${petal.x + petal.horizontalAmplitude / 15}vw`,
              `${petal.x - petal.horizontalAmplitude / 15}vw`,
              `${petal.x + petal.horizontalAmplitude / 25}vw`,
            ],
            rotate: [
              petal.rotation,
              petal.rotation + 180 * petal.rotationSpeed,
              petal.rotation + 360 * petal.rotationSpeed,
            ],
            opacity: [0, 0.8, 0.8, 0.5, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute"
        >
          {renderFlowerSVG(petal.type, petal.size)}
        </motion.div>
      ))}
    </div>
  );
}

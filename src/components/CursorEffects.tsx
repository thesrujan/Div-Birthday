"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  type: "star" | "sparkle";
  size: number;
  color: string;
}

export default function CursorEffects() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices for performance & layout consistency
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const colors = ["#ffca3a", "#ff9f1c", "#ffafcc", "#b5e2fa", "#c5fad5", "#dfb2f4"];
    let idCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      const dx = clientX - lastPos.x;
      const dy = clientY - lastPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Only spawn a particle if the mouse has moved more than 20px
      if (dist > 20) {
        const isStar = Math.random() > 0.4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 12 + 10; // 10px to 22px

        const newParticle: Particle = {
          id: idCounter++,
          x: clientX,
          y: clientY,
          type: isStar ? "star" : "sparkle",
          size,
          color,
        };

        // Keep at most 25 active particles
        setParticles((prev) => [...prev.slice(-25), newParticle]);
        setLastPos({ x: clientX, y: clientY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [lastPos]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              opacity: 0.9,
              scale: 0.4,
              x: p.x - p.size / 2,
              y: p.y - p.size / 2,
            }}
            animate={{
              opacity: 0,
              scale: 0.1,
              y: p.y - p.size / 2 - 100 - Math.random() * 60, // float upwards
              x: p.x - p.size / 2 + (Math.random() - 0.5) * 80, // gentle sway left/right
              rotate: (Math.random() - 0.5) * 180,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onAnimationComplete={() => {
              setParticles((prev) => prev.filter((item) => item.id !== p.id));
            }}
            className="absolute drop-shadow-md"
            style={{ width: p.size, height: p.size, color: p.color }}
          >
            {p.type === "star" ? (
              <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168-7.334-3.856-7.334 3.856 1.4-8.168-5.934-5.787 8.2-1.192z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
                <path d="M12 2L14.76 8.76L22 12L14.76 15.24L12 22L9.24 15.24L2 12L9.24 8.76L12 2Z" />
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

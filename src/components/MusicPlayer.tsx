"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayData } from "@/config/birthdayData";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio(birthdayData.musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Soft background level

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio play blocked by browser:", err);
      });
      setIsPlaying(true);
      setShowTooltip(false);
    }
  };

  // Auto-hide tooltip after 10 seconds if not clicked
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Visual Indicator Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mb-3 mr-1 rounded-2xl bg-white/80 dark:bg-zinc-900/80 px-4 py-2 text-xs font-medium text-rose-500 shadow-lg backdrop-blur-md border border-rose-100 dark:border-rose-950/30 flex items-center gap-1.5"
          >
            <Music className="w-3.5 h-3.5 animate-bounce" />
            <span>Click for music!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/70 dark:bg-zinc-900/70 border border-white/40 dark:border-zinc-800/30 text-rose-500 shadow-xl backdrop-blur-md cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-300 relative group"
        aria-label="Toggle background music"
      >
        {/* Pulsing waves when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full bg-rose-400/20 dark:bg-rose-400/10 animate-ping pointer-events-none" />
        )}
        
        {isPlaying ? (
          <Volume2 className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        ) : (
          <VolumeX className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
        )}
      </motion.button>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LockScreen from "@/components/LockScreen";
import HeartLoading from "@/components/HeartLoading";
import Hero from "@/components/Hero";
import LoveLetter from "@/components/LoveLetter";
import Gallery from "@/components/Gallery";
import Timeline from "@/components/Timeline";
import SurpriseBox from "@/components/SurpriseBox";
import FinalSection from "@/components/FinalSection";
import EasterEggs from "@/components/EasterEggs";
import FlowerBackground from "@/components/FlowerBackground";

// ─── Unlock date: July 27, 2026 at 12:00 AM ───
// Month is 0-indexed in JS (6 = July)
const UNLOCK_DATE = new Date(2026, 6, 27, 0, 0, 0);

export default function Home() {
  const [isLocked, setIsLocked] = useState<boolean | null>(null); // null = checking
  const [isLoading, setIsLoading] = useState(true);
  const letterRef = useRef<HTMLDivElement>(null);

  // Check if we should show the lock screen (runs client-side only)
  useEffect(() => {
    // Secret bypass for your preview link
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("preview") === "true") {
      setIsLocked(false);
      return;
    }

    const now = new Date();
    setIsLocked(now < UNLOCK_DATE);
  }, []);

  const handleExplore = () => {
    letterRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // While checking time, show nothing (avoids flash)
  if (isLocked === null) return null;

  // ── LOCKED: show countdown screen ──
  if (isLocked) {
    return <LockScreen onUnlock={() => setIsLocked(false)} />;
  }

  // ── UNLOCKED: show full birthday website ──
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <HeartLoading key="loading" onFinish={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative min-h-screen flex flex-col w-full"
        >
          {/* Beautiful falling flowers & background illustrations */}
          <FlowerBackground />

          {/* Landing / Hero section */}
          <Hero onExplore={handleExplore} />

          {/* Love Letter Section */}
          <div ref={letterRef}>
            <LoveLetter />
          </div>

          {/* Photo Gallery Section */}
          <Gallery />

          {/* Milestones Timeline Section */}
          <Timeline />

          {/* Interactive Gift Box Surprise */}
          <SurpriseBox />

          {/* Starry Final Section with Fireworks */}
          <FinalSection />

          {/* Hidden Clickable Easter Eggs */}
          <EasterEggs />
        </motion.div>
      )}
    </>
  );
}

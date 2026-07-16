"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, ZoomIn } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";

export default function Timeline() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen py-24 px-4 bg-gradient-to-tr from-[#FFF5ED] via-[#FFFEFA] to-[#FFF9F2] dark:from-[#1A0C05] dark:via-[#130602] dark:to-[#1E110B] overflow-hidden">
      
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/3 left-10 w-72 h-72 rounded-full bg-amber-400/5 dark:bg-amber-500/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-72 h-72 rounded-full bg-orange-400/5 dark:bg-orange-500/2 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-full">
            Our Connection
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 text-zinc-950 dark:text-white">
            Our Connection Story
          </h2>
          <p className="font-sans text-zinc-650 dark:text-zinc-400 mt-4 max-w-md mx-auto font-light">
            Reflecting on the sweet milestones of our conversations and sharing smiles.
          </p>
        </motion.div>

        {/* Central Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-[240px] bottom-0 w-0.5 bg-gradient-to-b from-amber-300 via-orange-400 to-yellow-400 dark:from-amber-900/40 dark:via-orange-950/40 dark:to-yellow-900/40 transform md:-translate-x-1/2" />

        {/* Timeline Events */}
        <div className="space-y-16 md:space-y-24 relative">
          {birthdayData.timeline.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-stretch ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* 1. Timeline Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
                  className="w-full md:w-[calc(50%-2rem)] ml-8 md:ml-0"
                >
                  <div className="group bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md rounded-3xl p-5 md:p-6 border border-white/50 dark:border-zinc-800/40 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-5 items-center">
                    
                    {/* Event Photo (Clickable) */}
                    <div 
                      onClick={() => setActiveImage(event.image)}
                      className="w-full md:w-36 aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden shrink-0 border border-amber-100 dark:border-zinc-800 cursor-pointer relative group/image shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-110"
                      />
                      
                      {/* Hover Overlay Zoom Icon */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/image:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Event Text */}
                    <div className="flex-1 flex flex-col items-start text-left">
                      <div className="flex items-center gap-1.5 text-amber-600 text-xs font-semibold uppercase tracking-wider mb-2">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.date}</span>
                      </div>
                      <h3 className="font-serif text-lg md:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                        {event.title}
                      </h3>
                      <p className="font-sans text-sm font-light text-zinc-650 dark:text-zinc-400 mt-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                  </div>
                </motion.div>

                {/* 2. Timeline Central Node Icon */}
                <div className="absolute left-4 md:left-1/2 flex items-center justify-center transform -translate-x-1/2 mt-6 md:mt-12 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 150, delay: 0.1 }}
                    className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-4 border-white dark:border-zinc-950 shadow-md flex items-center justify-center"
                  >
                    <span className="absolute w-6 h-6 md:w-8 md:h-8 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />
                  </motion.div>
                </div>

                {/* 3. Empty Spacer for Desktop Layout */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Overlay Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(null);
              }}
              className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 active:scale-95 text-white p-3 rounded-full transition-all cursor-pointer border border-white/10"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Full size Image Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeImage}
                alt="Enlarged Connection Milestone"
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/10"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

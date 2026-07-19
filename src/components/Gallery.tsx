"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const isVideoUrl = (url: string) => /\.(mp4|mov|webm|ogg|m4v)$/i.test(url);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => 
      prev === 0 ? birthdayData.gallery.length - 1 : (prev as number) - 1
    );
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => 
      prev === birthdayData.gallery.length - 1 ? 0 : (prev as number) + 1
    );
  };

  return (
    <section className="relative min-h-screen py-24 px-4 bg-gradient-to-br from-[#FFF9F2] via-[#FFF5ED] to-[#FFF0EA] dark:from-[#1E110B] dark:via-[#160B05] dark:to-[#0D0502]">
      
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-amber-600 bg-amber-50 dark:bg-amber-950/30 px-3 py-1.5 rounded-full">
            Photo Gallery
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mt-4 text-zinc-950 dark:text-white">
            Pictures You Shared With Me
          </h2>
          <p className="font-sans text-zinc-655 dark:text-zinc-400 mt-4 max-w-md mx-auto font-light">
            Every picture you sent me — and how I see you in each one. 🌸
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {birthdayData.gallery.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedIndex(index)}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-white/50 dark:border-zinc-800/50 cursor-pointer bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm transition-all duration-300"
            >
              {/* Media Preview */}
          {isVideoUrl(photo.url) ? (
            <video
              src={photo.url}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              muted
              loop
              playsInline
              autoPlay
              controls={false}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          )}
          
          {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <p className="font-sans text-xs font-light tracking-wide uppercase opacity-75">Photo #{index + 1}</p>
                <p className="font-serif text-sm font-medium mt-1 line-clamp-2">{photo.caption}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 select-none"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left Control */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-8 text-white/70 hover:text-white bg-white/5 md:bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Center Container */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Active Media */}
              {isVideoUrl(birthdayData.gallery[selectedIndex].url) ? (
                <video
                  src={birthdayData.gallery[selectedIndex].url}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={birthdayData.gallery[selectedIndex].url}
                  alt={birthdayData.gallery[selectedIndex].caption}
                  className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                />
              )}

              {/* Caption */}
              <div className="text-center mt-6 max-w-lg">
                <span className="text-zinc-550 font-sans text-xs uppercase tracking-widest font-light">
                  {selectedIndex + 1} of {birthdayData.gallery.length}
                </span>
                <p className="text-white font-serif text-lg md:text-xl font-medium mt-2">
                  {birthdayData.gallery[selectedIndex].caption}
                </p>
              </div>
            </motion.div>

            {/* Right Control */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 text-white/70 hover:text-white bg-white/5 md:bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function VideoSection() {
  return (
    <section className="relative py-24 px-4 bg-zinc-950 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-transparent pointer-events-none" />

      <div className="max-w-4xl w-full z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-amber-500 bg-amber-950/30 px-3 py-1.5 rounded-full">
            A Glimpse of Joy
          </span>
          <h2 className="font-script text-5xl md:text-7xl font-normal mt-4 text-white">
            Moments to Cherish
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-zinc-800/50 bg-black group relative"
        >
          <video
            className="w-full h-full object-cover"
            controls
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/videos/happy-birthday-divya.mp4#t=0.1"
          >
            <source src="/videos/happy-birthday-divya.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
}

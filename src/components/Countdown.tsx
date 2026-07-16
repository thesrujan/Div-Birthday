"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import { birthdayData } from "@/config/birthdayData";

interface CountdownConfig {
  targetDate: string;
  label: string;
  showCountdown: boolean;
}

export default function Countdown() {
  const [daysTogether, setDaysTogether] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [config, setConfig] = useState<CountdownConfig | null>(null);

  // Fetch countdown config from public/countdown.json
  useEffect(() => {
    fetch("/countdown.json")
      .then((r) => r.json())
      .then((data) => setConfig(data))
      .catch(() =>
        setConfig({ targetDate: "", label: "Until we meet! ❤️", showCountdown: true })
      );
  }, []);

  // Days connected counter with animation
  useEffect(() => {
    const startDate = new Date(birthdayData.datingStartDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    let startVal = Math.max(0, totalDays - 45);
    const interval = setInterval(() => {
      if (startVal < totalDays) {
        startVal++;
        setDaysTogether(startVal);
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, []);

  // Custom countdown timer
  useEffect(() => {
    if (!config?.targetDate) return;
    const target = new Date(config.targetDate);
    const update = () => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeRemaining({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [config]);

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-[#FFFDF9] via-[#FFF9F2] to-[#FFF5ED] dark:from-[#1E110B] dark:via-[#160B05] dark:to-[#0D0502] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs font-semibold uppercase tracking-widest text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-3 py-1.5 rounded-full">
            Us ❤️
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Days Connected */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/60 border border-white/50 dark:border-zinc-800/40 shadow-xl backdrop-blur-md text-center"
          >
            <div className="font-serif text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400 tracking-tight">
              {daysTogether}
            </div>
          </motion.div>

          {/* Custom Countdown */}
          {config?.showCountdown && config.targetDate && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col items-center justify-center p-8 rounded-3xl bg-white/70 dark:bg-zinc-900/60 border border-white/50 dark:border-zinc-800/40 shadow-xl backdrop-blur-md text-center"
            >
              <div className="flex gap-3 md:gap-4">
                {[
                  { val: timeRemaining.days, label: "Days" },
                  { val: timeRemaining.hours, label: "Hours" },
                  { val: timeRemaining.minutes, label: "Mins" },
                  { val: timeRemaining.seconds, label: "Secs" },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white w-14 md:w-16 h-14 md:h-16 flex items-center justify-center rounded-2xl bg-rose-50/60 dark:bg-zinc-800/30 border border-rose-100/40 dark:border-zinc-800/30 shadow-inner">
                      {String(item.val).padStart(2, "0")}
                    </div>
                    <span className="font-sans text-[10px] font-medium uppercase tracking-wider text-zinc-400 mt-2">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

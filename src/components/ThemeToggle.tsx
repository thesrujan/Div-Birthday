"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check saved preference or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 right-6 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-white/70 dark:bg-zinc-900/70 border border-white/40 dark:border-zinc-800/30 text-rose-500 shadow-lg backdrop-blur-md cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-300"
      aria-label="Toggle Theme"
    >
      {theme === "light" ? (
        <Moon className="w-4.5 h-4.5 text-zinc-650 dark:text-zinc-400" />
      ) : (
        <Sun className="w-4.5 h-4.5 text-amber-500" />
      )}
    </motion.button>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ADMIN_PASSWORD = "divya2026"; // Change this to your own secret password

interface CountdownConfig {
  targetDate: string;
  label: string;
  showCountdown: boolean;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [config, setConfig] = useState<CountdownConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (authed) {
      fetch("/countdown.json")
        .then((r) => r.json())
        .then(setConfig);
    }
  }, [authed]);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Wrong password. Try again.");
    }
  };

  const handleSave = async () => {
    if (!config) return;
    setSaving(true);
    try {
      await fetch("/api/countdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Failed to save. Make sure the dev server is running.");
    }
    setSaving(false);
  };

  // ── Login Screen ──
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-sm shadow-2xl"
        >
          <h1 className="text-white font-serif text-2xl font-bold mb-2">🔐 Admin Panel</h1>
          <p className="text-zinc-400 text-sm mb-6">Only you should be here. 😉</p>

          <label className="text-zinc-400 text-xs uppercase tracking-widest block mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter secret password"
            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-rose-500 transition mb-3"
          />
          {error && <p className="text-rose-400 text-xs mb-3">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold py-3 rounded-xl hover:opacity-90 active:scale-95 transition cursor-pointer"
          >
            Enter
          </button>
        </motion.div>
      </div>
    );
  }

  // ── Admin Dashboard ──
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12">
      <div className="max-w-xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-white font-serif text-3xl font-bold mb-1">🎛️ Admin Panel</h1>
          <p className="text-zinc-400 text-sm mb-8">Make changes here — Divya won't see a thing. 😏</p>

          {config && (
            <div className="space-y-6">
              {/* Countdown Target Date */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-white font-semibold text-lg mb-4">⏰ Countdown Timer</h2>

                <label className="text-zinc-400 text-xs uppercase tracking-widest block mb-1">
                  Countdown Target Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={config.targetDate.slice(0, 16)}
                  onChange={(e) =>
                    setConfig({ ...config, targetDate: e.target.value + ":00" })
                  }
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-rose-500 transition mb-4"
                />

                <label className="text-zinc-400 text-xs uppercase tracking-widest block mb-1">
                  Countdown Label (shown to Divya)
                </label>
                <input
                  type="text"
                  value={config.label}
                  onChange={(e) => setConfig({ ...config, label: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-rose-500 transition mb-4"
                  placeholder="e.g. Until we meet! ❤️"
                />

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showCountdown}
                    onChange={(e) => setConfig({ ...config, showCountdown: e.target.checked })}
                    className="w-4 h-4 accent-rose-500"
                  />
                  <span className="text-zinc-300 text-sm">Show countdown timer to Divya</span>
                </label>
              </div>

              {/* Preview Links */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-white font-semibold text-lg mb-4">🔗 Quick Links</h2>
                <div className="space-y-2 text-sm">
                  <a
                    href="/?preview=true"
                    target="_blank"
                    className="flex items-center gap-2 text-rose-400 hover:text-rose-300 transition"
                  >
                    🎂 Preview Full Birthday Site (bypasses lock for you)
                  </a>
                  <p className="text-zinc-500 text-xs">
                    Note: The lock screen checks the current date. Share the public link with Divya only — she'll see the countdown until midnight on July 27.
                  </p>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold py-4 rounded-2xl hover:opacity-90 active:scale-95 transition cursor-pointer disabled:opacity-60 text-lg"
              >
                {saving ? "Saving..." : saved ? "✅ Saved!" : "Save Changes"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

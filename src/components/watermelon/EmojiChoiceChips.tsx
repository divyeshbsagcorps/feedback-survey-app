import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Option {
  value: string;
  label: string;
  emoji?: string;
}

interface EmojiChoiceChipsProps {
  name: string;
  options: Option[];
  value: string | string[];
  multiple?: boolean;
  onChange: (val: string | string[]) => void;
  onBlur?: () => void;
}

const DEFAULT_EMOJIS: Record<string, string> = {
  excellent: "😍",
  good: "😊",
  average: "😐",
  poor: "🙁",
  yes: "👍",
  no: "👎",
  "ui-design": "🎨",
  "response-time": "⚡",
  "customer-support": "🎧",
  features: "🚀",
  mobile: "📱",
  desktop: "💻",
  tablet: "📲",
  "social-media": "📲",
  friends: "🤝",
  colleagues: "🏢",
  "online-advertisement": "🌐",
  other: "✨",
  hr: "👥",
  engineering: "⚙️",
  marketing: "📢",
  finance: "💼",
};

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

export const EmojiChoiceChips: React.FC<EmojiChoiceChipsProps> = ({
  options,
  value,
  multiple = false,
  onChange,
  onBlur,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const triggerEmojiBurst = (emoji: string) => {
    const newParticles: Particle[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      emoji,
      x: (Math.random() - 0.5) * 80,
      y: -20 - Math.random() * 50,
    }));
    setParticles((prev) => [...prev.slice(-12), ...newParticles]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.includes(p)));
    }, 800);
  };

  const handleSelect = (optionValue: string, emoji: string) => {
    triggerEmojiBurst(emoji);

    if (multiple) {
      const currentArr = Array.isArray(value) ? value : [];
      if (currentArr.includes(optionValue)) {
        onChange(currentArr.filter((item) => item !== optionValue));
      } else {
        onChange([...currentArr, optionValue]);
      }
    } else {
      onChange(optionValue);
    }

    if (onBlur) onBlur();
  };

  const isSelected = (optionValue: string) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div className="relative">
      {/* Floating Emoji Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, scale: 0.8, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, x: p.x, y: p.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute text-lg z-30"
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Chips Container */}
      <div className="choice-chips-grid">
        {options.map((option) => {
          const selected = isSelected(option.value);
          const emoji =
            option.emoji || DEFAULT_EMOJIS[option.value] || "✨";

          return (
            <motion.button
              key={option.value}
              type="button"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelect(option.value, emoji)}
              className={`relative px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border flex items-center gap-2 cursor-pointer outline-none select-none ${
                selected
                  ? "bg-gradient-to-r from-indigo-600/90 to-purple-600/90 border-indigo-400 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/40"
                  : "bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-700/60 hover:text-white hover:border-slate-600"
              }`}
            >
              <span className="text-base">{emoji}</span>
              <span>{option.label}</span>
              {selected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default EmojiChoiceChips;

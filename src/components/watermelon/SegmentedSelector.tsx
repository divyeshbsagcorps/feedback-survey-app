import React from "react";
import { motion } from "framer-motion";

export interface SegmentOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface SegmentedSelectorProps {
  options: SegmentOption[];
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
}

export const SegmentedSelector: React.FC<SegmentedSelectorProps> = ({
  options,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <div className="relative flex p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl w-full">
      {options.map((option) => {
        const isSelected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              onChange(option.value);
              if (onBlur) onBlur();
            }}
            className={`relative flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-colors z-10 cursor-pointer outline-none select-none ${
              isSelected ? "text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            {isSelected && (
              <motion.div
                layoutId="segmented-active-pill"
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md border border-indigo-400/30"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {option.icon && (
              <span className="relative z-10 text-base">{option.icon}</span>
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedSelector;

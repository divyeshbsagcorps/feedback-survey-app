import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface StepItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: StepItem[];
  onStepClick?: (stepIndex: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
  onStepClick,
}) => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="w-full mb-6">
      {/* Progress Bar Container */}
      <div className="relative flex items-center justify-between px-2 py-3">
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-[3px] bg-slate-800 rounded-full z-0 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Step Nodes */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;
          const isHovered = hoveredStep === stepNumber;
          const Icon = step.icon;

          return (
            <div
              key={step.id}
              className="relative z-10 flex flex-col items-center cursor-pointer group"
              onMouseEnter={() => setHoveredStep(stepNumber)}
              onMouseLeave={() => setHoveredStep(null)}
              onClick={() => {
                if (isCompleted && onStepClick) {
                  onStepClick(stepNumber);
                }
              }}
            >
              {/* Tooltip on Hover / Active */}
              <AnimatePresence>
                {(isHovered || (isActive && !hoveredStep)) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-10 px-3 py-1 bg-slate-900 border border-indigo-500/30 text-slate-100 text-xs font-semibold rounded-full shadow-lg whitespace-nowrap pointer-events-none flex items-center gap-1.5 z-20"
                  >
                    <span>{step.title}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Circle Icon Badge */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isCompleted
                    ? "#10b981"
                    : isActive
                    ? "#6366f1"
                    : "#1e293b",
                  borderColor: isCompleted
                    ? "#34d399"
                    : isActive
                    ? "#818cf8"
                    : "#334155",
                }}
                className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-colors shadow-md ${
                  isActive
                    ? "shadow-indigo-500/30 ring-4 ring-indigo-500/20"
                    : isCompleted
                    ? "shadow-emerald-500/20"
                    : ""
                }`}
                style={{
                  color: isCompleted || isActive ? "#ffffff" : "#94a3b8",
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </motion.div>

              {/* Title underneath */}
              <span
                className={`mt-2 text-xs font-semibold transition-colors hidden sm:block ${
                  isActive
                    ? "text-indigo-400"
                    : isCompleted
                    ? "text-emerald-400"
                    : "text-slate-500"
                }`}
              >
                Step {stepNumber}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;

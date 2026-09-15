import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, Sparkles } from "lucide-react";

interface SurveyHeaderProps {
  currentStep: number;
  totalSteps: number;
  answeredCount: number;
  totalQuestions: number;
}

export const SurveyHeader: React.FC<SurveyHeaderProps> = ({
  currentStep,
  totalSteps,
  answeredCount,
  totalQuestions,
}) => {
  const percentComplete = Math.round((answeredCount / totalQuestions) * 100);
  const timeRemainingMinutes = Math.max(1, Math.ceil((totalQuestions - answeredCount) * 0.4));

  return (
    <div className="w-full mb-6">
      {/* Top Bar with Badge & Live Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Watermelon UI Survey</span>
        </div>

        {/* Stats Pill */}
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-slate-800">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              <strong className="text-slate-200">{answeredCount}</strong> / {totalQuestions} Answered
            </span>
          </div>
          <div className="w-px h-3 bg-slate-800" />
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>~{timeRemainingMinutes} min left</span>
          </div>
        </div>
      </div>

      {/* Title & Subtitle */}
      <div className="text-center mb-5">
        <h2 className="text-2xl sm:text-3xl font-extrabold gradient-heading m-0 mb-1">
          Interactive Feedback Survey
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 m-0">
          Step {currentStep} of {totalSteps} — Share your thoughts to help us improve
        </p>
      </div>

      {/* Progress bar line */}
      <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${percentComplete}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
};

export default SurveyHeader;

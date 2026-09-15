import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type FormValues } from "../../types/types";
import ShimmerButton from "./ShimmerButton";
import {
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  User,
  Mail,
  Building2,
  Star,
  MessageSquare,
} from "lucide-react";

interface SurveySummaryModalProps {
  isOpen: boolean;
  values: FormValues;
  onReset: () => void;
}

export const SurveySummaryModal: React.FC<SurveySummaryModalProps> = ({
  isOpen,
  values,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(values, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          className="modal-content-glass max-w-lg"
        >
          {/* Header Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 text-emerald-400">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h3 className="text-2xl font-extrabold text-white mb-1">
            Response Submitted!
          </h3>
          <p className="text-slate-400 text-xs mb-5">
            Thank you! Here is a summary of your submitted survey feedback.
          </p>

          {/* Submission Details Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-left space-y-3 mb-6 max-h-60 overflow-y-auto">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-indigo-400" /> Name
              </span>
              <span className="text-slate-100 font-semibold">{values.name || "N/A"}</span>
            </div>

            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Mail className="w-3.5 h-3.5 text-indigo-400" /> Email
              </span>
              <span className="text-slate-100 font-semibold">{values.email || "N/A"}</span>
            </div>

            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Department
              </span>
              <span className="text-indigo-400 font-semibold uppercase">{values.department || "N/A"}</span>
            </div>

            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Star className="w-3.5 h-3.5 text-indigo-400" /> Satisfaction
              </span>
              <span className="text-emerald-400 font-semibold capitalize">{values.satisfaction || "N/A"}</span>
            </div>

            <div className="flex items-start justify-between text-xs pt-1">
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <MessageSquare className="w-3.5 h-3.5 text-indigo-400" /> Feedback
              </span>
              <span className="text-slate-200 font-normal italic max-w-[220px] text-right">
                "{values.feedback || "No additional comments"}"
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <ShimmerButton
              type="button"
              variant="secondary"
              fullWidth
              icon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              onClick={handleCopyJSON}
            >
              {copied ? "Copied JSON!" : "Copy JSON Data"}
            </ShimmerButton>

            <ShimmerButton
              type="button"
              variant="primary"
              fullWidth
              icon={<RotateCcw className="w-4 h-4" />}
              onClick={onReset}
            >
              Submit Another Response
            </ShimmerButton>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SurveySummaryModal;

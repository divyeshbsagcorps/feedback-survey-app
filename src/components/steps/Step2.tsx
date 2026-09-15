import React from "react";
import { type FormikProps } from "formik";
import { type FormValues } from "../../types/types";
import { questions } from "../../utils/questions";
import DynamicField from "../dynamicfield";
import CardAccordion from "../watermelon/CardAccordion";
import { Star, Sparkles } from "lucide-react";

interface StepProps {
  formik: FormikProps<FormValues>;
}

export const Step2: React.FC<StepProps> = ({ formik }) => {
  const stepQuestions = questions.filter((q) => q.step === 2);

  return (
    <div className="space-y-4">
      {/* Step Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
          <Star className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100 m-0">
            Step 2: Satisfaction & Rating
          </h3>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Rate your overall experience and share detailed feedback.
          </p>
        </div>
      </div>

      {/* Accordion Tip */}
      <CardAccordion
        title="Tips for effective feedback"
        subtitle="How your rating impacts product development"
        icon={<Sparkles className="w-4 h-4 text-purple-400" />}
        badge="Tips"
      >
        <p className="m-0 text-slate-300 text-xs leading-relaxed">
          Be as specific as possible in your written feedback. Mention particular features, response speeds, or user interface elements that stood out during your experience.
        </p>
      </CardAccordion>

      {/* Dynamic Fields */}
      {stepQuestions.map((q) => (
        <DynamicField key={q.id} question={q} formik={formik} />
      ))}
    </div>
  );
};

export default Step2;

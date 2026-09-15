import React from "react";
import { type FormikProps } from "formik";
import { type FormValues } from "../../types/types";
import { questions } from "../../utils/questions";
import DynamicField from "../dynamicfield";
import CardAccordion from "../watermelon/CardAccordion";
import { Sliders, ClipboardCheck } from "lucide-react";

interface StepProps {
  formik: FormikProps<FormValues>;
}

export const Step3: React.FC<StepProps> = ({ formik }) => {
  const stepQuestions = questions.filter((q) => q.step === 3);

  return (
    <div className="space-y-4">
      {/* Step Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <Sliders className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100 m-0">
            Step 3: Preferences & Review
          </h3>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Select preferred features, channels, and review your survey.
          </p>
        </div>
      </div>

      {/* Dynamic Fields */}
      {stepQuestions.map((q) => (
        <DynamicField key={q.id} question={q} formik={formik} />
      ))}

      {/* Accordion Live Review Summary */}
      <CardAccordion
        title="Review Your Survey Answers"
        subtitle="Click to expand and double-check your responses before submitting"
        icon={<ClipboardCheck className="w-4 h-4 text-emerald-400" />}
        badge="Review"
        defaultOpen={true}
      >
        <div className="space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400 font-medium">Name:</span>
            <span className="text-slate-100 font-semibold">{formik.values.name || "—"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400 font-medium">Email:</span>
            <span className="text-slate-100 font-semibold">{formik.values.email || "—"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400 font-medium">Department:</span>
            <span className="text-slate-100 font-semibold uppercase">{formik.values.department || "—"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400 font-medium">Satisfaction:</span>
            <span className="text-indigo-400 font-semibold capitalize">{formik.values.satisfaction || "—"}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-800">
            <span className="text-slate-400 font-medium">Recommend:</span>
            <span className="text-indigo-400 font-semibold capitalize">{formik.values.recommend || "—"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400 font-medium">Feedback:</span>
            <span className="text-slate-100 font-semibold truncate max-w-[200px]">{formik.values.feedback || "—"}</span>
          </div>
        </div>
      </CardAccordion>
    </div>
  );
};

export default Step3;

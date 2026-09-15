import React from "react";
import { type FormikProps } from "formik";
import { type FormValues } from "../../types/types";
import { questions } from "../../utils/questions";
import DynamicField from "../dynamicfield";
import CardAccordion from "../watermelon/CardAccordion";
import { UserCheck, Info } from "lucide-react";

interface StepProps {
  formik: FormikProps<FormValues>;
}

export const Step1: React.FC<StepProps> = ({ formik }) => {
  const stepQuestions = questions.filter((q) => q.step === 1);

  return (
    <div className="space-y-4">
      {/* Step Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-100 m-0">
            Step 1: Personal Details
          </h3>
          <p className="text-xs text-slate-400 m-0 mt-0.5">
            Help us identify your feedback and department.
          </p>
        </div>
      </div>

      {/* Accordion Guidance */}
      <CardAccordion
        title="Why do we collect your personal details?"
        subtitle="Privacy and data confidentiality guidelines"
        icon={<Info className="w-4 h-4 text-indigo-400" />}
        badge="Privacy"
      >
        <p className="m-0 text-slate-300 text-xs leading-relaxed">
          Your name and email address allow us to route your suggestions to the appropriate department head. All responses are kept strictly confidential under enterprise security standards.
        </p>
      </CardAccordion>

      {/* Dynamic Fields */}
      {stepQuestions.map((q) => (
        <DynamicField key={q.id} question={q} formik={formik} />
      ))}
    </div>
  );
};

export default Step1;

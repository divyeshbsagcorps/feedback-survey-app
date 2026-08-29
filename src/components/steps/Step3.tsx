import React from "react";
import { type FormikProps } from "formik";
import { type FormValues } from "../../types/types";
import { questions } from "../../utils/questions";
import DynamicField from "../dynamicfield";

interface StepProps {
  formik: FormikProps<FormValues>;
}

export const Step3: React.FC<StepProps> = ({ formik }) => {
  const stepQuestions = questions.filter((q) => q.step === 3);

  return (
    <div>
      <h5 className="fw-bold mb-3">Step 3: Preferences</h5>
      {stepQuestions.map((q) => (
        <DynamicField key={q.id} question={q} formik={formik} />
      ))}
    </div>
  );
};

export default Step3;

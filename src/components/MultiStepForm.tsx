import React, { useState } from "react";
import { useFormik, FormikProvider } from "formik";
import { type FormValues } from "../types/types";
import { questions } from "../utils/questions";
import { createValidationSchema } from "../utils/validation";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

export const MultiStepForm: React.FC = () => {

  const [step, setStep] = useState<number>(1);
  const TOTAL_STEPS = 3;


  const formik = useFormik<FormValues>({
    initialValues: {
      name: "",
      email: "",
      feedback: "",
      satisfaction: "",
      recommend: "",
      department: "",
      source: "",
      likedfeatures: [],
      platforms: [],
    },
    validationSchema: createValidationSchema(questions),
    onSubmit: (values) => {
      alert("Form submitted successfully!\n");
      console.log(values);
      formik.resetForm();
    },
  });

  
  const handleNext = async () => {
    const errors = await formik.validateForm();
    const currentQuestions = questions.filter((q) => q.step === step);

   
    const currentStepHasErrors = currentQuestions.some((q) => Boolean(errors[q.id]));

    if (currentStepHasErrors) {
      
      currentQuestions.forEach((q) => {
        formik.setFieldTouched(q.id, true, false);
      });
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
      <h3 className="fw-bold text-center mb-1">Feedback Survey</h3>
      <p className="text-muted text-center small mb-4">Step {step} of {TOTAL_STEPS}</p>

      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          
          {step === 1 && <Step1 formik={formik} />}
          {step === 2 && <Step2 formik={formik} />}
          {step === 3 && <Step3 formik={formik} />}

          
          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
            {step > 1 ? (
              <button type="button" className="btn btn-outline-secondary" onClick={handleBack}>
                Back
              </button>
            ) : (
              <div />
            )}

            {step < TOTAL_STEPS ? (
              <button type="button" className="btn btn-primary ms-auto" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-success ms-auto">
                Submit
              </button>
            )}
          </div>
        </form>
      </FormikProvider>
    </div>
  );
};

export default MultiStepForm;

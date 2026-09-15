import React, { useState } from "react";
import { useFormik, FormikProvider } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { type FormValues } from "../types/types";
import { questions } from "../utils/questions";
import { createValidationSchema } from "../utils/validation";

import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";

import SurveyHeader from "./layout/SurveyHeader";
import StepIndicator, { type StepItem } from "./watermelon/StepIndicator";
import ShimmerButton from "./watermelon/ShimmerButton";
import SurveySummaryModal from "./watermelon/SurveySummaryModal";

import { User, Star, Sliders, ArrowRight, ArrowLeft, Send } from "lucide-react";

const STEP_ITEMS: StepItem[] = [
  {
    id: 1,
    title: "Personal Info",
    description: "Basic contact details",
    icon: User,
  },
  {
    id: 2,
    title: "Feedback & Rating",
    description: "Rate experience",
    icon: Star,
  },
  {
    id: 3,
    title: "Preferences",
    description: "Features & summary",
    icon: Sliders,
  },
];

export const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
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
    onSubmit: async (values) => {
      setIsSubmitting(true);
      // Simulate smooth network delay for submit feedback
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsSubmitting(false);

      // Trigger Confetti explosion
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      setIsSubmitted(true);
      console.log("Submitted survey form values:", values);
    },
  });

  // Calculate total answered fields count
  const answeredCount = Object.entries(formik.values).filter(([_, val]) => {
    if (Array.isArray(val)) return val.length > 0;
    return Boolean(val && String(val).trim().length > 0);
  }).length;

  const totalQuestions = questions.length;

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

    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    formik.resetForm();
    setStep(1);
    setIsSubmitted(false);
  };

  return (
    <div className="survey-card">
      {/* Live Survey Header */}
      <SurveyHeader
        currentStep={step}
        totalSteps={TOTAL_STEPS}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
      />

      {/* Watermelon Step Indicator */}
      <StepIndicator
        currentStep={step}
        totalSteps={TOTAL_STEPS}
        steps={STEP_ITEMS}
        onStepClick={(targetStep) => setStep(targetStep)}
      />

      {/* Formik Provider & Step Pages */}
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="min-h-[380px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
              >
                {step === 1 && <Step1 formik={formik} />}
                {step === 2 && <Step2 formik={formik} />}
                {step === 3 && <Step3 formik={formik} />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action Navigation Bar */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800">
            {step > 1 ? (
              <ShimmerButton
                type="button"
                variant="secondary"
                icon={<ArrowLeft className="w-4 h-4" />}
                iconPosition="left"
                onClick={handleBack}
              >
                Back
              </ShimmerButton>
            ) : (
              <div />
            )}

            {step < TOTAL_STEPS ? (
              <ShimmerButton
                type="button"
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={handleNext}
                className="ml-auto"
              >
                Continue
              </ShimmerButton>
            ) : (
              <ShimmerButton
                type="submit"
                variant="success"
                isLoading={isSubmitting}
                icon={<Send className="w-4 h-4" />}
                className="ml-auto"
              >
                Submit Survey
              </ShimmerButton>
            )}
          </div>
        </form>
      </FormikProvider>

      {/* Survey Summary Modal */}
      <SurveySummaryModal
        isOpen={isSubmitted}
        values={formik.values}
        onReset={handleReset}
      />
    </div>
  );
};

export default MultiStepForm;

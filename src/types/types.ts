import { type FormikProps } from "formik";

export type Option = {
  value: string;
  label: string;
};

export type Question = {
  id: keyof FormValues;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: Option[];
  step?: number;
};

export type FormStep = {
  id: number;
  title: string;
  icon: string;
  description?: string;
};

export type FormValues = {
  name: string;
  email: string;
  feedback: string;
  satisfaction: string;
  recommend: string;
  department: string;
  source: string;
  likedfeatures: string[];
  platforms: string[];
};

export type DynamicFieldProps = {
  question: Question;
  formik: FormikProps<FormValues>;
};
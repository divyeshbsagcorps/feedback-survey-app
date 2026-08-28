import * as Yup from "yup";
import { type Question } from "../types/types";


export const createValidationSchema = (questions: Question[]) => {
  const schema: Record<string, Yup.AnySchema> = {};

  questions.forEach((question) => {

    if (question.type === "checkbox") {
      let arrayValidator = Yup.array();

      if (question.required) {
        arrayValidator = arrayValidator
          .min(1, `This field is required`)
          .required(`This field is required`);
      }

      schema[question.id] = arrayValidator;
      return;
    }

    let stringValidator = Yup.string();

    if (question.type === "email") {
      stringValidator = stringValidator.email("Invalid email address");
    }

    if (question.required) {
      stringValidator = stringValidator.required(`${question.label} is required`);
    }

    schema[question.id] = stringValidator;
  });

  return Yup.object().shape(schema);
};
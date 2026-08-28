import { useFormik } from "formik";
import { questions } from "./utils/questions";
import { type FormValues } from "./types/types";
import DynamicField from "./components/dynamicfield";
import { createValidationSchema } from "./utils/validation";

function App() {
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
      console.log(values);
    },
  });

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "650px" }}>
        <h2 className="mb-4 text-center fw-bold">Feedback Survey</h2>

        <form onSubmit={formik.handleSubmit}>
          {questions.map((question) => (
            <DynamicField key={question.id}
              question={question}
              formik={formik}
            />
          ))}

          <button type="submit" className="btn btn-primary w-100 mt-3 py-2 fw-semibold">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
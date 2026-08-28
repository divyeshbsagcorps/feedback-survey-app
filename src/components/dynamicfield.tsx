import { type DynamicFieldProps } from "../types/types";

function DynamicField({ question, formik }: DynamicFieldProps) {
  const value = formik.values[question.id];

  return (
    <div className="mb-3">
      <label className="form-label fw-semibold">{question.label}</label>

      {question.type === "text" && (
        <input
          type="text"
          name={question.id}
          value={value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={question.placeholder}
          className="form-control"
        />
      )}

      {question.type === "email" && (
        <input
          type="email"
          name={question.id}
          value={value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={question.placeholder}
          className="form-control"
        />
      )}

      {question.type === "textarea" && (
        <textarea
          name={question.id}
          value={value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={question.placeholder}
          className="form-control"
        />
      )}

      {question.type === "radio" && (
        <div>
          {question.options?.map((option) => (
            <div key={option.value} className="form-check">
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={value === option.value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-check-input"
              />
              <label className="form-check-label">{option.label}</label>
            </div>
          ))}
        </div>
      )}

      {question.type === "select" && (
        <select
          name={question.id}
          value={value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-select"
        >
          <option value="">Select an option</option>
          {question.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}

      {question.type === "checkbox" && (
        <div>
          {question.options?.map((option) => (
            <div key={option.value} className="form-check">
              <input
                type="checkbox"
                name={question.id}
                value={option.value}
                checked={Array.isArray(value) && value.includes(option.value)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="form-check-input"
              />
              <label className="form-check-label">{option.label}</label>
            </div>
          ))}
        </div>
      )}

      {formik.touched[question.id] &&
        formik.errors[question.id] && (
          <p className="text-danger small mt-1">{formik.errors[question.id]}</p>
        )}
    </div>
  );
}

export default DynamicField;
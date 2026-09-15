import { type DynamicFieldProps } from "../types/types";
import EmojiChoiceChips from "./watermelon/EmojiChoiceChips";
import SegmentedSelector, { type SegmentOption } from "./watermelon/SegmentedSelector";
import { User, Mail, Building2, MessageSquare, AlertCircle, HelpCircle, ThumbsUp, ThumbsDown } from "lucide-react";

const getFieldIcon = (id: string, type: string) => {
  if (id === "name") return <User className="w-4 h-4 text-indigo-400" />;
  if (id === "email") return <Mail className="w-4 h-4 text-indigo-400" />;
  if (id === "department") return <Building2 className="w-4 h-4 text-indigo-400" />;
  if (type === "textarea") return <MessageSquare className="w-4 h-4 text-indigo-400" />;
  return <HelpCircle className="w-4 h-4 text-indigo-400" />;
};

function DynamicField({ question, formik }: DynamicFieldProps) {
  const value = formik.values[question.id];
  const hasError = Boolean(formik.touched[question.id] && formik.errors[question.id]);
  const errorMessage = formik.errors[question.id] as string;

  // Use SegmentedSelector for small option sets like department or recommend
  const isSegmentedField = question.id === "department" || question.id === "recommend";

  const getSegmentOptions = (): SegmentOption[] => {
    return (
      question.options?.map((opt) => {
        let icon: React.ReactNode = undefined;
        if (opt.value === "yes") icon = <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />;
        if (opt.value === "no") icon = <ThumbsDown className="w-3.5 h-3.5 text-pink-400" />;
        return {
          value: opt.value,
          label: opt.label,
          icon,
        };
      }) || []
    );
  };

  return (
    <div className="mb-5">
      {/* Field Label */}
      <label className="form-label-custom">
        {getFieldIcon(question.id, question.type)}
        <span>{question.label}</span>
        {question.required && <span className="text-pink-400 font-bold ml-0.5">*</span>}
      </label>

      {/* Segmented Selector for concise options */}
      {isSegmentedField ? (
        <SegmentedSelector
          options={getSegmentOptions()}
          value={value as string}
          onChange={(val) => formik.setFieldValue(question.id, val)}
          onBlur={() => formik.setFieldTouched(question.id, true)}
        />
      ) : (
        <>
          {/* Standard Text Input */}
          {question.type === "text" && (
            <input
              type="text"
              name={question.id}
              value={(value as string) || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={question.placeholder}
              className={`glass-input ${hasError ? "!border-red-400/80 !shadow-red-500/10" : ""}`}
            />
          )}

          {/* Email Input */}
          {question.type === "email" && (
            <input
              type="email"
              name={question.id}
              value={(value as string) || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={question.placeholder}
              className={`glass-input ${hasError ? "!border-red-400/80 !shadow-red-500/10" : ""}`}
            />
          )}

          {/* Textarea with Character Counter */}
          {question.type === "textarea" && (
            <div className="relative">
              <textarea
                name={question.id}
                rows={3}
                value={(value as string) || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={question.placeholder}
                className={`glass-textarea ${hasError ? "!border-red-400/80 !shadow-red-500/10" : ""}`}
              />
              <div className="text-[10px] text-slate-500 text-right mt-1 pr-1 font-mono">
                {((value as string) || "").length} characters
              </div>
            </div>
          )}

          {/* Select Dropdown */}
          {question.type === "select" && (
            <select
              name={question.id}
              value={(value as string) || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`glass-select ${hasError ? "!border-red-400/80 !shadow-red-500/10" : ""}`}
            >
              <option value="">Select an option...</option>
              {question.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {/* Radio Buttons using Watermelon Choice Chips */}
          {question.type === "radio" && (
            <EmojiChoiceChips
              name={question.id}
              options={question.options || []}
              value={(value as string) || ""}
              multiple={false}
              onChange={(val) => formik.setFieldValue(question.id, val)}
              onBlur={() => formik.setFieldTouched(question.id, true)}
            />
          )}

          {/* Checkboxes using Watermelon Choice Chips */}
          {question.type === "checkbox" && (
            <EmojiChoiceChips
              name={question.id}
              options={question.options || []}
              value={(value as string[]) || []}
              multiple={true}
              onChange={(val) => formik.setFieldValue(question.id, val)}
              onBlur={() => formik.setFieldTouched(question.id, true)}
            />
          )}
        </>
      )}

      {/* Validation Error Badge */}
      {hasError && (
        <div className="error-badge">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default DynamicField;
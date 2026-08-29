import { type Question, type FormStep } from "../types/types";

export const FORM_STEPS: FormStep[] = [
  {
    id: 1,
    title: "Personal Information",
    icon: "bi-person-badge",
    description: "Provide your contact and general details",
  },
  {
    id: 2,
    title: "Satisfaction & Feedback",
    icon: "bi-star-fill",
    description: "Rate your experience and give overall feedback",
  },
  {
    id: 3,
    title: "Preferences & Channels",
    icon: "bi-sliders",
    description: "Tell us about your preferred features and platforms",
  },
];

export const questions: Question[] = [

  {
    id: "name",
    type: "text",
    label: "Name",
    required: true,
    placeholder: "Enter your name",
    step: 1,
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    required: true,
    placeholder: "Enter your email",
    step: 1,
  },
  {
    id: "department",
    type: "select",
    label: "Department",
    required: true,
    options: [
      { value: "hr", label: "HR" },
      { value: "engineering", label: "Engineering" },
      { value: "marketing", label: "Marketing" },
      { value: "finance", label: "Finance" },
    ],
    step: 1,
  },

  
  {
    id: "satisfaction",
    type: "radio",
    label: "How satisfied are you with our service?",
    required: true,
    options: [
      { value: "excellent", label: "Excellent" },
      { value: "good", label: "Good" },
      { value: "average", label: "Average" },
      { value: "poor", label: "Poor" },
    ],
    step: 2,
  },
  {
    id: "recommend",
    type: "radio",
    label: "Would you recommend us to your friend?",
    required: true,
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
    step: 2,
  },
  {
    id: "feedback",
    type: "textarea",
    label: "Feedback",
    required: true,
    placeholder: "Enter your feedback",
    step: 2,
  },

  
  {
    id: "source",
    type: "select",
    label: "How did you hear about us?",
    required: true,
    options: [
      { value: "social-media", label: "Social Media" },
      { value: "friends", label: "Friends" },
      { value: "colleagues", label: "Colleagues" },
      { value: "online-advertisement", label: "Online Advertisement" },
      { value: "other", label: "Other" },
    ],
    step: 3,
  },
  {
    id: "likedfeatures",
    type: "checkbox",
    label: "Which features do you like the most?",
    required: true,
    options: [
      { value: "ui-design", label: "UI Design" },
      { value: "response-time", label: "Response Time" },
      { value: "customer-support", label: "Customer Support" },
      { value: "features", label: "Features" },
    ],
    step: 3,
  },
  {
    id: "platforms",
    type: "checkbox",
    label: "Which platforms do you use?",
    required: true,
    options: [
      { value: "mobile", label: "Mobile" },
      { value: "desktop", label: "Desktop" },
      { value: "tablet", label: "Tablet" },
    ],
    step: 3,
  },
];
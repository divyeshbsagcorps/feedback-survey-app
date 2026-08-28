import { type Question } from "../types/types";

export const questions: Question[] = [
    {
        id: "name",
        type: "text",
        label: "Name",
        required: true,
        placeholder: "Enter your name",

    },

    {
        id: "email",
        type: "email",
        label: "Email",
        required: true,
        placeholder: "Enter your email"
    },

    {
        id: "feedback",
        type: "textarea",
        label: "Feedback",
        required: true,
        placeholder: "Enter your feedback"
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
            { value: "poor", label: "Poor" }
        ]
    },

    {
        id: "recommend",
        type: "radio",
        label: "Would you recommend us to your friend?",
        required: true,
        options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" }
        ]
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
            { value: "finance", label: "Finance" }
        ]
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
            { value: "other", label: "Other" }
        ]
    },

    {
        id: "likedfeatures",
        type: "checkbox",
        label: "Which features do you like the most? (Select all that apply)",
        required: true,
        options: [
            { value: "ui-design", label: "UI Design" },
            { value: "response-time", label: "Response Time" },
            { value: "customer-support", label: "Customer Support" },
            { value: "features", label: "Features" }
        ]
    },

    {
        id: "platforms",
        type: "checkbox",
        label: "Which platforms do you use? (Select all that apply)",
        required: true,
        options: [
            { value: "mobile", label: "Mobile" },
            { value: "desktop", label: "Desktop" },
            { value: "tablet", label: "Tablet" }
        ]
    }
]
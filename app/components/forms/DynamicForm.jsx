"use client";

import { useState } from "react";
import { formTemplates } from "@/app/config/formTemplates";
import { submitFormData } from "@/app/services/formSubmissionService";

export default function DynamicForm({ extractedTexts }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [error, setError] = useState("");

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    setFormData({});
    setAiSummary(""); // Clear summary when option changes
    setError(""); // Clear error when option changes
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setAiSummary("");

    try {
      const response = await submitFormData(
        formData,
        extractedTexts,
        selectedOption
      );

      // Set the AI Answer from response
      setAiSummary(response.data.summary);
      console.log("API Response:", response);
    } catch (error) {
      setError("Failed to submit form. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only show if there's extracted text
  if (extractedTexts.length === 0) return null;

  const options = Object.keys(formTemplates);
  const selectedTemplate = selectedOption ? formTemplates[selectedOption] : [];

  return (
    <div
      style={{
        marginTop: "24px",
        padding: "24px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        border: "1px solid #e0e0e0",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#1a1a1a",
          marginBottom: "16px",
        }}
      >
        Form Selection
      </h2>

      {/* Dropdown */}
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "14px",
          border: "1px solid #d1d5db",
          borderRadius: "6px",
          marginBottom: "20px",
          backgroundColor: "#ffffff",
        }}
      >
        <option value="">Select an option...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Dynamic Form Fields */}
      {selectedTemplate.length > 0 && (
        <form onSubmit={handleSubmit}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "16px",
            }}
          >
            {selectedOption} Form
          </h3>
          {selectedTemplate.map((field) => (
            <div key={field.name} style={{ marginBottom: "16px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "6px",
                }}
              >
                {field.label}
                {field.required && (
                  <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
                )}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  fontSize: "14px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "12px 24px",
              backgroundColor: isSubmitting ? "#9ca3af" : "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: isSubmitting ? "not-allowed" : "pointer",
              marginTop: "8px",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = "#1d4ed8";
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) e.target.style.backgroundColor = "#2563eb";
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </button>
        </form>
      )}

      {/* Error Message */}
      {error && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "6px",
            color: "#dc2626",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      {/* AI Answer Display */}
      {aiSummary && (
        <div
          style={{
            marginTop: "16px",
          }}
        >
          <h4
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: "8px",
            }}
          >
            AI Answer
          </h4>
          <textarea
            readOnly
            value={aiSummary}
            style={{
              width: "100%",
              minHeight: "100px",
              padding: "12px",
              fontSize: "14px",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "6px",
              resize: "vertical",
              color: "#166534",
              lineHeight: "1.5",
            }}
          />
        </div>
      )}
    </div>
  );
}

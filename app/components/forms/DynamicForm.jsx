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
    setAiSummary("");
    setError("");
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
    <div className="mt-6 p-6 bg-white rounded-lg border border-gray-300">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Form Selection
      </h2>

      {/* Dropdown */}
      <select
        value={selectedOption}
        onChange={handleOptionChange}
        className="w-full p-2.5 text-sm border border-gray-300 rounded-md mb-5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            {selectedOption} Form
          </h3>
          {selectedTemplate.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                className="w-full p-2.5 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full px-6 py-3 border-none rounded-lg text-sm font-semibold mt-2
              transition-colors duration-200
              ${
                isSubmitting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              }
            `}
          >
            {isSubmitting ? "Submitting..." : "Submit Form"}
          </button>
        </form>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* AI Answer Display */}
      {aiSummary && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            AI Answer
          </h4>
          <textarea
            readOnly
            value={aiSummary}
            className="w-full min-h-[100px] p-3 text-sm bg-green-50 border border-green-200 rounded-md resize-y text-green-800 leading-relaxed"
          />
        </div>
      )}
    </div>
  );
}

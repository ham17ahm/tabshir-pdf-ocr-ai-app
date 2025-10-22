"use client";

import { useState, useEffect } from "react";
import { submitFormData } from "@/app/services/formSubmissionService";

export default function DynamicForm({ deptConfig, extractedTexts }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiSummary, setAiSummary] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // Get categories with their display names
  const options = Object.keys(deptConfig.formTemplates).map((key) => ({
    key: key, // The actual category key (Category1, Category2)
    displayName: deptConfig.registry[key]?.displayName || key, // User-friendly name
  }));

  useEffect(() => {
    if (options.length === 1 && !selectedOption) {
      setSelectedOption(options[0]);
    }
  }, [options, selectedOption]);

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
        deptConfig,
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

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(aiSummary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        fallbackCopy(aiSummary);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
      fallbackCopy(aiSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }

    document.body.removeChild(textArea);
  };

  if (extractedTexts.length === 0) return null;

  const selectedTemplate = selectedOption
    ? deptConfig.formTemplates[selectedOption]
    : [];

  return (
    <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Form Configuration
      </h2>

      {options.length > 1 && (
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="w-full p-3 text-sm border border-gray-300 rounded-lg mb-5 bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
        >
          <option value="">Select an option...</option>
          {options.map((option) => (
            <option key={option.key} value={option.key}>
              {option.displayName}
            </option>
          ))}
        </select>
      )}

      {selectedTemplate.length > 0 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
            {selectedOption} Form
          </h3>
          {selectedTemplate.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-y transition-all"
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={formData[field.name] || ""}
                  onChange={handleInputChange}
                  className="w-full p-3 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                />
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full px-6 py-3 rounded-lg text-sm font-semibold mt-4
              transition-all duration-200
              ${
                isSubmitting
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white shadow-md hover:shadow-lg cursor-pointer"
              }
            `}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Processing...
              </span>
            ) : (
              "Generate Response"
            )}
          </button>
        </form>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* AI Answer Display */}
      {aiSummary && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-base font-semibold text-gray-900">
              Generated Response
            </h4>
            <button
              onClick={handleCopy}
              className="px-4 py-2 text-sm text-white bg-slate-600 hover:bg-slate-700 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {copied ? (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <textarea
            readOnly
            value={aiSummary}
            className="w-full min-h-[250px] p-4 text-sm bg-green-50 border border-green-200 rounded-lg resize-y text-gray-800 leading-relaxed"
          />
        </div>
      )}
    </div>
  );
}

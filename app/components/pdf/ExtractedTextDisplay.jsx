"use client";

import DynamicForm from "@/app/components/forms/DynamicForm";

export default function ExtractedTextDisplay({ deptConfig, extractedTexts }) {
  return (
    <div className="w-1/2 p-8 bg-gray-50 overflow-y-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        Extracted Text
      </h1>
      <textarea
        readOnly
        value={
          extractedTexts.length === 0
            ? "No text extracted yet. Upload a PDF to begin."
            : extractedTexts
                .map((text, index) => `*****Page ${index + 1}*****\n${text}`)
                .join("\n\n")
        }
        className="w-full h-[33vh] p-4 text-sm font-mono bg-white border border-gray-300 rounded-lg resize-none text-gray-700"
      />

      <DynamicForm deptConfig={deptConfig} extractedTexts={extractedTexts} />
    </div>
  );
}

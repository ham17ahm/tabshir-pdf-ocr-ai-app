"use client";

import DynamicForm from "@/app/components/forms/DynamicForm";

export default function ExtractedTextDisplay({ deptConfig, extractedTexts }) {
  return (
    <div className="w-1/2 p-8 bg-slate-50 overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Extracted Text
      </h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-6">
        <textarea
          readOnly
          value={
            extractedTexts.length === 0
              ? "No text extracted yet. Upload a PDF to begin."
              : extractedTexts
                  .map((text, index) => `━━━ Page ${index + 1} ━━━\n${text}`)
                  .join("\n\n")
          }
          className="w-full h-[33vh] p-4 text-sm font-mono bg-slate-50 border-0 rounded-lg resize-none text-gray-700 focus:outline-none"
        />
      </div>

      <DynamicForm deptConfig={deptConfig} extractedTexts={extractedTexts} />
    </div>
  );
}

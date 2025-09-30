"use client";

import DynamicForm from "@/app/components/forms/DynamicForm";

export default function ExtractedTextDisplay({ extractedTexts }) {
  return (
    <div
      style={{
        width: "50%",
        padding: "32px",
        backgroundColor: "#f9f9f9",
        overflowY: "auto",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "600",
          color: "#1a1a1a",
          marginBottom: "24px",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
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
        style={{
          width: "100%",
          height: "33vh",
          padding: "16px",
          fontSize: "14px",
          fontFamily: "monospace",
          backgroundColor: "#ffffff",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          resize: "none",
          color: "#374151",
        }}
      />

      <DynamicForm extractedTexts={extractedTexts} />
    </div>
  );
}

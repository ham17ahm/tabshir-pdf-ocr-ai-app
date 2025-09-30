"use client";

import { usePdfProcessor } from "@/app/hooks/usePdfProcessor";
import PdfUploader from "@/app/components/pdf/PdfUploader";
import PdfImagePreview from "@/app/components/pdf/PdfImagePreview";
import ExtractedTextDisplay from "@/app/components/pdf/ExtractedTextDisplay";

export default function TestPdfPage() {
  const {
    images,
    extractedTexts,
    loadingPdf,
    loadingOcr,
    error,
    processPdf,
    extractText,
  } = usePdfProcessor();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processPdf(file);
  };

  const handleExtractText = () => {
    extractText();
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Column */}
      <div
        style={{
          width: "50%",
          padding: "32px",
          borderRight: "1px solid #e0e0e0",
          overflowY: "auto",
          backgroundColor: "#ffffff",
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
          PDF to Image Converter
        </h1>

        {/* Buttons Row */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
          <PdfUploader onFileSelect={handleFileChange} loading={loadingPdf} />

          {images.length > 0 && (
            <button
              onClick={handleExtractText}
              disabled={loadingOcr}
              style={{
                padding: "12px 24px",
                backgroundColor: loadingOcr ? "#9ca3af" : "#10b981",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: loadingOcr ? "not-allowed" : "pointer",
                fontWeight: "500",
                fontSize: "14px",
                transition: "background-color 0.2s",
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                whiteSpace: "nowrap",
              }}
              onMouseOver={(e) => {
                if (!loadingOcr) e.target.style.backgroundColor = "#059669";
              }}
              onMouseOut={(e) => {
                if (!loadingOcr) e.target.style.backgroundColor = "#10b981";
              }}
            >
              {loadingOcr ? "Extracting..." : "Extract Text"}
            </button>
          )}
        </div>

        {loadingPdf && (
          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              marginBottom: "12px",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            Converting PDF...
          </p>
        )}

        {loadingOcr && (
          <p
            style={{
              color: "#6b7280",
              fontSize: "14px",
              marginBottom: "12px",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            }}
          >
            Processing OCR...
          </p>
        )}

        {error && (
          <p
            style={{ color: "#ef4444", fontSize: "14px", marginBottom: "12px" }}
          >
            Error: {error}
          </p>
        )}

        <PdfImagePreview images={images} />
      </div>

      {/* Right Column */}
      <ExtractedTextDisplay extractedTexts={extractedTexts} />
    </div>
  );
}

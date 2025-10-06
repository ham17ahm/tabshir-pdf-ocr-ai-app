"use client";

import { usePdfProcessor } from "@/app/hooks/usePdfProcessor";
import PdfUploader from "@/app/components/pdf/PdfUploader";
import PdfImagePreview from "@/app/components/pdf/PdfImagePreview";
import ExtractedTextDisplay from "@/app/components/pdf/ExtractedTextDisplay";
import { psofficeConfig } from "@/app/config/departments/psoffice";

export default function PSOffice() {
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
    <div className="flex h-screen">
      {/* Left Column */}
      <div className="w-1/2 p-8 border-r border-gray-300 overflow-y-auto bg-white">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          PS Office Correspondence Assistance System
        </h1>

        {/* Buttons Row */}
        <div className="flex gap-3 mb-6">
          <PdfUploader onFileSelect={handleFileChange} loading={loadingPdf} />

          {images.length > 0 && (
            <button
              onClick={handleExtractText}
              disabled={loadingOcr}
              className={`
                px-6 py-3 rounded-lg font-medium text-sm text-white
                transition-colors duration-200 whitespace-nowrap
                ${
                  loadingOcr
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
                }
              `}
            >
              {loadingOcr ? "Extracting..." : "Extract Text"}
            </button>
          )}
        </div>

        {loadingPdf && (
          <p className="text-gray-500 text-sm mb-3">Converting PDF...</p>
        )}

        {loadingOcr && (
          <p className="text-gray-500 text-sm mb-3">Processing OCR...</p>
        )}

        {error && <p className="text-red-500 text-sm mb-3">Error: {error}</p>}

        <PdfImagePreview images={images} />
      </div>

      {/* Right Column */}
      <ExtractedTextDisplay
        deptConfig={psofficeConfig}
        extractedTexts={extractedTexts}
      />
    </div>
  );
}

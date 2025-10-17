"use client";

import { usePdfProcessor } from "@/app/hooks/usePdfProcessor";
import PdfUploader from "@/app/components/pdf/PdfUploader";
import PdfImagePreview from "@/app/components/pdf/PdfImagePreview";
import ExtractedTextDisplay from "@/app/components/pdf/ExtractedTextDisplay";
import { tabshir1Config } from "@/app/config/departments/tabshir1";

export default function Tabshir1() {
  const { images, extractedTexts, loadingPdf, loadingOcr, error, processPdf } =
    usePdfProcessor();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processPdf(file);
  };

  return (
    <div className="flex h-screen">
      {/* Left Column */}
      <div className="w-1/2 p-8 border-r border-gray-300 overflow-y-auto bg-white">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Tabshir 1 Correspondence Assistance System
        </h1>

        {/* Buttons Row */}
        <div className="flex gap-3 mb-6">
          <PdfUploader onFileSelect={handleFileChange} loading={loadingPdf} />
        </div>

        {(loadingPdf || loadingOcr) && (
          <p className="text-gray-500 text-sm mb-3">
            Processing PDF and extracting text...
          </p>
        )}

        {error && <p className="text-red-500 text-sm mb-3">Error: {error}</p>}

        <PdfImagePreview images={images} />
      </div>

      {/* Right Column */}
      <ExtractedTextDisplay
        deptConfig={tabshir1Config}
        extractedTexts={extractedTexts}
      />
    </div>
  );
}

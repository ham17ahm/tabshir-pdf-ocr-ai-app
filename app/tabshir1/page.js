"use client";

import { usePdfProcessor } from "@/app/hooks/usePdfProcessor";
import PdfUploader from "@/app/components/pdf/PdfUploader";
import PdfImagePreview from "@/app/components/pdf/PdfImagePreview";
import ExtractedTextDisplay from "@/app/components/pdf/ExtractedTextDisplay";
import { tabshir1Config } from "@/app/config/departments/tabshir1";
import Link from "next/link";

export default function Tabshir1() {
  const { images, extractedTexts, loadingPdf, loadingOcr, error, processPdf } =
    usePdfProcessor();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processPdf(file);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-5 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="text-sm text-slate-300 hover:text-white mb-2 inline-flex items-center gap-1 transition-colors"
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl font-semibold text-white">
              Tabshir 1 Correspondence System
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Column */}
        <div className="w-1/2 p-8 border-r border-gray-200 overflow-y-auto bg-white">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Upload Document
            </h2>
            <PdfUploader onFileSelect={handleFileChange} loading={loadingPdf} />
          </div>

          {(loadingPdf || loadingOcr) && (
            <div className="flex items-center gap-3 text-gray-600 text-sm mb-4 bg-blue-50 p-3 rounded-lg">
              <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
              <span>Processing PDF and extracting text...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4">
              Error: {error}
            </div>
          )}

          <PdfImagePreview images={images} />
        </div>

        {/* Right Column */}
        <ExtractedTextDisplay
          deptConfig={tabshir1Config}
          extractedTexts={extractedTexts}
        />
      </div>
    </div>
  );
}

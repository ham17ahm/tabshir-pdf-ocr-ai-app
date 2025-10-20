"use client";

export default function PdfUploader({ onFileSelect, loading }) {
  return (
    <label
      className={`
        inline-flex items-center gap-2 px-6 py-3 rounded-lg
        font-medium text-sm text-white
        transition-all duration-200
        ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 cursor-pointer shadow-md hover:shadow-lg"
        }
      `}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      {loading ? "Processing..." : "Choose PDF File"}
      <input
        type="file"
        accept="application/pdf"
        onChange={onFileSelect}
        disabled={loading}
        className="hidden"
      />
    </label>
  );
}

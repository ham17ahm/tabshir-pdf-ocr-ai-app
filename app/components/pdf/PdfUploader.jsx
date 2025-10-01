"use client";

export default function PdfUploader({ onFileSelect, loading }) {
  return (
    <label
      className={`
        inline-block px-6 py-3 rounded-lg
        font-medium text-sm text-white
        transition-colors duration-200
        ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }
      `}
    >
      Choose PDF File
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

"use client";

export default function PdfUploader({ onFileSelect, loading }) {
  return (
    <label
      style={{
        display: "inline-block",
        padding: "12px 24px",
        backgroundColor: loading ? "#cccccc" : "#2563eb",
        color: "#ffffff",
        borderRadius: "8px",
        cursor: loading ? "not-allowed" : "pointer",
        fontWeight: "500",
        fontSize: "14px",
        transition: "background-color 0.2s",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
      onMouseOver={(e) => {
        if (!loading) e.target.style.backgroundColor = "#1d4ed8";
      }}
      onMouseOut={(e) => {
        if (!loading) e.target.style.backgroundColor = "#2563eb";
      }}
    >
      Choose PDF File
      <input
        type="file"
        accept="application/pdf"
        onChange={onFileSelect}
        disabled={loading}
        style={{ display: "none" }}
      />
    </label>
  );
}

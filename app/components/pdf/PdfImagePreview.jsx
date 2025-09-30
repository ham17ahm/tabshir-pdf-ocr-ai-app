"use client";

export default function PdfImagePreview({ images }) {
  if (images.length === 0) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      {images.map((img, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>Page {index + 1}</h3>
          <img
            src={img}
            alt={`Page ${index + 1}`}
            style={{ maxWidth: "100%", border: "1px solid #ccc" }}
          />
        </div>
      ))}
    </div>
  );
}

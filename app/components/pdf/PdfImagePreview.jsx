"use client";

export default function PdfImagePreview({ images }) {
  if (images.length === 0) return null;

  return (
    <div className="mt-5">
      {images.map((img, index) => (
        <div key={index} className="mb-5">
          <h3 className="text-lg font-semibold mb-2">Page {index + 1}</h3>
          <img
            src={img}
            alt={`Page ${index + 1}`}
            className="max-w-full border border-gray-300 rounded"
          />
        </div>
      ))}
    </div>
  );
}

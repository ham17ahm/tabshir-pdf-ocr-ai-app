"use client";

export default function PdfImagePreview({ images }) {
  if (images.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Document Preview
      </h3>
      <div className="space-y-6">
        {images.map((img, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="bg-slate-100 px-4 py-2 border-b border-gray-200">
              <h4 className="text-sm font-medium text-gray-700">
                Page {index + 1}
              </h4>
            </div>
            <div className="p-4">
              <img src={img} alt={`Page ${index + 1}`} className="w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { convertPdfToImages } from "@/app/utils/pdfConverter";
import { extractTextFromImage } from "@/app/services/ocrService";

export function usePdfProcessor() {
  const [images, setImages] = useState([]);
  const [extractedTexts, setExtractedTexts] = useState([]);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingOcr, setLoadingOcr] = useState(false);
  const [error, setError] = useState(null);

  const processPdf = async (file) => {
    if (!file) return;

    setLoadingPdf(true);
    setLoadingOcr(true);
    setError(null);
    setImages([]);
    setExtractedTexts([]);

    try {
      // Convert PDF to images
      const convertedImages = await convertPdfToImages(file, { scale: 2 });
      setImages(convertedImages);

      // Automatically extract text from images
      const texts = [];
      for (const image of convertedImages) {
        const text = await extractTextFromImage(image);
        texts.push(text);
      }
      setExtractedTexts(texts);
    } catch (err) {
      console.error("Error processing PDF:", err);
      setError(err.message || "Failed to process PDF");
    } finally {
      setLoadingPdf(false);
      setLoadingOcr(false);
    }
  };

  return {
    images,
    extractedTexts,
    loadingPdf,
    loadingOcr,
    error,
    processPdf,
  };
}

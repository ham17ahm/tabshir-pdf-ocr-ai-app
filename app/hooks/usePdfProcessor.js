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
    setError(null);
    setImages([]);
    setExtractedTexts([]); // Clear previous OCR results

    try {
      // Convert PDF to images only
      const convertedImages = await convertPdfToImages(file, { scale: 2 });
      setImages(convertedImages);
    } catch (err) {
      console.error("Error processing PDF:", err);
      setError(err.message || "Failed to process PDF");
    } finally {
      setLoadingPdf(false);
    }
  };

  const extractText = async () => {
    if (images.length === 0) {
      setError("No images to extract text from");
      return;
    }

    setLoadingOcr(true);
    setError(null);
    setExtractedTexts([]);

    try {
      // Extract text from each image
      const texts = [];
      for (const image of images) {
        const text = await extractTextFromImage(image);
        texts.push(text);
      }
      setExtractedTexts(texts);
    } catch (err) {
      console.error("Error extracting text:", err);
      setError(err.message || "Failed to extract text");
    } finally {
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
    extractText,
  };
}

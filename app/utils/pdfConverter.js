"use client";

import * as pdfjsLib from "pdfjs-dist";

// Set up the worker using CDN
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs`;

export async function convertPdfToImages(pdfFile, options = {}) {
  const { scale = 2 } = options;

  // Read the PDF file as array buffer
  const arrayBuffer = await pdfFile.arrayBuffer();

  // Load the PDF document
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const images = [];

  // Loop through all pages
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const imageDataUrl = await convertPageToImage(page, scale);
    images.push(imageDataUrl);
  }

  return images;
}

async function convertPageToImage(page, scale) {
  const viewport = page.getViewport({ scale });

  // Create a canvas element
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.height = viewport.height;
  canvas.width = viewport.width;

  // Render the page onto the canvas
  await page.render({
    canvasContext: context,
    viewport: viewport,
  }).promise;

  // Convert canvas to image data URL
  return canvas.toDataURL("image/png");
}

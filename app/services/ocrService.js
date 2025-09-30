export const extractTextFromImage = async (imageDataUrl) => {
  try {
    const response = await fetch("/api/ocr", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageDataUrl }),
    });

    if (!response.ok) {
      throw new Error(`OCR API error: ${response.status}`);
    }

    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Error extracting text:", error);
    throw error;
  }
};

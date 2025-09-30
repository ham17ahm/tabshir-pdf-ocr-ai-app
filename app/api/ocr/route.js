import { NextResponse } from "next/server";
import vision from "@google-cloud/vision";

// Creates a client
const client = new vision.ImageAnnotatorClient();

export async function POST(request) {
  try {
    const { imageDataUrl } = await request.json();

    // Remove the data URL prefix to get base64 string
    const base64Image = imageDataUrl.replace(/^data:image\/\w+;base64,/, "");

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(base64Image, "base64");

    // Perform text detection
    const [result] = await client.textDetection(imageBuffer);
    const detections = result.textAnnotations;

    // Return the full text
    const text = detections.length > 0 ? detections[0].description : "";

    return NextResponse.json({ text });
  } catch (error) {
    console.error("OCR Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

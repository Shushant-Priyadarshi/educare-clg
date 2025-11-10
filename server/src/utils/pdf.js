// src/utils/pdf.js
import { readFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";

export async function extractPDFTexts(filePath) {
  const buffer = await readFile(filePath);

  // Initialize parser with PDF data
  const parser = new PDFParse({ data: buffer });

  // Extract text content
  const result = await parser.getText();

  await parser.destroy();

  return result.text;
}

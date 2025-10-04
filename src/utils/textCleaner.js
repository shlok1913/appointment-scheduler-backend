export function cleanText(text) {
  if (!text) return "";

  let cleaned = text
    .replace(/[^a-zA-Z0-9\s@:/]/g, " ") // remove weird symbols
    .replace(/\s+/g, " ") // collapse spaces
    .trim()
    .toLowerCase();

  // OCR common fixes
  cleaned = cleaned
    .replace(/\b0\b/g, "o")
    .replace(/\bl\b/g, "1")
    .replace(/\b5\b/g, "s");

  return cleaned;
}

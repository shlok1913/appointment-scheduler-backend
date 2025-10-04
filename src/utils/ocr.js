import Tesseract from "tesseract.js";
import fs from "fs";

export async function runOCR(imagePath) {
  const {
    data: { text },
  } = await Tesseract.recognize(imagePath, "eng", {
    logger: (m) => console.log(m),
  });
  fs.unlinkSync(imagePath); // clean up
  return text;
}

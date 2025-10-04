import { cleanText } from "../utils/textCleaner.js";
import { extractDepartment } from "../utils/department.js";
import { extractDateTime } from "../utils/datetime.js";
import { runOCR } from "../utils/ocr.js";

// Main controller for scheduling appointment
export async function scheduleAppointment(req, res) {
  try {
    let text = "";

    // 1️⃣ Determine input type: image or text
    if (req.file) {
      text = await runOCR(req.file.path);
    } else if (req.body.text) {
      text = req.body.text;
    } else {
      return res.status(400).json({ error: "Provide either text or image" });
    }

    // 2️⃣ Clean text
    const cleaned = cleanText(text);

    // 3️⃣ Extract department
    const department = extractDepartment(cleaned);

    // 4️⃣ Extract date & time
    const dt = extractDateTime(cleaned);

    // 5️⃣ Guardrail
    if (!department || !dt.date || !dt.time) {
      return res.json({
        status: "needs_clarification",
        message: "Ambiguous date/time or department",
      });
    }

    // 6️⃣ Final JSON
    res.json({
      appointment: {
        department: department,
        date: dt.date,
        time: dt.time,
        tz: dt.tz,
      },
      status: "ok",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to schedule appointment" });
  }
}

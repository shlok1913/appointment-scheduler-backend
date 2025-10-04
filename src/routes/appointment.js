import express from "express";
import multer from "multer";
import { scheduleAppointment } from "../controllers/appointmentController.js";

const router = express.Router();
const upload = multer({ dest: "src/uploads/" });

router.post(
  "/schedule-appointment",
  upload.single("image"),
  scheduleAppointment
);

export default router;

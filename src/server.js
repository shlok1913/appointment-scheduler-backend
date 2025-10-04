import express from "express";
import appointmentRoutes from "./routes/appointment.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", appointmentRoutes);

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);



// ngrok commands
// ngrok config add-authtoken
// ngrok http 5000
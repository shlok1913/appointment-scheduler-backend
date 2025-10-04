# AI-Powered Appointment Scheduler Backend

## Overview
This backend service parses natural language or image-based appointment requests and converts them into structured scheduling data. It handles both typed text and noisy image inputs, extracts entities (department, date, time), normalizes date/time to ISO format with timezone, and provides confidence scores and guardrails for ambiguous input.

---

## Folder Structure

```
appointment-scheduler/
│
├─ src/
│  ├─ server.js                 # main entry point
│  ├─ routes/
│  │   └─ appointment.js        # API routes
│  ├─ controllers/
│  │   └─ appointmentController.js
│  ├─ utils/
│  │   ├─ ocr.js
│  │   ├─ textCleaner.js
│  │   ├─ department.js
│  │   └─ datetime.js
│  ├─ uploads/                  # temporary images
│
├─ package.json
├─ package-lock.json
└─ README.md
```

---

## Setup Instructions

1. Clone the repository:
```
git clone <your-repo-URL>
cd appointment-scheduler
```

2. Install dependencies:
```
npm install
```

3. Start the server:
```
npm run dev
```

Server runs on `http://localhost:5000`

---

## API Usage

### Endpoint: Schedule Appointment
**POST** `/schedule-appointment`

**Text Input**
```json
{
  "text": "book dentist next Friday at 3pm"
}
```

**Image Input**
- Content-Type: `multipart/form-data`
- Key: `image` → select the image file containing appointment text

---

## Sample Responses

**Success Response**
```json
{
    "appointment": {
        "department": "dentist",
        "date": "2025-10-06",
        "time": "15:00",
        "tz": "Asia/Kolkata"
    },
    "status": "ok"
}
```

**Guardrail / Ambiguous Input**
```json
{
  "status": "needs_clarification",
  "message": "Ambiguous date/time or department"
}
```

**Error Response**
```json
{
  "status": "error",
  "message": "Failed to schedule appointment"
}
```

---

## Sample curl Commands

**1. Text Input**
```
curl -X POST http://localhost:5000/schedule-appointment \
-H "Content-Type: application/json" \
-d '{"text":"book dentist next Friday at 3pm"}'
```

**2. Image Input**
```
curl -X POST http://localhost:5000/schedule-appointment \
-F "image=@test.png"
```

**3. Error Case**
```
curl -X POST http://localhost:5000/schedule-appointment \
-H "Content-Type: application/json" \
-d '{}'
```

---

## Notes

- Handles OCR from images and text input  
- Modular folder structure for scalability   
- Guardrails for missing or ambiguous data


# Schema Design for Smart Clinic Portal

This document outlines a proposed database design for a smart clinic system.  
It includes:
1. A relational schema in **MySQL** for structured operational data.
2. A flexible **MongoDB** collection for semi-structured or evolving data.

---

## MySQL Database Design

Below are core tables the clinic system needs.  
(Comments/justifications are included inline.)

---

### Table: patients
- id: INT, Primary Key, AUTO_INCREMENT
- full_name: VARCHAR(100), NOT NULL
- email: VARCHAR(100), NOT NULL, UNIQUE
- password_hash: VARCHAR(255), NOT NULL
- phone: VARCHAR(20), UNIQUE
- date_of_birth: DATE
- gender: ENUM('male','female','other')
- created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

**Notes / Constraints**
- `email` must be unique to prevent duplicate registrations.
- Password stored as `password_hash` only (never plain text).
- Phone format validation can be enforced in backend code later.

---

### Table: doctors
- id: INT, Primary Key, AUTO_INCREMENT
- full_name: VARCHAR(100), NOT NULL
- email: VARCHAR(100), NOT NULL, UNIQUE
- password_hash: VARCHAR(255), NOT NULL
- phone: VARCHAR(20), UNIQUE
- specialization: VARCHAR(100), NOT NULL
- bio: TEXT
- is_active: BOOLEAN, DEFAULT TRUE
- created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

**Notes / Constraints**
- Doctors can deactivate accounts (`is_active`) instead of hard delete to preserve history.

---

### Table: admins
- id: INT, Primary Key, AUTO_INCREMENT
- username: VARCHAR(50), NOT NULL, UNIQUE
- password_hash: VARCHAR(255), NOT NULL
- email: VARCHAR(100), UNIQUE
- created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

**Notes / Constraints**
- Admins log in using username + password.
- Email is optional but useful for recovery.

---

### Table: appointments
- id: INT, Primary Key, AUTO_INCREMENT
- doctor_id: INT, NOT NULL, Foreign Key → doctors(id)
- patient_id: INT, NOT NULL, Foreign Key → patients(id)
- appointment_time: DATETIME, NOT NULL
- duration_minutes: INT, NOT NULL, DEFAULT 60
- status: ENUM('scheduled','completed','cancelled'), NOT NULL, DEFAULT 'scheduled'
- reason: VARCHAR(255)
- created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP

**Notes / Constraints**
- Foreign keys link appointment to doctor + patient.
- Duration defaults to **60 minutes** (per user story).
- **Prevent overlapping appointments** with a backend validation:
  - e.g., query for same `doctor_id` with time overlap before insert.

**Deletion Thinking**
- If a patient is deleted, appointments should NOT be removed automatically (retain audit/history).
  - Use `ON DELETE RESTRICT` or `ON DELETE SET NULL` depending on policy.
- If a doctor is deleted, also preserve appointment records.
  - Prefer soft delete doctors (`is_active = false`).

---

### Table: doctor_availability
- id: INT, Primary Key, AUTO_INCREMENT
- doctor_id: INT, NOT NULL, Foreign Key → doctors(id)
- day_of_week: TINYINT, NOT NULL *(0=Sun … 6=Sat)*
- start_time: TIME, NOT NULL
- end_time: TIME, NOT NULL
- is_available: BOOLEAN, DEFAULT TRUE

**Notes / Constraints**
- Represents working hours and availability patterns.
- Doctors can “mark unavailability” by toggling `is_available = false`.
- Backend ensures `start_time < end_time`.

---




## MongoDB Collection Design

Some data is semi-structured and may evolve fast.  
A good complement to MySQL here is **doctor/patient notes and feedback**, since they can vary in format and length.

---

### Collection: notes_feedback
```json
{
  "_id": "ObjectId('656abc1234567890fedcba98')",
  "appointmentId": 102,
  "doctorId": 12,
  "patientId": 45,
  "doctorNotes": {
    "summary": "Patient reports recurring headaches.",
    "observations": [
      "Blood pressure normal",
      "No fever",
      "Stress-related symptoms"
    ],
    "attachments": [
      {
        "fileName": "lab_result.pdf",
        "fileType": "application/pdf",
        "url": "https://files.clinic.com/lab_result_102.pdf"
      }
    ]
  },
  "patientFeedback": {
    "rating": 4,
    "comment": "Doctor explained clearly and was helpful.",
    "tags": ["friendly", "clear-explanation"]
  },
  "metadata": {
    "createdAt": "2025-12-04T09:15:00Z",
    "updatedAt": "2025-12-04T09:40:00Z",
    "visibility": "doctor_and_admin"
  }
}

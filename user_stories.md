# User Stories

## Patient Books Appointment
**Title:** Patient can book an appointment  
_As a patient, I want to book an appointment with a doctor, so that I can receive medical care at a convenient time._

**Acceptance Criteria:**
1. Patient can view available doctors and their open time slots.
2. Patient can select a time slot and confirm the booking.
3. The new appointment appears in “My Appointments” with a confirmation message.

**Notes:**
- Prevent double-booking of the same time slot.

---

# Admin User Stories 

## Issue 1 — Admin login to portal
**Title:** Admin login to portal  
_As an admin, I want to log into the portal with my username and password, so that I can manage the platform securely._

**Acceptance Criteria:**
1. The portal displays a login form with username and password fields.
2. When valid credentials are submitted, the admin is authenticated and redirected to the admin dashboard.
3. When invalid credentials are submitted, an error message is shown and access is denied.


**Notes:**
- Consider password masking and basic brute-force protection (e.g., rate limiting).

---

## Issue 2 — Admin logout from portal
**Title:** Admin logout from portal  
_As an admin, I want to log out of the portal, so that I can protect system access._

**Acceptance Criteria:**
1. A logout button/link is available on all admin pages.
2. Clicking logout terminates the admin session/token.
3. After logout, the admin is redirected to the login page and cannot access protected pages via back/refresh.


**Notes:**
- Auto-logout after inactivity can be added later as an enhancement.

---

## Issue 3 — Admin adds doctors to portal
**Title:** Admin adds doctors to portal  
_As an admin, I want to add doctors to the portal, so that patients can book appointments with available doctors._

**Acceptance Criteria:**
1. Admin can open an “Add Doctor” form from the admin dashboard.
2. The form requires doctor name, specialty, and contact information.
3. Submitting valid data creates a new doctor profile visible in the doctors list.


**Notes:**
- Validate required fields and prevent duplicate doctor accounts (email/license).

---

## Issue 4 — Admin deletes doctor profile
**Title:** Admin deletes doctor profile  
_As an admin, I want to delete a doctor’s profile from the portal, so that inactive or incorrect accounts are removed._

**Acceptance Criteria:**
1. Admin can view a list of doctors and select a specific profile.
2. Admin can delete the doctor profile after confirming the action.
3. Deleted doctors no longer appear in the portal or booking flow.


**Notes:**
- Decide how the system handles existing/future appointments for deleted doctors.

---

## Issue 5 — Admin runs stored procedure for monthly appointment statistics
**Title:** Admin runs stored procedure for monthly appointment statistics  
_As an admin, I want to run a stored procedure in MySQL CLI to get the number of appointments per month, so that I can track usage statistics._

**Acceptance Criteria:**
1. A stored procedure exists in MySQL to return appointment counts grouped by month.
2. Running the procedure in MySQL CLI outputs month and total appointments for each month.
3. Procedure returns correct results even for months with zero appointments.


# Patient User Stories 

---

## Issue 1 — View doctors without logging in
**Title:** Patient can view list of doctors without logging in  
_As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering._

**Acceptance Criteria:**
1. The portal allows non-logged-in users to access a public doctors list page.
2. The doctors list shows basic info such as name, specialty, and available hours.
3. A clear call-to-action prompts users to sign up or log in to book.


**Notes:**
- Do not show private doctor contact details publicly.

---

## Issue 2 — Patient sign up
**Title:** Patient can sign up with email and password  
_As a patient, I want to sign up using my email and password, so that I can book appointments._

**Acceptance Criteria:**
1. The sign-up form includes required fields: email and password.
2. System validates email format and enforces password rules.
3. After successful registration, the patient account is created and can log in.


**Notes:**
- Optional enhancement: send email verification.

---

## Issue 3 — Patient login
**Title:** Patient can log into the portal  
_As a patient, I want to log into the portal, so that I can manage my bookings._

**Acceptance Criteria:**
1. Login page provides email and password fields.
2. Valid credentials authenticate the user and redirect to patient dashboard.
3. Invalid credentials show an error message and do not log the user in.


**Notes:**
- Consider rate limiting to prevent brute-force attacks.

---

## Issue 4 — Patient logout
**Title:** Patient can log out of the portal  
_As a patient, I want to log out of the portal, so that I can secure my account._

**Acceptance Criteria:**
1. A logout option is visible on all patient pages.
2. Clicking logout ends the session/token and redirects to login/public home.
3. Protected pages cannot be accessed after logout via back/refresh.


**Notes:**
- Add auto-timeout later if needed.

---

## Issue 5 — Book an hour-long appointment
**Title:** Patient can book an hour-long appointment  
_As a patient, I want to log in and book an hour-long appointment with a doctor, so that I can consult with them._

**Acceptance Criteria:**
1. Only logged-in patients can access the booking flow.
2. Appointment duration defaults to 1 hour and is clearly shown before confirmation.
3. Booking a slot creates an appointment and blocks that time for other patients.


**Notes:**
- Prevent double-booking of the same doctor/time slot.

---

## Issue 6 — View upcoming appointments
**Title:** Patient can view upcoming appointments  
_As a patient, I want to view my upcoming appointments, so that I can prepare accordingly._

**Acceptance Criteria:**
1. Patient dashboard includes an “Upcoming Appointments” section.
2. Each appointment shows doctor name, date, time, and duration.
3. Appointments are sorted in chronological order.

**Notes:**
- Optional: allow cancel/reschedule from this page.

# Doctor User Stories 

---

## Issue 1 — Doctor login
**Title:** Doctor can log into the portal  
_As a doctor, I want to log into the portal, so that I can manage my appointments._

**Acceptance Criteria:**
1. Login page provides fields for username/email and password.
2. Valid credentials log the doctor in and redirect to the doctor dashboard.
3. Invalid credentials display an error message and do not grant access.


**Notes:**
- Consider 2FA as a future enhancement.

---

## Issue 2 — Doctor logout
**Title:** Doctor can log out of the portal  
_As a doctor, I want to log out of the portal, so that I can protect my data._

**Acceptance Criteria:**
1. A logout button/link is visible on all doctor pages.
2. Clicking logout ends the doctor session/token.
3. After logout, protected doctor pages cannot be accessed via back/refresh.


**Notes:**
- Auto-timeout after inactivity can be added later.

---

## Issue 3 — View appointment calendar
**Title:** Doctor can view appointment calendar  
_As a doctor, I want to view my appointment calendar, so that I can stay organized._

**Acceptance Criteria:**
1. Doctor dashboard includes a calendar or schedule view.
2. Calendar shows upcoming appointments with date, time, and patient name.
3. Doctor can switch between day/week/month views.


**Notes:**
- Future enhancement: allow export to external calendar.

---

## Issue 4 — Mark unavailability
**Title:** Doctor can mark unavailability  
_As a doctor, I want to mark my unavailability, so that patients only see available slots._

**Acceptance Criteria:**
1. Doctor can add unavailable dates/times from the availability settings.
2. Marked unavailable slots are not shown to patients for booking.
3. System prevents marking unavailable times that already have appointments without confirmation.


**Notes:**
- Support recurring unavailability (e.g., weekly off-days).

---

## Issue 5 — Update doctor profile
**Title:** Doctor can update profile information  
_As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._

**Acceptance Criteria:**
1. Doctor can open an “Edit Profile” page from the dashboard.
2. Doctor can update specialization, bio, phone/email, and clinic address.
3. Saved changes appear on the public doctor profile immediately.


**Notes:**
- Some fields (e.g., license number) may be admin-edit only.

---

## Issue 6 — View patient details for upcoming appointments
**Title:** Doctor can view patient details for upcoming appointments  
_As a doctor, I want to view patient details for upcoming appointments, so that I can be prepared._

**Acceptance Criteria:**
1. Doctor can open an upcoming appointment to see patient details.
2. Patient details include name, age, reason for visit, and notes (if provided).
3. Only the assigned doctor can access the patient’s appointment details.


**Notes:**
- Log access to patient data for auditing/privacy.

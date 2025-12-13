/*
  Import required helper functions from other modules
*/
import { showBookingOverlay } from "../loggedPatient.js";
import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";

/*
  Function to create and return a DOM element for a single doctor card
*/
export function createDoctorCard(doctor) {

  /* Create main card container */
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  /* Get current user role */
  const role = localStorage.getItem("userRole");

  /* =========================
     Doctor Information Section
     ========================= */
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;

  const specialization = document.createElement("p");
  specialization.textContent = `Specialty: ${doctor.specialization}`;

  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email}`;

  const availability = document.createElement("p");
  availability.textContent = `Available: ${
    Array.isArray(doctor.availability)
      ? doctor.availability.join(", ")
      : doctor.availability
  }`;

  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  /* =========================
     Action Buttons Section
     ========================= */
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  /* ===== ADMIN ROLE ACTIONS ===== */
  if (role === "admin") {
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", async () => {
      const confirmDelete = confirm("Are you sure you want to delete this doctor?");
      if (!confirmDelete) return;

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        return;
      }

      try {
        const result = await deleteDoctor(doctor.id, token);
        alert(result.message || "Doctor deleted successfully.");
        card.remove();
      } catch (error) {
        alert("Failed to delete doctor.");
      }
    });

    actionsDiv.appendChild(deleteBtn);
  }

  /* ===== PATIENT (NOT LOGGED-IN) ACTIONS ===== */
  else if (role === "patient") {
    const bookNowBtn = document.createElement("button");
    bookNowBtn.textContent = "Book Now";

    bookNowBtn.addEventListener("click", () => {
      alert("Please login to book an appointment.");
    });

    actionsDiv.appendChild(bookNowBtn);
  }

  /* ===== LOGGED-IN PATIENT ACTIONS ===== */
  else if (role === "loggedPatient") {
    const bookNowBtn = document.createElement("button");
    bookNowBtn.textContent = "Book Now";

    bookNowBtn.addEventListener("click", async (e) => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please login again.");
        window.location.href = "/";
        return;
      }

      try {
        const patientData = await getPatientData(token);
        showBookingOverlay(e, doctor, patientData);
      } catch (error) {
        alert("Unable to fetch patient data.");
      }
    });

    actionsDiv.appendChild(bookNowBtn);
  }

  /* =========================
     Final Assembly
     ========================= */
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  return card;
}

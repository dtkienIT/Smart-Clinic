/*
  Import required modules
*/
import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

/*
  Initialize global variables
*/
const tableBody = document.getElementById("patientTableBody");

// YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];
let selectedDate = today;

const token = localStorage.getItem("token");
let patientName = null;

/*
  Search by patient name
*/
const searchBar = document.getElementById("searchBar");
if (searchBar) {
  searchBar.addEventListener("input", () => {
    const value = searchBar.value.trim();
    patientName = value !== "" ? value : "null";
    loadAppointments();
  });
}

/*
  Today's appointments button
*/
const todayBtn = document.getElementById("todayButton");
const datePicker = document.getElementById("datePicker");

if (todayBtn) {
  todayBtn.addEventListener("click", () => {
    selectedDate = today;
    if (datePicker) datePicker.value = today;
    loadAppointments();
  });
}

/*
  Date picker change
*/
if (datePicker) {
  datePicker.addEventListener("change", () => {
    selectedDate = datePicker.value;
    loadAppointments();
  });
}

/*
  Function: loadAppointments
  Fetch and render appointments
*/
async function loadAppointments() {
  try {
    const appointments = await getAllAppointments(
      selectedDate,
      patientName,
      token
    );

    tableBody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5">No Appointments found for today.</td>
        </tr>
      `;
      return;
    }

    appointments.forEach((appointment) => {
      const patient = {
        id: appointment.patient.id,
        name: appointment.patient.name,
        phone: appointment.patient.phone,
        email: appointment.patient.email
      };

      const row = createPatientRow(patient, appointment);
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Error loading appointments:", error);
    tableBody.innerHTML = `
      <tr>
        <td colspan="5">Error loading appointments. Try again later.</td>
      </tr>
    `;
  }
}

/*
  Initial render on page load
*/
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderContent === "function") {
    renderContent();
  }
  if (datePicker) datePicker.value = today;
  loadAppointments();
});

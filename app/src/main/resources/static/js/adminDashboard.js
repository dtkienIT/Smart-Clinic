/*
  Import required modules:
   - openModal: handle opening modal dialogs
   - Doctor services: fetch, filter, save doctors
   - createDoctorCard: render doctor UI cards
*/
import { openModal } from "../components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "../services/doctorServices.js";
import { createDoctorCard } from "../components/doctorCard.js";

/*
  When the admin clicks the "Add Doctor" button,
  open the modal form to add a new doctor
*/
const addDoctorBtn = document.getElementById("addDocBtn");
if (addDoctorBtn) {
  addDoctorBtn.addEventListener("click", () => {
    openModal("addDoctor");
  });
}

/*
  Load all doctor cards when the page is fully loaded
*/
window.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();
});

/*
  Function: loadDoctorCards
  Purpose: Fetch all doctors and render them on the dashboard
*/
async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Error loading doctors:", error);
  }
}

/*
  Attach search and filter listeners
  Any change triggers filtering logic
*/
const searchBar = document.getElementById("searchBar");
const timeFilter = document.getElementById("timeFilter");
const specialtyFilter = document.getElementById("specialtyFilter");

if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
if (timeFilter) timeFilter.addEventListener("change", filterDoctorsOnChange);
if (specialtyFilter) specialtyFilter.addEventListener("change", filterDoctorsOnChange);

/*
  Function: filterDoctorsOnChange
  Purpose: Filter doctors by name, time, and specialty
*/
async function filterDoctorsOnChange() {
  try {
    const name = searchBar.value.trim() || null;
    const time = timeFilter.value || null;
    const specialty = specialtyFilter.value || null;

    const result = await filterDoctors(name, time, specialty);

    if (result && result.doctors && result.doctors.length > 0) {
      renderDoctorCards(result.doctors);
    } else {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
    }
  } catch (error) {
    alert("Error filtering doctors");
    console.error(error);
  }
}

/*
  Function: renderDoctorCards
  Purpose: Render a list of doctors into the content area
*/
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

/*
  Function: adminAddDoctor
  Purpose: Collect form data and add a new doctor (Admin only)
  This function is called from the Add Doctor modal form
*/
window.adminAddDoctor = async function () {
  try {
    const name = document.getElementById("docName").value;
    const email = document.getElementById("docEmail").value;
    const phone = document.getElementById("docPhone").value;
    const password = document.getElementById("docPassword").value;
    const specialty = document.getElementById("docSpecialty").value;

    const availability = Array.from(
      document.querySelectorAll('input[name="availability"]:checked')
    ).map((cb) => cb.value);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized. Please login again.");
      return;
    }

    const doctor = {
      name,
      email,
      phone,
      password,
      specialty,
      availability
    };

    const result = await saveDoctor(doctor, token);

    if (result.success) {
      alert(result.message);
      window.location.reload();
    } else {
      alert(result.message);
    }

  } catch (error) {
    console.error("Error adding doctor:", error);
    alert("Failed to add doctor");
  }
};

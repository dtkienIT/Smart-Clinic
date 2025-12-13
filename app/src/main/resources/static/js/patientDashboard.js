import { openModal } from './components/modals.js';
import { createDoctorCard } from './components/doctorCard.js';
import {
  getDoctors,
  filterDoctors,
  saveDoctor
} from './services/doctorServices.js';

document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  const addBtn = document.getElementById("addDocBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => openModal("addDoctor"));
  }

  document.getElementById("searchBar")?.addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime")?.addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty")?.addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Failed to load doctors:", error);
  }
}

async function filterDoctorsOnChange() {
  try {
    const nameValue = document.getElementById("searchBar").value.trim();
    const timeValue = document.getElementById("filterTime").value;
    const specialtyValue = document.getElementById("filterSpecialty").value;

    const name = nameValue || null;
    const time = timeValue || null;
    const specialty = specialtyValue || null;

    const response = await filterDoctors(name, time, specialty);
    const doctors = response.doctors || [];

    if (doctors.length === 0) {
      document.getElementById("content").innerHTML =
        "<p>No doctors found with the given filters.</p>";
      return;
    }

    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Filtering failed:", error);
    alert("❌ An error occurred while filtering doctors.");
  }
}

function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

window.adminAddDoctor = async function () {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("❌ Unauthorized. Please login again.");
      return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const specialty = document.getElementById("specialty").value;

    const availability = Array.from(
      document.querySelectorAll('input[name="availability"]:checked')
    ).map(cb => cb.value);

    const doctor = {
      name,
      email,
      phone,
      password,
      specialty,
      availability
    };

    const { success, message } = await saveDoctor(doctor, token);

    if (success) {
      alert(message);
      document.getElementById("modal").style.display = "none";
      loadDoctorCards();
    } else {
      alert(message);
    }
  } catch (error) {
    console.error("Add doctor failed:", error);
    alert("❌ Failed to add doctor.");
  }
};

/*
  Import the openModal function to handle showing login popups/modals
  Import the base API URL from the config file
*/
import { openModal } from "../components/modals.js";
import { API_BASE_URL } from "../config/config.js";

/* Define API endpoints */
const ADMIN_API = API_BASE_URL + "/admin";
const DOCTOR_API = API_BASE_URL + "/doctor/login";

/*
  Setup button event listeners after DOM is fully loaded
*/
window.onload = function () {

  const adminBtn = document.getElementById("adminLogin");
  const doctorBtn = document.getElementById("doctorLogin");

  if (adminBtn) {
    adminBtn.addEventListener("click", () => {
      openModal("adminLogin");
    });
  }

  if (doctorBtn) {
    doctorBtn.addEventListener("click", () => {
      openModal("doctorLogin");
    });
  }
};

/*
  Admin Login Handler
  Triggered when admin submits login form
*/
window.adminLoginHandler = async function () {
  try {
    const username = document.getElementById("adminUsername")?.value;
    const password = document.getElementById("adminPassword")?.value;

    if (!username || !password) {
      alert("Please enter username and password.");
      return;
    }

    const admin = { username, password };

    const response = await fetch(ADMIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(admin)
    });

    if (!response.ok) {
      alert("Invalid credentials!");
      return;
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    selectRole("admin");

  } catch (error) {
    console.error("Admin login error:", error);
    alert("Something went wrong. Please try again.");
  }
};

/*
  Doctor Login Handler
  Triggered when doctor submits login form
*/
window.doctorLoginHandler = async function () {
  try {
    const email = document.getElementById("doctorEmail")?.value;
    const password = document.getElementById("doctorPassword")?.value;

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const doctor = { email, password };

    const response = await fetch(DOCTOR_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(doctor)
    });

    if (!response.ok) {
      alert("Invalid credentials!");
      return;
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    selectRole("doctor");

  } catch (error) {
    console.error("Doctor login error:", error);
    alert("Something went wrong. Please try again.");
  }
};

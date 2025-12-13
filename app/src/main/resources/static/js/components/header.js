/*
  Dynamic Header Rendering based on User Role and Session
*/

function renderHeader() {
  const headerDiv = document.getElementById("header");
  if (!headerDiv) return;

  /* 1. Check homepage (root) */
  if (window.location.pathname.endsWith("/")) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");

    headerDiv.innerHTML = `
      <header class="header">
        <div class="logo-section">
          <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
      </header>
    `;
    return;
  }

  /* 2. Get role & token */
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  /* 3. Invalid session handling */
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  /* 4. Base header content */
  let headerContent = `
    <header class="header">
      <div class="logo-section">
        <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo" class="logo-img">
        <span class="logo-title">Hospital CMS</span>
      </div>
      <nav class="nav-actions">
  `;

  /* 5. Role-based rendering */
  if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn">Add Doctor</button>
      <a href="#" id="logoutBtn">Logout</a>
    `;
  } else if (role === "doctor") {
    headerContent += `
      <button id="doctorHome" class="adminBtn">Home</button>
      <a href="#" id="logoutBtn">Logout</a>
    `;
  } else if (role === "patient") {
    headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>
    `;
  } else if (role === "loggedPatient") {
    headerContent += `
      <button id="patientHome" class="adminBtn">Home</button>
      <button id="patientAppointments" class="adminBtn">Appointments</button>
      <a href="#" id="logoutPatientBtn">Logout</a>
    `;
  }

  /* 6. Close header */
  headerContent += `
      </nav>
    </header>
  `;

  /* 7. Inject header */
  headerDiv.innerHTML = headerContent;

  /* 8. Attach events */
  attachHeaderButtonListeners();
}

/* ===== Attach Button Listeners ===== */
function attachHeaderButtonListeners() {
  const addDocBtn = document.getElementById("addDocBtn");
  if (addDocBtn) {
    addDocBtn.addEventListener("click", () => openModal("addDoctor"));
  }

  const patientLogin = document.getElementById("patientLogin");
  if (patientLogin) {
    patientLogin.addEventListener("click", () => openModal("patientLogin"));
  }

  const patientSignup = document.getElementById("patientSignup");
  if (patientSignup) {
    patientSignup.addEventListener("click", () => openModal("patientSignup"));
  }

  const doctorHome = document.getElementById("doctorHome");
  if (doctorHome) {
    doctorHome.addEventListener("click", () => {
      window.location.href = "/pages/doctorDashboard.html";
    });
  }

  const patientHome = document.getElementById("patientHome");
  if (patientHome) {
    patientHome.addEventListener("click", () => {
      window.location.href = "/pages/loggedPatientDashboard.html";
    });
  }

  const patientAppointments = document.getElementById("patientAppointments");
  if (patientAppointments) {
    patientAppointments.addEventListener("click", () => {
      window.location.href = "/pages/patientAppointments.html";
    });
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  const logoutPatientBtn = document.getElementById("logoutPatientBtn");
  if (logoutPatientBtn) {
    logoutPatientBtn.addEventListener("click", logoutPatient);
  }
}

/* ===== Logout Functions ===== */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/";
}

function logoutPatient() {
  localStorage.removeItem("token");
  localStorage.setItem("userRole", "patient");
  window.location.href = "/pages/patientDashboard.html";
}

/* ===== Initialize Header ===== */
renderHeader();

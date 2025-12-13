/*
  Import the base API URL from the config file
  This base URL is used to construct all patient-related endpoints
*/
import { API_BASE_URL } from "../config/config.js";

/*
  Define the base Patient API endpoint
  All patient-related requests will be built from this path
*/
const PATIENT_API = API_BASE_URL + "/patient";

/*
  Function: patientSignup
  Purpose: Register a new patient in the system

  Steps:
   - Accept patient signup data (name, email, password, etc.)
   - Send a POST request to the patient API
   - Convert the data object to JSON
   - Parse the response and return a structured result
   - Handle errors using try-catch
*/
export async function patientSignup(data) {
  try {
    const response = await fetch(`${PATIENT_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    return {
      success: true,
      message: result.message
    };

  } catch (error) {
    console.error("Error :: patientSignup ::", error);
    return {
      success: false,
      message: error.message
    };
  }
}

/*
  Function: patientLogin
  Purpose: Authenticate a patient using login credentials

  Steps:
   - Accept login data (email and password)
   - Send a POST request to /patient/login
   - Include JSON headers and body
   - Return the full fetch response so caller can handle token/status
*/
export async function patientLogin(data) {
  console.log("patientLogin ::", data); // for development/debugging only

  return await fetch(`${PATIENT_API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

/*
  Function: getPatientData
  Purpose: Fetch logged-in patient details using token

  Steps:
   - Accept authentication token
   - Send GET request to patient endpoint
   - Parse response JSON
   - Return patient object if successful
   - Return null if request fails
*/
export async function getPatientData(token) {
  try {
    const response = await fetch(`${PATIENT_API}/${token}`);
    const data = await response.json();

    if (response.ok) {
      return data.patient;
    }

    return null;

  } catch (error) {
    console.error("Error fetching patient details:", error);
    return null;
  }
}

/*
  Function: getPatientAppointments
  Purpose: Fetch appointments for patient or doctor dashboard

  Notes:
   - Backend API is shared for both patient and doctor views
   - Behavior is controlled using the 'user' parameter

  Parameters:
   - id: patient ID
   - token: authentication token
   - user: "patient" or "doctor"

  Returns:
   - Appointments array if successful
   - null if request fails
*/
export async function getPatientAppointments(id, token, user) {
  try {
    const response = await fetch(`${PATIENT_API}/${id}/${user}/${token}`);
    const data = await response.json();

    console.log(data.appointments);

    if (response.ok) {
      return data.appointments;
    }

    return null;

  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    return null;
  }
}

/*
  Function: filterAppointments
  Purpose: Fetch filtered appointments based on condition and name

  Parameters:
   - condition: appointment status (e.g., pending, consulted)
   - name: patient name or search keyword
   - token: authentication token

  Returns:
   - Filtered appointments list
   - Empty list if request fails
*/
export async function filterAppointments(condition, name, token) {
  try {
    const response = await fetch(
      `${PATIENT_API}/filter/${condition}/${name}/${token}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.ok) {
      return await response.json();
    }

    console.error("Failed to fetch appointments:", response.statusText);
    return { appointments: [] };

  } catch (error) {
    console.error("Error filtering appointments:", error);
    alert("Something went wrong!");
    return { appointments: [] };
  }
}

/*
  Import the base API URL from the config file
  Define a constant DOCTOR_API to hold the full endpoint for doctor-related actions
*/
import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + "/doctor";

/*
  Function: getDoctors
  Purpose: Fetch the list of all doctors from the API
*/
export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);

    const data = await response.json();
    return data.doctors || [];

  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}

/*
  Function: deleteDoctor
  Purpose: Delete a specific doctor using their ID and an authentication token
*/
export async function deleteDoctor(id, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}/${token}`, {
      method: "DELETE"
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message || "Doctor deleted"
    };

  } catch (error) {
    console.error("Error deleting doctor:", error);
    return {
      success: false,
      message: "Failed to delete doctor"
    };
  }
}

/*
  Function: saveDoctor
  Purpose: Save (create) a new doctor using a POST request
*/
export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(doctor)
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message || "Doctor saved successfully"
    };

  } catch (error) {
    console.error("Error saving doctor:", error);
    return {
      success: false,
      message: "Failed to save doctor"
    };
  }
}

/*
  Function: filterDoctors
  Purpose: Fetch doctors based on filtering criteria (name, time, and specialty)
*/
export async function filterDoctors(name, time, specialty) {
  try {
    const queryName = name || "";
    const queryTime = time || "";
    const querySpecialty = specialty || "";

    const response = await fetch(
      `${DOCTOR_API}/filter/${queryName}/${queryTime}/${querySpecialty}`
    );

    if (!response.ok) {
      console.error("Failed to filter doctors");
      return { doctors: [] };
    }

    return await response.json();

  } catch (error) {
    console.error("Error filtering doctors:", error);
    alert("Something went wrong while filtering doctors.");
    return { doctors: [] };
  }
}

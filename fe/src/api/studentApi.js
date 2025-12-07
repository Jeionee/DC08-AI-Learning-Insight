import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

// Get student by ID
export async function getStudent(studentId) {
  try {
    const token = localStorage.getItem("token"); // ambil token dari login
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${API_URL}/api/students/${studentId}`, { headers });
    return response.data; // data dari Flask API
  } catch (error) {
    console.error("Gagal mengambil data student:", error);
    throw error;
  }
}

// // Update student
// export async function updateStudent(studentId, formData) {
//   const response = await axios.put(`${API_URL}/api/students/1`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data.data;


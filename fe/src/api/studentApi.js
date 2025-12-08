import axios from "axios";
const API_URL = "http://127.0.0.1:5000/api";

export async function getStudent() {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${API_URL}/students/profile`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data student:", error);
    throw error;
  }
}

export async function predictStudent() {
  try {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${API_URL}/predict`, { headers });
    return response.data;
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

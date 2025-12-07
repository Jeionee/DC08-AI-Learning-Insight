import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export async function getStudent() {
	try {
		const token = localStorage.getItem("token");
		const response = await axios.get(`${API_URL}/api/students/profile`, {
			Authorization: `Bearer ${token}`,
		});
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

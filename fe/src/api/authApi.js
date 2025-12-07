import axios from "axios";
const API_URL = "http://127.0.0.1:5000";

export async function loginRequest(email, password) {
	try {
		const response = await axios.post(`${API_URL}/api/auth/login`, {
			email,
			password,
		});

		return response.data;
	} catch (error) {
		console.error("Login failed:", error);
		throw error;
	}
}

import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export async function getActivityProgress() {
    try {
        const token = localStorage.getItem("token")
        const headers = {
            Authorization: `Bearer ${token}`,
        }

        const response = await axios.get(`${API_URL}/students/daily-progress`, {
            headers
        });

        return response.data;

    } catch (error) {
        console.error("Gagal mengambil aktivitas mingguan:", error);
        throw error;
    }
    
}
import axios from "axios";

// Base API URL
const API_URL = "http://127.0.0.1:5000/api";

// Helper function to get headers with authorization
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

export async function getStudent() {
  try {
    const response = await axios.get(`${API_URL}/students/profile`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data student:", error);
    throw error; // rethrow error to handle it further upstream
  }
}

export async function predictStudent() {
  try {
    const response = await axios.get(`${API_URL}/predict`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data student:", error);
    throw error;
  }
}

export async function getDailyProgress() {
  try {
    const response = await axios.get(`${API_URL}/students/daily-progress`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data daily progress:", error);
    throw error;
  }
}

export async function getQuizScores() {
  try {
    const response = await axios.get(`${API_URL}/students/quiz-results`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data quiz:", error);
    throw error;
  }
}

export async function getWeeklyActivity() {
  try {
    const response = await axios.get(`${API_URL}/students/weekly-progress`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Gagal mengambil data aktivitas mingguan:", error);
    throw error;
  }
}

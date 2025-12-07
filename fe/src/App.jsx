import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./contexts/contexts";
import StudentsLayout from "./layouts/StudentsLayout";
import Dashboard from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/LoginPage";
import ProgressPage from "./pages/ProgressPage";
import RecommendationPage from "./pages/RecommendationPage";
import ChallengesPage from "./pages/ChallengesPage";
import { getStudent } from "./api/studentApi";

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const [student, setStudent] = useState({
		name: "",
		email: "",
		learning_style: "",
		avatar: "",
		joined_since: "",
	});

	const fetchStudent = async () => {
		try {
			const student = await getStudent();
			setStudent(student);
		} catch (err) {
			alert(err.message);
		}
	};

	useEffect(() => {
		fetchStudent();
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsLoggedIn(!token);
	}, []);

	return (
		<AppContext.Provider value={student}>
			<BrowserRouter>
				<Routes>
					{/* LOGIN */}
					<Route
						path="/login"
						element={
							isLoggedIn ? (
								<Navigate to="/dashboard" replace />
							) : (
								<Login onLogin={() => setIsLoggedIn(true)} />
							)
						}
					/>

					{/* PROTECTED ROUTES */}
					<Route
						path="/"
						element={
							isLoggedIn ? (
								<StudentsLayout onLogout={() => setIsLoggedIn(false)} />
							) : (
								<Navigate to="/login" replace />
							)
						}
					>
						<Route index element={<Navigate to="/dashboard" replace />} />
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="profile" element={<ProfilePage />} />
						<Route path="progress" element={<ProgressPage />} />
						<Route path="recommendation" element={<RecommendationPage />} />
						<Route path="challenges" element={<ChallengesPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AppContext.Provider>
	);
};

export default App;

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./components/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/LoginPage";

const App = () => {
  const [learningData, setLearningData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulasi data (mock)
  useEffect(() => {
    const mockData = {
      user: {
        name: "John Smith",
        learningStyle: "consistent",
        avatar: "JS",
      },
      progress: {
        courseCompletion: 75,
        timeSpentToday: 205,
        dailyGoal: 300,
        weeklyProgress: 15,
      },
      weeklyActivity: [
        { day: "Mon", hours: 2.5, goal: 5 },
        { day: "Tue", hours: 3, goal: 5 },
        { day: "Wed", hours: 4, goal: 5 },
        { day: "Thu", hours: 2.5, goal: 5 },
        { day: "Fri", hours: 3.5, goal: 5 },
        { day: "Sat", hours: 1.5, goal: 5 },
        { day: "Sun", hours: 2, goal: 5 },
      ],
      learningDistribution: [
        { name: "HTML/CSS", value: 30, color: "#4361ee" },
        { name: "JavaScript", value: 25, color: "#4cc9f0" },
        { name: "React", value: 20, color: "#3f37c9" },
        { name: "Accessibility", value: 15, color: "#7209b7" },
        { name: "Other", value: 10, color: "#f72585" },
      ],
      recommendations: [
        {
          id: 1,
          title: "Advanced CSS Techniques",
          description: "Elevate your styling skills with advanced CSS concepts.",
          progress: 30,
          icon: "HTML",
          category: "Design",
        },
        {
          id: 2,
          title: "React State Management",
          description: "Master complex application states in React.",
          progress: 65,
          icon: "CSS",
          category: "Development",
        },
        {
          id: 3,
          title: "Web Accessibility Basics",
          description: "Build inclusive web experiences for all users.",
          progress: 0,
          icon: "JS",
          category: "Best Practices",
        },
      ],
      modules: [
        {
          id: 1,
          title: "HTML & CSS Fundamentals",
          progress: 85,
          assessments: [
            { name: "Quiz 1", score: 92 },
            { name: "Assignment", score: 88 },
            { name: "Final Test", score: 85 },
          ],
        },
        {
          id: 2,
          title: "JavaScript Basics",
          progress: 70,
          assessments: [
            { name: "Quiz 1", score: 78 },
            { name: "Assignment", score: 82 },
            { name: "Final Test", score: null },
          ],
        },
        {
          id: 3,
          title: "Responsive Web Design",
          progress: 45,
          assessments: [
            { name: "Quiz 1", score: 90 },
            { name: "Assignment", score: null },
            { name: "Final Test", score: null },
          ],
        },
      ],
    };

    setLearningData(mockData);
  }, []);

  if (!learningData) {
    return <div>Loading...</div>;
  }

  return (
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
              <DashboardLayout
                student={learningData.user}
                onLogout={() => setIsLoggedIn(false)}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard data={learningData} />} />
          <Route path="profile" element={<Profile user={learningData.user} />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;

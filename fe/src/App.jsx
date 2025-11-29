import { Route, Routes } from "react-router";
/* pages */
import DashboardPage from "./pages/DashboardPage";

/* layouts */
import StudentsLayout from "./components/layouts/StudentsLayout";

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<StudentsLayout />}>
				<Route index element={<DashboardPage />} />
				<Route path="/profile" element={<DashboardPage />} />
			</Route>
		</Routes>
	);
}

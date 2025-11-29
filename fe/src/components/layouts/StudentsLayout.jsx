import Sidebar from "./../common/Sidebar";
import { Outlet } from "react-router";
import Header from "./../common/Header";
export default function StudentsLayout() {
	return (
		<>
			<div className="flex w-screen">
				<Sidebar />
				<div className="flex flex-col w-full">
					<Header />
					<Outlet />
				</div>
			</div>
		</>
	);
}

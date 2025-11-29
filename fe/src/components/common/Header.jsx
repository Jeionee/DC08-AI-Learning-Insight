export default function Header() {
	return (
		<header className="flex justify-between items-center p-4 shadow-md">
			<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
			<div className="flex items-center space-x-3">
				<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
					photo
				</div>
				<span className="text-gray-700 font-medium">nama</span>
			</div>
		</header>
	);
}

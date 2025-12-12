export default function Hero({ student }) {
	return (
		<div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 pb-24 pt-24 px-6 lg:px-12 shadow-lg relative z-0">
			<div className="max-w-7xl mx-auto">
				{/* Welcome Text Only (Stats dipindah) */}
				<div className="flex flex-col md:flex-row justify-between items-end gap-6">
					<div>
						<h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2 leading-tight">
							<br /> Selamat Datang, <br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">
								{student.name?.split(" ")[0]}!
							</span>{" "}
							👋
						</h1>
						<p className="text-indigo-200 text-base max-w-lg">
							Siap melanjutkan progres belajarmu? Mari kita selesaikan target hari ini dengan
							semangat!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

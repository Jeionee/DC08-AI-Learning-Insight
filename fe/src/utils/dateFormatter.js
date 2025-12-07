const dateFormatter = (tanggalString) => {
	if (!tanggalString) return "";

	try {
		const [tahun, bulan, hari] = tanggalString.split("-").map(Number);

		const tanggal = new Date(tahun, bulan - 1, hari);

		return tanggal.toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	} catch (error) {
		console.warn("Gagal format tanggal:", tanggalString);
		return tanggalString;
	}
};
export default dateFormatter;

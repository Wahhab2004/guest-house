const formatDateIndo = (isoDateStr: string): string => {
	const date = new Date(isoDateStr);

	const tanggal = date.toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});


	return `${tanggal}`;
};
export default formatDateIndo;

// Cara 1
export  function FormatTanggalIndoAdmin(tanggal: string) {
    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };
    const date = new Date(tanggal);
    const formattedDate = date.toLocaleString("id-ID", options);
    return formattedDate.replace("/", "-").replace("/", "-").replace(".", ":");
}

// Cara 2
export function FormatTanggalIndoUser(dateString: string): string {
  const date = new Date(dateString);

  return date.toLocaleDateString("id-ID", {
    weekday: "long",     // Kamis
    day: "2-digit",      // 15
    month: "long",       // Mei
    year: "numeric",     // 2025
  });
}


export function formatTanggalIndonesia(tanggalString: string): string {
	const tanggal = new Date(tanggalString);
	const day = tanggal.getDate().toString().padStart(2, "0");
	const month = (tanggal.getMonth() + 1).toString().padStart(2, "0");
	const year = tanggal.getFullYear();
	return `${day}-${month}-${year}`;
}
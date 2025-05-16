// Cara 1
export default function FormatTanggalIndoAdmin(tanggal: string) {
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

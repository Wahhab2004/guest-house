const ConvertDate = (timestamp: {
    seconds: number;
    nanoseconds: number;
}) => {
    const seconds = timestamp.seconds;
    const nanoseconds = timestamp.nanoseconds;

    // Mengonversi menjadi objek Date
    const date = new Date(seconds * 1000); // Mengonversi detik ke milidetik
    const dateWithNanoseconds = new Date(
        date.getTime() + nanoseconds / 1000000
    ); // Menambahkan nanodetik

    // Menggunakan toLocaleString untuk mendapatkan format tanggal dan waktu yang diinginkan
    const formattedDate = dateWithNanoseconds.toLocaleString("jp-JP", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return formattedDate.replace("/", "-").replace("/", "-").replace(".", ":");
};

export default ConvertDate;
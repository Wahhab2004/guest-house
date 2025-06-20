export const getData = async (url: string) => {
	try {
		const res = await fetch(url, {
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Failed to fetch data");
		}
		return res.json();
	} catch (error) {
		console.log(error);
		throw error;
	}
};

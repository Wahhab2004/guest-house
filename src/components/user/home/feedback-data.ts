interface Review {
	name: string;
	review: string;
	rating?: string;
	avatar?: string;
}

const reviewers: Review[] = [
	{
		name: "Fikri Nur Muhammad",
		review:
			"Really great and very clean. The room has a strong Japanese tatami vibe. It’s only a 50-meter walk to the convenience store (kombini), close to AEON supermarket, and just 350 meters from the bus stop. The location feels very authentically Japanese, in a quiet residential neighborhood.",
		rating: "5",
		avatar:
			"https://i.pinimg.com/736x/f4/07/5d/f4075d3fdfdf01e3162a845403fdce5f.jpg",
	},
	{
		name: "Lilyani Hendrik",
		review:
			"Thank you so much, ma’am, for recommending such a comfortable and pleasant place to stay. Ummu Ryosuke Guesthouse is truly worth it and highly recommended. We really enjoyed our stay there. Please forgive us if there were any mistakes in our words or actions during our visit.",
		rating: "5",
		avatar:
			"https://i.pinimg.com/736x/37/f0/a4/37f0a457e30955ee67bd690451e3b03a.jpg",
	},
];

export default reviewers;

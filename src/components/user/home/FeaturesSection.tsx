import React from "react";

const FeaturesSection = () => {
	return (
		<div className="w-11/12 xl:w-full max-w-7xl mx-auto mt-10 px-4">
			<div className="text-center">
				<h1 className="text-[2.5rem] font-semibold">
					Why Choose Ummu Guest House?
				</h1>
				<p className="text-gray-500">
					&quot;Your home away from home – where comfort, culture, and convenience meet.&quot;
				</p>
			</div>
			<div className="grid md:grid-cols-2 gap-10 mt-10">
				{features.map((feature, index) => (
					<div key={index} className="flex gap-4 items-start">
						<span className="p-3 rounded-full bg-blue-100">
							<svg
								className="w-6 h-6 text-blue-600"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d={feature.iconPath}
								/>
							</svg>
						</span>
						<div>
							<h3 className="font-semibold text-xl">{feature.title}</h3>
							<p className="mt-1 text-gray-500">{feature.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const features = [
	{
		title: "Complete Home Facilities",
		description:
			"From a fully equipped kitchen, washing machine, bathtub, to a shared refrigerator – everything you need for a comfortable and worry-free stay.",
		iconPath:
			"m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z",
	},
	{
		title: "Close to Major Attractions",
		description:
			"Just minutes away from Tokyo Skytree, Disneyland, Asakusa, and more – explore Tokyo with ease.",
		iconPath:
			"m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5",
	},
	{
		title: "Easy Access to Public Transport",
		description:
			"Walk to Shinkoiwa JR Station, take a direct bus to popular spots, or head straight to Narita Airport with ease.",
		iconPath:
			"M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z",
	},
	{
		title: "Indonesian Food Available",
		description:
			"Missing home flavors? We can prepare delicious Indonesian meals so you feel right at home.",
		iconPath:
			"M9.5 11.5 11 13l4-3.5M12 20a16.405 16.405 0 0 1-5.092-5.804A16.694 16.694 0 0 1 5 6.666L12 4l7 2.667a16.695 16.695 0 0 1-1.908 7.529A16.406 16.406 0 0 1 12 20Z",
	},
	{
		title: "Nearby Convenience Stores & Supermarket",
		description:
			"Only a short walk to Seven Eleven (2 minutes) and MaxValue Supermarket (5 minutes) for all your needs.",
		iconPath:
			"M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z",
	},
	{
		title: "Family-Friendly Environment",
		description:
			"Kids under 5 stay free, and children 5–10 years old get 50% off – making it easier for families to travel together.",
		iconPath:
			"M12 6.5v11m-5.5-5.5h11",
	},
];

export default FeaturesSection;

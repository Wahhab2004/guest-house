export default function HeroSection() {
	return (
		<section>
			<div
				style={{
					backgroundImage: "url(/images/house.jpg)",
				}}
				className="flex items-center justify-center text-center w-full h-screen text-center m-auto text-white"
			>
				<div className="mx-auto bg-black/50 p-10 w-screen">
					<h1 className="text-[2.5rem] ">
						Your perfect retreat for comfort, serenity, and
					</h1>
					<h1 className="text-[2.5rem]">unforgettable experiences.</h1>
				</div>
			</div>
		</section>
	);
}

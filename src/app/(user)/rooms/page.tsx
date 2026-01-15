import ProductCard from "@/components/roomCard";

async function Rooms() {
	return (
		<section>
			{/* Hero Section */}
			<div
				className="w-full h-[70vh] bg-cover bg-center bg-no-repeat flex justify-center items-center text-white text-center"
				style={{ backgroundImage: "url(/images/rooms.jpg)" }}
			>
				<h1 className="text-[2.5rem] font-semibold">Our Rooms</h1>
			</div>

			<ProductCard />
		</section>
	);
}

export default Rooms;

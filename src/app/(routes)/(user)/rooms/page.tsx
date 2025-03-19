import React from "react";

import ProductCard from "@/components/ProductCard";

async function Rooms() {
	return (
		<section>
			{/* Hero Section */}
			<div
				style={{
					height: "100vh",
					backgroundImage: "url(/images/bg-rooms.png)",
					backgroundSize: "cover",
					display: "flex",
					backgroundPosition: "center",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
				}}
				className="w-full h-screen text-center m-auto text-white"
			>
				
				<div>
					<h1 className="text-[2.5rem]">Our Rooms</h1>
				</div>
			</div>

            <div className="w-11/12 mx-auto mb-20 lg:mt-20">

                <h1 className="text-[2.4rem] font-semibold w-full lg:ml-20">Our Rooms Available</h1>
				<p className="text-gray-400 lg:ml-20">Make yourself at home at GuestHouse Ummu 
				– where every stay feels special.</p>

                <ProductCard
                    params={{
                        slug: [],
                    }}
                />
            </div>

		</section>
	);
}

export default Rooms;

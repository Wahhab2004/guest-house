"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<>
			<h1 className="text-[#5D6679] text-xl font-bold mt-6  ml-[230px] ">
				Check In/ Out
			</h1>

			<nav className="ml-[230px] absolute top-[150px]">
				<ul className="flex justify-start item-center ">
					{/* Check In */}
					<Link href="/checkin">
					
						<li className={`rounded-full border text-sm font-medium p-2 px-4 hover:bg-blue-100 hover:border-blue-600 hover:text-blue-600 tracking-wide cursor-pointer ${pathname === "/checkin" ? "border-blue-600 text-blue-600  hover:bg-white" : "text-gray-600 border-gray-600 "} mr-3 ` }>Check in</li>
					</Link> 


					{/* Check Out */}
					<Link href="/checkout">
					
						<li className={`rounded-full border text-sm font-medium p-2 px-3 hover:bg-blue-100 hover:border-blue-600 hover:text-blue-600 tracking-wide cursor-pointer ${pathname === "/checkout" ? "border-blue-600 text-blue-600 hover:bg-white" : "text-gray-600 border-gray-600"} `}>Check out</li>
					</Link>
				</ul>
			</nav>
			{children}
		</>
	);
}

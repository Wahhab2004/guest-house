"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import NavbarAdmin from "@/components/NavbarAdmin";


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		
			<>
                <NavbarAdmin />
				{children}
    
			
			</>
		
	);
}

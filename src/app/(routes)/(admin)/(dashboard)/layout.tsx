"use client";

import NavbarAdmin from "@/components/NavbarAdmin";


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		
			<>
                <NavbarAdmin />
				{children}
    
			
			</>
		
	);
}

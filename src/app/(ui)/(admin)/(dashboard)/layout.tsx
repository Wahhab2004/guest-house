"use client";

import NavbarAdmin from "@/components/admin/navbarAdmin";

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

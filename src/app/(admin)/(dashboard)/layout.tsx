"use client";

import NavbarAdmin from "@/components/admin/adminNavbar";

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

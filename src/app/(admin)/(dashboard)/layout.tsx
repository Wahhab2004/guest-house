"use client";

import NavbarAdmin from "@/components/admin/admin-navbar";

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

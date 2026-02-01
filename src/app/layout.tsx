import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./provider";
import LayoutClient from "./layoutClient";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={` antialiased`}>
				<Providers>
					<LayoutClient>{children}</LayoutClient>
					<Toaster position="top-right" reverseOrder={false} />
				</Providers>
			</body>
		</html>
	);
}

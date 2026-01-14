"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { loadUserFromStorage } from "@/store/slices/authSlice";
import Cookies from "js-cookie";

function InitializeAuth({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		// Load user dari cookie saat app mount
		const token = Cookies.get("token");
		const userStr = Cookies.get("user");

		if (token && userStr) {
			try {
				const user = JSON.parse(userStr);
				store.dispatch(
					loadUserFromStorage({
						user,
						token,
					})
				);
			} catch (error) {
				console.error("Failed to parse user from cookie:", error);
			}
		}
	}, []);

	return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<Provider store={store}>
			<InitializeAuth>{children}</InitializeAuth>
		</Provider>
	);
}

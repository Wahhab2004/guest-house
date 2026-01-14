import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";
import Cookies from "js-cookie";

interface AuthState {
	user: {
		id: string;
		username: string;
		name: string;
		email: string;
	} | null;
	token: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	token: null,
	loading: false,
	error: null,
};

/* =====================
   THUNK: LOGIN ADMIN & GUEST
===================== */
export const loginAdmin = createAsyncThunk(
	"auth/login",
	async (
		payload: { username: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
			// Detect endpoint berdasarkan origin atau bisa langsung try /login-admin dulu
			const endpoints = ["/login-admin", "/login"];
			let lastError = null;

			for (const endpoint of endpoints) {
				try {
					const res = await fetch(`${baseUrl}${endpoint}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(payload),
					});

					const data = await res.json();

					if (res.ok) {
						// Simpan token ke cookie
						Cookies.set("token", data.token, { expires: 1 });
						Cookies.set("user", JSON.stringify(data.user), { expires: 1 });
						return data;
					}

					lastError = data.message || `Login failed at ${endpoint}`;
				} catch (err) {
					lastError = err;
					continue;
				}
			}

			return rejectWithValue(lastError || "Login gagal");
		} catch (error: any) {
			return rejectWithValue(error.message || "Terjadi kesalahan saat login");
		}
	}
);

/* =====================
   SLICE
===================== */
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logout(state) {
			state.user = null;
			state.token = null;
			Cookies.remove("token");
			Cookies.remove("user");
		},
		// Load user dari cookie/localStorage saat app mount
		loadUserFromStorage(state, action) {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginAdmin.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginAdmin.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.user;
				state.token = action.payload.token;
				state.error = null;
			})
			.addCase(loginAdmin.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
				state.user = null;
				state.token = null;
			});
	},
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;

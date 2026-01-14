import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";

interface AuthState {
	user: {
		id: string;
		username: string;
		name: string;
		email: string;
	} | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
};

/* =====================
   THUNK: LOGIN ADMIN
===================== */
export const loginAdmin = createAsyncThunk(
	"auth/loginAdmin",
	async (payload: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const data = await apiFetch("/admin/login", {
				method: "POST",
				body: JSON.stringify(payload),
			});

			return data;
		} catch (error: any) {
			return rejectWithValue(error.message);
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
				// state.token = action.payload.token;
			})
			.addCase(loginAdmin.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

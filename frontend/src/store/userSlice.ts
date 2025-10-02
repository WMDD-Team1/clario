import { createUser, mapUser } from "@/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../models";



interface UserState {
    data: User | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    data: null,
    loading: false,
    error: null,
    isAuthenticated: false,
}

export const login = createAsyncThunk(
    "user/login",
    async () => {
        try {
            const res = await createUser();
            console.log("Fetched user:", res);
            return mapUser(res);
        } catch (err: any) {
            console.error("Error in login thunk:", err);
            if (err.response && err.response.status === 404) {
                throw new Error("404: User not found");
            }
            throw err;
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.isAuthenticated = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
                state.error = null;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.data = null;
                state.loading = false;
                state.error = action.error.message || "Unknown error fetching the user";
                state.isAuthenticated = false;
            })
    }
})

export const { logout } = userSlice.actions;
export default userSlice.reducer;


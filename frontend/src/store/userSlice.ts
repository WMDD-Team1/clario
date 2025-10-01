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
    async (auth0Id: string) => {
        // const res = await fetchUserById(auth0Id);
        const res = await createUser({
            auth0Id: auth0Id,
            email: "bitna@test.com",
            name: "Bitna Lee",
            userType: "Contractor",
            profileImage: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
            province: "BC",
            currency: "CAD",
            onBoardingCompletedAt: "2025-09-25T12:34:56.000Z",
        });
        return mapUser(res);
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


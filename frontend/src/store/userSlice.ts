import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../models';
import api from '@api/api';

interface UserState {
  data: User | undefined | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: undefined,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const res = await api.get('/auth/me');
  return res.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = undefined;
      state.error = null;
      state.loading = false;
    },
    updateUser: (state, action) => {
      if (state.data) {
        state.data = {
          ...state.data,
          ...action.payload,
          settings: {
            ...state.data.settings,
            ...action.payload.settings,
          },
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.error?.message || null;
      });
  },
});

export const { logout, updateUser } = userSlice.actions;
export default userSlice.reducer;

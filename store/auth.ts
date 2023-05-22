import { RootState } from '@/store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  user: User | null;
  token: string | null;
};
export interface User {
  createdAt: any;
  user: any;
  _id: string;
  first_name: string;
  last_name: string;
  phone: string;
  auth_type: string;
  allergies: any[];
  status: string;
  email: string;
  imageURL: any[];
  isEmailVerified: boolean;
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
    removedCredentials: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, removedCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;

import { createSlice } from '@reduxjs/toolkit';

export const recoverPasswordSlice = createSlice({
  name: 'recoverPassword',
  initialState: {
    passwordRecovered: false,
    error: '',
    isLoading: false,
    
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPasswordRecovered: (state, action) => {
      state.passwordRecovered = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const forgetPasswordAction=recoverPasswordSlice.actions
export default recoverPasswordSlice.reducer
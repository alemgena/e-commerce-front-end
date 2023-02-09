import { createSlice } from '@reduxjs/toolkit';
let userInfo;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  userInfo = JSON.parse(localStorage.getItem('userInfo')!);
}
export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    inputValues: {
      email: '',
      password: '',
    },
    inputErrors: {
      emailErr: '',
      passwordErr: '',
    },
    isLoading: false,
    isUserLogged: false,
    loggedUser: userInfo,
    error: '',
  },
  reducers: {
    setEmail: (state, action) => {
      state.inputValues.email = action.payload;
    },
    setPassword: (state, action) => {
      state.inputValues.password = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsUserLogged: (state, action) => {
      state.isUserLogged = action.payload;
    },
    setLoggedUser: (state, action) => {
      state.loggedUser = action.payload;
    },
    setEmailErr: (state, action) => {
      state.inputErrors.emailErr = action.payload;
    },
    setPasswordErr: (state, action) => {
      state.inputErrors.passwordErr = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const loginAction = loginSlice.actions;
export default loginSlice.reducer;
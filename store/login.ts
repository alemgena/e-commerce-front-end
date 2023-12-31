import { PayloadAction, createSlice } from '@reduxjs/toolkit';
let userInfo;
let isLogout;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  userInfo = JSON.parse(localStorage.getItem('userInfo')!);
  isLogout = localStorage.getItem('logout')!;
}
interface LoginState {
  // other state properties
  isUserLogged: boolean;
}

const initialState: LoginState = {
  // other initial state properties
  isUserLogged: false,
};
export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    inputValues: {
      input: '',
      password: '',
    },
    inputErrors: {
      inputErr: '',
      passwordErr: '',
    },
    isLoading: false,
    isUserLogged: false,
    logout: isLogout,
    loggedUser: userInfo,
    error: '',
  },
  reducers: {
    setInput: (state, action) => {
      state.inputValues.input = action.payload;
    },
    setLogout: (state, action) => {
      state.logout = action.payload;
    },
    setIsUserLogged: (state, action: PayloadAction<boolean>) => {
      state.isUserLogged = action.payload;
    },

    setPassword: (state, action) => {
      state.inputValues.password = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    setInputErr: (state, action) => {
      state.inputErrors.inputErr = action.payload;
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
export const { setIsUserLogged } = loginSlice.actions;
export default loginSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    inputValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '+251 ',
      password1: '',
      password2: '',
    },
    inputErrors: {
      firstNameErr: '',
      lastNameErr: '',
      emailErr: '',
      phoneErr: '',
      password1Err: '',
      password2Err: '',
    },
    isLoading: false,
    userInfo: null,
    registrationSuccessful: false,
    error: '',
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFirstName: (state, action) => {
      state.inputValues.first_name = action.payload;
    },
    setLastName: (state, action) => {
      state.inputValues.last_name = action.payload;
    },
    setEmail: (state, action) => {
      state.inputValues.email = action.payload;
    },
    setPhone: (state, action) => {
      state.inputValues.phone = action.payload;
    },
    setPassword1: (state, action) => {
      state.inputValues.password1 = action.payload;
    },
    setPassword2: (state, action) => {
      state.inputValues.password2 = action.payload;
    },

    setFirstNameErr: (state, action) => {
      state.inputErrors.firstNameErr = action.payload;
    },
    setLastNameErr: (state, action) => {
      state.inputErrors.lastNameErr = action.payload;
    },
    setEmailErr: (state, action) => {
      state.inputErrors.emailErr = action.payload;
    },
    setPhoneErr: (state, action) => {
      state.inputErrors.phoneErr = action.payload;
    },
    setPassword1Err: (state, action) => {
      state.inputErrors.password1Err = action.payload;
    },
    setPassword2Err: (state, action) => {
      state.inputErrors.password2Err = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setRegistrationSuccessful: (state, action) => {
      state.registrationSuccessful = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});
export const registerAction=registerSlice.actions
export default registerSlice.reducer;

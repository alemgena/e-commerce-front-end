import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    inputValues: {
      firstName: '',
      lastName: '',
      phone: '',
      image: null,
    },
    inputErrs: {
      firstNameErr: '',
      lastNameErr: '',
      phoneErr: '',
    },
    profileUpdated: false,
    isLoading: false,
    error:''
  },

  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFirstName: (state, action) => {
      state.inputValues.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.inputValues.lastName = action.payload;
    },
    setPhone: (state, action) => {
      state.inputValues.phone = action.payload;
    },
    setFirstNameErr: (state, action) => {
      state.inputErrs.firstNameErr = action.payload;
    },
    setLastNameErr: (state, action) => {
      state.inputErrs.lastNameErr = action.payload;
    },
    setPhoneErr: (state, action) => {
      state.inputErrs.phoneErr = action.payload;
    },
    setProfileUpdated: (state, action) => {
      state.profileUpdated = action.payload;
    },
    setImage: (state, action) => {
      state.inputValues.image = null;
      state.inputValues.image = action.payload;
    },
  },
});
export const profileActions = profileSlice.actions;
export default profileSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favorite: null,
    isLoading: false,
    error: '',
  },
  reducers: {
    setFavorite: (state, action) => {
      state.favorite = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const favoriteAction = favoriteSlice.actions;
export default favoriteSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favorite: null,
    products: [],
    isLoading: false,
    error: '',
    viewFavouritError: null
  },
  reducers: {
    setFavorite: (state, action) => {
      state.favorite = action.payload;
    },
    setFavouriteError: (state, action) => {
      state.viewFavouritError = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
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

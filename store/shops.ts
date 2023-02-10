import { createSlice } from '@reduxjs/toolkit';
const shopSlice = createSlice({
  name: 'shops',
  initialState: {
    shop: [],
    isLoading: false,
    error: '',
  },
  reducers: {
    setShops: (state, action) => {
      state.shop = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const shopAction = shopSlice.actions;
export default shopSlice.reducer;

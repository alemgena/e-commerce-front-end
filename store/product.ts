import { createSlice } from '@reduxjs/toolkit';
export const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: {},
    isLoading: false,
    error: '',
  },
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const productActions = productSlice.actions;
export default productSlice.reducer;
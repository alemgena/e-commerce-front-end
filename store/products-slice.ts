import { createSlice } from "@reduxjs/toolkit";
 const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    error:""
  },
  reducers: {
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
export const productAction = productsSlice.actions;
export default productsSlice.reducer;
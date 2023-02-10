import { createSlice } from "@reduxjs/toolkit";
 const featuredProductsSlice = createSlice({
  name: "featuredProducts",
  initialState: {
    featuredProducts: [],
    isLoading: false,
    error:""
    
  },
  reducers: {
    setProducts: (state, action) => {
      state.featuredProducts = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const featuredProductsAction = featuredProductsSlice.actions;
export default featuredProductsSlice.reducer;
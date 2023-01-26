import { createSlice } from "@reduxjs/toolkit";
let productInfo
if (typeof window !== 'undefined') {
  // Perform localStorage action
productInfo=JSON.parse(localStorage.getItem('products')!)
}
 const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: productInfo,
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
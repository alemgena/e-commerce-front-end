import { createSlice } from "@reduxjs/toolkit";
 const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    isLoading: false,
    error:""
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const categoryAction = categoriesSlice.actions;
export default categoriesSlice.reducer;
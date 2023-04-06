import { createSlice } from "@reduxjs/toolkit";
 const subCategoriesSlice = createSlice({
  name: "subCategories",
  initialState: {
    subCategories: [],
    isLoading: false,
    error:""
  },
  reducers: {
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const subCategoriesAction = subCategoriesSlice.actions;
export default subCategoriesSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
 const productsSlice = createSlice({
   name: 'products',
   initialState: {
     inputValues: {
       name: '',
       description: '',
       price: '',
       subcategory: '',
       options: [],
     },
     inputErrors: {
       nameErr: '',
       descriptionErr: '',
       priceErr: '',
       subcategoryErr: '',
       optionsErr: '',
     },
     productAdded: false,
     productAddError: '',
     products: [],
     isLoading: false,
     error: '',
   },
   reducers: {
     setProductAdded: (state, action) => {
       state.productAdded = action.payload;
     },
     setProductAddError: (state, action) => {
       state.productAddError = action.payload;
     },
     setName: (state, action) => {
       state.inputValues.name = action.payload;
     },
     setDescription: (state, action) => {
       state.inputValues.description = action.payload;
     },
     setPrice: (state, action) => {
       state.inputValues.price = action.payload;
     },
     setSubCategory: (state, action) => {
       state.inputValues.subcategory = action.payload;
     },
     setOptions: (state, action) => {
       state.inputValues.options = action.payload;
     },
     setNameErr: (state, action) => {
       state.inputErrors.nameErr = action.payload;
     },
     setDescriptionErr: (state, action) => {
       state.inputErrors.descriptionErr = action.payload;
     },
     setPriceErr: (state, action) => {
       state.inputErrors.priceErr = action.payload;
     },
     setSubcategoryErr: (state, action) => {
       state.inputErrors.subcategoryErr = action.payload;
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
export const productAction = productsSlice.actions;
export default productsSlice.reducer;
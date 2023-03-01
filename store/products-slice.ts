import { createSlice } from "@reduxjs/toolkit";
 const productsSlice = createSlice({
   name: 'products',
   initialState: {
     inputValues: {
       name: '',
       description: '',
       price: '',
       subcategory: '',
       region: '',
       latitude: '',
       longitude: '',
       options: [],
     },
     inputErrors: {
       nameErr: '',
       descriptionErr: '',
       priceErr: '',
       subcategoryErr: '',
       regionErr: '',
       latitudeErr: '',
       longitudeErr: '',
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
     setRegion: (state, action) => {
       state.inputValues.region = action.payload;
     },
     setLatitude: (state, action) => {
       state.inputValues.latitude = action.payload;
     },
     setLongitude: (state, action) => {
       state.inputValues.longitude = action.payload;
     },
     setProductAddError: (state, action) => {
       state.productAddError = action.payload;
     },
     setName: (state, action) => {
       state.inputValues.name = action.payload;
     },
     setRegionErr: (state, action) => {
       state.inputErrors.regionErr = action.payload;
     },
     setLatitudeErr: (state, action) => {
       state.inputErrors.latitudeErr = action.payload;
     },
     setLongitudeErr: (state, action) => {
       state.inputErrors.longitudeErr = action.payload;
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
     setOptionErr: (state, action) => {
       state.inputErrors.optionsErr = action.payload;
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
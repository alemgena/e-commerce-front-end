
import activeMenuItemReducer from './activeMenuItem-slice';
import megaMenuReducer from './megaMenu-slice';
import productReducer from './products-slice'
import categorieReducer from './category-slice'
import featuredProducts from './featured-products-slice'
import subCategories from './subCategory-slice'
import login from './login'
import register from './register'
import {
  configureStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {rootSaga} from '../redux/sagas'
import favorite from './favorite'
import forgetPassword from './forgetPassword'
import shops from './shops';
import product from './product';
let sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    activeMenuItem: activeMenuItemReducer,
    megaMenu: megaMenuReducer,
    products: productReducer,
    categories: categorieReducer,
    featuredProducts: featuredProducts,
    subCategories: subCategories,
    favorite: favorite,
    login: login,
    register: register,
    recoverPassword: forgetPassword,
    shops: shops,
    product:product
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export default store;


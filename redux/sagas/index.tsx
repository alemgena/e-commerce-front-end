import { all } from 'redux-saga/effects';
import { watchProductsAsync } from './products';
import { watchCategoriesAsync } from './category';
import { watchSubCategoriesAsync } from './subCategory';
import { watchFavoriteAsync } from './favorite';
import { watchLoginAsync } from './login';
import {watchRegisterAsync} from './register'
import {watchForgetPasswwordAsync} from './forgetPassword'
import{watchShopsAsync} from './shops'
export function* rootSaga() {
  yield all([
    watchProductsAsync(),
    watchSubCategoriesAsync(),
    watchCategoriesAsync(),
    watchFavoriteAsync(),
    watchLoginAsync(),
    watchForgetPasswwordAsync(),
    watchRegisterAsync(),
    watchShopsAsync()
  ]);
}

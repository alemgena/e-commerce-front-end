import { all } from "redux-saga/effects";
import { watchProductsAsync } from "./products";
import {watchCategoriesAsync} from './category'
import {watchSubCategoriesAsync} from './subCategory'
import { watchFavoriteAsync } from './favorite';



export function* rootSaga() {
    yield all([
        watchProductsAsync(),watchSubCategoriesAsync(),
        watchCategoriesAsync(),watchFavoriteAsync()
    ])
}
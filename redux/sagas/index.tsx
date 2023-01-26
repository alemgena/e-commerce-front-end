import { all } from "redux-saga/effects";
import { watchProductsAsync } from "./products";
import {watchCategoriesAsync} from './category'
import {watchSubCategoriesAsync} from './subCategory'


export function* rootSaga() {
    yield all([
        watchProductsAsync(),watchSubCategoriesAsync(),
        watchCategoriesAsync()
    ])
}
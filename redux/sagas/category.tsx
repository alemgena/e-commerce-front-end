import {categoryAction}  from "../../store/category-slice";
import {GET_CATEGORIES} from '../../types'
import {getCategoriesAPI} from '../../apis/categories'
import {put, takeEvery } from 'redux-saga/effects'
export function* getCategories():any {
    try{
    yield put(categoryAction.setIsLoading(true))
    const response = yield getCategoriesAPI()
    yield put(categoryAction.setCategories(response.data))
    yield put(categoryAction.setIsLoading(false))
    }
    catch(error:any){
        yield put(categoryAction.setError(error.response.data.error))
        yield put(categoryAction.setIsLoading(false))
    }
}
export function* watchCategoriesAsync() {
    yield takeEvery(GET_CATEGORIES, getCategories)
}
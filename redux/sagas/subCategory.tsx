import {subCategoriesAction}  from "../../store/subCategory-slice";
import {GET_SUB_CATEGORIES} from '../../types'
import {getSubCategoriesAPI} from '../../apis/subCategories'
import {put, takeEvery } from 'redux-saga/effects'
export function* getSubCategories(action:any):any {
    try{
    yield put(subCategoriesAction.setIsLoading(true))
    const response = yield getSubCategoriesAPI(action.category)
    yield put(subCategoriesAction.setSubCategories(response.data))
    yield put(subCategoriesAction.setIsLoading(false))
    }
    catch(error:any){
        yield put(subCategoriesAction.setError(error.response.data.error))
        yield put(subCategoriesAction.setIsLoading(false))
    }
}
export function* watchSubCategoriesAsync() {
    yield takeEvery(GET_SUB_CATEGORIES, getSubCategories)
}
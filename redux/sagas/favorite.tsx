import { favoriteAction } from '../../store/favorite';
import { ADD_PRODUCT_FAVORITE, GET_FAVOURITE } from '../../types';
import { addFavoriteApi, getFavouriteAPI } from '../../apis/productFavorit';
import { put, takeEvery } from 'redux-saga/effects';
export function* addFavorite(actions:any): any {
  try {
    yield put(favoriteAction.setIsLoading(true));
    const response = yield addFavoriteApi(actions.data);
    yield put(favoriteAction.setFavorite(response.data));
    yield put(favoriteAction.setIsLoading(false));
  } catch (error: any) {
    yield put(favoriteAction.setError(error.response.data.error));
    yield put(favoriteAction.setIsLoading(false));
  }
}
export function* getFavourite(): any {
  try {
    yield put(favoriteAction.setIsLoading(true));
    const response = yield getFavouriteAPI();
    yield put(favoriteAction.setProducts(response.data));
    yield put(favoriteAction.setIsLoading(false));
  } catch (error: any) {
    console.log(error)
    yield put(favoriteAction.setError(error.response.data.error));
    yield put(favoriteAction.setIsLoading(false));
  }
}
export function* watchFavoriteAsync() {
  yield takeEvery(ADD_PRODUCT_FAVORITE, addFavorite);
  yield takeEvery(GET_FAVOURITE,getFavourite);
}

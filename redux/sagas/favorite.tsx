import { favoriteAction } from '../../store/favorite';
import { ADD_PRODUCT_FAVORITE } from '../../types';
import { addFavoriteApi} from '../../apis/productFavorit';
import { put, takeEvery } from 'redux-saga/effects';
export function* addFavorite(actions:any): any {
  try {
    yield put(favoriteAction.setIsLoading(true));
    const response = yield addFavoriteApi(actions.data);
    yield put(favoriteAction.setFavorite(response.data));
    yield put(favoriteAction.setIsLoading(false));
  } catch (error: any) {
    console.log(error.response.data.error)
    yield put(favoriteAction.setError(error.response.data.error));
    yield put(favoriteAction.setIsLoading(false));
  }
}
export function* watchFavoriteAsync() {
  yield takeEvery(ADD_PRODUCT_FAVORITE, addFavorite);
}

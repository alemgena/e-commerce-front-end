import { shopAction } from '../../store/shops';
import { GET_SHOPS } from '../../types';
import { getShopsAPI } from '../../apis/shops';
import { put, takeEvery } from 'redux-saga/effects';
export function* getShops(): any {
  try {
    yield put(shopAction.setIsLoading(true));
    const response = yield getShopsAPI();
    yield put(shopAction.setShops(response.data));
    yield put(shopAction.setIsLoading(false));
  } catch (error: any) {
    yield put(shopAction.setError(error.response.data.error));
    yield put(shopAction.setIsLoading(false));
  }
}
export function* watchShopsAsync() {
  yield takeEvery(GET_SHOPS, getShops);
}

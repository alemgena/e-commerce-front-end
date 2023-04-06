import { forgetPasswordAction } from '../../store/forgetPassword';
import { FORGET_PASSWORD } from '../../types';
import { forgetPasswordApi } from '../../apis/forgetPassword';
import { put, takeEvery } from 'redux-saga/effects';
export function* forgetPassword(actions: any): any {
    console.log("gggg",actions)
  try {
    yield put(forgetPasswordAction.setIsLoading(true));
     console.log('rrrrr');
    const response = yield forgetPasswordApi(actions.email);
   
    console.log('login', response.data);
    yield put(forgetPasswordAction.setPasswordRecovered(true));
    yield put(forgetPasswordAction.setIsLoading(false));
  } catch (error: any) {
    console.log(error);
    yield put(forgetPasswordAction.setError(error.response.data.error));
    yield put(forgetPasswordAction.setIsLoading(false));

  }
}
export function* watchForgetPasswwordAsync() {
  yield takeEvery(FORGET_PASSWORD, forgetPassword);
}

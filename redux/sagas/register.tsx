import { registerAction } from '../../store/register';
import { REGISTER } from '../../types';
import { registerApi } from '../../apis/register';
import { put, takeEvery } from 'redux-saga/effects';
export function* register(actions: any): any {
  try {
    yield put(registerAction.setIsLoading(true));
    const response = yield registerApi(actions.data);
    yield put(registerAction.setUserInfo(response.data));
    yield put(registerAction.setIsLoading(false));
    yield put(registerAction.setRegistrationSuccessful(true));
  } catch (error: any) {
    console.log(error);
    yield put(registerAction.setError(error.response.data.error));
    yield put(registerAction.setIsLoading(false));
    yield put(registerAction.setRegistrationSuccessful(false));
  }
}
export function* watchRegisterAsync() {
  yield takeEvery(REGISTER, register);
}


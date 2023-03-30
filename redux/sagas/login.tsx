import { loginAction } from '../../store/login';
import { LOGIN } from '../../types';
import { loginApi } from '../../apis/login';
import { put, takeEvery } from 'redux-saga/effects';
import { setCredentials } from '@/store/auth';
export function* login(actions: any): any {
  try {
    yield put(loginAction.setIsLoading(true));
    const response = yield loginApi(actions.data);
    console.log('login', response.data.data);
    // dispatch(
    //   setCredentials({
    //     user: response.data.data.user,
    //     token: response.data.data.tokens.access.token,
    //   })
    // );
    // yield put(loginAction.setLoggedUser(response.data.data));
    yield put(loginAction.setIsLoading(false));
    // yield put(loginAction.setIsUserLogged(true))
    localStorage.setItem('token', response.data.data.tokens.access.token);
    localStorage.setItem('userInfo', JSON.stringify(response.data.data));
  } catch (error: any) {
    console.log(error);
    yield put(loginAction.setError(error.response.data.error));
    yield put(loginAction.setIsLoading(false));
    // yield put(loginAction.setIsUserLogged(false));
  }
}
export function* watchLoginAsync() {
  yield takeEvery(LOGIN, login);
}

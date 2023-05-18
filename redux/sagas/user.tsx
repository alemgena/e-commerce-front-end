import { profileActions } from '../../store/profile';
import { userActions } from '../../store/user';
import {
UPDATE_PROFILE,
GET_USER
} from '../../types';
import {
 updateProfileApi,
 getUserAPI
} from '../../apis/user';
import { put, takeEvery } from 'redux-saga/effects';
export function* updateProfile(actions:any): any {
  try {
    yield put(profileActions.setIsLoading(true));
    console.log("yess")
    const response = yield updateProfileApi(actions.data, actions.config);
    console.log(response)
    yield put(profileActions.setProfileUpdated(response.data));
    yield put(profileActions.setIsLoading(false));
  } catch (error: any) {
    yield put(profileActions.setError(error.response.data.error));
    yield put(profileActions.setIsLoading(false));
  }
}
export function* getUser(actions: any): any {
  try {
    yield put(userActions.setIsLoading(true));
    const response = yield getUserAPI(actions.id, actions.config);
  
    yield put(userActions.setUser(response.data));
    yield put(userActions.setIsLoading(false));
    yield put(userActions.setError(''));
  } catch (error: any) {
    yield put(userActions.setError(error.response.data.error));
    yield put(userActions.setIsLoading(false));
  }
}
export function* watchUsersAsync() {
  yield takeEvery(UPDATE_PROFILE, updateProfile);
   yield takeEvery(GET_USER, getUser);
}

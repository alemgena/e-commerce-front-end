import { PayloadAction } from '@reduxjs/toolkit';
import routes from 'API/api.routes';
import makeCall from 'API/makeCalls';
import { call, put, takeLatest } from 'redux-saga/effects';

function* getFarmerSaga(action: PayloadAction<string>) {
  try {
    const id = action.payload;
    // const response = yield call(makeCall, {
    //   method: 'GET',
    //   isSecureRoute: true,
    //   route: `${routes.user.get}${id}`,
    // });
  } catch (error) {}
}

export function* farmerDetailsSaga() {
  //   yield takeLatest(actions.getUsers.type, getUsersSaga);
}

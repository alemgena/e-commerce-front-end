/* eslint-disable array-callback-return */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';
import { IUserDetails } from './types';

export const initialState: IUserDetails = {};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers(state) {},
  },
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  return { actions: slice.actions };
};
export const userReducers = slice.reducer;

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useCartSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */

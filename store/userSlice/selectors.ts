import { createSelector } from '@reduxjs/toolkit';
// import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: any) => state?.users || initialState;

export const selectFarmer = createSelector(
  [selectSlice],
  (state) => state.users
);

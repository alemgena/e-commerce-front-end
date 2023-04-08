import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface ModalState {
  isOpen: boolean;
  closeable: boolean;
  Component: React.ComponentType<any> | null;
  authenticated?: boolean; // add new property
  callback?: () => Promise<boolean>; // add callback property to ModalState
}
interface ModalActions {
  closeable?: boolean;
  Component: React.ComponentType<any> | null;
  authenticated?: boolean; // add new property
  callback?: () => Promise<boolean>; // add callback property to ModalActions
  type?: typeof openModal;
  payload?: {
    Component?: React.ComponentType<any> | null;
    authenticated?: boolean; // add new property
    props?: any;
    callback?: () => Promise<boolean>; // add callback property to payload
  };
}

const initialState: ModalState = {
  isOpen: false,
  closeable: true,
  authenticated: false,
  Component: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState as ModalState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalActions>) => {
      state.isOpen = true;
      state.Component = action.payload.Component;
      state.callback = action.payload.callback;
      state.closeable = action.payload.closeable ?? true;
      state.authenticated = action.payload?.authenticated ?? false; // set authenticated state
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.closeable = true;
      state.Component = null;
      state.authenticated = false; // reset authenticated state
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;

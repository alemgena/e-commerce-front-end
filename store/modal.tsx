import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface ModalState {
  isOpen: boolean;
  closeable: boolean;
  Component: React.ComponentType<any> | null;
}
interface ModalActions {
  closeable?: boolean;
  Component: React.ComponentType<any> | null;
}

const initialState: ModalState = {
  isOpen: false,
  closeable: true,
  Component: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState as ModalState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalActions>) => {
      state.isOpen = true;
      state.Component = action.payload.Component;
      state.closeable = action.payload.closeable ?? true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.closeable = true;
      state.Component = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModal = (state: RootState) => state.modal;

export default modalSlice.reducer;

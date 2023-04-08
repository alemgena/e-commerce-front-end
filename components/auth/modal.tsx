/* eslint-disable react/function-component-definition */
import { useAppDispatch, useAppSelector } from '@/store';
import { closeModal, selectModal } from '@/store/modal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CustomModal } from '../modal';

export type CurrentTab = 'Login' | 'Register' | 'ForgotPassword';

export const AuthModal: React.FC = () => {
  const { isOpen, Component, closeable } = useAppSelector(selectModal);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };
  const router = useRouter();

  useEffect(() => {
    dispatch(closeModal());
  }, [router.pathname]);

  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => setIsBrowser(true), []);

  if (!isBrowser) {
    return null;
  }

  return (
    <CustomModal
      isOpen={isOpen}
      onCancel={handleClose}
      // width={1050}
      contentStyle={{
        display: 'flex',
        padding: 0,
      }}
      portalClassName="react-modals"
      closeable={closeable}
    >
      {Component && <Component />}
    </CustomModal>
  );
};

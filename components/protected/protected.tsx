import { useAppDispatch, useAppSelector } from '@/store';
import { selectCurrentUser } from '@/store/auth';
import React, { useEffect } from 'react';
import { closeModal, openModal } from '@/store/modal';
import { Login } from '../auth/login';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

type Props = {
  children: ReactNode;
};
const Protected: React.FC<Props> = ({ children }) => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!user.token) {
      dispatch(openModal({ Component: Login, closeable: !!user.token }));
    } else {
      dispatch(closeModal());
    }
  }, [user.token, router.pathname]);
  return <React.Fragment>{children}</React.Fragment>;
};
export default Protected;

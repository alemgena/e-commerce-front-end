import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
function ProtectedRoute({ children }) {
  const router = useRouter();
  const { loggedUser } = useSelector((state) => state.login);
  useEffect(() => {
    if (!loggedUser) {
      router.push('/');
    }
  }, []);
  return <div>{children}</div>;
}

export default ProtectedRoute;

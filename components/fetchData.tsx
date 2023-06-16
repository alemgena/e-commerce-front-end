import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GET_CATEGORIES } from '../types';
import {checkAutoLogin} from '../components/service/authService'
import {useRouter} from 'next/router'
import { useAppSelector } from '@/store';
import { selectCurrentUser } from '@/store/auth';
export default function FetchData() {
  const router=useRouter()
  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch({ type: GET_CATEGORIES });
  }, []);
    const user = useAppSelector(selectCurrentUser);
  useEffect(() => {
  if(!!user)
    checkAutoLogin(dispatch, router);
  }, [user.token, router.pathname]);
  return (
    <div>

    </div>
  );
}

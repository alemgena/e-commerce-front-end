import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GET_CATEGORIES } from '../types';
export default function FetchData() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_CATEGORIES });
  }, []);
  return (
    <div>

    </div>
  );
}

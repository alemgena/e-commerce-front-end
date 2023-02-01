import React,{useEffect,useState} from 'react';
import {RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { GET_PRODUCTS,GET_PRODUCTS_BY_FEATURED,GET_CATEGORIES} from '../types'

export default function FetchData() {
        const dispatch = useDispatch();
        useEffect(() => {
          dispatch({ type: GET_PRODUCTS_BY_FEATURED, featured: true })
          dispatch({ type: GET_CATEGORIES })
         // dispatch({type:GET_PRODUCTS})
        }, []);
  return (
    <div></div>
  )
}

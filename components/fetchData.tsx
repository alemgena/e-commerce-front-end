import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GET_CATEGORIES } from '../types';

import useFirebaseMessaging from './firebase';
import { onMessageListener } from './firebase';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
export default function FetchData() {
  const { token } = useFirebaseMessaging();
  const [notification, setNotification] = useState({ title: '', body: '' });

  const dispatch = useDispatch();
  const notify = () => toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }
  useEffect(() => {
    if (notification?.title) {
      notify();
    }
  }, [notification]);
  useEffect(() => {
    dispatch({ type: GET_CATEGORIES });
    
  }, []);

  onMessageListener()
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log('failed: ', err));
  return (
    <div>
      <Toaster
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </div>
  );
}

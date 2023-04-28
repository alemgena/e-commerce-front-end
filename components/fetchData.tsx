import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GET_CATEGORIES } from '../types';
import useFirebaseMessaging from './firebase';
import { onMessageListener } from './firebase';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { baseURL } from '@/config';
import { useAppSelector } from '@/store';
import { selectCurrentUser } from '@/store/auth';
import { notificationAction } from '@/store/notification';
export default function FetchData() {
  
    const { token } = useFirebaseMessaging();
    console.log('tttttttt',token);
    const { user} = useAppSelector(selectCurrentUser);
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
const updateDeviceToken=async()=>{
      if (!!user&&token){
        let id = user.user ? user.user._id : user._id;
           try {
             const { data } = await axios.patch(
               `${baseURL}api/users/${id}/updateDeviceToken`,
               { device_token: token }
             );
             if (data) {
               console.log('updateResponse', data);
             }
           } catch (error: any) {
           }
      }
    }
      updateDeviceToken()
  }, [user,token]);
  onMessageListener()
    .then((payload) => {
      let notificationCount:any= localStorage.getItem("notificatioCount")!;
      if(payload.notification.title){
        notificationCount++;
        localStorage.setItem('notificatioCount',notificationCount)
        dispatch(notificationAction.setNotificationCount(notificationCount))
      }
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log('failed: ', err));
  return (
    <div>

    </div>
  );
}

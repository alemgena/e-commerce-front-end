// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import {
  getMessaging,
  getToken,
  requestPermission,
  onMessage,
} from 'firebase/messaging';
export const initializeFirebase = () => {
  firebase.initializeApp({
    apiKey: 'AIzaSyDBy7FeVpx69zV6ty-lKmV7qsGA-OAhYf4',
    authDomain: 'mohas-ecommerce.firebaseapp.com',
    projectId: 'mohas-ecommerce',
    storageBucket: 'mohas-ecommerce.appspot.com',
    messagingSenderId: '807553429591',
    appId: '1:807553429591:web:e0d81642e0dae148f0f312',
  });
};
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDBy7FeVpx69zV6ty-lKmV7qsGA-OAhYf4',
  authDomain: 'mohas-ecommerce.firebaseapp.com',
  projectId: 'mohas-ecommerce',
  storageBucket: 'mohas-ecommerce.appspot.com',
  messagingSenderId: '807553429591',
  appId: '1:807553429591:web:e0d81642e0dae148f0f312',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const useFirebaseMessaging = () => {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const messaging = getMessaging();
    console.log(messaging);
    // Notification.requestPermission().then((permission) => {
    //   if (permission === 'granted') {
    //     messaging.getToken().then((token) => {
    //       console.log('Token:', token);
    //       setToken(token);
    //     }).catch((err) => {
    //       console.log('Error getting token:', err);
    //     });
    //   }
    // });
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      }
    });
    getToken(messaging, {
      vapidKey:
        'BNCkuOKBuVBW-A7J6JUwGIpJ3iyDIVO7w_7izCKCXKU68ycRyDBYq0CQiLDmBm6U4ywtLzJVovDsazgxplPjN-Q',
    })
      .then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
          setToken(currentToken);
        } else {
          // Show permission request UI
          console.log(
            'No registration token available. Request permission to generate one.'
          );
          // ...
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
  }, []);

  return { token };
};

export default useFirebaseMessaging;

export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

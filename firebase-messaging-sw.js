// Import Firebase SDK and configure Firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

// Register Firebase service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Firebase service worker registered: ', registration);
      // Initialize Firebase messaging
      firebase.initializeApp({
        apiKey: 'AIzaSyDBy7FeVpx69zV6ty-lKmV7qsGA-OAhYf4',
        authDomain: 'mohas-ecommerce.firebaseapp.com',
        projectId: 'mohas-ecommerce',
        storageBucket: 'mohas-ecommerce.appspot.com',
        messagingSenderId: '807553429591',
        appId: '1:807553429591:web:e0d81642e0dae148f0f312',
      });
      // ...
    })
    .catch((error) => {
      console.error('Error registering Firebase service worker: ', error);
    });
}

// Import Firebase SDK and configure Firebase
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');
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

const messaging = firebase.messaging();
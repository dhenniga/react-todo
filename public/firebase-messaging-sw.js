// Scripts for firebase and firebase messaging
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// // Initialize the Firebase app in the service worker by passing the generated config
// var firebaseConfig = {
//     apiKey: "AIzaSyBP1q266UOuYgRYDkjWtQLn-MxwW2Xkdow",
//     authDomain: "taskboard-4780f.firebaseapp.com",
//     projectId: "taskboard-4780f",
//     storageBucket: "taskboard-4780f.appspot.com",
//     messagingSenderId: "319293178748",
//     appId: "1:319293178748:web:ba2af71b08aa36cdd95af9"
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
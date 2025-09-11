// Firebase messaging service worker for background notifications
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Firebase config (using your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBy1mHikrju1wwETwDyox7a3B7_E8ujmH4",
  authDomain: "sample-60237.firebaseapp.com",
  projectId: "sample-60237",
  storageBucket: "sample-60237.firebasestorage.app",
  messagingSenderId: "56297884302",
  appId: "1:56297884302:web:33d23b940c6f1a442b97df",
  measurementId: "G-Y2K8YKM86M"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/vite.svg',
    badge: '/vite.svg',
    tag: 'firebase-notification',
    requireInteraction: true,
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  // Open the app
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow('/');
      }
    })
  );
});

// Firebase messaging service worker for background notifications
// This is a demo version - replace with actual Firebase config for production

// For demo purposes, we'll create a simple service worker
self.addEventListener('push', function(event) {
  console.log('Push event received:', event);
  
  const options = {
    body: 'You have a new notification!',
    icon: '/vite.svg',
    badge: '/vite.svg',
    tag: 'demo-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'open',
        title: 'Open App'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Demo Notification', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked:', event);
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
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
  }
});

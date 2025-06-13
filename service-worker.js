self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activated');
});

self.addEventListener('push', event => {
  const data = event.data?.json() || {};

  const title = data.title || 'Grow A Garden';
  const options = {
    body: data.body || 'Stock has been updated!',
    icon: 'carrot.png',
    badge: 'carrot.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('./growagarden.html'));
});

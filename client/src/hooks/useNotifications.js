import { useState } from 'react';

const API_BASE_URL = 'http://localhost:3001';

export const useNotifications = () => {
  const [token, setToken] = useState(null);
  const [permission, setPermission] = useState(Notification.permission);
  const [notifications, setNotifications] = useState([]);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    setPermission(permission);
    
    if (permission === 'granted') {
      // Generate demo token
      const demoToken = `demo_token_${Math.random().toString(36).substr(2, 9)}`;
      setToken(demoToken);
      
      // Register with server
      fetch(`${API_BASE_URL}/api/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: demoToken }),
      });
      
      // Setup demo message receiver
      window.demoNotificationReceiver = (title, body) => {
        const notification = {
          id: Date.now(),
          title,
          body,
          timestamp: new Date().toISOString(),
        };
        setNotifications(prev => [notification, ...prev]);
        
        new Notification(title, { body });
      };
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return {
    token,
    permission,
    notifications,
    requestPermission,
    clearNotifications,
  };
};

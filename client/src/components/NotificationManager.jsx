import React from 'react';
import { useNotifications } from '../hooks/useNotifications';

const NotificationManager = () => {
  const {
    token,
    permission,
    notifications,
    requestPermission,
    clearNotifications,
  } = useNotifications();

  const handleEnableNotifications = async () => {
    await requestPermission();
  };

  const handleTestNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Test Notification', {
        body: 'This is a test notification!',
      });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Push Notifications Demo</h1>
      
      <div style={{ margin: '20px 0' }}>
        <p>Status: {permission === 'granted' ? '✅ Enabled' : '❌ Disabled'}</p>
      </div>

      <div style={{ margin: '20px 0' }}>
        <button 
          onClick={handleEnableNotifications}
          disabled={permission === 'granted'}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: permission === 'granted' ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          {permission === 'granted' ? 'Notifications Enabled' : 'Enable Notifications'}
        </button>
        
        <button 
          onClick={handleTestNotification}
          disabled={permission !== 'granted'}
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
            backgroundColor: permission !== 'granted' ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Test Notification
        </button>
        
        {notifications.length > 0 && (
          <button 
            onClick={clearNotifications}
            style={{ 
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Clear ({notifications.length})
          </button>
        )}
      </div>

      {token && (
        <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <strong>Token:</strong> {token.substring(0, 50)}...
        </div>
      )}

      <div style={{ margin: '20px 0' }}>
        <h3>Notifications ({notifications.length})</h3>
        {notifications.length === 0 ? (
          <p>No notifications yet. Use the admin panel to send some!</p>
        ) : (
          <div>
            {notifications.map((notification) => (
              <div key={notification.id} style={{ 
                padding: '10px', 
                margin: '10px 0', 
                border: '1px solid #ddd', 
                borderRadius: '4px' 
              }}>
                <strong>{notification.title}</strong>
                <p>{notification.body}</p>
                <small>{new Date(notification.timestamp).toLocaleString()}</small>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ margin: '20px 0' }}>
        <a 
          href="http://localhost:3001/admin" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Open Admin Panel
        </a>
      </div>
    </div>
  );
};

export default NotificationManager;

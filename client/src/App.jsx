import { useState, useEffect } from 'react'
import { getFCMToken, onMessageListener } from './firebase'

function App() {
  const [notifications, setNotifications] = useState([])
  const [token, setToken] = useState(null)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    // Check if Firebase messaging is supported
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
    }

    // Listen for foreground messages
    onMessageListener()
      .then((payload) => {
        console.log('Received foreground message:', payload)
        setNotifications(prev => [...prev, {
          title: payload.notification.title,
          body: payload.notification.body,
          time: new Date().toLocaleTimeString()
        }])
      })
      .catch((err) => console.log('Failed to receive message:', err))
  }, [])

  // Enable Firebase push notifications
  const enableNotifications = async () => {
    try {
      // Request permission
      const permission = await Notification.requestPermission()
      
      if (permission === 'granted') {
        // Get FCM token
        const fcmToken = await getFCMToken()
        
        if (fcmToken) {
          setToken(fcmToken)
          
          // Register token with server
          await fetch('http://localhost:3001/api/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: fcmToken })
          })
          
          alert('✅ Firebase notifications enabled!')
        } else {
          alert('❌ Failed to get FCM token. Please check Firebase config.')
        }
      } else {
        alert('❌ Notification permission denied!')
      }
    } catch (error) {
      console.error('Error enabling notifications:', error)
      alert('❌ Error enabling notifications. Check console for details.')
    }
  }

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial' }}>
      <h1>🔔 Firebase Push Notifications Demo</h1>
      
      {!isSupported && (
        <div style={{ color: 'red', marginBottom: '20px' }}>
          ❌ Push notifications not supported in this browser
        </div>
      )}
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Status:</strong> {token ? '✅ Connected' : '❌ Not connected'}
        {token && (
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            Token: {token.substring(0, 20)}...
          </div>
        )}
      </div>
      
      <button 
        onClick={enableNotifications}
        disabled={!!token}
        style={{
          padding: '20px 40px',
          fontSize: '18px',
          backgroundColor: token ? '#28a745' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: token ? 'not-allowed' : 'pointer',
          margin: '20px 0'
        }}
      >
        {token ? '✅ Firebase Connected' : '🔔 Enable Firebase Notifications'}
      </button>

      <div style={{ marginTop: '30px' }}>
        <h3>📋 Received Notifications ({notifications.length})</h3>
        {notifications.length === 0 ? (
          <p>Enable notifications and use the admin panel to send some!</p>
        ) : (
          notifications.map((notif, index) => (
            <div key={index} style={{
              padding: '15px',
              margin: '10px 0',
              border: '3px solid #ddd',
              borderRadius: '5px',
              backgroundColor: 'gray'
            }}>
              <strong>{notif.title}</strong>
              <p>{notif.body}</p>
              <small>Time: {notif.time}</small>
            </div>
          ))
        )}
      </div>
      
      {token && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#98e0f8',color:'#000', borderRadius: '8px' }}>
          <h4>📤 Send Notifications</h4>
          <p>Use the admin panel to send Firebase push notifications:</p>
          <a 
            href="/admin"
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '10px'
            }}
          >
            Open Admin Panel
          </a>
        </div>
      )}
    </div>
  )
}

export default App

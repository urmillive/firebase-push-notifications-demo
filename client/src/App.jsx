import { useState } from 'react'

function App() {
  const [notifications, setNotifications] = useState([])

  // Simple function to send a notification
  const sendNotification = async () => {
    // Ask for permission first
    const permission = await Notification.requestPermission()
    
    if (permission === 'granted') {
      // Show a browser notification
      new Notification('Hello!', { 
        body: 'This is a simple push notification!' 
      })
      
      // Add to our list
      setNotifications(prev => [...prev, {
        title: 'Hello!',
        body: 'This is a simple push notification!',
        time: new Date().toLocaleTimeString()
      }])
    } else {
      alert('Please allow notifications to see the demo!')
    }
  }

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial' }}>
      <h1>🔔 Simple Push Notification Demo</h1>
      
      <button 
        onClick={sendNotification}
        style={{
          padding: '20px 40px',
          fontSize: '18px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          margin: '20px 0'
        }}
      >
        📤 Send Notification
      </button>

      <div style={{ marginTop: '30px' }}>
        <h3>📋 Notifications ({notifications.length})</h3>
        {notifications.length === 0 ? (
          <p>Click the button above to send a notification!</p>
        ) : (
          notifications.map((notif, index) => (
            <div key={index} style={{
              padding: '15px',
              margin: '10px 0',
              border: '3px solid #ddd',
              borderRadius: '5px',
              backgroundColor: 'darkgray'
            }}>
              <strong>{notif.title}</strong>
              <p>{notif.body}</p>
              <small>Time: {notif.time}</small>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App

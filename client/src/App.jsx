import { useState } from 'react'

function App() {
  // STEP 1: State to track notifications and permission
  const [notifications, setNotifications] = useState([])
  const [permission, setPermission] = useState(Notification.permission)
  const [token, setToken] = useState(null)

  // STEP 2: Ask user for permission and register with server
  const enableNotifications = async () => {
    // Ask browser for permission
    const result = await Notification.requestPermission()
    setPermission(result)
    
    if (result === 'granted') {
      // Generate a demo token (in real app, this comes from Firebase)
      const demoToken = `demo_${Math.random().toString(36).substr(2, 8)}`
      setToken(demoToken)
      
      // Register token with our server
      fetch('http://localhost:3001/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: demoToken })
      })
      
      // STEP 3: Listen for notifications from server
      window.demoNotificationReceiver = (title, body) => {
        // Add to our list
        setNotifications(prev => [...prev, { title, body, time: new Date().toLocaleTimeString() }])
        // Show browser notification
        new Notification(title, { body })
      }
      
      alert('✅ Notifications enabled! Now go to Admin Panel to send notifications.')
    }
  }

  // STEP 4: Test local notification
  const testNotification = () => {
    new Notification('Test', { body: 'This is a test notification!' })
    setNotifications(prev => [...prev, { 
      title: 'Test', 
      body: 'This is a test notification!', 
      time: new Date().toLocaleTimeString() 
    }])
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🔔 Simple Push Notifications Demo</h1>
      
      {/* STEP 1: Show current status */}
      <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f0f0f0' }}>
        <strong>Status:</strong> {permission === 'granted' ? '✅ Enabled' : '❌ Disabled'}
        {token && <div><strong>Token:</strong> {token}</div>}
      </div>

      {/* STEP 2: Enable notifications button */}
      <button 
        onClick={enableNotifications}
        disabled={permission === 'granted'}
        style={{ 
          padding: '10px 20px', 
          margin: '10px', 
          backgroundColor: permission === 'granted' ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {permission === 'granted' ? 'Notifications Enabled' : 'Enable Notifications'}
      </button>

      {/* STEP 3: Test notification button */}
      <button 
        onClick={testNotification}
        disabled={permission !== 'granted'}
        style={{ 
          padding: '10px 20px', 
          margin: '10px',
          backgroundColor: permission !== 'granted' ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Test Notification
      </button>

      {/* STEP 4: Link to admin panel */}
      <div style={{ margin: '20px 0' }}>
        <a 
          href="http://localhost:3001/admin" 
          target="_blank"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '5px'
          }}
        >
          📤 Open Admin Panel (Send Notifications)
        </a>
      </div>

      {/* STEP 5: Show received notifications */}
      <div style={{ marginTop: '30px' }}>
        <h3>📋 Received Notifications ({notifications.length})</h3>
        {notifications.length === 0 ? (
          <p>No notifications yet. Enable notifications and use the admin panel!</p>
        ) : (
          notifications.map((notif, index) => (
            <div key={index} style={{ 
              padding: '10px', 
              margin: '10px 0', 
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: 'white'
            }}>
              <strong>{notif.title}</strong>
              <p>{notif.body}</p>
              <small>Received at: {notif.time}</small>
            </div>
          ))
        )}
      </div>

      {/* STEP 6: How it works explanation */}
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#e8f4f8', borderRadius: '5px' }}>
        <h3>🔍 How Push Notifications Work:</h3>
        <ol>
          <li><strong>Enable:</strong> Click "Enable Notifications" → Browser asks permission → We generate a token</li>
          <li><strong>Register:</strong> Token is sent to our server (localhost:3001)</li>
          <li><strong>Send:</strong> Admin panel sends notification to server → Server pushes to all registered tokens</li>
          <li><strong>Receive:</strong> Browser shows notification → App updates the list</li>
        </ol>
      </div>
    </div>
  )
}

export default App

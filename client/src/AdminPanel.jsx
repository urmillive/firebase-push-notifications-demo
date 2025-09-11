import { useState, useEffect } from 'react'

function AdminPanel() {
  const [tokenCount, setTokenCount] = useState(0)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    updateTokenCount()
    // Auto refresh token count every 10 seconds
    const interval = setInterval(updateTokenCount, 10000)
    return () => clearInterval(interval)
  }, [])

  // Show status message
  const showStatus = (message, error = false) => {
    setStatus(message)
    setIsError(error)
    setTimeout(() => setStatus(''), 5000)
  }

  // Update token count
  const updateTokenCount = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/tokens')
      const data = await response.json()
      setTokenCount(data.totalTokens)
    } catch (error) {
      console.error('Error fetching token count:', error)
      setTokenCount('Error')
    }
  }

  // Send notification
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title || !body) {
      showStatus('❌ Please fill in both title and body', true)
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('http://localhost:3001/api/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
      })
      
      const result = await response.json()
      
      if (result.success) {
        showStatus(`✅ Notification sent successfully! ${result.successCount} delivered, ${result.failureCount} failed.`)
        setTitle('')
        setBody('')
        updateTokenCount()
      } else {
        showStatus(`❌ ${result.error}`, true)
      }
      
    } catch (error) {
      showStatus('❌ Network error: Failed to send notification', true)
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>🔔 Firebase Admin Panel</h1>
      
      {/* Stats */}
      <div style={{
        backgroundColor: '#e8f4f8',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>📊 Stats</h3>
        <p style={{ margin: 0, fontSize: '18px' }}>
          <strong>Connected Devices:</strong> <span style={{ color: '#007bff' }}>{tokenCount}</span>
        </p>
      </div>

      {/* Status Message */}
      {status && (
        <div style={{
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          backgroundColor: isError ? '#f8d7da' : '#d4edda',
          color: isError ? '#721c24' : '#155724',
          border: `1px solid ${isError ? '#f5c6cb' : '#c3e6cb'}`
        }}>
          {status}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Notification Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notification title"
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Notification Body *
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter notification message"
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              minHeight: '100px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: 'white',
            padding: '15px 30px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => {
            if (!isLoading) e.target.style.backgroundColor = '#0056b3'
          }}
          onMouseLeave={(e) => {
            if (!isLoading) e.target.style.backgroundColor = '#007bff'
          }}
        >
          {isLoading ? 'Sending...' : '📤 Send Notification'}
        </button>
      </form>

      {/* Back Link */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <a 
          href="/" 
          style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            fontSize: '16px'
          }}
        >
          ← Back to Main App
        </a>
      </div>
    </div>
  )
}

export default AdminPanel

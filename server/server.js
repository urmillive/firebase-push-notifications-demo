const express = require("express");
const admin = require("firebase-admin");
const path = require("path");
const cors = require("cors");

const app = express();
const serviceAccount = require("./sample-60237-firebase-adminsdk-fbsvc-949de5baae.json");
const port = 3001;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Store FCM tokens (in production, use a database)
const tokenArray = [];

// Store pending notifications for demo mode
const pendingNotifications = new Map(); // token -> array of notifications

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// Store FCM token
app.post("/api/token", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }
  
  // Add token if not already exists
  if (!tokenArray.includes(token)) {
    tokenArray.push(token);
    console.log("New token registered:", token);
  }
  
  res.json({ 
    success: true, 
    message: "Token registered successfully",
    totalTokens: tokenArray.length 
  });
});

// Send notification to all registered tokens
app.post("/api/send-notification", async (req, res) => {
  const { title, body, data } = req.body;
  
  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }
  
  if (tokenArray.length === 0) {
    return res.status(400).json({ error: "No tokens registered" });
  }
  
  // Check if we're in demo mode (tokens start with "demo_")
  const isDemoMode = tokenArray.some(token => token.startsWith('demo_'));
  
  if (isDemoMode) {
    // Demo mode: simulate notification sending
    console.log("Demo mode: Simulating notification send to", tokenArray.length, "tokens");
    console.log("Title:", title, "Body:", body);
    
    // Add notification to each token's queue
    tokenArray.forEach(token => {
      if (!pendingNotifications.has(token)) {
        pendingNotifications.set(token, []);
      }
      pendingNotifications.get(token).push({
        title,
        body,
        data: data || {},
        timestamp: Date.now()
      });
    });
    
    // Simulate successful delivery to all demo tokens
    res.json({
      success: true,
      successCount: tokenArray.length,
      failureCount: 0,
      totalTokens: tokenArray.length,
      message: "Demo notification sent successfully",
      isDemoMode: true
    });
    
    return;
  }
  
  // Real Firebase mode
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: data || {},
    tokens: tokenArray,
  };
  
  try {
    const response = await admin.messaging().sendMulticast(message);
    console.log("Successfully sent message:", response);
    
    // Remove invalid tokens
    const failedTokens = [];
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        failedTokens.push(tokenArray[idx]);
      }
    });
    
    // Remove failed tokens from array
    failedTokens.forEach(token => {
      const index = tokenArray.indexOf(token);
      if (index > -1) {
        tokenArray.splice(index, 1);
      }
    });
    
    res.json({
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
      totalTokens: tokenArray.length,
      message: "Notification sent successfully"
    });
    
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ 
      error: "Failed to send notification",
      details: error.message 
    });
  }
});

// Get registered tokens count
app.get("/api/tokens", (req, res) => {
  res.json({ 
    totalTokens: tokenArray.length,
    tokens: tokenArray 
  });
});

// Poll for new notifications (demo mode)
app.post("/api/poll-notifications", (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }
  
  // Get pending notifications for this token
  const notifications = pendingNotifications.get(token) || [];
  
  // Clear the notifications after sending
  pendingNotifications.set(token, []);
  
  res.json({ 
    notifications,
    count: notifications.length 
  });
});

app.listen(port, () => {
  console.log(`Push notification server running at http://localhost:${port}`);
  console.log(`Admin panel available at http://localhost:${port}/admin`);
});

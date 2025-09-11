# Firebase Push Notifications Demo

A complete Firebase Cloud Messaging (FCM) push notifications demo application with Node.js backend and modern web frontend.

## Features

- 🔔 Real-time push notifications using Firebase Cloud Messaging
- 🌐 Modern web interface for receiving notifications
- 🚀 Admin panel for sending notifications to all connected devices
- 📱 Service worker for background notifications
- 📊 Real-time statistics and notification history
- 🎨 Beautiful, responsive UI with modern design

## Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Cloud Messaging in your Firebase project
4. Generate a new private key for your service account:
   - Go to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `sample-60237-firebase-adminsdk-fbsvc-949de5baae.json` in the project root

### 2. Web App Configuration

1. In Firebase Console, go to Project Settings > General
2. Add a web app to your project
3. Copy the Firebase configuration object
4. Update the `firebaseConfig` in both:
   - `public/index.html` (around line 120)
   - `public/firebase-messaging-sw.js` (around line 5)

### 3. VAPID Key Setup

1. In Firebase Console, go to Project Settings > Cloud Messaging
2. Generate a new Web Push certificate (VAPID key)
3. Update the `vapidKey` in `public/index.html` (around line 140)

### 4. Install Dependencies

```bash
npm install
```

### 5. Start the Server

```bash
npm start
```

The application will be available at:
- Main app: http://localhost:3000
- Admin panel: http://localhost:3000/admin

## Usage

### For Users (Receiving Notifications)

1. Open http://localhost:3000 in your browser
2. Click "Enable Notifications" and allow notification permissions
3. Your device will be registered and ready to receive notifications
4. The FCM token will be displayed and registered with the server

### For Admins (Sending Notifications)

1. Open http://localhost:3000/admin in your browser
2. See the number of connected devices
3. Fill in the notification title and body
4. Optionally add custom data in JSON format
5. Click "Send Notification" to broadcast to all connected devices

## API Endpoints

- `POST /api/token` - Register FCM token
- `POST /api/send-notification` - Send notification to all registered tokens
- `GET /api/tokens` - Get registered tokens count

## File Structure

```
├── server.js                          # Node.js server with Firebase Admin SDK
├── package.json                       # Dependencies and scripts
├── sample-60237-firebase-adminsdk-*.json  # Firebase service account key
├── public/
│   ├── index.html                     # Main app interface
│   ├── admin.html                     # Admin panel for sending notifications
│   └── firebase-messaging-sw.js      # Service worker for background notifications
└── README.md                          # This file
```

## Important Notes

⚠️ **Security**: This demo stores FCM tokens in memory. In production, use a proper database and implement proper authentication for the admin panel.

⚠️ **Configuration**: Make sure to update all Firebase configuration values with your actual project details.

⚠️ **HTTPS**: For production deployment, ensure your app is served over HTTPS as required by service workers and push notifications.

## Testing

1. Start the server: `npm start`
2. Open the main app and enable notifications
3. Open the admin panel in another tab
4. Send a test notification from the admin panel
5. You should receive the notification in the main app

## Troubleshooting

- **Notifications not working**: Check browser console for errors and ensure all Firebase configuration is correct
- **Service worker issues**: Make sure the service worker is registered and Firebase config is updated
- **Token registration fails**: Verify the server is running and the API endpoints are accessible

## Production Deployment

For production deployment:
1. Use environment variables for sensitive configuration
2. Implement proper database for token storage
3. Add authentication for admin panel
4. Use HTTPS
5. Implement proper error handling and logging
# firebase-push-notifications-demo

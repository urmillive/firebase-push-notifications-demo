# Firebase Push Notifications Demo

A complete Firebase Cloud Messaging (FCM) push notifications demo application with React + Vite frontend and Node.js backend.

## Features

- 🔔 Real-time push notifications using Firebase Cloud Messaging
- ⚛️ Modern React + Vite frontend with beautiful UI
- 🚀 Node.js backend with Express and Firebase Admin SDK
- 📱 Service worker for background notifications
- 📊 Real-time statistics and notification history
- 🎨 Responsive design with modern styling
- 🔧 Demo mode that works without full Firebase setup

## Project Structure

```
├── client/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── firebase/         # Firebase configuration
│   │   └── ...
│   ├── public/
│   │   └── firebase-messaging-sw.js  # Service worker
│   └── package.json
├── server/                    # Node.js backend
│   ├── server.js             # Express server
│   ├── package.json
│   └── sample-60237-firebase-adminsdk-*.json
├── public/                    # Legacy admin panel
│   └── admin.html
└── package.json              # Root package.json with scripts
```

## Quick Start

### 1. Install Dependencies

```bash
npm run install-all
```

### 2. Start Development Servers

```bash
npm run dev
```

This will start:
- React client on http://localhost:5173
- Node.js server on http://localhost:3001

### 3. Access the Application

- **Main App**: http://localhost:5173
- **Admin Panel**: http://localhost:3001/admin

## Usage

### For Users (Receiving Notifications)

1. Open http://localhost:5173 in your browser
2. Click "Enable Notifications" and allow notification permissions
3. Your device will be registered with a demo token
4. The token will be displayed and registered with the server

### For Admins (Sending Notifications)

1. Open http://localhost:3001/admin in your browser
2. See the number of connected devices
3. Fill in the notification title and body
4. Optionally add custom data in JSON format
5. Click "Send Notification" to broadcast to all connected devices

## API Endpoints

- `POST /api/token` - Register FCM token
- `POST /api/send-notification` - Send notification to all registered tokens
- `GET /api/tokens` - Get registered tokens count

## Scripts

- `npm run dev` - Start both client and server in development mode
- `npm run client` - Start only the React client
- `npm run server` - Start only the Node.js server
- `npm run build` - Build the React client for production
- `npm start` - Start the production server
- `npm run install-all` - Install dependencies for all projects

## Firebase Configuration (Optional)

For full Firebase integration, update the configuration in:

1. `client/src/firebase/config.js` - Client-side Firebase config
2. `client/public/firebase-messaging-sw.js` - Service worker config
3. `server/sample-60237-firebase-adminsdk-*.json` - Server-side service account

### Firebase Setup Steps

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing project
3. Enable Cloud Messaging in your Firebase project
4. Generate a new private key for your service account
5. Add a web app to your project and copy the configuration
6. Generate a VAPID key for web push notifications

## Demo Mode

The application includes a demo mode that works without full Firebase configuration:
- Generates mock FCM tokens for testing
- Simulates push notification functionality
- Perfect for development and demonstration purposes

## Important Notes

⚠️ **Security**: This demo stores FCM tokens in memory. In production, use a proper database and implement proper authentication for the admin panel.

⚠️ **HTTPS**: For production deployment, ensure your app is served over HTTPS as required by service workers and push notifications.

⚠️ **CORS**: The server is configured to allow requests from localhost:5173 and localhost:3000.

## Troubleshooting

- **Port conflicts**: Make sure ports 5173 and 3001 are available
- **CORS issues**: Check that the server CORS configuration includes your client URL
- **Service worker issues**: Ensure the service worker is properly registered
- **Token registration fails**: Verify the server is running and accessible

## Production Deployment

For production deployment:

1. Build the React client: `npm run build`
2. Update server to serve the built client files
3. Use environment variables for sensitive configuration
4. Implement proper database for token storage
5. Add authentication for admin panel
6. Use HTTPS
7. Implement proper error handling and logging

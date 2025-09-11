import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// Firebase configuration - Replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDemoKey-Replace-With-Your-Actual-API-Key",
  authDomain: "sample-60237.firebaseapp.com",
  projectId: "sample-60237",
  storageBucket: "sample-60237.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
export const messaging = getMessaging(app);

export default app;

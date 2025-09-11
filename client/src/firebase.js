// Firebase configuration and messaging setup
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// get this config from the settings -> and code snippet of npm
const firebaseConfig = {
  apiKey: "AIzaSyBy1mHikrju1wwETwDyox7a3B7_E8ujmH4",
  authDomain: "sample-60237.firebaseapp.com",
  projectId: "sample-60237",
  storageBucket: "sample-60237.firebasestorage.app",
  messagingSenderId: "56297884302",
  appId: "1:56297884302:web:33d23b940c6f1a442b97df",
  measurementId: "G-Y2K8YKM86M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Get FCM token
export const getFCMToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BGZjc0mTfwP0gjTzQVoWoI6V10YQbI9GXIHNz6CFOy86jvzO7cq8MSjP7zLThtPXft0L0fufXgUq5NMj4-m63IA", // Replace with your VAPID  (get it from firebase cloud messaning pair key)
    });
    return token;
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

// Listen for foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_API_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_API_PROJECT_ID,
    databaseURL: import.meta.env.VITE_API_DATABASE_URL,
    storageBucket: import.meta.env.VITE_API_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_API_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_API_APP_ID
  };

  const firebase = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  // const db = getFirestore(firebase);

  const db = getDatabase(firebase);

  export default db;
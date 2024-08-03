import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC6vSLkiU0Mzb0cpJm7NKlyuNwdnymXqcE",
  authDomain: "theislandclub.firebaseapp.com",
  projectId: "theislandclub",
  databaseURL: "https://theislandclub-default-rtdb.firebaseio.com/",
  storageBucket: "theislandclub.appspot.com",
  messagingSenderId: "939559041500",
  appId: "1:939559041500:web:6e456a66fd2c8852aef719"
};

  const firebase = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  // const db = getFirestore(firebase);

  const db = getDatabase(firebase);

  export default db;
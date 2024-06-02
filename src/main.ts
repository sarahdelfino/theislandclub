import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import PrimeVue from 'primevue/config';

const firebaseConfig = {
    apiKey: "AIzaSyCB53Y83ltLikNjuG9T7kmMs4G9ksH4DQQ",
    authDomain: "the-island-club.firebaseapp.com",
    projectId: "the-island-club",
    storageBucket: "the-island-club.appspot.com",
    messagingSenderId: "465061089515",
    appId: "1:465061089515:web:c5f94dabcbe98de7416eae",
    measurementId: "G-1QS1ZY8QV5"
  };

  const firebase = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebase);

const app = createApp(App)

app.use(createPinia())
app.use(router);
app.use(PrimeVue);

app.mount('#app')

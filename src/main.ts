import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import PrimeVue from 'primevue/config';

const firebaseConfig = {
  apiKey: "AIzaSyC6vSLkiU0Mzb0cpJm7NKlyuNwdnymXqcE",
  authDomain: "theislandclub.firebaseapp.com",
  projectId: "theislandclub",
  storageBucket: "theislandclub.appspot.com",
  messagingSenderId: "939559041500",
  appId: "1:939559041500:web:6e456a66fd2c8852aef719"
};

  const firebase = initializeApp(firebaseConfig);
  const analytics = getAnalytics(firebase);

const app = createApp(App)

app.use(createPinia())
app.use(router);
app.use(PrimeVue);

app.mount('#app')

import { createApp } from 'vue';
import App from './App.vue';
import pinia from '@/store';
import router from '@/router';
import 'animate.css';

createApp(App).use(pinia).use(router).mount('#app');
console.log(import.meta.env.VITE_APP_TITLE);

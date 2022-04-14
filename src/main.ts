import { createApp } from 'vue';
import App from './App.vue';
import pinia from '@/store';

createApp(App).use(pinia).mount('#app');
console.log(import.meta.env.VITE_APP_TITLE);

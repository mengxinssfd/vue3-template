import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');
console.log(import.meta.env.VITE_APP_TITLE);

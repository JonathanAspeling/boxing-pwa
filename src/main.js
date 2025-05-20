import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';

// TODO: Remove unused themes - keepig them for now to be able to easily switch for final decision
import Aura from '@primeuix/themes/aura';
import Material from '@primeuix/themes/material';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(PrimeVue, {
  theme: {
    preset: Material,
    options: {
      darkModeSelector: false || 'none',
    },
  },
});
app.mount('#app');

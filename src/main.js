import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router/routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'vue3-toastify/dist/index.css';
import '@/index.css';
const app = createApp(App);

app.use(router).mount('#app');

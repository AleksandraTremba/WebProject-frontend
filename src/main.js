import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './assets/main.css'

import axios from 'axios';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


createApp(App).use(router).mount('#app')

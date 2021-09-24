import {
    createApp
} from 'vue'
import App from './App.vue'
import axios from './plugins/axios';
import router from './router'
import store from './store'
import VueLazyLoad from 'vue3-lazyload'
import Antd from './plugins/Antd'
import AppCom from './plugins/AppCom'


const app = createApp(App);
app
    .use(AppCom)
    .use(Antd)
    .use(VueLazyLoad)
    .use(axios)
    .use(store)
    .use(router)
    .mount('#app')
import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import { router } from './router/index.js'
import store from './store/index.js'
import 'ant-design-vue/dist/antd.css'
import '@/assets/common.less'

createApp(App).use(Antd).use(router).use(store).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import store from '@/stores/index'
// import router from '@/router/index'
const app = createApp(App)

// pinia
app.use(store)
// app.use(router)
app.mount('#app')

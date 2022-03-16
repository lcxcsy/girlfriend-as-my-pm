import { createApp } from 'vue'
import router from './config/router.config'
import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')
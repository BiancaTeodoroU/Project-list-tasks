import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import createRouter from './pages/routes'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())

createApp(App).use(createRouter).mount('#app')

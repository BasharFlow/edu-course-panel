import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './app/router'

import './styles/variables.css'
import './styles/base.css'

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
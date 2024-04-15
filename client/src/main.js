/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
/* eslint-disable no-unused-vars */
// import './assets/main.css'
import './assets/app.css'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import { router } from './router'
const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')

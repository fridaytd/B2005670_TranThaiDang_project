// import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createPinia } from "pinia"

import { createApp } from 'vue'
import App from './App.vue'
import { useAuthStore } from "./stores/auth.store"

import router from "./router"

startApp()

async function startApp() {
    const pinia = createPinia()
    const app = createApp(App)

    app.use(pinia)
    app.use(router)
    try {
        const authStore = useAuthStore()
        await authStore.refreshToken()
    } catch (error) {
        console.log("Expired refresh token");
    }

    app.mount('#app')
}

import { createWebHistory, createRouter } from "vue-router"

import Admin from "@/views/admin.vue"
import LoginView from "../views/login.vue"

import { useAuthStore } from "../stores/auth.store"

const routes = [
    {
        path: "/",
        name: "Admin",
        component: Admin,
        meta: {
            requireAuth: true,
        }
    },
    {
        path: "/login",
        name: "Login",
        component: LoginView,
        meta: {
            requireAuth: false,
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async (to) => {
    const authStore = useAuthStore()
    if (to.meta.requireAuth && !authStore.user) {
        return {
            path: "/login",
        }
    }
})

export default router;
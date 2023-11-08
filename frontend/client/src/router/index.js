import { createWebHistory, createRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"

const routes = [
    {
        path: "/",
        name: "home",
        meta: {
            requireAuth: false
        },
        component: () => import("../views/home.vue")
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            requireAuth: false,
        },
        component: () => import("../views/login.vue")
    },
    {
        path: "/register",
        name: "Register",
        meta: {
            requireAuth: false,
        },
        component: () => import("../views/register.vue")
    },
    {
        path: "/products/:type",
        name: "Products",
        meta: {
            requireAuth: false,
        },
        props: true,
        component: () => import("../views/product.vue")
    },
    {
        path: "/cart",
        name: "Cart",
        meta: {
            requireAuth: true,
        },
        component: () => import("../views/cart.vue")
    },
    {
        path: "/order",
        name: "Order",
        meta: {
            requireAuth: true,
        },
        component: () => import("../views/order.vue")
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})


router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()
    if (to.meta.requireAuth && !authStore.user) {
        authStore.returnURL = to.fullPath;
        return {
            path: "/login",
        }
    }
})

export default router;
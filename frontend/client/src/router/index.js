import { createWebHistory, createRouter } from "vue-router"

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
            requireAuth: false,
        },
        component: () => import("../views/cart.vue")
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router;
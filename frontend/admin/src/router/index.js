import { createWebHistory, createRouter } from "vue-router"

import Admin from "../views/admin.vue"
import LoginView from "../views/login.vue"
import Profile from "../components/Profile.vue"
import Orders from "../components/Orders.vue"
import Products from "../components/Products.vue"
import AddProduct from "../components/AddProduct.vue"
import AllProducts from "../components/AllProducts.vue"
import EditProducts from "../components/EditProduct.vue"

import { useAuthStore } from "../stores/auth.store"

const routes = [
    {
        path: "/",
        name: "Admin",
        component: Admin,
        meta: {
            requireAuth: true,
        },
        redirect: { path: "/profile" },
        children: [
            {
                path: "/profile",
                component: Profile
            },
            {
                path: "/products",
                component: Products,
                children: [
                    {
                        path: "/products",
                        component: AllProducts

                    },
                    {
                        path: "/products/add",
                        component: AddProduct,
                    },
                    {
                        path: "/products/edit/:id",
                        component: EditProducts,
                        props: true,
                    }
                ]
            },
            {
                path: "/orders",
                component: Orders
            },
        ]
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
        authStore.returnURL = to.fullPath;
        return {
            path: "/login",
        }
    }
})

export default router;
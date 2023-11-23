import { createWebHistory, createRouter } from "vue-router"
import { nextTick } from "vue"

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
                name: "Profile",
                component: Profile
            },
            {
                path: "/products",
                component: Products,
                children: [
                    {
                        path: "/products",
                        name: "Products",
                        component: AllProducts

                    },
                    {
                        path: "/products/add",
                        name: "Add Products",
                        component: AddProduct,
                    },
                    {
                        path: "/products/edit/:id",
                        name: "Edit products",
                        component: EditProducts,
                        props: true,
                    }
                ]
            },
            {
                path: "/orders",
                name: "Orders",
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

router.afterEach((to, from) => {
    nextTick(() => {
        document.title = to.name
    })
})

export default router;
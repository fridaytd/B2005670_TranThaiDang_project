import { createWebHistory, createRouter } from "vue-router"
import { useAuthStore } from "../stores/authStore"
import { nextTick } from "vue"

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
        path: "/search/products/:keyWord",
        name: "search",
        meta: {
            requireAuth: false,
        },
        props: true,
        component: () => import("../views/searchProduct.vue")
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
    },
    {
        path: "/profile",
        name: "Profile",
        meta: {
            requireAuth: true,
        },
        component: () => import("../views/profile.vue"),
        children: [
            {
                path: "/profile",
                name: "Profile",
                meta: {
                    requireAuth: true,
                },
                component: () => import("../components/Profile.vue")
            },
            {
                path: "/profile/changeinfor",
                name: "Change Infor",
                meta: {
                    requireAuth: true,
                },
                component: () => import("../components/ChangeInfor.vue")
            },
            {
                path: "/profile/changepassword",
                name: "Change Password",
                meta: {
                    requireAuth: true,
                },
                component: () => import("../components/ChangePassword.vue")
            },
            {
                path: "/profile/address",
                name: "Address",
                meta: {
                    requireAuth: true,
                },
                component: () => import("../components/Address.vue")
            }
        ]
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

router.afterEach((to, from) => {
    nextTick(() => {
        document.title = to.name
    })
})

export default router;
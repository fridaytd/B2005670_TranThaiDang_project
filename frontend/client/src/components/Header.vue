<script setup>
import router from '../../../admin/src/router';
import { useAuthStore } from '../stores/authStore';
import { useCartStore } from '../stores/cart.store';

const authStore = useAuthStore()
const cartStore = useCartStore()

</script>

<template>
    <header class="p-3">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <router-link to="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <div class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                        <img src="/logo.png" height="50" />
                    </div>
                </router-link>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><router-link to="/" href="#" class="nav-link px-2 text-white btn btn-success routerlink">Trang
                            chủ</router-link></li>
                    <li><router-link to="/products/tea"
                            class="nav-link px-2 text-white btn btn-success routerlink">Trà</router-link></li>
                    <li><router-link to="/products/coffee" class="nav-link px-2 text-white btn btn-success routerlink">Cà
                            phê</router-link></li>
                    <li><a href="#" class="nav-link px-2 text-white btn btn-success routerlink">Liên hệ</a></li>
                    <li><a href="#" class="nav-link px-2 text-white btn btn-success routerlink">Về chúng tôi</a></li>
                </ul>

                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" class="form-control " placeholder="Tìm kiếm..." aria-label="Search">
                </form>

                <div v-if="!authStore.user" class="text-end">
                    <router-link to="/login" type="button" class="btn btn-outline-light me-2">Đăng nhập</router-link>
                    <router-link to="/register" type="button" class="btn btn-warning me-2">Đăng kí</router-link>

                </div>
                <div v-if="authStore.user" class="text-end me-2">

                    <div class="dropdown text-end">
                        <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="me-2" style="color: white;">Xin chào, {{ authStore.user.username }}</span>
                        </a>
                        <ul class="dropdown-menu text-small" style="">
                            <li><a class="dropdown-item" href="#">Đơn hàng</a></li>
                            <li><a class="dropdown-item" href="#">Thông tin</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="#"><span class="" @click="authStore.logout()">Đăng
                                        xuất</span></a></li>
                        </ul>
                    </div>

                </div>
                <router-link to="/cart" class="btn btn-outline-light"><i class="fas fa-shopping-cart"></i>
                    <span class="badge text-bg-danger">{{ cartStore.numberOfProduct }}</span>

                </router-link>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    background-color: #006f3c;
}

.routerlink:hover {
    background-color: white;
    color: #006f3c !important;

}

li .nav-link {

    font-weight: bold;
}

.dropdown-toggle::after {
    color: white;
}
</style>
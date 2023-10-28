<script setup>
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore()
</script>

<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <div class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" style="background-color: #0C713D;"> Friday
            Coffee and Tea</div>
        <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class=" w-100 rounded-0 border-0">
            <span style="color: #ffffffff; font-size: 20px" class="me-2 ms-2">Xin chào, {{ authStore.user.staffname }}

            </span>
        </div>
        <div class="navbar-nav">
            <div class="nav-item text-nowrap">
                <button class="nav-link px-3" style="background-color: #0C713D;" @click="authStore.logout()">Đăng
                    xuất</button>
            </div>
        </div>
    </header>
</template>
<script setup>
import { useAuthStore } from '../stores/auth.store';
import AdminHeader from "../components/AdminHeader.vue"
import SideBarMenu from "../components/SideBarMenu.vue"

const authStore = useAuthStore()
</script>
<template>
    <AdminHeader></AdminHeader>

    <div class="container-fluid">
        <div class="row">
            <SideBarMenu></SideBarMenu>
            <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4" style="min-height: 600px">

            </main>
        </div>
    </div>
</template>
<style scoped></style>

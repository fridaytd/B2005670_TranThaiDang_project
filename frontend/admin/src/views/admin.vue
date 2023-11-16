<script setup>
import { useAuthStore } from '../stores/auth.store';
import { RouterView } from 'vue-router';

import AdminHeader from "../components/AdminHeader.vue"
import SideBarMenu from "../components/SideBarMenu.vue"

const authStore = useAuthStore()
</script>
<template>
    <AdminHeader></AdminHeader>

    <div class="container-fluid">
        <div class="row">
            <SideBarMenu></SideBarMenu>
            <main class="col-md-9  col-lg-10  mt-2" style="min-height: 600px">
                <Suspense>
                    <template #default> <router-view></router-view></template>
                    <template #fallback>
                        Loadding ...
                    </template>
                </Suspense>
            </main>
        </div>
    </div>
</template>
<style scoped></style>

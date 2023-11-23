<script setup>
import { useRoute } from "vue-router"
const route = useRoute()

</script>

<template>
    <div class="container mt-4">
        <h1 class="h1 text-center"> Thông tin cá nhân</h1>
        <div class="row">
            <div class="col-sm-2">
                <div class="btn-group-vertical">
                    <router-link to="/profile" :class="route.path == '/profile' ? 'active' : ''" class="btn btn-success"
                        aria-current="page">Thông tin</router-link>
                    <router-link to="/profile/changeinfor" :class="route.path == '/profile/changeinfor' ? 'active' : ''"
                        class="btn btn-success">Thay đổi thông tin</router-link>
                    <router-link to="/profile/changepassword"
                        :class="route.path == '/profile/changepassword' ? 'active' : ''" class="btn btn-success">Thay đổi
                        mật khẩu</router-link>
                    <router-link to="/profile/address" :class="route.path == '/profile/address' ? 'active' : ''"
                        class="btn btn-success">Địa chỉ</router-link>
                </div>
            </div>
            <div class="col-sm-10">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-weight: bold;
    color: #006f3c
}
</style>
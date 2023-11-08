<script setup>
import { reactive } from "vue";
import { useAuthStore } from "../stores/authStore";

const user = {
    username: null,
    password: null,
}

const error = reactive({
    username: null,
    password: null
})

async function login() {
    const authStore = useAuthStore()
    try {
        const result = await authStore.login(user);
        error.username = null
        error.password = null
    } catch (err) {
        error.username = err.response.data.error.username
        error.password = err.response.data.error.password
    }
}
</script>



<template>
    <div class="d-flex align-items-center py-4 mt-4 ">
        <div class="d-block form-signin m-auto">
            <form @submit.prevent="login">
                <h1 class="h1 text-center">FRIDAY COFFE AND TEA</h1>

                <h3 class="h3 mb-3 fw-normal">Vui lòng nhập tên đăng nhập và mật khẩu</h3>

                <div class="form-floating mb-3">
                    <input v-model="user.username" type="text" class="form-control" id="username"
                        placeholder="name@example.com">
                    <label for="username">Username</label>
                    <div v-if="error.username" class="error">{{ error.username }}</div>
                </div>
                <div class="form-floating mb-3">
                    <input v-model="user.password" type="password" class="form-control" id="password"
                        placeholder="Password">
                    <label for="password">Password</label>
                    <div v-if="error.password" class="error">{{ error.password }}</div>
                </div>
                <button class="btn btn-primary w-100 py-2" type="submit"
                    style="background-color: #006f3c; border-color: #006f3c;">Đăng
                    nhập</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.h1 {
    font-weight: bolder;
    color: #006f3c;
}

.error {
    color: red;
    font-style: italic;
}
</style>
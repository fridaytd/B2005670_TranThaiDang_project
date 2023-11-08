<script setup>
import { reactive } from "vue"
import router from "../router";
import authService from "../services/auth.service.js"
const user = reactive({
    username: null,
    fullname: null,
    phone: null,
    password: null,
    passwordagain: null
})

const error = reactive({
    username: null,
    fullname: null,
    phone: null,
    password: null,
    passwordagain: null
})

async function register() {
    try {
        const result = await authService.register(user);
        error.username = null
        error.fullname = null
        error.phone = null
        error.password = null
        error.passwordagain = null
        router.push('/login')
    } catch (err) {
        error.username = err.response.data.error.username
        error.fullname = err.response.data.error.fullname
        error.phone = err.response.data.error.phone
        error.password = err.response.data.error.password
        error.passwordagain = err.response.data.error.passwordagain
        console.log(error);
    }
}
</script>

<template>
    <section class="mt-4 bg-image">
        <div class="mask d-flex align-items-center h-100 ">
            <div class="container h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                        <div class="card" style="border-radius: 15px;">
                            <div class="card-body p-5">
                                <h2 class="text-uppercase text-center mb-3">Đăng ký tài khoản</h2>
                                <form @submit.prevent="register">
                                    <div class="form-outline mb-3">
                                        <label class="form-label" for="username">Username</label>
                                        <input v-model="user.username" type="text" id="username"
                                            class="form-control form-control-lg" />
                                        <div v-if="error.username" class="error"> {{ error.username }}</div>
                                    </div>
                                    <div class="form-outline mb-3">
                                        <label class="form-label" for="fullname">Họ và tên</label>
                                        <input v-model="user.fullname" type="text" id="fullname"
                                            class="form-control form-control-lg" />
                                        <div v-if="error.fullname" class="error"> {{ error.fullname }}</div>
                                    </div>
                                    <div class="form-outline mb-3">
                                        <label class="form-label" for="phone">Số điện thoại</label>
                                        <input v-model="user.phone" type="text" id="phone"
                                            class="form-control form-control-lg" />
                                        <div v-if="error.phone" class="error">{{ error.phone }}</div>
                                    </div>
                                    <div class="form-outline mb-3">
                                        <label class="form-label" for="password">Password</label>
                                        <input v-model="user.password" type="password" id="password"
                                            class="form-control form-control-lg" />
                                        <div v-if="error.password" class="error">{{ error.password }}</div>
                                    </div>
                                    <div class="form-outline mb-3">
                                        <label class="form-label" for="passwordagain">Nhập lại password</label>
                                        <input v-model="user.passwordagain" type="password" id="passwordagain"
                                            class="form-control form-control-lg" />
                                        <div v-if="error.passwordagain" class="error">{{ error.passwordagain }}</div>

                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <button type="submit" class="btn btn-primary btn-block btn-lg text-body"
                                            style="color: white;">Đăng
                                            kí</button>
                                    </div>

                                    <p class="text-center text-muted mt-5 mb-0">Bạn đã có tài khoản? <router-link
                                            to="/login" class="fw-bold text-body"><u>Đăng nhập tại đây</u></router-link></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.btn-primary {
    color: white !important;
    ;
    background-color: #006f3c;
    border-color: #006f3c;
}

.error {
    color: red;
    font-style: italic;
}
</style>
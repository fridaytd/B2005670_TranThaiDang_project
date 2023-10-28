<script setup>
import { ref, reactive } from 'vue'
import { useAuthStore } from "../stores/auth.store"

const authStore = useAuthStore();

const staffname = ref("")
const password = ref("")
const error = reactive({
    staffname: null,
    password: null,
})

async function onSubmit() {
    try {
        const result = await authStore.login({
            staffname: staffname.value,
            password: password.value
        })
        error.staffname = null
        error.password = null
    } catch (err) {
        error.staffname = err.response.data.error.staffname
        error.password = err.response.data.error.password
    }

}
</script>

<template>
    <section style="color: #006f3c;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col col-xl-10">
                    <div class="card" style="border-radius: 1rem;">
                        <div class="row justify-content-center">

                            <div class="col-md-6 col-lg-7 d-flex align-items-center">
                                <div class="card-body p-4 p-lg-5 text-black">

                                    <form @submit.prevent="onSubmit">

                                        <div class="align-items-center mb-3 pb-1">

                                            <div class="h1 fw-bold mb-0" style="color: #006f3c;">Welcome to </div>
                                            <div class="h2" style="color: #006f3c;">Friday Coffee and Tea
                                                Adminitrator</div>
                                        </div>

                                        <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your account
                                        </h5>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="staffname">staffname</label>
                                            <input type="text" id="staffname" class="form-control form-control-lg"
                                                v-model="staffname" />
                                            <div class="error" v-if="error.staffname">{{ error.staffname }}</div>
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="password">Password</label>
                                            <input type="password" id="password" class="form-control form-control-lg"
                                                v-model="password" />
                                            <div class="error" v-if="error.password">{{ error.password }}</div>
                                        </div>

                                        <div class="pt-1 mb-4">
                                            <button class="btn btn-primary btn-lg btn-block"
                                                style="background-color: #006f3c;" type="submit">Login</button>
                                        </div>

                                        <!-- <a class="small text-muted" href="#!">Forgot password?</a>
                                        <p class="mb-5 pb-lg-2" style="color: #393f81;">Don't have an account? <a href="#!"
                                                style="color: #393f81;">Register here</a></p>
                                        <a href="#!" class="small text-muted">Terms of use.</a>
                                        <a href="#!" class="small text-muted">Privacy policy</a> -->
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.error {
    color: red;
    font-style: italic;
}
</style>

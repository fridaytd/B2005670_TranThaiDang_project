<script setup>
import { ref } from 'vue'
import { useAuthStore } from "../stores/auth.store"

const authStore = useAuthStore();

const staffname = ref("")
const password = ref("")

async function login() {
    const result = await authStore.login({
            staffname: staffname.value,
            password: password.value
        })
}
</script>

<template>
    <div class="container">
        <form @submit.prevent="onSubmit">
            <!-- Email input -->
            <div class="form-outline mb-4">
                <input
                    type="email"
                    id="form2Example1"
                    class="form-control"
                    v-model="staffname"
                />
                <label class="form-label" for="form2Example1">Staffname</label>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-4">
                <input
                    type="password"
                    id="form2Example2"
                    class="form-control"
                    v-model="password"
                />
                <label class="form-label" for="form2Example2">Password</label>
            </div>

            <!-- 2 column grid layout for inline styling -->
            <div class="row mb-4">
                <div class="col d-flex justify-content-center">
                    <!-- Checkbox -->
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="form2Example31"
                            checked
                        />
                        <label class="form-check-label" for="form2Example31">
                            Remember me
                        </label>
                    </div>
                </div>
            </div>

            <!-- Submit button -->
            <button
                type="button"
                class="btn btn-primary btn-block mb-4 @su"
                @click="login"
            >
                Sign in
            </button>
        </form>
    </div>
</template>

<style scoped></style>

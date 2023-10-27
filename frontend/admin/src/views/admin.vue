<script setup>
import { useAuthStore } from '../stores/auth.store';

const authStore = useAuthStore()
</script>
<template>
    <h1>Admin</h1>
    <button type="button" class="btn btn-primary" @click="authStore.logout">
        Logout
    </button>
</template>
<style scoped></style>

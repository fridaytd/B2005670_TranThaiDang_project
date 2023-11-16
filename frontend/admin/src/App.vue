<script setup>
import { useSocketStore } from "./stores/socket.store";
import { onBeforeMount, onBeforeUnmount } from "vue"
const socketStore = useSocketStore()
onBeforeMount(() => {
    socketStore.connect()
})
onBeforeUnmount(() => {
    socketStore.disconnect()
})
</script>

<template>
    <router-view />
</template>

<style scoped></style>

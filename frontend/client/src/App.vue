<script setup>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
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
  <Header></Header>
  <Suspense>
    <template #default>
      <main><router-view></router-view></main>
    </template>
    <template #fallback>
      Loadding...
    </template>
  </Suspense>

  <Footer></Footer>
</template>

<style scoped>
main {
  min-height: 100vh
}
</style>

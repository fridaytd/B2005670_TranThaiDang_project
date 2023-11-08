<script setup>
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
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

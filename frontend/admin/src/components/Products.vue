<script setup>
import { ref } from "vue"
import { RouterView, RouterLink } from "vue-router";

const tab = ref("AllProducts")

</script>

<template>
    <div class="btn-group">
        <router-link to="/products" class="btn btn-primary" :class="tab == 'AllProducts' ? 'active' : ''"
            @click="tab = 'AllProducts'">Show all
            products</router-link>
        <router-link to="/products/add" class="btn btn-primary" :class="tab == 'AddProduct' ? 'active' : ''"
            @click="tab = 'AddProduct'">Add
            product</router-link>
    </div>
    <div>
        <Suspense>
            <template #default> <router-view></router-view></template>
            <template #fallback>
                Loadding ...
            </template>
        </Suspense>
    </div>
</template>

<style scoped>
.btn-primary {
    background-color: #006f3c;
    border-color: #006f3c;
}

.btn.active {
    background-color: #03914e;
}
</style>
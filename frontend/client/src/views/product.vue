<script setup>
import { defineProps, ref, computed, watch } from 'vue';
import ProductCard from "../components/ProductCard.vue"
import productService from "../services/product.service"

const props = defineProps(['type'])

const products = ref(null)

products.value = await productService.getAllProducts()

const productsOfType = computed(() => {
    return products.value.filter((item) => {
        return item.type === props.type
    })
})

</script>

<template>
    <img class="img-fluid" src="/images/carousel2.png" alt="">
    <h1 class="h1 text-center mt-5">FRIDAY COFFEE AND TEA</h1>
    <hr>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4 col-6" v-for="product in productsOfType">
                <ProductCard :productId="product._id" :image_url="product.image_url" :name="product.name"
                    :price="product.price" :description="product.description"></ProductCard>
            </div>
        </div>

    </div>
</template>

<style scoped>
h1 {
    color: #006f3c;
    font-weight: 900;
}
</style>
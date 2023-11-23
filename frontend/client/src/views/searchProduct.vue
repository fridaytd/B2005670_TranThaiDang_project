<script setup>
import { defineProps, ref, computed, watch } from 'vue';
import ProductCard from "../components/ProductCard.vue"
import productService from "../services/product.service"

const props = defineProps(['keyWord'])

const products = ref(null)

products.value = await productService.getAllProducts()

const searchedProduct = computed(() => {
    return products.value.filter((item) => {
        return item.name.toLowerCase().includes(props.keyWord.trim().toLowerCase())
    })
})

</script>

<template>
    <img class="img-fluid" src="/images/carousel2.png" alt="">
    <h1 class="h1 text-center mt-5">FRIDAY COFFEE AND TEA</h1>
    <hr>
    <div v-if="searchedProduct.length < 1">
        <h3 class="h3 text-center">Không tìm thấy sản phẩm nào khớp với từ khóa {{ keyWord }}</h3>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4 col-6" v-for="product in searchedProduct">
                <ProductCard :productId="product._id" :image_url="product.image_url" :name="product.name"
                    :price="product.price" :description="product.description" :type="product.type"></ProductCard>
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
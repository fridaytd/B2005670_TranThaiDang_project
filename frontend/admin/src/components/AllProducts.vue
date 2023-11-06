<script setup>
import ProductCard from "./ProductCard.vue"
import ProductService from "../services/product.service";
import { onBeforeMount, onMounted, reactive, ref } from "vue";

const productService = new ProductService()
const products = ref()

async function getAllProducts() {
    products.value = await productService.getAllProducts()
    // console.log(products.value[0]);
}
onBeforeMount(async () => {
    await getAllProducts()
})

async function deleteProduct(id) {
    try {
        // console.log(id);
        const resule = await productService.deleteProduct(id)
        await getAllProducts()
    } catch (err) {

    }
}


</script>

<template>
    <div class="m-3 -p-3">
        <div v-for="product in products">
            <ProductCard :productId="product._id" :name="product.name" :type="product.type" :price="product.price"
                :creator="product.creator" :description="product.description" :image_url="product.image_url"
                @deleteProduct="deleteProduct"></ProductCard>
        </div>
    </div>
</template>
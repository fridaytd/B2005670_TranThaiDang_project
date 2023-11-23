<script setup>
import ProductCard from "./ProductCard.vue"
import ProductService from "../services/product.service";
import { onBeforeMount, onMounted, reactive, ref, nextTick, on } from "vue";

const productService = new ProductService()
const products = ref()
const searchedProducts = ref()
const keyWord = ref('')

async function getAllProducts() {
    products.value = await productService.getAllProducts()
    // console.log(products.value[0]);
}
onBeforeMount(async () => {
    await getAllProducts()
    search()
})

async function deleteProduct(id) {
    try {
        // console.log(id);
        const resule = await productService.deleteProduct(id)
        await getAllProducts()
    } catch (err) {

    }
}

function search() {
    if (!keyWord.value) {
        searchedProducts.value = products.value
        return
    }
    keyWord.value = keyWord.value.trim().toLowerCase()
    searchedProducts.value = products.value.filter((product) => product.name.toLowerCase().includes(keyWord.value))

}

async function clear() {
    keyWord.value = null
    await nextTick()
    searchedProducts.value = products.value
}



</script>

<template>
    <div class="mt-3">
        <form @submit.prevent="search">
            <div class="row">

                <div class="col-5">
                    <input class="form-control" type="text" name="" id="" v-model="keyWord">
                </div>
                <div class="col-1 btn-group">
                    <button class="btn btn-success" type="submit">Tìm</button>
                    <button class="btn btn-danger" @click="clear">Hủy</button>
                </div>

            </div>
        </form>
    </div>
    <div v-if="!searchedProducts || searchedProducts.length < 1" class="mt-3">
        <h3>Không tìm thấy sản phẩm nào</h3>
    </div>
    <div class="m-3 -p-3">
        <div v-for="product in searchedProducts">
            <ProductCard :productId="product._id" :name="product.name" :type="product.type" :price="product.price"
                :creator="product.creator" :description="product.description" :image_url="product.image_url"
                @deleteProduct="deleteProduct"></ProductCard>
        </div>
    </div>
</template>
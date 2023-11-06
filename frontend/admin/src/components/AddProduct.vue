<script setup>

import { ref, reactive, computed, watch } from "vue"
import ProductService from "../services/product.service"


const productService = new ProductService()

const newImage = ref("")
const loading = ref(false)
const imginput = ref(null)
const state = ref(null)

watch(state, (newState) => {
    setTimeout(() => {
        state.value = null
    }, 5000)
})

const product = reactive({
    name: null,
    type: null,
    price: null,
    description: null,
    image: null

})

const error = reactive({
    name: null,
    type: null,
    price: null,
    description: null,
    image: null
})

function previewFiles(event) {
    imginput.value = event
    const file = event.target.files[0];
    product.image = file;

    const theReader = new FileReader();
    // Nhớ sử dụng async/await để chờ khi đã convert thành công image sang base64 thì mới bắt đầu gán cho biến newImage
    // đây là 1 kinh nghiệm của mình khi upload multiple ảnh
    theReader.onloadend = async () => {
        newImage.value = await theReader.result;
    };
    theReader.readAsDataURL(file);

}

async function onSubmit() {
    loading.value = true
    try {
        const result = await productService.addProduct(product)
        console.log(result);
        if (result) {
            product.name = null
            product.price = null
            product.type = null
            product.description = null
            product.image = null
            error.name = null
            error.type = null
            error.price = null
            error.description = null
            error.image = null
            newImage.value = null
            imginput.value.target.value = null
            state.value = true
        }

    } catch (err) {
        error.name = err.response.data.name
        error.type = err.response.data.type
        error.price = err.response.data.price
        error.description = err.response.data.description
        error.image = err.response.data.image
        state.value = false
    }
    loading.value = false
}

</script>

<template>
    <div class="row justify-content-center mt-3">
        <div class="col-md-6">
            <form @submit.prevent="onSubmit" class="w-75 container" enctype="multipart/form-data">
                <div class="row mb-3">
                    <label for="productName" class="form-label">Tên</label>
                    <input type="text" class="form-control" id="productName" v-model="product.name">
                    <div class="error" v-if="error.name">{{ error.name }}</div>
                    <!-- <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> -->
                </div>
                <div class="row mb-3">
                    <div class="col-7  ps-0">
                        <label for="productPrice" class="form-label ps-3">Giá</label>
                        <input type="text" class="form-control" id="productPrice" v-model="product.price">
                        <div class="error" v-if="error.price">{{ error.price }}</div>
                    </div>
                    <div class="col-5  pe-0">
                        <label class="form-label ps-3">Loại</label>
                        <select class="form-select" v-model="product.type">
                            <option value="tea">Trà</option>
                            <option value="coffee">Coffee</option>
                        </select>
                        <div class="error" v-if="error.type">{{ error.type }}</div>
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="description">Mô tả</label>
                    <textarea name="description" id="description" cols="30" rows="3" class="form-control"
                        v-model="product.description"></textarea>
                    <div class="error" v-if="error.description">{{ error.description }}</div>
                </div>
                <div class="mb-3">
                    <label for="productPicture" class="form-label">Chọn hình sản phẩm</label>
                    <input class="form-control " type="file" id="productPicture" @change="previewFiles($event)"
                        accept="image/*">
                    <div class="error" v-if="error.image">{{ error.image }}</div>
                </div>
                <button type="submit" class="row btn btn-primary">Submit</button>
                <div class="spinner-border text-success ms-5" role="status" v-if="loading">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <span class="message alert alert-primary" :class="state ? 'alert-success' : 'alert-danger'"
                    v-if="state !== null">{{ state ? "Thành công" : "Thất Bại"
                    }}</span>
            </form>
        </div>

        <div class="col-md-6">
            <img type="image" :src="newImage" alt="Image product preview" class="img-thumbnail" v-if="newImage">
        </div>
    </div>
</template>

<style scoped>
.btn.btn-primary {
    background-color: #006f3c;
    border-color: #006f3c;
}

.error {
    color: red;
    font-style: italic;
}

.message {
    margin-left: 50px;
}
</style>
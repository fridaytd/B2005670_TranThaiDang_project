<script setup>
import { RouterLink } from "vue-router";
import { defineProps, ref, reactive, defineEmits, computed } from "vue";

const props = defineProps(['productId', 'name', 'price', 'type', 'description', 'image_url', 'creator'])
const emits = defineEmits(['deleteProduct'])
const formatPrice = computed(() => {
    let formatPrice = props.price
    if (typeof formatPrice === 'number' && Number.isInteger(formatPrice)) {
        formatPrice = formatPrice.toString()
    }
    let pos = 3;
    while (pos < formatPrice.length) {
        formatPrice = formatPrice.slice(0, -pos) + '.' + formatPrice.slice(-pos, formatPrice.length)
        pos += 4
    }
    return formatPrice
})

const formatType = computed(() => {
    return props.type === "tea" ? "Trà" : "Coffee"
})

</script>
<template>
    <div class="card mb-3 p-3">
        <div class="row g-0">
            <div class="col-sm-3 col-lg-2 text-center">
                <img :src="image_url" class="img-fluid rounded-start img-card mx-auto" alt="...">
            </div>
            <div class="col-sm-7 col-lg-8">
                <div class="card-body">
                    <h5 class="card-title"><span class="bold">Tên sản phẩm:</span> {{ name }}</h5>
                    <div><span class="bold">Loại:</span> {{ formatType }}</div>
                    <div><span class="bold">Giá:</span> {{ formatPrice }} VNĐ</div>
                    <div><span class="bold">Người thêm:</span> {{ creator }}</div>
                    <p class="card-text"><span class="bold">Mô tả:</span> {{ description }}</p>
                    <!-- <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> -->
                </div>
                <!-- {{ id }} -->
            </div>
            <div class="col-sm-2 col-lg-2 d-flex justify-content-center align-items-center">
                <span class="btn-group " role="group">
                    <router-link :to="`/products/edit/${productId}`" class="btn btn-primary">Chỉnh sửa</router-link>
                    <!-- <button class="btn btn-danger" @click="$emit('deleteProduct', id)">Xóa</button> -->
                    <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                        :data-bs-target="'#staticBackdrop' + productId">
                        Xóa
                    </button>
                </span>

            </div>
        </div>
    </div>
    <!-- Button trigger modal -->


    <!-- Modal -->
    <div class="modal fade" :id="'staticBackdrop' + productId" data-bs-backdrop="static" data-bs-keyboard="false"
        tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Xác nhận xóa sản phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Bạn có chắc muốn xóa sản phẩm {{ name }} không ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Không</button>
                    <button type="button" class="btn btn-primary " data-bs-dismiss="modal"
                        @click="$emit('deleteProduct', productId)">Có</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.img-card {
    height: 150px;
    width: 150px;
    object-fit: scale-down;
}

.card-title {
    color: #006f3c;
}

.bold {
    font-weight: bold;
}
</style>
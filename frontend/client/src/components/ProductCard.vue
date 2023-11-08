<script setup>
import { defineProps, computed, ref } from 'vue';
import { useCartStore } from "../stores/cart.store"

const cartStore = useCartStore()

const props = defineProps(['productId', 'name', 'price', 'type', 'description', 'image_url'])
const quantity = ref(1)
const sumPrice = computed(() => {
    return quantity.value * props.price
})
const formatPrice = (price) => {
    let formatPrice = price
    if (typeof formatPrice === 'number' && Number.isInteger(formatPrice)) {
        formatPrice = formatPrice.toString()
    }
    let pos = 3;
    while (pos < formatPrice.length) {
        formatPrice = formatPrice.slice(0, -pos) + '.' + formatPrice.slice(-pos, formatPrice.length)
        pos += 4
    }
    return formatPrice
}

const formatType = computed(() => {
    return props.type === "tea" ? "Trà" : "Coffee"
})

function add() {
    quantity.value += 1
}

function sub() {
    quantity.value = quantity.value > 1 ? quantity.value - 1 : 1
}

function addCart() {
    cartStore.addProduct({
        ...props
    }, quantity.value)
}
</script>
<template>
    <div class="card" style="width: 18rem;">
        <img :src="props.image_url" class="card-img-top img-thumnail" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ props.name }}</h5>
            <h5 class="price h5"> {{ formatPrice(price) }} đ</h5>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                :data-bs-target="'#model' + props.productId">
                Đặt hàng
            </button>
        </div>
    </div>


    <!-- Modal -->
    <div class="modal fade" :id="'model' + props.productId" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Chọn số lượng sản phẩm</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body row">
                    <div class="col-5">
                        <img class="modal-img" :src="image_url" alt="">
                    </div>
                    <div class="col-7">
                        <h2 class="h2" style="color: #006f3c; font-weight: bold;">{{ name }}</h2>
                        <table class="table">
                            <tr>
                                <td class="h4">Số lượng:</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" class="btn btn-danger" @click="sub">-</button>
                                        <button type="button" class="btn">{{ quantity }}</button>
                                        <button type="button" class="btn btn-success" @click="add">+</button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td class="h4">Đơn giá:</td>
                                <td class="price h4">{{ formatPrice(price) }}</td>
                            </tr>

                            <tr>
                                <td class="h4">Tổng: </td>
                                <td>
                                    <h4 class="price">{{ formatPrice(sumPrice) }}</h4>
                                </td>
                            </tr>
                        </table>
                        <button class="btn btn-outline-primary" data-bs-dismiss="modal" aria-label="Close"
                            @click="addCart">Đặt hàng</button>


                    </div>
                </div>
                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: none;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin: 10px;
}

.card-body {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.card .card-img-top {
    height: 180px;
    object-fit: scale-down;
}

.modal-img {
    width: 100%;
    object-fit: scale-down;
}

.card:hover {
    transform: scale(1.03);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.card-title {
    text-transform: capitalize;
    font-weight: bolder;
}

.price {
    color: #006f3c;
    font-weight: bold;
}

.btn-outline-primary {
    color: #006f3c;
    border-color: #006f3c;
}

.btn-outline-primary:hover {
    background-color: #006f3c;
    color: white;
    border-color: #006f3c;
}


.btn-outline-primary:focus-visible {
    background-color: #006f3c;
    color: white;
    border-color: #006f3c;
}

table {
    border-collapse: separate;
    border-spacing: 0 15px;
}
</style>
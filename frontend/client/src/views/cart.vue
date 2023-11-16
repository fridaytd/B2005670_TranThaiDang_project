<script setup>
import { ref } from 'vue';
import { Toaster, toast } from 'vue-sonner'
import { useCartStore } from '../stores/cart.store';
import { useSocketStore } from '../stores/socket.store';
import CartProductCard from '../components/CartProductCard.vue';
import userService from "../services/user.service"
import orderService from '../services/order.service';

const cartStore = useCartStore()
const socketStore = useSocketStore()

const newAddress = ref(null)
const newAddressError = ref(null)
const success = ref(null)
const address = ref(null)
const note = ref(null)

const userAddress = ref(await userService.getUserAddress())

// console.log(cartStore.cart);

function addOne(productId) {
    cartStore.addProduct({ productId: productId }, 1)
}

function subOne(productId) {
    cartStore.addProduct({ productId: productId }, -1)
}

function deleteProduct(productId) {
    cartStore.deleteProduct(productId)
}

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

async function addAddress() {
    try {
        userAddress.value = await userService.addUserAddress({
            address: newAddress.value
        })
        newAddressError.value = null
        success.value = true
        setTimeout(() => {
            success.value = false
        }, 5000)
        newAddress.value = null
    } catch (err) {
        newAddressError.value = err.response.data.error
    }
}

async function order() {
    // console.log(cartStore.detail);
    try {
        const result = await orderService.addOrder({
            orderDetail: cartStore.detail,
            note: note.value,
            address: address.value,
        })
        toast.success("Đặt hàng thành công")
        cartStore.clear()
        address.value = null
        note.value = null
        socketStore.io.emit('order')
    } catch (err) {
        console.log(err);
        toast.error("Đặt hàng không thành công")
    }
} 
</script>

<template>
    <Toaster richColors />
    <section class="h-100 h-custom" style="background-color: white">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12">
                    <div class="card card-registration card-registration-2" style="border-radius: 15px;">
                        <div class="card-body p-0">
                            <div class="row g-0">
                                <div class="col-lg-8">
                                    <div class="p-5">
                                        <div class="d-flex justify-content-between align-items-center mb-5">
                                            <h1 class="fw-bold mb-0 text-black">Giỏ hàng</h1>
                                            <h6 class="mb-0 text-muted"> {{ cartStore.numberOfProduct }} món</h6>
                                        </div>
                                        <hr class="my-4">

                                        <div v-for="product in cartStore.cart">
                                            <CartProductCard :productId="product.productId" :name="product.name"
                                                :price="product.price" :image_url="product.image_url" :type="product.type"
                                                :quantity="product.quantity" @addOne="addOne" @subOne="subOne"
                                                @deleteProduct="deleteProduct">
                                            </CartProductCard>
                                        </div>

                                        <div class="pt-5">
                                            <h6 class="mb-0"><span class="text-body"><i
                                                        class="fas fa-long-arrow-alt-left me-2"></i>Tiếp tục mua
                                                    hàng <router-link to="/products/tea">Trà</router-link> / <router-link
                                                        to="/products/coffee">Coffee</router-link></span>
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 bg-grey">
                                    <div class="p-5">
                                        <h3 class="fw-bold mb-5 mt-2 pt-1">Tóm tắt</h3>
                                        <hr class="my-4">

                                        <div class="d-flex justify-content-between mb-4">
                                            <h5 class="text-uppercase">Món: {{ cartStore.numberOfProduct }}</h5>
                                            <h5>{{ formatPrice(cartStore.total) }}</h5>
                                        </div>

                                        <div>
                                            <span class="h5 text-uppercase me-5">Địa chỉ</span>
                                            <!-- Button trigger modal -->
                                            <button type="button" class="btn btn-success" data-bs-toggle="modal"
                                                data-bs-target="#staticBackdrop">
                                                Thêm địa chỉ mới
                                            </button>
                                        </div>


                                        <div class="mt-4 mb-4 pb-2">
                                            <select v-model="address" class="select">
                                                <option v-for="adrr in userAddress" :value="adrr"> {{ adrr }}</option>

                                            </select>
                                        </div>

                                        <h5 class="text-uppercase mb-3">Ghi chú</h5>

                                        <div class="mb-5">
                                            <div class="form-outline">
                                                <textarea v-model="note" name="note" id="note" cols="40"
                                                    rows="5"></textarea>
                                            </div>
                                        </div>

                                        <hr class="my-4">

                                        <div class="d-flex justify-content-between mb-5">
                                            <h5 class="text-uppercase">Tổng cộng</h5>
                                            <h5>{{ formatPrice(cartStore.total) }}</h5>
                                        </div>

                                        <button type="button" class="btn btn-dark btn-block btn-lg"
                                            data-mdb-ripple-color="dark" @click="order">Đặt hàng</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- App.vue -->



    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Nhập địa chi mới</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <input v-model="newAddress" class="form-control" type="text">
                    <div v-if="newAddressError" class="error">{{ newAddressError }}</div>
                    <div v-if="success" style="color: green;">Thêm thành công</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button type="button" class="btn btn-primary" @click="addAddress">Thêm</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media (min-width: 1025px) {
    .h-custom {
        height: 100vh !important;
    }
}

.card-registration .select-input.form-control[readonly]:not([disabled]) {
    font-size: 1rem;
    line-height: 2.15;
    padding-left: .75em;
    padding-right: .75em;
}

.card-registration .select-arrow {
    top: 13px;
}

.bg-grey {
    background-color: #eae8e8;
}

@media (min-width: 992px) {
    .card-registration-2 .bg-grey {
        border-top-right-radius: 16px;
        border-bottom-right-radius: 16px;
    }
}

@media (max-width: 991px) {
    .card-registration-2 .bg-grey {
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
    }
}

.error {
    color: red;
    font-style: italic;
}
</style>
<script setup>
import { defineProps, ref, computed, watch } from "vue"
import orderService from "../services/order.service";
import ProductService from "../services/product.service";
import OrderDetailCard from "./OrderDetailsCard.vue"
import userService from "../services/user.service"
import { useSocketStore } from "../stores/socket.store";

const productService = new ProductService()

const status = {
    processing: "Đang xử lý",
    accepted: "Đã nhận",
    preparing: "Đang chuẩn bị",
    delivering: "Đang giao",
    delivered: "Đã giao",
}

const props = defineProps(['order'])
const detail = ref()
// let sumMoney = 0
try {

    props.order.user = (await userService.getUserById(props.order.userId))
    detail.value = await orderService.getOrderDetail(props.order._id)
    detail.value = await Promise.all(detail.value.map(async (value) => {
        return {
            ...value,
            ...(await productService.getProducts(value.productId)),
        }
    }))

} catch (err) {
    console.log(err);
}

const sumMoney = computed(() => detail.value.reduce((sum, current) => sum += current.price * current.quantity, 0))


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

const orderStatus = ref(props.order.status)

watch(orderStatus, async (orderStatus) => {
    await changeStatus(orderStatus)
})

async function changeStatus(orderStatus) {
    document.getElementById(`close${props.order._id}`).click()
    try {
        await orderService.updateOrderStatus(props.order._id, orderStatus)
        const socketStore = useSocketStore()
        socketStore.io.emit('changeStatus')
    } catch (err) {
        console.log(err);
    }
}
</script>

<template>
    <!-- Button trigger modal -->
    <tr data-bs-toggle="modal" :data-bs-target="`#Modal${order._id}`">
        <th scope="row">...{{ order._id.substr(order._id.length - 5) }}</th>
        <td>{{ order.user.fullname }}</td>
        <td>{{ detail.length }}</td>
        <td>{{ formatPrice(sumMoney) }}đ</td>
        <td>{{ status[order.status] }}</td>
        <td>{{ (new Date(order.orderTime)).toLocaleDateString() }} {{ (new Date(order.orderTime)).toLocaleTimeString()
        }}
        </td>
        <td>null</td>
    </tr>


    <!-- Modal -->
    <div class="modal fade" :id="`Modal${order._id}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Đơn hàng {{ order._id }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <h3>Khách hàng: {{ order.user.fullname }}</h3>
                    <h4>Chi tiết đơn hàng</h4>
                    <hr class="my-4">
                    <OrderDetailCard v-for="d in detail" :detail="d"></OrderDetailCard>
                    <h5 class="h5">Tổng cộng: {{ formatPrice(sumMoney) }}đ</h5>
                    <h5 class="h5">Trạng thái:</h5>
                    <div class="col-3 my-2">
                        <select v-model="orderStatus" class="form-select" aria-label="Default select example">
                            <option value="processing">Đang xử lý</option>
                            <option value="accepted">Đã nhận</option>
                            <option value="preparing">Đang chuẩn bị</option>
                            <option value="delivering">Đang giao</option>
                            <option value="delivered">Đã giao</option>
                        </select>
                    </div>
                    <div>Địa chỉ: {{ order.address }}</div>
                </div>
                <div class="modal-footer">
                    <button :id="`close${props.order._id}`" type="button" class="btn btn-secondary"
                        data-bs-dismiss="modal">Đóng</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
h3,
h4,
h5 {
    color: #006f3c;
}
</style>
<script setup>
import { ref, watch, nextTick } from "vue"
import { Toaster, toast } from "vue-sonner"
import orderService from "../services/order.service"
import OrderCard from "../components/OrderCard.vue";
import { useSocketStore } from "../stores/socket.store";

const socketStore = useSocketStore()

socketStore.io.on('updateStatus', async () => {
    toast.warning("Có đơn hàng thay đổi trạng thái")
    await fetchOrder()
})

const orders = ref()
const status = ref('all')
const renderComponent = ref(true)

async function fetchOrder() {
    try {
        orders.value = await orderService.getOrder()
        await orders.value.sort((a, b) => {
            return (new Date(b.orderTime)) - (new Date(a.orderTime))
        })
    } catch (err) {
        console.log(err);
    }
}

let ordersFilted = orders.value

watch(orders, async (value) => {
    renderComponent.value = false
    await nextTick()
    if (status.value == 'all') {
        ordersFilted = orders.value
    } else {
        ordersFilted = orders.value.filter((order) => order.status == status.value)
    }
    renderComponent.value = true
})

watch(status, async (value) => {
    renderComponent.value = false
    await nextTick()
    if (value == 'all') {
        ordersFilted = orders.value
    } else {
        ordersFilted = orders.value.filter((order) => order.status == value)
    }
    renderComponent.value = true
})

fetchOrder()


</script>

<template>
    <Toaster richColors />
    <div class="container mt-5">
        <div class="row">
            <h1>Tổng số đơn hàng: {{ orders.length }}</h1>
        </div>
        <div class="row my-4">
            <div class="col-4">
                <select v-model="status" class="form-select" aria-label="Default select example">
                    <option value="all">Chọn trạng thái đơn hàng</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="accepted">Đã nhận</option>
                    <option value="preparing">Đang chuẩn bị</option>
                    <option value="delivering">Đang giao</option>
                    <option value="delivered">Đã giao</option>
                </select>
            </div>
        </div>
        <div class="row">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thời gian đặt</th>
                        <th scope="col">Thời gian giao</th>
                    </tr>
                </thead>
                <tbody v-if="renderComponent">
                    <OrderCard :order="order" v-for="order in ordersFilted"></OrderCard>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
h1 {
    color: #006f3c;
}
</style>
<script setup>
import { ref, watch, nextTick } from "vue"
import { Toaster, toast } from "vue-sonner"
import { useSocketStore } from "../stores/socket.store";
import orderService from "../services/order.service"
import OrderCard from "./OrderCard.vue";
const socketStore = useSocketStore()

const renderComponent = ref(true)

socketStore.io.on('updateOrder', async () => {
    toast.warning("Có đơn đặt hàng mới")
    await fetchOrder()
})

socketStore.io.on('updateStatus', async () => {
    toast.warning("Có đơn hàng thay đổi trạng thái")
    await fetchOrder()
})

const allOrders = ref()
const status = ref('all')

async function fetchOrder() {
    renderComponent.value = false
    await nextTick()
    try {
        allOrders.value = await orderService.getAllOrder()
        console.log(allOrders.value);
        await allOrders.value.sort((a, b) => {
            return (new Date(b.orderTime)) - (new Date(a.orderTime))
        })
    } catch (err) {
        console.log(err);
    }
    renderComponent.value = true
}

await fetchOrder()

let allOrdersFilted = allOrders.value

watch(allOrders, async (value) => {
    renderComponent.value = false
    await nextTick()
    if (status.value == 'all') {
        allOrdersFilted = allOrders.value
    } else {
        allOrdersFilted = allOrders.value.filter((order) => order.status == status.value)
    }
    renderComponent.value = true
})

watch(status, async (value) => {
    renderComponent.value = false
    await nextTick()
    if (value == 'all') {
        allOrdersFilted = allOrders.value
    } else {
        allOrdersFilted = allOrders.value.filter((order) => order.status == value)
    }
    renderComponent.value = true
})
</script>

<template>
    <Toaster richColors />
    <div class="container mt-5">
        <div class="row">
            <h1>Tổng số đơn hàng: {{ allOrders.length }}</h1>
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
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Khách hàng</th>
                        <th scope="col">Nhân viên</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Thời gian đặt</th>
                        <th scope="col">Cập nhật lúc</th>
                    </tr>
                </thead>
                <tbody v-if="renderComponent">
                    <OrderCard :order="order" v-for="order in allOrdersFilted"></OrderCard>
                </tbody>
            </table>
        </div>
    </div>
</template>
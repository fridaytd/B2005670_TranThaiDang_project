<script setup>
import { defineProps, ref, computed } from "vue"
import orderService from "../services/order.service";
import productService from "../services/product.service";
import OrderDetailCard from "./OrderDetailCard.vue";
import { useSocketStore } from "../stores/socket.store";

const status = {
    processing: "Đang xử lý",
    accepted: "Đã nhận",
    preparing: "Đang chuẩn bị",
    delivering: "Đang giao",
    delivered: "Đã giao",
}

const props = defineProps(['order'])

const sumMoney = computed(() => props.order.detail.reduce((sum, current) => sum += current.price * current.quantity, 0))


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
</script>

<template>
    <!-- Button trigger modal -->
    <tr data-bs-toggle="modal" :data-bs-target="`#Modal${order._id}`">
        <th scope="row">...{{ order._id.substr(order._id.length - 5) }}</th>
        <td>{{ order.detail.length }}</td>
        <td>{{ formatPrice(sumMoney) }}đ</td>
        <td>{{ status[order.status] }}</td>
        <td>{{ (new Date(order.orderTime)).toLocaleDateString() }} {{ (new Date(order.orderTime)).toLocaleTimeString()
        }}
        </td>
        <td>{{ order.updateTime ? ((new Date(order.updateTime)).toLocaleDateString() + ' ' + (new
            Date(order.updateTime)).toLocaleTimeString()) : ((new Date(order.orderTime)).toLocaleDateString() + ' ' + (new
                Date(order.orderTime)).toLocaleTimeString()) }}</td>
        <td>{{ order.staff }}</td>
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
                    <h2>Chi tiết đơn hàng</h2>
                    <hr class="my-4">
                    <OrderDetailCard v-for="d in order.detail" :detail="d"></OrderDetailCard>
                    <h5 class="h5">Tổng cộng: {{ formatPrice(sumMoney) }}đ</h5>
                    <h5 class="h5">Trạng thái: {{ status[order.status] }}</h5>
                    <h5 class="h5">Nhân viên: {{ order.staff }}</h5>
                    <div>Địa chỉ: {{ order.address }}</div>
                    <div>Ghi chú</div>
                    <textarea class="form-control" name="" id="" cols="30" rows="3" disabled>{{ order.note }}</textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
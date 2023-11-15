<script setup>
import { defineProps, computed } from "vue"

const props = defineProps(['detail'])

const sumPrice = computed(() => {
    return props.detail.price * props.detail.quantity
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
</script>

<template>
    <div class="row mb-4 d-flex justify-content-between align-items-center">
        <div class="col-md-2 col-lg-2 col-xl-2">
            <img :src="detail.image_url" class="img-fluid rounded-3" alt="Cotton T-shirt">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
            <h6 class="text-muted">{{ detail.type }}</h6>
            <h6 class="text-black mb-0">{{ detail.name }}</h6>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
            {{ formatPrice(detail.price) }}đ
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
            x{{ detail.quantity }}
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h6 class="mb-0">{{ formatPrice(sumPrice) }}đ</h6>
        </div>

    </div>

    <hr class="my-4">
</template>

<style scoped></style>
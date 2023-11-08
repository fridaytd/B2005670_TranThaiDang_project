<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps(['productId', 'name', 'type', 'price', 'image_url', 'quantity'])

const emits = defineEmits(['addOne', 'subOne', 'deleteProduct'])

const sumPrice = computed(() => {
    return props.price * props.quantity
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
            <img :src="image_url" class="img-fluid rounded-3" alt="Cotton T-shirt">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
            <h6 class="text-muted">{{ type }}</h6>
            <h6 class="text-black mb-0">{{ name }}</h6>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
            <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                <button type="button" class="btn btn-danger" @click="$emit('subOne', productId)">-</button>
                <button type="button" class="btn">{{ quantity }}</button>
                <button type="button" class="btn btn-success" @click="$emit('addOne', productId)">+</button>
            </div>
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
            <h6 class="mb-0">{{ formatPrice(sumPrice) }}</h6>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
            <button class="btn text-muted" @click="$emit('deleteProduct', productId)"><i class="fas fa-times"></i></button>
        </div>
    </div>

    <hr class="my-4">
</template>
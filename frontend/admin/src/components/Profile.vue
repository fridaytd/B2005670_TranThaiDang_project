<script setup>
import { ref } from "vue"

import staffService from "../services/staff.service";

const staff = ref()

try {
    staff.value = await staffService.getStaffInfor()
    console.log(staff.value);
} catch (err) {
    console.log(err);
}
</script>

<template>
    <h1 class="text-center">Nhân viên</h1>
    <h3>Họ và tên: {{ staff.fullname }}</h3>
    <h3>Chức vụ: {{ staff.position }}</h3>
</template>

<style scoped>
h1 {
    color: #006f3c;
}
</style>
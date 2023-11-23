<script setup>
import { ref } from "vue"
import userService from "../services/user.service"

const address = ref()

const newAddress = ref()
async function fetchAddress() {
    try {
        address.value = await userService.getUserAddress()
    } catch (err) {
        console.log(err);
    }
}

async function removeAddress(adr) {
    try {
        address.value = await userService.removeUserAddress(adr)
    } catch (err) {
        console.log(err);
    }
}

async function addAddress() {
    try {
        address.value = await userService.addUserAddress({
            address: newAddress.value
        })
        newAddress.value = ''
    } catch (err) {
        console.log(err);
    }
}

fetchAddress()
</script>

<template>
    <div class="row mt-3">
        <h4 class="h4"> Thêm địa chỉ mới</h4>
    </div>

    <form @submit.prevent="addAddress">
        <div class="row">
            <div class="col-10">
                <input class="form-control" type="text" v-model="newAddress">
            </div>
            <div class="col-2">
                <button type="submit" class="btn btn-success">Thêm</button>
            </div>
        </div>
    </form>

    <div class="row mt-3">
        <h4 class="h4">Địa chỉ của bạn</h4>
    </div>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Địa chỉ</th>
                <th scope="col">Xóa</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in address">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ item }}</td>
                <td>
                    <button class="btn btn-danger" @click="removeAddress(item)">x</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>
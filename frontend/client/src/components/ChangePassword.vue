<script setup>
import { ref } from "vue"
import { Toaster, toast } from "vue-sonner";
import userServie from "../services/user.service.js";

const password = ref()
const newPassword = ref()
const passwordConfirm = ref()
const error = ref({})

async function changePassword() {
    try {
        await userServie.changePassword(password.value, newPassword.value, passwordConfirm.value)
        error.value = {}
        password.value = null
        newPassword.value = null
        passwordConfirm.value = null;
        toast.success("Thay đổi mật khẩu thành công")
    } catch (err) {
        console.log(err);
        error.value = err.response.data
        toast.error("Thay đổi mật khẩu thất bại")
    }
}

</script>

<template>
    <Toaster richColors />
    <form @submit.prevent="changePassword">
        <table class="table table-fixed w-auto ">
            <tbody>
                <tr>
                    <th>
                        <label class="form-lable" for="password">Mật khẩu hiện tại</label>
                    </th>
                    <td>
                        <input class="form-control" type="password" id="password" v-model="password">
                        <div class="error" v-if="error.password">{{ error.password }}</div>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label class="form-label" for="newPassword">Mật khẩu mới</label>
                    </th>
                    <td>
                        <input class="form-control" type="password" id="newPassword" v-model="newPassword">
                        <div class="error" v-if="error.newPassword"> {{ error.newPassword }}</div>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label class="form-label" for="passwordConfirm">Nhập lại mật khẩu mới</label>
                    </th>
                    <td>
                        <input class="form-control" type="password" id="passwordConfirm" v-model="passwordConfirm">
                        <div class="error" v-if="error.passwordConfirm">{{ error.passwordConfirm }}</div>
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <td><button type="submit" class="btn btn-success">Thay đổi mật khẩu</button></td>
                </tr>
            </tbody>
        </table>
    </form>
</template>

<style scoped>
.error {
    color: red;
    font-style: italic;
}
</style>
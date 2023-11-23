<script setup>
import { ref } from "vue"
import { Toaster, toast } from "vue-sonner";
import userService from '../services/user.service';

const userInfor = ref()
const error = ref({})

try {
    userInfor.value = await userService.getUserInfor()
} catch (err) {
    console.log(err);
}

async function changeInfor() {
    try {
        userInfor.value = await userService.updateUserInfor(userInfor.value.fullname, userInfor.value.phone)
        toast.success('Cập nhật thành công')
        error.value = {}
    } catch (err) {
        console.log(err);
        error.value = err.response.data
        toast.error('Cập nhật không thành công')
    }
}    
</script>

<template>
    <Toaster richColors />
    <form @submit.prevent="changeInfor">
        <table class="table table-fixed w-auto ">
            <tbody>
                <tr>
                    <th>
                        <label class="form-lable" for="username">username</label>
                    </th>
                    <td>
                        <input disabled class="form-control" type="text" id="username" v-model="userInfor.username">

                    </td>
                </tr>
                <tr>
                    <th>
                        <label class="form-label" for="fullname">Họ và tên:</label>
                    </th>
                    <td>
                        <input class="form-control" type="text" id="fullname" v-model="userInfor.fullname">
                        <div class="error" v-if="error.fullname"> {{ error.fullname }}</div>
                    </td>
                </tr>
                <tr>
                    <th>
                        <label class="form-label" for="phone">Số điện thoại:</label>
                    </th>
                    <td>
                        <input class="form-control" type="text" id="phone" v-model="userInfor.phone">
                        <div class="error" v-if="error.phone">{{ error.phone }}</div>
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <td><button type="submit" class="btn btn-success">Thay đổi thông tin</button></td>
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
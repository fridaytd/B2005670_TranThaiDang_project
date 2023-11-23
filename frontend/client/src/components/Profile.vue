<script setup>
import userService from '../services/user.service';
let userInfor
try {
    userInfor = await userService.getUserInfor()
} catch (err) {
    console.log(err);
}
</script>

<template>
    <table class="table table-fixed w-auto ">
        <tbody>
            <tr>
                <th>
                    username:
                </th>
                <td>
                    {{ userInfor.username }}
                </td>
            </tr>
            <tr>
                <th>
                    Họ và tên:
                </th>
                <td> {{ userInfor.fullname }}</td>
            </tr>
            <tr>
                <th>
                    Số điện thoại:
                </th>
                <td>
                    {{ userInfor.phone }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped></style>
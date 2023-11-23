import axios from "axios"
import { useAuthStore } from "../stores/authStore"

const baseURL = "http://localhost:3000/user"

class UserService {
    async getUserAddress() {
        const authStore = useAuthStore()
        return (await axios.get(baseURL + "/address", {
            headers: {
                "Authorization": "Beare " + authStore.user.accessToken
            }
        })).data
    }

    async addUserAddress(address) {
        const authStore = useAuthStore()
        return (await axios.post(baseURL + "/address", address, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Authorization": "Beare " + authStore.user.accessToken
            }
        })).data
    }

    async removeUserAddress(address) {
        const authStore = useAuthStore()
        return (await axios.put(`${baseURL}/address`, {
            address: address
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Authorization": "Beare " + authStore.user.accessToken
            }
        })).data
    }

    async getUserInfor() {
        const authStore = useAuthStore()
        return (await axios.get(`${baseURL}/${authStore.user.id}`, {
            headers: {
                "Authorization": "Beare " + authStore.user.accessToken
            }
        })).data
    }

    async updateUserInfor(fullname, phone) {
        const authStore = useAuthStore()
        return (await axios.put(`${baseURL}/infor`, {
            fullname: fullname,
            phone: phone
        }, {
            headers: {
                "Authorization": "Beare " + authStore.user.accessToken
            }
        })).data
    }

    async changePassword(password, newPassword, passwordConfirm) {
        const authStore = useAuthStore()
        return (await axios.put(`${baseURL}/password`, {
            password: password,
            newPassword: newPassword,
            passwordConfirm: passwordConfirm,
        }, {
            headers: {
                "Authorization": "Beare " + authStore.user.accessToken
            }
        })).data
    }
}

export default new UserService()
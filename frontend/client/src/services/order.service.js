import axios from "axios"

import { useAuthStore } from "../stores/authStore"

const baseURL = "http://localhost:3000/orders"

class OrderService {
    async addOrder(orderDetail) {
        const authStore = useAuthStore()
        return (await axios.post(baseURL, orderDetail, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Authorization": "Beare " + authStore.user.accessToken
            }
        }))
    }

    async getOrder() {
        const authStore = useAuthStore()
        return (await axios.get(baseURL, {
            headers: {
                "Authorization": "Beare " + authStore.user.accessToken
            }
        })).data
    }

    async getOrderDetail(orderId) {
        const authStore = useAuthStore();
        return (await axios.get(`${baseURL}/${orderId}`, {
            headers: {
                "Authorization": "Beare " + authStore.user.accessToken
            }
        })).data
    }
}

export default new OrderService()
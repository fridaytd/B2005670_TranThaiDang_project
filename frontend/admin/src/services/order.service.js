import axios from "axios"

import { useAuthStore } from "../stores/auth.store"

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
    async getAllOrder() {
        const authStore = useAuthStore()
        return (await axios.get(`${baseURL}/all`, {
            headers: {
                "Authorization": "Beare " + authStore.user.accessToken || ""
            }
        })).data
    }

    async updateOrderStatus(orderId, status) {
        const authStore = useAuthStore()
        return (await axios.put(`${baseURL}/updateStatus`, {
            orderId: orderId,
            status: status,
        }, {
            headers: {
                "Authorization": "Beare " + authStore.user.accessToken || ""
            }
        }))
    }
}

export default new OrderService()
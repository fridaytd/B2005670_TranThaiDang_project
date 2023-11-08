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
}

export default new OrderService()
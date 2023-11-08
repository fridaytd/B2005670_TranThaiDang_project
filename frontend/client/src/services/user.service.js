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
}

export default new UserService()
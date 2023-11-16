import axios from "axios"
import { useAuthStore } from "../stores/auth.store"

const baseURL = "http://localhost:3000/user";

class UserService {
    async getUserById(userId) {
        const authStore = useAuthStore()
        return (await axios.get(`${baseURL}/${userId}`, {
            headers: {
                "Authorization": "Beare " + authStore.user.accessToken || ""
            }
        })).data
    }
}

export default new UserService()
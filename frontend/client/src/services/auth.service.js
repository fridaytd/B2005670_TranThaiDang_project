import { useAuthStore } from "../stores/authStore";
import axios from "axios"

const authURL = "http://localhost:3001/user"

class AuthService {

    async login(user) {
        return (await axios.post(`${authURL}/login`, user)).data
    }

    async logout(id) {
        const authStore = useAuthStore()
        return (await axios.post(`${authURL}/logout`, {
            id: id,
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Beare " + authStore.user.accessToken
            }
        })).data
    }

    async register(user) {
        return (await axios.post(`${authURL}/register`, user)).data
    }

    async refreshToken(refreshToken) {
        return (await axios.post(`${authURL}/refresh`, {
            refreshToken: refreshToken,
        })).data;
    }
}

export default new AuthService();
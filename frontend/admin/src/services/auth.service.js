import createApiClient from "./api.service"
import { useAuthStore } from "../stores/auth.store";

const authURL = "http://localhost:3001/staff"

class AuthService {
    constructor(baseURL = authURL) {
        this.api = createApiClient(baseURL);
    }

    async login(user) {
        return (await this.api.post("/login", user)).data
    }

    async logout(id) {
        const authStore = useAuthStore()
        return (await this.api.post("/logout", {
            id: id,
        }, {
            headers: {
                Authorization: "Beare " + authStore.user.accessToken

            }
        })).data
    }

    async refreshToken(refreshToken) {
        return (await this.api.post('/refresh', refreshToken)).data
    }
}

export default new AuthService();
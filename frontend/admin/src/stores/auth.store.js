import { defineStore } from "pinia"
import authService from "../services/auth.service"
import router from "../router"

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        user: JSON.parse(localStorage.getItem("user")),
        refreshTokenTimeout: null,
        returnURL: null,
    }),
    actions: {
        async login(user) {
            this.user = await authService.login(user)
            localStorage.setItem("user", JSON.stringify(this.user))
            this.startRefreshTokenTimer();
            router.push("/")
            return this.user
        },
        async logout() {
            try {
                const result = await authService.logout(this.user.id)
                this.user = null;
                localStorage.removeItem('user');
                this.stopRefreshTokenTimer();
                router.push("/login")
            } catch (error) {
                console.log(error);
            }
        },
        async refreshToken() {
            try {
                const result = await authService.refreshToken(this.user.refreshToken)
                this.user.accessToken = result.accessToken
                localStorage.setItem("user", JSON.stringify(this.user))
                this.startRefreshTokenTimer();

            } catch (err) {
                this.user = null
                localStorage.removeItem('user');
                console.log("Expired refresh token");
            }
        },
        startRefreshTokenTimer() {
            const accessTokenBase64 = this.user.accessToken.split('.')[1]
            const accessToken = JSON.parse(atob(accessTokenBase64));

            // set a timeout to refresh the token a minute before it expires
            const expires = new Date(accessToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            this.refreshTokenTimeout = setTimeout(this.refreshToken, timeout);
        },
        stopRefreshTokenTimer() {
            clearTimeout(this.refreshTokenTimeout);
        }
    }
})
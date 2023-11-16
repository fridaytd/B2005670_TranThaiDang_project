import { defineStore } from "pinia";
import { io } from "socket.io-client"

const VUE_APP_SOCKET_ENDPOINT = "http://localhost:3000"

export const useSocketStore = defineStore({
    id: "Socket",
    state: () => ({
        io: null
    }),
    actions: {
        async connect() {
            this.io = io(VUE_APP_SOCKET_ENDPOINT)
        },

        async disconnect() {
            this.io.disconnect
        }
    }
})
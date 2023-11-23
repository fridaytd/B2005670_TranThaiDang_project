import axios from "axios"
import { useAuthStore } from '../stores/auth.store'

const baseURL = 'http://localhost:3000/staff'

class StaffService {
    async getStaffInfor() {
        const authStore = useAuthStore()
        return (await axios.get(baseURL, {
            headers: {
                "Authorization": "Beare " + authStore.user.accessToken || ""
            }
        })).data
    }
}

export default new StaffService()
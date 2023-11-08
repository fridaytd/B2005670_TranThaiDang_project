import axios from "axios"

const baseURL = "http://localhost:3000/products"

class ProductService {
    async getAllProducts() {
        return (await axios.get(baseURL)).data
    }
}

export default new ProductService()
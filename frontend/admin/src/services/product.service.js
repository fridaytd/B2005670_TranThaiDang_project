import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const baseURL = "http://localhost:3000/products"

class ProductService {
    constructor() {
        this.user = (useAuthStore()).user
        const commonConfig = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Beare " + this.user.accessToken || ""
            },
        };
        this.api = axios.create({
            baseURL,
            ...commonConfig,
        })
    }

    async addProduct(product) {

        return (await axios.post(baseURL, product, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": "Beare " + this.user.accessToken || ""
            }
        })).data
    }

    async getAllProducts() {
        return (await axios.get(baseURL)).data
    }

    async getProducts(productId) {
        return (await axios.get(baseURL + '/' + productId)).data
    }

    async deleteProduct(productId) {
        return await axios.delete(`${baseURL}/${productId}`, {
            headers: {
                "Authorization": "Beare " + this.user.accessToken || ""
            }
        })
    }

    async updateProduct(productId, product) {
        // console.log(product);
        return (await axios.put(baseURL + "/" + productId, product, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "Authorization": "Beare " + this.user.accessToken || ""
            }
        })).data
    }
}

export default ProductService
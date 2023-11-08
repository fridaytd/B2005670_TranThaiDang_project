import { defineStore } from "pinia";

export const useCartStore = defineStore({
    id: "cart",
    state: () => ({
        cart: JSON.parse(localStorage.getItem("cart")) ?? Array()
    }),
    getters: {
        numberOfProduct: (state) => state.cart.length,
        total: (state) => {
            let total = 0
            state.cart.forEach((item) => {
                total += item.quantity * item.price
            })
            return total
        },
        detail: (state) => {
            const detail = state.cart.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
            }))
            return detail
        }
    },
    actions: {
        addProduct(product, quantity) {
            // console.log(this.cart);
            const index = this.isExist(product.productId)
            // console.log(index);
            if (index != -1) {
                this.cart[index].quantity += quantity
                if (this.cart[index].quantity < 1) {
                    this.cart[index].quantity = 1
                }
            } else {
                product.quantity = quantity
                this.cart.push(product)
            }
            localStorage.setItem("cart", JSON.stringify(this.cart))
        },
        deleteProduct(productId) {
            const index = this.isExist(productId)

            if (index > -1) {
                this.cart.splice(index, 1)
            }
            localStorage.setItem("cart", JSON.stringify(this.cart))
        },
        isExist(productId) {
            // console.log(productId);
            let idx = -1
            this.cart.forEach((product, index) => {
                // console.log(product.productId);
                if (product.productId == productId) {
                    idx = index
                }
            })
            return idx;
        },
        clear() {
            this.cart = []
            localStorage.setItem("cart", JSON.stringify(this.cart))
        },
    }
})
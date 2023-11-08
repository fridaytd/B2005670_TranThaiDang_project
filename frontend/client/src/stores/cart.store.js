import { defineStore } from "pinia";

export const useCartStore = defineStore({
    id: "cart",
    state: () => ({
        cart: JSON.parse(localStorage.getItem("cart")) ?? Array()
    }),
    getters: {
        numberOfProduct: (state) => state.cart.length
    },
    actions: {
        addProduct(product, quantity) {
            console.log(this.cart);
            const index = this.isExist(product.productId)
            console.log(index);
            if (index != -1) {
                this.cart[index].quantity += quantity
            } else {
                product.quantity = quantity
                this.cart.push(product)
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
        }

    }
})
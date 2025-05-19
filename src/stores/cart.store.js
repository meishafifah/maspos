import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  actions: {
    addToCart(product) {
      const item = this.items.find(i => i.id === product.id);
      if (item) {
        item.qty++;
      } else {
        this.items.push({ ...product, qty: 1 });
      }
    },
    removeFromCart(productId) {
      this.items = this.items.filter(i => i.id !== productId);
    },
    clearCart() {
      this.items = [];
    }
  },
  getters: {
    totalItems: (state) => state.items.reduce((sum, i) => sum + i.qty, 0),
    totalPrice: (state) => state.items.reduce((sum, i) => sum + i.qty * i.price, 0),
  }
});

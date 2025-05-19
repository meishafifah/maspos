<template>
  <div
    class="w-screen lg:h-[75px] p-4 lg:px-8 md:px-20 bg-blue-200 flex flex-col lg:flex-row flex-wrap justify-center lg:justify-between items-center gap-4 lg:gap-8"
  >
    <router-link to="/" class="link font-bold">PT Warung Madura</router-link>
    <div class="flex flex-row justify-between lg:items-center">
      <router-link to="/" class="link font-medium">Dashboard</router-link>
      <router-link to="/category" class="link font-medium"
        >Category</router-link>
      <router-link to="/product" class="link font-medium">Product</router-link>
      <router-link to="/cart" class="link font-medium">
        Keranjang ({{ cartStore.totalItems }})
      </router-link>
      <router-link to="/transaction" class="link font-medium">
        Transaksi
      </router-link>
      <div class="link font-medium" @click="authStore.logout()">Logout</div>
    </div>
  </div>
  <div class="p-5">
    <slot />
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js";
import { useCartStore } from "@/stores/cart.store";

export default {
  name: "ExampleLayout",
  data() {
    return {
      authStore: useAuthStore(),
      cartStore: useCartStore(),
    };
  },
};
</script>

<style>
.link {
  @apply px-2 cursor-pointer hover:text-blue-600;
}
</style>

<template>
  <div class="bg-[#EDF0F2] min-h-screen p-2 md:p-8 relative">
    <div class="bg-white py-4 px-4 md:px-6 rounded-xl md:sticky top-8 z-10">
      <div class="flex flex-col lg:flex-row gap-2 lg:gap-0 justify-between lg:items-center">
        <router-link
          to="/"
          class="font-montserrat font-bold text-blue-600 text-xl"
          >MASPOS</router-link
        >
        <div class="flex flex-col md:flex-row gap-2 md:gap-4">
          <router-link
            to="/category"
            class="link flex flex-row items-center gap-2 font-medium text-sm md:text-base text-white bg-[#2C59E5] rounded-lg p-2 lg:px-6 lg:py-[14.5px]"
          >
            <Plus class="w-4 h-4" />
            <p>Tambah Kategori</p>
          </router-link>
          <router-link
            to="/product"
            class="link flex flex-row items-center gap-2 font-medium text-sm md:text-base text-white bg-[#2C59E5] rounded-lg p-2 lg:px-6 lg:py-[14.5px]"
          >
            <Plus class="w-4 h-4" />
            <p>Tambah Produk</p>
          </router-link>
          <div class="bg-[#E8EDFC] w-fit md:w-auto rounded-lg flex flex-row items-center">
            <router-link
              to="/cart"
              class="link font-medium text-base text-white bg-[#2C59E5] h-full rounded-lg p-4 flex fle-row items-center relative"
            >
              <ShoppingCart class="w-4 h-4" />
              <div
                v-if="cartStore.totalItems > 0"
                class="rounded-full bg-[#3ED669] px-2 py-1 text-xs absolute -top-2 -right-1"
              >
                {{ cartStore.totalItems }}
              </div>
            </router-link>
            <p v-if="cartStore.totalItems > 0" class="text-[#2C59E5] px-2">
              Total Tagihan
              <span class="font-bold">Rp {{ formattedTotalPrice }}</span>
            </p>
          </div>
          <div class="w-[1px] bg-[#D6D6D6]"></div>
          <div class="flex flex-row items-center gap-2">
            <img
              src="https://cdn1-production-images-kly.akamaized.net/L_Vj8GllQTAso9HcmlyrDc-9MEA=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4225267/original/044257600_1668389486-Potret_DPR_Ian_atau_Christian_Yu-IG__11_.jpg"
              alt="Gambar user"
              class="rounded-full w-12 h-12 object-cover"
            />
            <div class="flex flex-col">
              <p class="text-sm font-medium leading-none text-[#0F0F0F]">
                {{ authStore.user.name }}
              </p>
              <div
                class="text-sm font-medium leading-none text-red-600 cursor-pointer"
                @click="authStore.logout()"
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="isHomePage">
        <div class="h-[1px] my-6 bg-[#D6D6D6]"></div>
        <div class="flex flex-col md:flex-row gap-2 md:gap-6">
          <div class="relative">
            <Search
              class="absolute w-4 h-4 top-1/2 left-2 -translate-y-1/2 text-[#2C59E5]"
            />
            <input
              v-model="productStore.productName"
              id="search"
              class="bg-[#EDF0F2] placeholder:text-[#999999] text-[#0F0F0F] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 pl-7 pr-10"
              placeholder="Cari nama produk ..."
            />
          </div>
          <div class="w-full overflow-hidden relative">
            <div
              ref="scrollContainer"
              class="flex gap-2 overflow-x-auto no-scrollbar pr-10 scroll-smooth"
            >
              <div
                @click="selectCategory('')"
                :class="[
                  'whitespace-nowrap text-sm px-4 py-2 rounded-lg cursor-pointer',
                  productStore.selectedCategoryId === ''
                    ? 'bg-[#2C59E5] text-white'
                    : 'bg-[#E8EDFC] text-[#2C59E5]',
                ]"
              >
                Semua
              </div>

              <div
                v-for="cat in categoryStore.categories"
                :key="cat.id"
                @click="selectCategory(cat.id)"
                :class="[
                  'whitespace-nowrap text-sm px-4 py-2 rounded-lg cursor-pointer',
                  productStore.selectedCategoryId === cat.id
                    ? 'bg-[#2C59E5] text-white'
                    : 'bg-[#E8EDFC] text-[#2C59E5]',
                ]"
              >
                {{ cat.name }}
              </div>
            </div>
            <button
              @click="scrollRight"
              class="absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-slate-300 shadow-md rounded-full px-2 py-1 hover:bg-[#E8EDFC] z-10"
            >
              ➡️
            </button>
          </div>
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js";
import { useCartStore } from "@/stores/cart.store";
import { useCategoryStore } from "@/stores/category.store";
import { useProductStore } from "@/stores/product.store";

import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  name: "DashboardLayout",
  data() {
    return {
      authStore: useAuthStore(),
      cartStore: useCartStore(),
      categoryStore: useCategoryStore(),
      productStore: useProductStore(),
    };
  },
  computed: {
    isHomePage() {
      const route = useRoute();
      return route.path === "/";
    },
    formattedTotalPrice() {
      return this.formatRupiah(this.cartStore.totalPrice);
    },
  },
  mounted() {
    this.categoryStore.fetchAll();
  },
  methods: {
    selectCategory(id) {
      this.productStore.selectedCategoryId = id;
      this.productStore.fetchAll();
    },
    scrollRight() {
      this.$refs.scrollContainer.scrollLeft += 150;
    },
    formatRupiah(value) {
      if (!value) return "0";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      })
        .format(value)
        .replace("Rp", "")
        .trim();
    },
  },
};
</script>

<style>
.link {
  @apply cursor-pointer hover:bg-blue-600;
}
</style>

<template>
  <div class="bg-white py-4 px-4 md:px-6 rounded-xl md:sticky top-8 z-10">
    <div
      class="flex flex-col lg:flex-row gap-2 lg:gap-0 justify-between lg:items-center"
    >
      <div
        @click="$router.push('/')"
        class="font-montserrat font-bold text-blue-600 text-xl"
      >
        MASPOS
      </div>
      <div class="flex flex-col md:flex-row gap-4">
        <div
          class="flex flex-col xl:flex-row justify-end items-end gap-2 md:gap-4"
        >
          <div class="flex flex-row gap-2 md:gap-4">
            <ButtonPrimary
              @click="$router.push('/category')"
              icon="Plus"
              class="!p-4"
              >Tambah Kategori</ButtonPrimary
            >
            <ButtonPrimary
              @click="$router.push('/product')"
              icon="Plus"
              class="!p-4"
              >Tambah Produk</ButtonPrimary
            >
          </div>
          <div
            class="bg-[#E8EDFC] w-fit h-fit md:w-auto rounded-lg flex flex-row items-center"
          >
            <ButtonPrimary
              @click="$router.push('/cart')"
              icon="ShoppingCart"
              class="!p-4 lg:!p-5 relative"
            >
              <div
                v-if="cartStore.totalItems > 0"
                class="rounded-full bg-[#3ED669] px-2 py-1 text-xs absolute -top-2 -right-1"
              >
                {{ cartStore.totalItems }}
              </div>
            </ButtonPrimary>
            <p v-if="cartStore.totalItems > 0" class="text-[#2C59E5] px-2">
              Total Tagihan
              <span class="font-bold">Rp {{ formattedTotalPrice }}</span>
            </p>
          </div>
        </div>

        <div class="w-[1px] bg-[#D6D6D6] hidden md:block"></div>
        <div class="flex flex-row items-center gap-2 order-first md:order-last">
          <img
            src="https://cdn1-production-images-kly.akamaized.net/L_Vj8GllQTAso9HcmlyrDc-9MEA=/1200x1200/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4225267/original/044257600_1668389486-Potret_DPR_Ian_atau_Christian_Yu-IG__11_.jpg"
            alt="Gambar user"
            class="rounded-full w-12 h-12 object-cover hidden md:block"
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
            class="w-full bg-[#EDF0F2] placeholder:text-[#999999] text-[#0F0F0F] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 pl-7 pr-10"
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
              v-for="category in categoryStore.categories"
              :key="category.id"
              @click="selectCategory(category.id)"
              :class="[
                'whitespace-nowrap text-sm px-4 py-2 rounded-lg cursor-pointer',
                productStore.selectedCategoryId === category.id
                  ? 'bg-[#2C59E5] text-white'
                  : 'bg-[#E8EDFC] text-[#2C59E5]',
              ]"
            >
              {{ category.name }}
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
</template>

<script>
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth.store.js";
import { useCartStore } from "@/stores/cart.store";
import { useCategoryStore } from "@/stores/category.store";
import { useProductStore } from "@/stores/product.store";

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

<template>
  <div>
    <div class="mt-[30px] font-bold text-lg w-full h-screen flex flex-col justify-center items-center" v-if="cartStore.items.length === 0">
      Keranjang kosong
    </div>
    <div v-else>
    <div
      class="mt-[30px] relative flex flex-col w-full overflow-scroll text-gray-700 bg-white rounded-t-xl bg-clip-border"
    >
      <table class="w-full text-left table-auto min-w-max border">
        <thead>
          <tr>
            <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
              <p
                class="block text-base antialiased font-normal leading-none text-[#0F0F0F]"
              >
                Produk
              </p>
            </th>
            <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
              <p
                class="block text-base antialiased font-normal leading-none text-[#0F0F0F]"
              >
                Harga
              </p>
            </th>
            <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
              <p
                class="block text-base antialiased font-normal leading-none text-[#0F0F0F]"
              >
                Jumlah
              </p>
            </th>
            <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
              <p
                class="block text-base antialiased font-normal leading-none text-[#0F0F0F]"
              >
                Subtotal
              </p>
            </th>
            <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
              <p
                class="block text-base antialiased font-normal leading-none text-[#0F0F0F]"
              ></p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartStore.items" :key="item.id">
            <td class="p-4 border-b border-gray-50">
              <div class="flex flex-row items-center gap-6">
                <img
                  v-if="item.picture_url"
                  :src="item.picture_url"
                  alt="Gambar Produk"
                  class="w-[185px] h-[120px] object-cover rounded-lg"
                />
                <p
                  class="block text-lg antialiased font-medium leading-normal text-[#0F0F0F]"
                >
                  {{ item.name }}
                </p>
              </div>
            </td>
            <td class="p-4 border-b border-gray-50">
              <p
                class="block text-lg antialiased font-medium leading-normal text-[#0F0F0F]"
              >
                Rp {{ item.price }}
              </p>
            </td>
            <td>
            <div class="flex items-center self-center gap-2 text-[#0F0F0F]">
              <button
                class="p-2 flex self-center font-bold bg-[#E8E8E8] rounded"
                @click="decreaseQty(item.id)"
              >
                <Minus class="w-[14px] h-[14px]" />
              </button>
              <span class="w-6 text-center">{{ item.qty }}</span>
              <button
                class="p-2 text-sm font-bold bg-[#E8E8E8] rounded"
                @click="increaseQty(item.id)"
              >
                <Plus class="w-[14px] h-[14px]" />
              </button>
            </div>
            </td>
            <td class="p-4 border-b border-gray-50">
              <p
                class="block text-lg antialiased font-bold leading-normal text-[#0F0F0F]"
              >
                Rp {{ item.price * item.qty }}
              </p>
            </td>

            <td class="p-4 border-b border-gray-50">
              <div class="flex flex-row gap-4">
                <button
                  class="block text-lg antialiased font-medium leading-normal text-red-600"
                  @click="removeFromCart(item.id)"
                >
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex flex-col justify-end items-end bg-white rounded-b-xl shadow-xl px-6 py-4">
      <div class="my-4 font-bold text-lg">Total: Rp {{ cartStore.totalPrice }}</div>
      <div class="flex flex-row gap-6">
        <router-link
          to="/"
          class="px-4 py-2 text-center text-base font-medium rounded-lg text-[#2C59E5] border border-[#2C59E5] hover:bg-[#2C59E5] hover:text-white"
        >
          Kembali
        </router-link>
        <button
          @click="goToTransaction"
        :disabled="cartStore.items.length === 0"
          class="px-4 py-2 text-center text-base font-medium rounded-lg bg-[#2C59E5] text-white hover:bg-blue-700"
        >
          Bayar
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart.store";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const router = useRouter();

function increaseQty(productId) {
  const item = cartStore.items.find((i) => i.id === productId);
  if (item) {
    item.qty += 1;
  }
}

function decreaseQty(productId) {
  const item = cartStore.items.find((i) => i.id === productId);
  if (item && item.qty > 1) {
    item.qty -= 1;
  } else if (item && item.qty === 1) {
    cartStore.removeFromCart(productId);
  }
}

function goToTransaction() {
  router.push("/transaction");
}

function removeFromCart(productId) {
  cartStore.removeFromCart(productId);
}
</script>

<template>
  <div class="transaction-page">
    <div v-if="cartStore.items.length === 0">Keranjang kosong.</div>
    <div
      v-else
      class="h-screen relative flex flex-row items-start justify-center"
    >
      <div class="bg-blue-50/50 w-full md:w-2/3 lg:w-1/2 p-6 rounded-2xl">
        <h1 class="font-semibold text-lg text-center mb-4">
          Invoice PT Warung Madura Gokil
        </h1>
        <ul>
          <li v-for="item in cartStore.items" :key="item.id">
            <p
              class="block font-sans antialiased font-medium leading-normal text-gray-900"
            >
              {{ item.name }}
            </p>
            <div class="flex flex-row justify-end items-center gap-4">
              <p
                class="block font-sans text-sm antialiased font-normal leading-normal text-gray-900"
              >
                {{ item.qty }} x
              </p>
              <p
                class="block font-sans text-sm antialiased font-medium leading-normal text-gray-900"
              >
                {{ formatCurrency(item.price * item.qty) }}
              </p>
            </div>
          </li>
        </ul>
        <div class="mt-6 flex flex-col gap-4 items-end">
          <div v-if="cartStore.items.length > 0" class="total block font-sans text-lg antialiased font-medium leading-normal text-gray-900">
            <strong>Total: {{ formatCurrency(cartStore.totalPrice) }}</strong>
          </div>
          <ButtonPrimary
            class="w-fit"
            @click="checkout"
            :disabled="cartStore.items.length === 0"
          >
            Bayar Sekarang
          </ButtonPrimary>
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

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}

function checkout() {
  // Contoh: proses transaksi
  alert("Pembayaran berhasil! Terima kasih.");

  // Reset keranjang
  cartStore.clearCart();

  // Redirect ke halaman lain (misal home)
  router.push("/product");
}
</script>

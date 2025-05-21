<template>
  <div class="transaction-page">
    <div class="h-screen relative flex flex-row items-center justify-center">
      <div class="bg-white w-full md:w-2/3 lg:w-1/2 p-6 rounded-2xl">
        <div class="flex flex-col justify-center items-center gap-2 mb-4">
          <BadgeCheck class="text-[#23A948] w-[150px] h-[150px]" />
          <p class="text-[#23A948] font-bold">Pembayaran Sukses</p>
        </div>
        <p class="text-center text-sm text-gray-600 mb-4">
          Tanggal: {{ transactionDate }}
        </p>
        <ul v-if="transactionItems.length > 0">
          <li v-for="item in transactionItems" :key="item.id">
            <p class="block font-medium text-gray-900">{{ item.name }}</p>
            <div class="flex justify-end items-center gap-4">
              <p class="text-sm">{{ item.qty }} x</p>
              <p class="text-sm font-medium">
                {{ formatCurrency(item.price * item.qty) }}
              </p>
            </div>
          </li>
        </ul>
        <div
          v-if="transactionItems.length > 0"
          class="mt-6 flex flex-col gap-4 items-end"
        >
          <div class="text-lg font-medium text-gray-900">
            <strong>Total: {{ formatCurrency(totalTransaction) }}</strong>
          </div>
          <router-link
            to="/"
            class="w-full py-[14.5px] flex flex-row gap-2 justify-center items-center text-center text-base font-medium rounded-lg bg-[#2C59E5] text-white hover:bg-blue-700"
          >
            <ArrowLeft class="w-4 h-4" />
            Kembali
          </router-link>
        </div>
        <div v-else class="text-center mt-10 font-semibold text-gray-600">
          Tidak ada data transaksi.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart.store";
import { ref, onMounted } from "vue";

const cartStore = useCartStore();

const transactionItems = ref([]);
const totalTransaction = ref(0);
const transactionDate = ref("");

onMounted(() => {
  transactionItems.value = [...cartStore.items];
  totalTransaction.value = cartStore.totalPrice;
  transactionDate.value = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  cartStore.clearCart();
});

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
}
</script>

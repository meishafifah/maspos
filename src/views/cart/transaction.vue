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
          class="mt-6 flex flex-col gap-4 w-full"
        >
          <div class="text-lg font-medium text-gray-900 text-right">
            <strong>Total: {{ formatCurrency(totalTransaction) }}</strong>
          </div>
          <router-link to="/">
            <ButtonPrimary
              variant="primary"
              icon="ArrowLeft"
              class="w-full flex items-center justify-center"
              >Kembali</ButtonPrimary
            >
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

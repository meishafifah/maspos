<template>
  <div>
    <h1>Keranjang Belanja</h1>
    <div v-if="cartStore.items.length === 0">Keranjang kosong</div>
    <div
      v-else
      class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-xl rounded-xl bg-clip-border"
    >
      <table class="w-full text-left table-auto min-w-max border">
        <thead>
          <tr>
            <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
              <p
                class="block font-sans text-sm antialiased font-semibold leading-none text-blue-gray-900 opacity-70"
              >
                Produk
              </p>
            </th>
            <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
              <p
                class="block font-sans text-sm antialiased font-semibold leading-none text-blue-gray-900 opacity-70"
              >
                Harga
              </p>
            </th>
            <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
              <p
                class="block font-sans text-sm antialiased font-semibold leading-none text-blue-gray-900 opacity-70"
              >
                Jumlah
              </p>
            </th>
            <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
              <p
                class="block font-sans text-sm antialiased font-semibold leading-none text-blue-gray-900 opacity-70"
              >
                Subtotal
              </p>
            </th>
            <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
              <p
                class="block font-sans text-sm antialiased font-semibold leading-none text-blue-gray-900 opacity-70"
              >
                Action
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartStore.items" :key="item.id">
            <td class="p-4 border-b border-gray-50">
              <p
                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
              >
                {{ item.name }}
              </p>
            </td>
            <td class="p-4 border-b border-gray-50">
              <p
                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
              >
                Rp {{ item.price }}
              </p>
            </td>
            <td class="p-4 border-b border-gray-50">
              <p
                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
              >
                {{ item.qty }}
              </p>
            </td>
            <td class="p-4 border-b border-gray-50">
              <p
                class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
              >
                Rp {{ item.price * item.qty }}
              </p>
            </td>

            <td class="p-4 border-b border-gray-50">
              <div class="flex flex-row gap-4">
                <button
                  class="block font-sans text-sm antialiased font-medium leading-normal text-red-600"
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

    <div class="flex flex-col justify-end items-end">
    <div class="my-4 font-bold">Total: Rp {{ cartStore.totalPrice }}</div>
    <ButtonPrimary
      @click="goToTransaction"
      :disabled="cartStore.items.length === 0"
    >
      Checkout
    </ButtonPrimary>
    </div>

  </div>
</template>

<script setup>
import { useCartStore } from "@/stores/cart.store";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const router = useRouter();

function goToTransaction() {
  router.push("/transaction");
}

function removeFromCart(productId) {
  cartStore.removeFromCart(productId);
}
</script>

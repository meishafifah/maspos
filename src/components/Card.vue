<template>
  <div
    class="bg-white border border-[#D6D6D6] rounded-2xl p-2 flex flex-col gap-3"
  >
    <div class="relative">
      <img
        v-if="product.picture_url"
        :src="product.picture_url"
        alt="Gambar Produk"
        class="w-full h-[177px] object-cover rounded-lg"
      />
      <button
        @click="$router.push(`/product/update/${product.id}`)"
        class="absolute right-2 bottom-11 bg-white/50 border border-white/50 bg-opacity-30 p-[6px] rounded-md"
      >
        <Pencil class="w-4 h-4 text-[#23A948]" />
      </button>
      <button
        class="absolute right-2 bottom-2 bg-white/50 border border-white/50 bg-opacity-30 p-[6px] rounded-md"
        @click="onConfirmRemove(product.id)"
      >
        <Trash2 class="w-4 h-4 text-red-600" />
      </button>
    </div>
    <div>
      <p class="mb-1 font-medium text-[#0F0F0F] text-base">
        {{ product.name }}
      </p>
      <p class="font-bold text-[#23A948] text-base">Rp {{ product.price }}</p>
    </div>
    <ButtonPrimary
      class="flex items-center justify-center"
      icon="Plus"
      @click="onAddToCart(product)"
      >Keranjang</ButtonPrimary
    >
  </div>
</template>

<script setup>
import { Pencil, Trash2 } from "lucide-vue-next";
import ButtonPrimary from "@/components/Button/Primary.vue";

const props = defineProps({
  product: Object,
  onAddToCart: Function,
  onConfirmRemove: Function,
});
</script>

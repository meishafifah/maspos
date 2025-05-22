<template>
  <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-8">
    <div
      v-for="p in productStore.filteredList"
      :key="p.id"
      class="bg-white border border-[#D6D6D6] rounded-2xl p-2 flex flex-col gap-3"
    >
      <div class="relative">
        <img
          v-if="p.picture_url"
          :src="p.picture_url"
          alt="Gambar Produk"
          class="w-full h-[177px] object-cover rounded-lg"
        />
        <router-link
          :to="`/product/update/${p.id}`"
          class="absolute right-2 bottom-11 bg-white/50 border border-white/50 bg-opacity-30 p-[6px] rounded-md"
        >
          <Pencil class="w-4 h-4 text-[#23A948]" />
        </router-link>
        <button
          class="absolute right-2 bottom-2 bg-white/50 border border-white/50 bg-opacity-30 p-[6px] rounded-md"
          @click="confirmRemove(p.id)"
        >
          <Trash2 class="w-4 h-4 text-red-600" />
        </button>
      </div>
      <div>
        <p class="mb-1 font-medium text-[#0F0F0F] text-base">{{ p.name }}</p>
        <p class="font-bold text-[#23A948] text-base">Rp {{ p.price }}</p>
      </div>
      <button
        @click="addToCart(p)"
        class="flex flex-row items-center justify-center gap-2 font-medium text-base text-white bg-[#2C59E5] rounded-lg py-[10px]"
      >
        <Plus class="w-4 h-4" />
        <p>Keranjang</p>
      </button>
    </div>
  </div>

  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div>
      <div class="bg-white rounded-t-2xl p-6 w-[250px] md:w-[320px]">
        <div class="mb-4 w-fit rounded-full bg-[#FFA8A8] p-2">
          <div class="rounded-full bg-[#FF2928] p-2">
            <Trash2 class="w-6 h-6 text-white" />
          </div>
        </div>
        <p class="font-bold mb-2">Hapus Produk</p>
        <p>Apakah Anda yakin ingin menghapus produk ini ?</p>
      </div>
      <div class="grid grid-cols-2 gap-2 bg-white border-t border-[#D6D6D6] rounded-b-2xl p-6 w-[250px] md:w-[320px]">
        <button
          @click="showModal = false"
          class="px-4 py-2 text-base font-medium rounded-lg text-[#FF2928] border border-[#FF2928] hover:bg-[#FF2928] hover:text-white"
        >
          Batal
        </button>
        <button
          @click="remove(selectedProductId)"
          class="px-4 py-2 text-base font-medium rounded-lg bg-[#FF2928] text-white hover:bg-red-700"
        >
          Hapus
        </button>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/product.store";
import { useCategoryStore } from "@/stores/category.store";
import { useCartStore } from "@/stores/cart.store";

const cartStore = useCartStore();

function addToCart(product) {
  cartStore.addToCart(product);
}

const productStore = useProductStore();
const categoryStore = useCategoryStore();

onMounted(async () => {
  await productStore.fetchAll();
  await categoryStore.fetchAll();
  categories.value = categoryStore.list;
});

function getCategoryName(categoryId) {
  const category = categoryStore.categories.find((c) => c.id === categoryId);
  return category ? category.name : "-";
}

const showModal = ref(false);
const selectedProductId = ref(null);

function confirmRemove(id) {
  selectedProductId.value = id;
  showModal.value = true;
}

function remove(id) {
  if (selectedProductId.value) {
    productStore.delete(selectedProductId.value);
    selectedProductId.value = null;
    showModal.value = false;
  }
}
</script>

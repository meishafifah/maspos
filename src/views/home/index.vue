<template>
  <div
    class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-8"
  >
    <Card
      v-for="p in productStore.filteredList"
      :key="p.id"
      :product="p"
      :onAddToCart="addToCart"
      :onConfirmRemove="confirmRemove"
    />
  </div>

  <div
    v-if="showModal"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <DeleteCard
      :closeModal="() => (showModal = false)"
      :remove="() => remove(selectedProductId)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/product.store";
import { useCategoryStore } from "@/stores/category.store";
import { useCartStore } from "@/stores/cart.store";

const cartStore = useCartStore();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const showModal = ref(false);
const selectedProductId = ref(null);
const categories = ref([]);

function addToCart(product) {
  cartStore.addToCart(product);
}

onMounted(async () => {
  await productStore.fetchAll();
  await categoryStore.fetchAll();
  categories.value = categoryStore.list;
});

function getCategoryName(categoryId) {
  const category = categoryStore.categories.find((c) => c.id === categoryId);
  return category ? category.name : "-";
}

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

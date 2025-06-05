<template>
  <FormCard
    title="Edit Kategori"
    cancelLink="/category"
    text="Update"
    @submit="updateCategory"
  >
    <label class="text-sm font-bold mb-1">Kategori</label>
    <Input v-model="form.name" placeholder="Nama Kategori" required />
  </FormCard>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCategoryStore } from "@/stores/category.store";

const router = useRouter();
const route = useRoute();
const categoryStore = useCategoryStore();

const form = ref({ name: "" });
const id = route.params.id;

onMounted(async () => {
  await categoryStore.fetchById(id);
  form.value.name = categoryStore.category?.name;
});

const updateCategory = async () => {
  await categoryStore.update(id, form.value);
  router.push("/category");
};
</script>

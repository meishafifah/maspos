<template>
<div class="p-2 mt-8 md:mt-10 w-full relative flex flex-row items-center justify-center">
    <form @submit.prevent="updateCategory">
      <div class="bg-[#F5F5F5] rounded-t-2xl p-4 md:p-6 w-full md:w-[320px]">
        <p class="text-base md:text-xl font-medium">Edit Kategori</p>
      </div>
      <div class="bg-white p-6 w-full md:w-[320px]">
        <h1 class="text-sm font-bold mb-1">Kategori</h1>
        <input
          v-model="form.name"
          placeholder="Nama Kategori"
          required
          class="w-full bg-[#F5F5F5] placeholder:text-[#999999] text-sm md:text-base font-medium border border-[#5C5C5C] rounded-lg p-[14px] transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        />
      </div>
      <div
        class="grid grid-cols-2 gap-2 bg-white border-t border-[#D6D6D6] rounded-b-2xl p-6 w-full md:w-[320px]"
      >
        <router-link
          to="/category"
          class="px-4 py-2 text-center text-sm md:text-base font-medium rounded-lg text-[#2C59E5] border border-[#2C59E5] hover:bg-[#2C59E5] hover:text-white"
        >
          Batal
        </router-link>
        <button
          type="submit"
          class="px-4 py-2 text-center text-sm md:text-base font-medium rounded-lg bg-[#2C59E5] text-white hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </form>
  </div>
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

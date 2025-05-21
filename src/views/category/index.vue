<template>
  <div class="mt-10 w-full relative flex flex-row items-center justify-center">
    <form @submit.prevent="addCategory">
      <div class="bg-[#F5F5F5] rounded-t-2xl p-6 w-[320px]">
        <p class="text-xl font-medium">Tambah Kategori</p>
      </div>
      <div class="bg-white p-6 w-[320px]">
        <h1 class="text-sm font-bold mb-1">Kategori</h1>
        <input
          v-model="form.name"
          placeholder="Nama Kategori"
          required
          class="w-full bg-[#F5F5F5] placeholder:text-[#999999] text-base font-medium border border-[#5C5C5C] rounded-lg p-[14px] transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
        />
      </div>
      <div
        class="grid grid-cols-2 gap-2 bg-white border-t border-[#D6D6D6] rounded-b-2xl p-6 w-[320px]"
      >
        <router-link
          to="/"
          class="px-4 py-2 text-center text-base font-medium rounded-lg text-[#2C59E5] border border-[#2C59E5] hover:bg-[#2C59E5] hover:text-white"
        >
          Batal
        </router-link>
        <button
          type="submit"
          class="px-4 py-2 text-center text-base font-medium rounded-lg bg-[#2C59E5] text-white hover:bg-blue-700"
        >
          Tambah
        </button>
      </div>
    </form>
  </div>

  <div class="flex flex-row justify-between my-4">
    <h1 class="font-semibold text-lg text-[#0F0F0F]">Daftar Kategori</h1>
  </div>

  <div
    class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-xl rounded-xl bg-clip-border"
  >
    <table class="w-full text-left table-auto min-w-max border">
      <thead>
        <tr>
          <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
            <p
              class="block text-[#0F0F0F] text-base antialiased font-bold leading-none opacity-70"
            >
              Nama kategori
            </p>
          </th>
          <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
            <p
              class="block text-[#0F0F0F] text-base antialiased font-bold leading-none opacity-70"
            >
              Action
            </p>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categoryStore.categories" :key="cat.id">
          <td class="p-4 border-b border-gray-50">
            <p
              class="block text-sm antialiased font-normal leading-normal"
            >
              {{ cat.name }}
            </p>
          </td>
          <td class="p-4 border-b border-gray-50">
            <div class="flex flex-row gap-4">
              <button
                class="block text-sm antialiased font-medium leading-normal"
                @click="goToEdit(cat.id)"
              >
                Edit
              </button>
              <button
                class="block text-sm antialiased font-medium leading-normal text-[#FF2928]"
                @click="deleteCategory(cat.id)"
              >
                Hapus
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "@/stores/category.store.js";
import { useRouter } from "vue-router";

const router = useRouter();
const categoryStore = useCategoryStore();

const form = ref({ name: "" });

onMounted(() => {
  categoryStore.fetchAll();
});

const addCategory = async () => {
  if (form.value.name.trim()) {
    await categoryStore.create(form.value);
    form.value.name = "";
    categoryStore.fetchAll();
  }
};

const deleteCategory = async (id) => {
  await categoryStore.remove(id);
  categoryStore.fetchAll();
};

const goToEdit = (id) => {
  router.push(`/category/update/${id}`);
};
</script>

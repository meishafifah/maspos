<template>
  <div>
    <div class="w-full relative flex flex-row items-center justify-center">
      <div
        class="bg-blue-50/50 w-full md:w-fit p-6 rounded-2xl flex flex-row justify-center"
      >
        <form @submit.prevent="addCategory" class="flex flex-col gap-4">
          <h1 class="font-sans font-semibold text-lg text-gray-900">
            Tambah Kategori
          </h1>
          <div class="w-full max-w-sm min-w-[200px]">
            <input
              v-model="form.name"
              placeholder="Nama Kategori"
              required
              class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
          </div>
          <ButtonPrimary :type="'submit'" class="w-full"> Tambah </ButtonPrimary>
        </form>
      </div>
    </div>
  </div>

  <div class="flex flex-row justify-between my-4">
    <h1 class="font-sans font-semibold text-lg text-gray-900">Kategori</h1>
    
  </div>

  <div
    class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-xl rounded-xl bg-clip-border"
  >
    <table class="w-full text-left table-auto min-w-max border">
      <thead>
        <tr>
          <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
            <p
              class="block font-sans text-sm antialiased font-semibold leading-none text-blue-gray-900 opacity-70"
            >
              Nama kategori
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
        <tr v-for="cat in categoryStore.categories" :key="cat.id">
          <td class="p-4 border-b border-gray-50">
            <p
              class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
            >
             {{ cat.name }}
            </p>
          </td>
          <td class="p-4 border-b border-gray-50">
            <div class="flex flex-row gap-4">
              <button
                class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                 @click="goToEdit(cat.id)"
              >
                Edit
              </button>
              <button
                class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
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
  <div>
    <h2>Daftar Kategori</h2>

    <form @submit.prevent="addCategory">
      <input v-model="form.name" placeholder="Nama kategori" />
      <button type="submit">Tambah</button>
    </form>

    <ul>
      <li v-for="cat in categoryStore.categories" :key="cat.id">
        {{ cat.name }}
        <button @click="goToEdit(cat.id)">Edit</button>
        <button @click="deleteCategory(cat.id)">Hapus</button>
      </li>
    </ul>
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

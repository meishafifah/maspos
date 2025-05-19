<template>
  <div>
    <div class="w-full lg:h-screen relative flex flex-row items-center justify-start md:justify-center">
      <div
        class="bg-blue-50/50 w-full md:w-fit p-6 rounded-2xl flex flex-row justify-center"
      >
        <div class="flex flex-col gap-4">
          <h1 class="font-sans font-semibold text-lg text-gray-900">
            Tambah Kategori
          </h1>
          <form @submit.prevent="updateCategory" class="flex flex-col gap-4">
            <div class="w-full max-w-sm min-w-[200px]">
              <input
                v-model="form.name"
                placeholder="Nama Produk"
                required
                class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
            </div>
            <ButtonPrimary :type="'submit'" class="w-full">
              Edit
            </ButtonPrimary>
          </form>
        </div>
      </div>
    </div>
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

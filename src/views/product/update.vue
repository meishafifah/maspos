<template>
  <div>
    <div
      class="w-full lg:h-screen relative flex flex-row items-center justify-start md:justify-center"
    >
      <div
        class="bg-blue-50/50 w-full md:w-fit p-6 rounded-2xl flex flex-row justify-center"
      >
        <form @submit.prevent="submit" class="flex flex-col gap-4">
          <h1 class="font-sans font-semibold text-lg text-gray-900">
            Edit Produk
          </h1>
          <div class="w-full max-w-sm min-w-[200px]">
            <input
              v-model="form.name"
              placeholder="Nama Produk"
              required
              class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
          </div>
          <div class="w-full max-w-sm min-w-[200px]">
            <input
              v-model="form.price"
              type="number"
              placeholder="Harga"
              required
              class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
          </div>
          <div class="w-full max-w-sm min-w-[200px]">
            <div class="relative">
              <select
                v-model="form.category_id"
                required
                class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              >
                <option disabled value="">-- Pilih Kategori --</option>
                <option v-for="c in categoryStore.categories" :value="c.id" :key="c.id">
                  {{ c.name }}
                </option>
              </select>
            </div>
          </div>
          <div v-if="form.picture_url">
  <img
    v-if="form.picture_url"
  :src="form.picture_url"
  alt="Gambar Produk"
    class="w-32 h-auto object-contain mt-2"
  />
</div>
          <input type="file" @change="onFileChange" />
          <ButtonPrimary :type="'submit'" class="w-full">
            Update
          </ButtonPrimary>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/product.store";
import { useCategoryStore } from "@/stores/category.store";
import { useRoute, useRouter } from "vue-router";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const route = useRoute();
const router = useRouter();

const form = ref({
  name: "",
  price: "",
  category_id: "",
  picture: null,
});
const categories = ref([]);

onMounted(async () => {
  await productStore.getById(route.params.id);
  form.value = { ...productStore.product };
  await categoryStore.fetchAll();
  categories.value = categoryStore.list;
});

function getCategoryName(categoryId) {
  const category = categoryStore.categories.find((c) => c.id === categoryId);
  return category ? category.name : "-";
}

function onFileChange(e) {
  form.value.picture = e.target.files[0];
}

async function submit() {
  const formData = new FormData();
  formData.append("name", form.value.name);
  formData.append("price", form.value.price);
  formData.append("category_id", form.value.category_id);
  if (form.value.picture) formData.append("picture", form.value.picture);

  const success = await productStore.update(route.params.id, formData);
  if (success) router.push("/product");
}
</script>

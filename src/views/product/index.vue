<template>
  <div>
    <div class="w-full relative flex flex-row items-center justify-center">
      <div
        class="bg-blue-50/50 w-full md:w-fit p-6 rounded-2xl flex flex-row justify-center"
      >
        <form @submit.prevent="submit" class="flex flex-col gap-4">
          <h1 class="font-sans font-semibold text-lg text-gray-900">
            Tambah Produk
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
                <option
                  v-for="c in categoryStore.categories"
                  :value="c.id"
                  :key="c.id"
                >
                  {{ c.name }}
                </option>
              </select>
            </div>
          </div>
          <input type="file" @change="onFileChange" required />
          <ButtonPrimary :type="'submit'" class="w-fit"> Tambah </ButtonPrimary>
        </form>
      </div>
    </div>
  </div>

  <div class="flex flex-row justify-between my-4">
    <h1 class="font-sans font-semibold text-lg text-gray-900">Produk</h1>
    <div class="w-full max-w-sm min-w-[200px]">
      <div class="relative">
        <select
          v-model="productStore.selectedCategoryId"
          class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
        >
          <option value="">Semua Kategori</option>
          <option
            v-for="c in categoryStore.categories"
            :value="c.id"
            :key="c.id"
          >
            {{ c.name }}
          </option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.2"
          stroke="currentColor"
          class="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
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
              Nama Produk
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
              Kategori
            </p>
          </th>
          <th class="p-4 border-b border-gray-100 bg-blue-gray-50">
            <p
              class="block font-sans text-sm antialiased font-semibold leading-none text-blue-gray-900 opacity-70"
            >
              Gambar
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
        <tr v-for="p in productStore.filteredList" :key="p.id">
          <td class="p-4 border-b border-gray-50">
            <p
              class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
            >
              {{ p.name }}
            </p>
          </td>
          <td class="p-4 border-b border-gray-50">
            <p
              class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
            >
              Rp {{ p.price }}
            </p>
          </td>
          <td class="p-4 border-b border-gray-50">
            <p
              class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900"
            >
              {{ getCategoryName(p.category_id) }}
            </p>
          </td>
          <td class="p-4 border-b border-gray-50">
            <img
              v-if="p.picture_url"
              :src="p.picture_url"
              alt="Gambar Produk"
              style="
                width: 100px;
                height: auto;
                object-fit: contain;
                margin-right: 10px;
              "
            />
          </td>
          <td class="p-4 border-b border-gray-50">
            <div class="flex flex-row gap-4">
              <button
                class="block font-sans text-sm antialiased font-medium leading-normal text-green-600"
                @click="addToCart(p)"
              >
                + Keranjang
              </button>
              <router-link
                :to="`/product/update/${p.id}`"
                class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
              >
                Edit
              </router-link>
              <button
                class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900"
                @click="remove(p.id)"
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
import { useProductStore } from "@/stores/product.store";
import { useCategoryStore } from "@/stores/category.store";
import { useCartStore } from "@/stores/cart.store";

const cartStore = useCartStore();

function addToCart(product) {
  cartStore.addToCart(product);
}

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const form = ref({
  name: "",
  price: "",
  category_id: "",
  picture: null,
});

const categories = ref([]);

onMounted(async () => {
  await productStore.fetchAll();
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
  formData.append("picture", form.value.picture);

  const success = await productStore.create(formData);
  if (success) {
    await productStore.fetchAll();
    form.value = { name: "", price: "", category_id: "", picture: null };
  }
}

function remove(id) {
  if (confirm("Yakin hapus produk?")) {
    productStore.delete(id);
  }
}

</script>

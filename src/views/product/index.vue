<template>
  <div>
    <div
      class="p-2 w-full h-screen relative flex flex-row items-center justify-center"
    >
      <form @submit.prevent="submit">
        <div class="bg-[#F5F5F5] rounded-t-2xl p-6 w-full md:w-[400px]">
          <p class="text-xl font-medium">Tambah Produk</p>
        </div>
        <div class="bg-white p-6 w-full md:w-[400px] flex flex-col gap-4">
          <div
            class="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-[#F5F5F5] hover:border-[#2C59E5]"
            @dragover.prevent
            @drop.prevent="onDropFile"
            @click="triggerFileInput"
          >
            <input
              ref="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              class="hidden"
              @change="onFileChange"
            />
            <div class="flex flex-col justify-center items-center gap-2 text-center text-xs text-[#0F0F0F]">
              <div class="rounded-full border border-[#2C59E5] bg-[#AABCF4] p-[6px] w-fit">
                <Plus class="w-3 h-3 text-white" />
              </div>
              <p>Seret & Letakkan atau <span class="text-[#2C59E5]">Pilih File</span> untuk diunggah</p>
              <p class="text-[10px] text-[#5C5C5C]"> Format yang didukung: Jpg, Png</p>
              <p v-if="form.picture" class="mt-2 text-green-600 font-medium">
                {{ form.picture.name }}
              </p>
            </div>
          </div>

          <div>
            <h1 class="text-sm font-bold mb-1">Produk</h1>
            <input
              v-model="form.name"
              placeholder="Nama Produk"
              required
              class="w-full bg-[#F5F5F5] placeholder:text-[#999999] text-base font-medium border border-[#5C5C5C] rounded-lg p-[14px] transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
          </div>
          <div>
            <h1 class="text-sm font-bold mb-1">Harga</h1>
            <input
              v-model="form.price"
              type="number"
              placeholder="Harga"
              required
              class="w-full bg-[#F5F5F5] placeholder:text-[#999999] text-base font-medium border border-[#5C5C5C] rounded-lg p-[14px] transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
          </div>
          <div>
            <h1 class="text-sm font-bold mb-1">Pilih Kategori</h1>
            <div class="relative">
              <select
                v-model="form.category_id"
                required
                class="appearance-none w-full bg-[#F5F5F5] placeholder:text-[#999999] text-base font-medium border border-[#5C5C5C] rounded-lg p-[14px] pr-10 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
              >
                <option disabled value="">Pilih Kategori</option>
                <option
                  v-for="c in categoryStore.categories"
                  :value="c.id"
                  :key="c.id"
                >
                  {{ c.name }}
                </option>
              </select>
              <svg
                class="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-[#2C59E5] pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div
          class="grid grid-cols-2 gap-2 bg-white border-t border-[#D6D6D6] rounded-b-2xl p-6 w-full md:w-[400px]"
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/product.store";
import { useCategoryStore } from "@/stores/category.store";
import { useCartStore } from "@/stores/cart.store";
import { useRouter } from "vue-router";

const router = useRouter();

const cartStore = useCartStore();

function addToCart(product) {
  cartStore.addToCart(product);
}

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const fileInput = ref(null);

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
  const file = e.target.files[0];
  if (!file) return;

  const isValid = ["image/jpeg", "image/png"].includes(file.type);
  if (!isValid) {
    alert("Format file harus JPG atau PNG");
    e.target.value = "";
    return;
  }

  form.value.picture = file;
}

function onDropFile(e) {
  const file = e.dataTransfer.files[0];
  if (!file) return;

  const isValid = ["image/jpeg", "image/png"].includes(file.type);
  if (!isValid) {
    alert("Format file harus JPG atau PNG");
    return;
  }

  form.value.picture = file;
}

function triggerFileInput() {
  fileInput.value.click();
}

async function submit() {
  if (!form.value.picture) {
    alert("Mohon unggah gambar produk terlebih dahulu.");
    return;
  }

  const formData = new FormData();
  formData.append("name", form.value.name);
  formData.append("price", form.value.price);
  formData.append("category_id", form.value.category_id);
  formData.append("picture", form.value.picture);

  const success = await productStore.create(formData);
  if (success) {
    await productStore.fetchAll();
    form.value = { name: "", price: "", category_id: "", picture: null };
    
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }
}

function remove(id) {
  if (confirm("Yakin hapus produk?")) {
    productStore.delete(id);
  }
}
</script>

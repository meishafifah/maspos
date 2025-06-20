<template>
  <FormCard title="Tambah Produk" cancelLink="/" @submit="submit">
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
      <div
        class="flex flex-col justify-center items-center gap-2 text-center text-xs text-[#0F0F0F]"
      >
        <div
          class="rounded-full border border-[#2C59E5] bg-[#AABCF4] p-[6px] w-fit"
        >
          <Plus class="w-3 h-3 text-white" />
        </div>
        <p>
          Seret & Letakkan atau
          <span class="text-[#2C59E5]">Pilih File</span> untuk diunggah
        </p>
        <p class="text-[10px] text-[#5C5C5C]">Format yang didukung: Jpg, Png</p>
        <p v-if="form.picture" class="mt-2 text-green-600 font-medium">
          {{ form.picture.name }}
        </p>
      </div>
    </div>

    <div>
      <label class="text-sm font-bold mb-1">Produk</label>
      <Input
        type="text"
        v-model="form.name"
        placeholder="Nama Produk"
        required
      />
    </div>
    <div>
      <label class="text-sm font-bold mb-1">Harga</label>
      <Input type="number" v-model="form.price" placeholder="Harga" required />
    </div>
    <div>
      <label class="text-sm font-bold mb-1">Pilih Kategori</label>
      <Select
        v-model="form.category_id"
        textOptionDisable="Pilih Kategori"
        item="category"
        :forValue="categoryStore.categories"
      />
    </div>
  </FormCard>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/product.store";
import { useCategoryStore } from "@/stores/category.store";
import { useCartStore } from "@/stores/cart.store";
import { useRouter } from "vue-router";

const router = useRouter();
const cartStore = useCartStore();
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const fileInput = ref(null);
const categories = ref([]);

const form = ref({
  name: "",
  price: "",
  category_id: "",
  picture: null,
});

function addToCart(product) {
  cartStore.addToCart(product);
}

onMounted(async () => {
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
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }
}
</script>

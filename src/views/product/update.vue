<template>
  <div>
    <FormCard title="Edit Produk" @submit="submit" text="Update">
      <div
        class="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-[#F5F5F5] hover:border-[#2C59E5] overflow-hidden"
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
        <div v-if="form.picture_url">
          <img
            v-if="form.picture_url"
            :src="form.picture_url"
            alt="Gambar Produk"
            class="w-full h-full object-cover mt-2"
          />
        </div>
        <div
          v-else
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
          <p class="text-[10px] text-[#5C5C5C]">
            Format yang didukung: Jpg, Png
          </p>
          <p v-if="form.picture" class="mt-2 text-green-600 font-medium">
            {{ form.picture.name }}
          </p>
        </div>
      </div>

      <div>
        <label class="text-sm font-bold mb-1">Produk</label>
        <Input
          v-model="form.name"
          type="text"
          placeholder="Nama Produk"
          required
        />
      </div>
      <div>
        <label class="text-sm font-bold mb-1">Harga</label>
        <Input
          v-model="form.price"
          type="number"
          placeholder="Harga"
          required
        />
      </div>
      <div>
        <label class="text-sm font-bold mb-1">Pilih Kategori</label>
        <div class="relative">
          <select
            v-model="form.category_id"
            required
            class="appearance-none w-full bg-[#F5F5F5] placeholder:text-[#999999] text-base font-medium border border-[#5C5C5C] rounded-lg p-[14px] pr-10 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
          >
            <option disabled value="">Pilih Kategori</option>
            <option
              v-for="category in categoryStore.categories"
              :value="category.id"
              :key="category.id"
            >
              {{ category.name }}
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
    </FormCard>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/product.store";
import { useCategoryStore } from "@/stores/category.store";
import { useRoute, useRouter } from "vue-router";
import FormCard from "@/components/FormCard.vue";
import Input from "@/components/Input.vue";

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const categories = ref([]);
const route = useRoute();
const router = useRouter();

const form = ref({
  name: "",
  price: "",
  category_id: "",
  picture: null,
});

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

  if (success) {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }
}
</script>

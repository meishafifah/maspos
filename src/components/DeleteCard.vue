<template>
  <div>
    <div class="bg-white rounded-t-2xl p-6 w-[250px] md:w-[320px]">
      <div class="mb-4 w-fit rounded-full bg-[#FFA8A8] p-2">
        <div class="rounded-full bg-[#FF2928] p-2">
          <Trash2 class="w-6 h-6 text-white" />
        </div>
      </div>
      <p class="font-bold mb-2">Hapus Produk</p>
      <p>Apakah Anda yakin ingin menghapus produk ini ?</p>
    </div>
    <div
      class="grid grid-cols-2 gap-2 bg-white border-t border-[#D6D6D6] rounded-b-2xl p-6 w-[250px] md:w-[320px]"
    >
      <button
        @click="closeModal"
        class="px-4 py-2 text-base font-medium rounded-lg text-[#FF2928] border border-[#FF2928] hover:bg-[#FF2928] hover:text-white"
      >
        Batal
      </button>
      <ButtonDanger
        @click="remove"
        class="px-4 py-2 text-base font-medium rounded-lg bg-[#FF2928] text-white hover:bg-red-700"
      >
        Hapus
      </ButtonDanger>
    </div>
  </div>
</template>

<script setup>
import { Trash2 } from "lucide-vue-next";
import ButtonDanger from "@/components/Button/Danger.vue";

const props = defineProps({
  closeModal: {
    type: Function,
  },
  remove: {
    type: Function,
  },
});
</script>

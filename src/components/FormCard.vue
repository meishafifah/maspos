<template>
  <div
    class="p-2 mt-8 md:mt-10 w-full relative flex flex-row items-center justify-center"
  >
    <form @submit.prevent="onSubmit">
      <div class="bg-[#F5F5F5] rounded-t-2xl p-6 w-full md:w-[400px]">
        <p class="text-base md:text-xl font-medium">{{ title }}</p>
      </div>
      <div class="bg-white p-6 w-full md:w-[400px] flex flex-col gap-4">
        <slot />
      </div>
      <div
        class="grid grid-cols-2 gap-2 bg-white border-t border-[#D6D6D6] rounded-b-2xl p-6 w-full md:w-[400px]"
      >
        <router-link :to="cancelLink">
          <ButtonPrimary class="w-full flex justify-center"
            >Batal</ButtonPrimary
          >
        </router-link>
        <ButtonPrimary
          type="submit"
          variant="primary"
          class="w-full flex justify-center"
          >{{ text }}</ButtonPrimary
        >
      </div>
    </form>
  </div>
</template>

<script setup>
import ButtonPrimary from "@/components/Button/Primary.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
    default: "Tambah",
  },
  cancelLink: {
    type: String,
    default: "/",
  },
  onSubmit: {
    type: Function,
    required: true,
  },
});
</script>

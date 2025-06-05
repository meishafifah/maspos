<template>
    <button
    class="flex flex-row items-center gap-2 px-4 py-2 text-center text-sm md:text-base font-medium rounded-lg text-[#2C59E5] border border-[#2C59E5] hover:bg-[#2C59E5] hover:text-white"
    :type="type"
  >
    <component v-if="icon" :is="icon" class="w-4 h-4" />
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  icon: {
    type: String,
    required: false,
    default: "",
  },
});
</script>
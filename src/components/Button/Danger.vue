<template>
  <button
    class="px-4 py-2 text-base font-medium rounded-lg bg-[#FF2928] text-white hover:bg-red-700"
    :type="type"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
});
</script>

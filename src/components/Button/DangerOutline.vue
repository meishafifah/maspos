<template>
  <button
    class="px-4 py-2 text-base font-medium rounded-lg text-[#FF2928] border border-[#FF2928] hover:bg-[#FF2928] hover:text-white"
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

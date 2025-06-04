<template>
  <input
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    class="w-full bg-[#F5F5F5] placeholder:text-[#999999] text-base font-medium border border-[#5C5C5C] rounded-lg p-[14px] transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
  />
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

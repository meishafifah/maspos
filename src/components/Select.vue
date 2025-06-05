<template>
    <div class="relative">
        <select
          v-model="modelValue"
          required
          class="appearance-none w-full bg-[#F5F5F5] placeholder:text-[#999999] text-base font-medium border border-[#5C5C5C] rounded-lg p-[14px] pr-10 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm"
        >
          <option disabled value="">{{ textOptionDisable }}</option>
          <option
            v-for="item in forValue"
            :value="item.id"
            :key="item.id"
          >
            {{ item.name }}
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
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  textOptionDisable: {
    type: String,
    default: "",
  },
  modelValue: {
    type: String,
    default: "",
  },
  forValue: {
    type: Object,
    default: "",
  },
  item: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
<template>
  <div class="bg-[#EDF0F2] min-h-screen p-2 md:p-8 relative">
    <Navbar />
    <slot />
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
</script>

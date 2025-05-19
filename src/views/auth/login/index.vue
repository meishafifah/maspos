<template>
  <div class="bg-none lg:bg-gray-100 h-screen relative flex flex-row items-center justify-center">
    <div class="bg-white w-full md:w-2/3 lg:w-1/2 p-6 rounded-2xl">
      <h1 class="font-semibold text-lg text-center mb-4">Login PT Warung Madura Gokil</h1>
      <form action="" @submit.prevent="login">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Email address</label
          >
          <input
            v-model="formData.email"
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="masukan email cak"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900"
            >Password</label
          >
          <input
            v-model="formData.password"
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="•••••••••"
            required
          />
        </div>
        <ButtonPrimary :type="'submit'"> Login </ButtonPrimary>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js";

export default {
  data() {
    return {
      authStore: useAuthStore(),
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.authStore.login(this.formData);
    },
  },
};
</script>

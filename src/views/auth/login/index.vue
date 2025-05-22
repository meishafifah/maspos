<template>
  <div class="flex flex-col lg:flex-row gap-6 bg-[#EDF0F2] p-2 md:p-8 min-h-screen">
    <div class="hidden lg:block w-3/5">
      <div
        class="relative w-full h-full bg-[radial-gradient(at_25%_25%,#4288F2,#113E82)] rounded-[40px] overflow-hidden flex items-end"
      >
      <div class="h-3/5 w-full bg-white absolute rounded-2xl top-20 -left-16">
      <div
          to="/"
          class="font-montserrat font-bold text-blue-600 text-5xl pl-32 h-full flex items-center"
          >MASPOS.</div></div>
        <h4 class="font-medium text-[28px] text-[#F5F5F5] px-10 pb-14 xl:pb-20">
          Desain yang user-friendly membuat navigasi cepat dan mudah, bahkan
          bagi pemula.
        </h4>
      </div>
    </div>
    <div class="w-full lg:w-2/5 p-4 md:p-6">
      <h2 class="font-bold text-end text-2xl lg:text-[40px] text-[#1963D2] mb-6">MASPOS</h2>
      <div class="flex flex-col h-full justify-center text-[#0F0F0F]">
        <h3 class="font-medium text-xl lg:text-[32px]">Selamat Datang di MASPOS</h3>
        <p class="mt-2 text-base lg:text-xl">
          Masuk untuk mengelola bisnis Anda dengan mudah dan efisien. MASPOS
          menghadirkan solusi point-of-sale terbaik untuk kemudahan operasional
          sehari-hari.
        </p>
        <div class="mt-6">
          <form action="" @submit.prevent="login">
            <div class="mb-6">
              <label for="email" class="block mb-2 text-xs font-bold"
                >Username</label
              >
              <input
                v-model="formData.email"
                type="email"
                id="email"
                class="bg-[#F5F5F5] border border-[#5C5C5C] placeholder:text-[#999999] text-[#0F0F0F] font-medium text-sm lg:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-xs font-bold"
                >Password</label
              >
              <div class="relative w-full">
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  class="bg-[#F5F5F5] border border-[#5C5C5C] placeholder:text-[#999999] text-[#0F0F0F] font-medium text-sm lg:text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? "🙈" : "👁️" }}
                </button>
              </div>
                <p v-if="errorMessage" class="text-[10px] font-semibold text-red-600 mt-2">
                  {{ errorMessage }}
                </p>
            </div>
            <ButtonPrimary
              class="mt-8 !bg-[#2C59E5] font-medium text-[#F5F5F5] textsm lg:text-base py-[14.5px] w-full rounded-lg"
              :type="'submit'"
              >Masuk</ButtonPrimary>
          </form>
        </div>
      </div>
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
      showPassword: false,
      errorMessage: "",
    };
  },
  methods: {
  async login() {
    this.errorMessage = "";

    try {
      await this.authStore.login(this.formData);
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
},
};
</script>

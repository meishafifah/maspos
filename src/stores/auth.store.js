import { defineStore } from 'pinia';
import { getActivePinia } from "pinia"
import { axiosWrapper } from '@/helper/axios-wrapper.js';

import router from '@/router/index.js';

const baseUrl = import.meta.env.VITE_BASE_URL;
const loginUrl = `${baseUrl}/api/v1/login`

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        authError: null
    }),
    actions: {
        async login(data) {
            try {
              const user = await axiosWrapper.post(loginUrl, data, true);
          
              if (user.status === 200) {
                this.user = user.data;
                localStorage.setItem('user', JSON.stringify(user.data));
                router.push('/');
              } else {
                throw new Error('Kata sandi yang Anda masukkan salah');
              }
            } catch (err) {
              throw new Error(err?.response?.data?.message || 'Kata sandi yang Anda masukkan salah');
            }
          },          
        async logout() {
            this.user = null;

            localStorage.removeItem('user');
            router.push('/login');

            getActivePinia()._s.forEach(store => store.$reset());
        }
    },
});

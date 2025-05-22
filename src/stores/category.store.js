import { defineStore } from 'pinia';
import { axiosWrapper } from '@/helper/axios-wrapper.js';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [],
    category: null,
  }),
  actions: {
    async fetchAll() {
      const res = await axiosWrapper.get('https://mas-pos.appmedia.id/api/v1/category');
      if (res) this.categories = res.data;
    },
    async fetchById(id) {
      const res = await axiosWrapper.get(`https://mas-pos.appmedia.id/api/v1/category/${id}`);
      if (res) this.category = res.data;
    },
    async create(data) {
      return await axiosWrapper.post(`https://mas-pos.appmedia.id/api/v1/category`, data, true);
    },
    async update(id, data) {
      return await axiosWrapper.put(`https://mas-pos.appmedia.id/api/v1/category/${id}`, data, true);
    },
    async remove(id) {
      return await axiosWrapper.delete(`https://mas-pos.appmedia.id/api/v1/category/${id}`, null, true);
    }
  }
});

import { defineStore } from 'pinia';
import { axiosWrapper } from '@/helper/axios-wrapper.js';

const baseUrl = import.meta.env.VITE_BASE_URL + '/api/v1/product';

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [],
    product: null,
    selectedCategoryId: '',
  }),
  getters: {
    filteredList(state) {
      if (!state.selectedCategoryId) return state.list;
      return state.list.filter(
        p => p.category_id === state.selectedCategoryId
      );
    },
  },
  actions: {
    async fetchAll() {
      const res = await axiosWrapper.get(baseUrl);
      if (res) this.list = res.data;
    },
    async getById(id) {
      const res = await axiosWrapper.get(`${baseUrl}/${id}`);
      if (res) this.product = res.data;
    },
    async create(data) {
      const res = await axiosWrapper.post(baseUrl, data, true, 'multipart/form-data');
      return res;
    },
    async update(id, data) {
      const res = await axiosWrapper.post(`${import.meta.env.VITE_BASE_URL}/api/v1/product/update/${id}`, data, true, 'multipart/form-data');
      return res;
    },
    async delete(id) {
      const res = await axiosWrapper.delete(`${baseUrl}/${id}`, null, true);
      if (res) this.fetchAll();
    },
  },
});

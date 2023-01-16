import { defineStore } from "pinia";
import axios from "axios";

export const useBabyStore = defineStore({
  id: "baby",
  state: () => ({
    babies: [],
    baby: null,
    meta: {},
    loading: false,
    message: null,
    error: null,
  }),
  actions: {
    async fetchBabies() {
      this.babies = [];
      this.loading = true;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/babies`
        );
        this.babies = data.babies;
        this.meta = data.meta;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async addBaby(formBody) {
      this.loading = true;

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/babies`, formBody, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        this.message = error.response.data.message;
        this.error = error.response.data.errors;
      } finally {
        this.loading = false;
      }
    },
  },
});

import { defineStore } from "pinia";
import axios from "axios";

export const useBabyStore = defineStore({
  id: "baby",
  state: () => ({
    babies: [],
    baby: null,
    meta: {},
    loading: false,
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
  },
});

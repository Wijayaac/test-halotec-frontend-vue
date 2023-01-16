import { defineStore } from "pinia";
import axios from "axios";

export const useMotherStore = defineStore({
  id: "mother",
  state: () => ({
    mothers: [],
    mother: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMothers() {
      this.mothers = [];
      this.loading = true;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/mothers`
        );
        this.mothers = data.mothers;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async addMother(bodyForm) {
      this.loading = true;

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/mothers`, bodyForm, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});

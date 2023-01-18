import { defineStore } from "pinia";
import axios from "axios";

export const useBabyStore = defineStore({
  id: "baby",
  state: () => ({
    babies: [],
    baby: null,
    meta: {
      currentPage: 1,
      total: 0,
      perPage: 0,
    },
    loading: false,
    message: null,
    error: null,
  }),
  actions: {
    addBaby: async function (formBody) {
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
    deleteBaby: async function (babyId) {
      this.loading = true;
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/babies/${babyId}`);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    fetchBabies: async function (currentPage = null) {
      this.babies = [];
      this.meta = {
        total: 0,
        currentPage: currentPage,
      };
      this.loading = true;
      let queryString = "";

      if (currentPage) {
        queryString += `?page=${currentPage}`;
      }

      try {
        const {
          data: { babies, meta },
        } = await axios.get(
          `${import.meta.env.VITE_API_URL}/babies${queryString}`
        );
        this.babies = babies;
        this.meta = meta;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    fetchBaby: async function (babyId) {
      this.loading = true;
      this.baby = null;
      try {
        const {
          data: { data },
        } = await axios.get(`${import.meta.env.VITE_API_URL}/babies/${babyId}`);
        this.baby = data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    updateBaby: async function (babyId, bodyForm) {
      this.loading = true;

      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/babies/${babyId}`,
          bodyForm,
          {
            headers: { "content-type": "application/json" },
          }
        );
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});

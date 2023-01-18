import { defineStore } from "pinia";
import axios from "axios";

export const useMotherStore = defineStore({
  id: "mother",
  state: () => ({
    mothers: [],
    mother: null,
    loading: false,
    error: null,
    meta: {
      currentPage: 1,
      total: 0,
      perPage: 0,
    },
  }),
  actions: {
    fetchMothers: async function (currentPage = null) {
      this.mothers = [];
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
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/mothers${queryString}`
        );
        this.mothers = data.mothers.data || data.mothers;
        this.meta = {
          currentPage: data.mothers.current_page,
          total: data.mothers.total,
          pages: Math.ceil(data.mothers.total / data.mothers.per_page),
        };
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    fetchMother: async function (motherId) {
      this.loading = true;
      this.mother = null;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/mothers/${motherId}`
        );
        this.mother = data.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    addMother: async function (bodyForm) {
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
    updateMother: async function (motherId, bodyForm) {
      this.loading = true;

      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/mothers/${motherId}`,
          bodyForm,
          {
            headers: {
              "Content-Type": "aplication/json",
            },
          }
        );
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    deleteMother: async function (motherId) {
      this.loading = true;
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/mothers/${motherId}`
        );
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});

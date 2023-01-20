import { defineStore } from "pinia";
import axios from "axios";
import isEmpty from "lodash.isempty";

function getGestationalLabel(data) {
  return data.map((period) => period.label);
}

function getGestationalTotal(data) {
  return data.map((period) => period.average);
}

export const useBabyStore = defineStore({
  id: "baby",
  state: () => {
    return {
      babies: [],
      baby: null,
      loading: false,
      metaData: {
        currentpage: 1,
        total: 0,
        perPage: 2,
      },
      statistics: {},
      message: null,
      error: null,
    };
  },
  getters: {
    conditionData(state) {
      const label = "Kelahiran bayi berdasarkan kondisi";
      if (isEmpty(state.statistics.condition)) {
        return;
      }
      return {
        labels: Object.keys(state.statistics.condition),
        datasets: [
          {
            label: label,
            backgroundColor: ["#ffc300", "#41B883", "#ff4f4f"],
            data: Object.values(state.statistics.condition),
          },
        ],
      };
    },
    gestationalData(state) {
      const label = "Usia Kehamilan (Berdasarkan Bulan)";
      if (isEmpty(state.statistics.gestational_age)) {
        return;
      }
      return {
        labels: getGestationalLabel(state.statistics.gestational_age),
        datasets: [
          {
            label: label,
            backgroundColor: "#f87979",
            data: getGestationalTotal(state.statistics.gestational_age),
          },
        ],
      };
    },
    genderData(state) {
      if (isEmpty(state.statistics.gender)) {
        return;
      }
      return {
        labels: Object.keys(state.statistics.gender),
        datasets: [
          {
            backgroundColor: ["#3291f6", "#ff5bbd"],
            data: Object.values(state.statistics.gender),
          },
        ],
      };
    },
    parturitionData(state) {
      const label = "Proses Kelahiran Bayi";
      if (isEmpty(state.statistics.parturition)) {
        return;
      }
      return {
        labels: Object.keys(state.statistics.parturition),
        datasets: [
          {
            label: label,
            backgroundColor: ["#f58585", "#c4ff46", "#774aff", "#ff6c4b"],
            data: Object.values(state.statistics.parturition),
          },
        ],
      };
    },
  },
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
        this.metaData = meta;
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
    fetchStatistics: async function (query) {
      this.loading = true;

      try {
        const {
          data: { meta, message },
        } = await axios.get(
          `${import.meta.env.VITE_API_URL}/babies/statistics?${query}`
        );
        for (const prop in meta) {
          this.statistics[prop] = meta[prop];
        }
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

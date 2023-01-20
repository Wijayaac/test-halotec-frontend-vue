<template>
  <div>
    <p v-if="loading">Loading Data ...</p>
    <p v-if="error">{{ error.message }}</p>
    <div v-if="statistics">
      <div class="grid grid-cols-2 items-center">
        <h2 class="mb-5 md:mb-0">Filter Berdasarkan Tanggal</h2>
        <form
          class="grid grid-cols-3 gap-4 items-center"
          @submit.prevent="handleSubmit"
        >
          <div class="mb-6">
            <label
              for="start-date"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tanngal Awal
            </label>
            <input
              id="start-date"
              type="date"
              v-model="form.startDate"
              placeholder="Tanggal Awal"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div class="mb-6">
            <label
              for="end-date"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tanngal Akhir
            </label>
            <input
              id="end-date"
              type="date"
              v-model="form.endDate"
              placeholder="Tanggal Awal"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div class="">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Filter
            </button>
          </div>
        </form>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div
          class="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            v-if="statistics?.total"
          >
            Total bayi :
          </h5>
          <p
            class="mt-10 text-9xl text-center font-sans font-bold tracking-tight dark:text-white"
          >
            {{ statistics.total }}
          </p>
        </div>
        <div
          class="block max-h-[300px] p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <PieChart v-if="genderData" :chart-data="genderData" />
        </div>
        <div
          class="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <BarChart v-if="conditionData" :chart-data="conditionData" />
        </div>
        <div
          class="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <BarChart v-if="parturitionData" :chart-data="parturitionData" />
        </div>
      </div>
      <div class="grid">
        <div class="border-t-2 border-orange-400 mt-5 pt-5">
          <div
            class="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <LineChart v-if="gestationalData" :chart-data="gestationalData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useBabyStore } from "@/stores/baby";
import PieChart from "@/components/PieChart.vue";
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import { mapState } from "pinia";

let store;
export default {
  name: "HomeView",
  components: {
    BarChart,
    LineChart,
    PieChart,
  },
  setup() {
    store = useBabyStore();
  },
  data() {
    return {
      conditionData: null,
      gestationalData: null,
      genderData: null,
      parturitionData: null,
      store: null,
      form: {
        startDate: null,
        endDate: null,
      },
    };
  },
  computed: {
    ...mapState(useBabyStore, ["loading", "statistics", "error"]),
  },
  async mounted() {
    await store.fetchBabies();
    await store.fetchStatistics("year=2024&month=02");
    await store.fetchStatistics("from=2022-01-12");
    this.conditionData = {
      labels: Object.keys(this.statistics.condition),
      datasets: [
        {
          label: "Kelahiran bayi berdasarkan kondisi",
          backgroundColor: ["#ffc300", "#41B883", "#ff4f4f"],
          data: Object.values(this.statistics.condition),
        },
      ],
    };

    this.gestationalData = {
      labels: this.getGestationalLabel(this.statistics.gestational_age),
      datasets: [
        {
          label: "Usia Kehamilan (Bulan)",
          backgroundColor: "#f87979",
          data: this.getGestationalTotal(this.statistics.gestational_age),
        },
      ],
    };
    this.genderData = {
      labels: Object.keys(this.statistics.gender),
      datasets: [
        {
          backgroundColor: ["#3291f6", "#ff5bbd"],
          data: Object.values(this.statistics.gender),
        },
      ],
    };
    this.parturitionData = {
      labels: Object.keys(this.statistics.parturition),
      datasets: [
        {
          label: "Proses Kelahiran Bayi",
          backgroundColor: ["#f58585", "#c4ff46", "#774aff", "#ff6c4b"],
          data: Object.values(this.statistics.parturition),
        },
      ],
    };
  },
  methods: {
    getGestationalLabel: (data) => {
      return data.map((period) => period.label);
    },
    getGestationalTotal: (data) => {
      return data.map((period) => period.average);
    },
    handleSubmit: async function () {
      let query = `from=${this.form.startDate}`;
      if (this.form.startDate === null) {
        return;
      }
      if (this.form.endDate) {
        query += `&to=${this.form.endDate}`;
      }

      await store.fetchStatistics(query);

      this.form.startDate = null;
      this.form.endDate = null;
    },
  },
};
</script>

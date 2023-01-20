<template>
  <div>
    <p v-if="store.loading">Loading Data ...</p>
    <p v-if="store.error">{{ store.error.message }}</p>
    <div v-if="store.statistics">
      <div class="grid grid-cols-2 items-center">
        <h2 class="mb-5 md:mb-0">Filter Berdasarkan Tanggal</h2>
        <form
          class="grid grid-cols-3 gap-4 items-center"
          @submit.prevent="handleFilterByDate"
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
            v-if="store.statistics.total !== null"
          >
            Total bayi :
          </h5>
          <p
            class="mt-10 text-9xl text-center font-sans font-bold tracking-tight dark:text-white"
          >
            {{ store.statistics.total }}
          </p>
        </div>
        <div
          v-if="store.genderData"
          class="block max-h-[300px] p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <PieChart :chart-data="store.genderData" />
        </div>
        <div
          v-if="store.conditionData"
          class="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <BarChart :chart-data="store.conditionData" />
        </div>
        <div
          v-if="store.parturitionData"
          class="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <BarChart :chart-data="store.parturitionData" />
        </div>
      </div>
      <div class="grid grid-cols-2 items-center">
        <h2 class="mb-5 md:mb-0">Filter Usia Kandungan</h2>
        <form
          class="grid grid-cols-3 gap-4 items-center"
          @submit.prevent="handleFilterByDate"
        >
          <div class="mb-6">
            <label
              for="start-date"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tahun
            </label>
            <input
              id="start-date"
              type="date"
              v-model="form.year"
              placeholder="Tanggal Awal"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div class="mb-6">
            <label
              for="end-date"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Bulan
            </label>
            <input
              id="end-date"
              type="date"
              v-model="form.month"
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
      <div v-if="store.gestationalData" class="grid">
        <div class="border-t-2 border-orange-400 mt-5 pt-5">
          <div
            class="block p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <LineChart :chart-data="store.gestationalData" />
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

export default {
  name: "HomeView",
  components: {
    BarChart,
    LineChart,
    PieChart,
  },
  setup() {
    const store = useBabyStore();
    return { store };
  },
  data() {
    return {
      form: {
        startDate: null,
        endDate: null,
        year: null,
        month: null,
      },
    };
  },
  async mounted() {
    await this.store.fetchBabies();
    await this.store.fetchStatistics("year=2024&month=02");
    await this.store.fetchStatistics("from=2022-01-12");
  },
  methods: {
    handleFilterByDate: async function () {
      let query = `from=${this.form.startDate}`;
      if (this.form.startDate === null) {
        return;
      }
      if (this.form.endDate) {
        query += `&to=${this.form.endDate}`;
      }

      await this.store.fetchStatistics(query);
    },
  },
};
</script>

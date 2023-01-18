<template>
  <main>
    <p v-if="loading">Loading babies ...</p>
    <p v-if="error">{{ error.message }}</p>
    <div class="meta" v-if="meta">
      <p v-if="meta?.gestationalAge">
        Rata rata usia kehamilan : {{ meta.gestationalAge }}
      </p>
      <p v-if="meta?.total">Total bayi : {{ meta.total }}</p>
      <div v-if="meta?.condition">
        <p v-for="(value, key) in meta?.condition" :key="key">
          Total {{ key }} : {{ value }}
        </p>
      </div>
      <div v-if="meta?.gender">
        <p v-for="(value, key) in meta?.gender" :key="key">
          Total {{ key }} : {{ value }}
        </p>
      </div>
      <div v-if="meta?.parturition">
        <p v-for="(value, key) in meta?.parturition" :key="key">
          Total proses kelahiran {{ key }} : {{ value }}
        </p>
      </div>
      <Bar id="chart-condition" :data="conditionData" />
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { useBabyStore } from "@/stores/baby";
import { onMounted, ref } from "vue";

const { fetchBabies } = useBabyStore();
const { meta, loading, error } = storeToRefs(useBabyStore());

// @TODO Bar Chart for Condition, Birth process,
// @TODO Pie Chart for Gender,
// @TODO Line Chart for Total, Gestational Age

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

onMounted(async () => {
  await fetchBabies();
});

const conditionData = ref({
  labels: ["Cacat", "Meninggal", "Sehat"],
  datasets: [
    {
      label: "Januari",
      backgroundColor: "#f87979",
      data: [1, 4, 1],
    },
    {
      label: "Februari",
      backgroundColor: "blue",
      data: [2, 1, 4],
    },
  ],
});
</script>

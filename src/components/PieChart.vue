<template>
  <Pie :data="chartData" class="mx-auto" />
</template>

<script>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "PieChart",
  components: {
    Pie,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>

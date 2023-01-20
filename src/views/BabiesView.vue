<template>
  <div>
    <p v-if="loading">Loading babies ...</p>
    <p v-if="error">{{ error.message }}</p>
    <div class="action">
      <button class="mx-4" @click="handleDetail">Edit Selected</button>
      <button class="mx-4" @click="handleDelete">Delete Selected</button>
    </div>
    <DataTable
      :data="babies"
      :columns="columns"
      :options="{ paging: false, select: true }"
      class="display"
      ref="table"
    >
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.data">
            {{ column.name }}
          </th>
        </tr>
      </thead>
    </DataTable>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net-dt";
import "datatables.net-select";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useBabyStore } from "@/stores/baby";

const { fetchBabies, deleteBaby } = useBabyStore();
const router = useRouter();
const { loading, babies, error, meta } = storeToRefs(useBabyStore());
let dt;
const table = ref();

const columns = [
  {
    data: "id",
    name: "ID",
  },
  {
    data: "name",
    name: "Name",
  },
  {
    data: "created_at",
    name: "Tanggal",
  },
];

DataTable.use(DataTablesLib);
onMounted(async () => {
  dt = table.value.dt();
  await fetchBabies(1);
});

function handleDetail() {
  const target = dt.rows({ selected: true }).data()[0].id;
  router.push(`/baby/${target}`);
}

async function handleDelete() {
  const target = dt.rows({ selected: true }).data()[0];
  const { id, name } = target;

  let isConfirmed = window.confirm(`Are you sure want to delete ${name}`);
  if (isConfirmed) {
    await deleteBaby(id);
    await fetchBabies(1);
  }
}
</script>
<style scoped>
@import "datatables.net-dt";
</style>

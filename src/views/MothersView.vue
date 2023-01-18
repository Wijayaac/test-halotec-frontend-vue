<template>
  <main>
    <p v-if="loading">Loading mothers ...</p>
    <p v-if="error">{{ error.message }}</p>
    <div class="action">
      <button class="mx-4" @click="handleDetail">Edit Selected</button>
      <button class="mx-4" @click="handleDelete">Delete Selected</button>
    </div>
    <DataTable
      :data="mothers"
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
    <div class="pagination" v-if="meta.currentPage">
      <button class="mx-2" @click="handlePagination(meta.currentPage - 1)">
        Prev
      </button>
      <button
        class="mx-5"
        v-for="page in meta.pages"
        @click="handlePagination(page)"
        :key="`page-${page}`"
      >
        {{ page }}
      </button>
      <button class="mx-2" @click="handlePagination(meta.currentPage + 1)">
        Next
      </button>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import DataTable from "datatables.net-vue3";
import DataTablesLib from "datatables.net-dt";
import "datatables.net-select";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { useMotherStore } from "@/stores/mother";

const router = useRouter();
const { fetchMothers, deleteMother } = useMotherStore();
const { loading, mothers, error, meta } = storeToRefs(useMotherStore());

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
  await fetchMothers(1);
});

function handleDetail() {
  const target = dt.rows({ selected: true }).data()[0].id;
  router.push(`/mother/${target}`);
}

async function handleDelete() {
  const target = dt.rows({ selected: true }).data()[0];
  const { id, name } = target;

  let isConfirmed = window.confirm(`Are you sure want to delete ${name}`);
  if (isConfirmed) {
    await deleteMother(id);
    await fetchMothers(1);
  }
}

async function handlePagination(page) {
  await fetchMothers(page);
}
</script>

<style scoped>
@import "datatables.net-dt";
</style>

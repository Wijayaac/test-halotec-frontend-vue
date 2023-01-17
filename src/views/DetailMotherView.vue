<template>
  <main>
    <p v-if="store.loading">...Loading Form</p>
    <div class="max-w-2xl ml-4">
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nama Ibu
          </label>
          <input
            type="text"
            id="name"
            v-if="store.mother"
            v-model="store.mother.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Contoh. Ayu Winarni"
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Simpan
        </button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { useRoute } from "vue-router";

import { useMotherStore } from "@/stores/mother";

const route = useRoute();
const store = useMotherStore();
const motherId = route.params.id;
store.fetchMother(motherId);

function handleSubmit() {
  const data = {
    name: store.mother.name,
  };
  store.updateMother(motherId, data);
}
</script>

<style scoped></style>

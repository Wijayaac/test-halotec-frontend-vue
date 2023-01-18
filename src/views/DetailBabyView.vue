<template>
  <main>
    <div class="max-w-2xl ml-4">
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nama Bayi
          </label>
          <input
            type="text"
            id="name"
            v-if="store.baby"
            v-model="store.baby.name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Contoh. Winarni"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="gestationalAge"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Usia kehamilan
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="1"
            id="gestationalAge"
            v-if="store.baby"
            v-model="store.baby.gestational_age"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Contoh. 9"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="motherAge"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Usia Ibu
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            id="motherAge"
            v-if="store.baby"
            v-model="store.baby.mother_age"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Contoh. 29"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="length"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Panjang Bayi (dalam CM)
          </label>
          <input
            type="number"
            min="0"
            max="50"
            step="0.1"
            id="length"
            v-if="store.baby"
            v-model="store.baby.length"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="40"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="weight"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Berat Bayi (dalam gram)
          </label>
          <input
            type="number"
            min="0"
            max="10000"
            id="weight"
            v-if="store.baby"
            v-model="store.baby.weight"
            step="0.1"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="2569"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="motherId"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nama Ibu</label
          >
          <select
            id="motherId"
            v-if="store.baby"
            v-model="store.baby.mother_id"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :disabled="mothers.length < 1"
          >
            <option selected value="" disabled>Pilih Ibu</option>
            <option
              v-for="mother in mothers"
              :key="mother.id"
              :value="mother.id"
            >
              {{ mother.name }}
            </option>
          </select>
        </div>
        <div class="mb-6">
          <label
            for="gender"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Jenis Kelamin</label
          >
          <select
            id="gender"
            v-if="store.baby"
            v-model="store.baby.gender"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Laki laki" selected>Laki - laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div class="mb-6">
          <label
            for="parturition"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Proses kelahiran</label
          >
          <select
            id="parturition"
            v-if="store.baby"
            v-model="store.baby.parturition"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Normal" selected>Normal</option>
            <option value="Dibantu alat">Dibantu alat</option>
            <option value="Caesar">Caesar</option>
            <option value="Waterbirth">Waterbirth</option>
          </select>
        </div>
        <div class="mb-6">
          <label
            for="condition"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Kondisi Bayi</label
          >
          <select
            id="condition"
            v-if="store.baby"
            v-model="store.baby.condition"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Sehat">Sehat</option>
            <option value="Cacat">Cacat</option>
            <option value="Meninggal">Meninggal</option>
          </select>
        </div>
        <div class="mb-6 relative">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            v-if="store.baby"
            v-model="store.baby.date_of_birth"
            type="datetime-local"
            step="any"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Select date"
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
    <div v-if="error" class="ml-5 mt-5">
      <p v-if="message" class="text-red-500 font-bold tex-sm">{{ message }}</p>
      <div v-for="(errorArray, index) in error" :key="index">
        <div v-for="(allErrors, index) in errorArray" :key="index">
          <span class="text-red-500 text-sm">{{ allErrors }} </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useBabyStore } from "@/stores/baby";
import { useMotherStore } from "@/stores/mother";

const route = useRoute();
const store = useBabyStore();
const { mothers } = storeToRefs(useMotherStore());
const { fetchMothers } = useMotherStore();
const babyId = route.params.id;

onMounted(async () => {
  await fetchMothers();
  await store.fetchBaby(babyId);
});

async function handleSubmit() {
  const data = {
    name: store.baby.name,
    gestational_age: store.baby.gestational_age,
    mother_age: store.baby.mother_age,
    gender: store.baby.gender,
    length: store.baby.length,
    weight: store.baby.weight,
    date_of_birth: store.baby.date_of_birth,
    mother_id: store.baby.mother_id,
    condition: store.baby.condition,
    parturition: store.baby.parturition,
  };
  await store.updateBaby(babyId, data);
}
</script>

<style scoped></style>

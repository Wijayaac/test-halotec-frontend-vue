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
    </div>
    <div class="babies" v-if="babies">
      <div v-for="baby in babies" :key="baby.id">
        <RouterLink :to="`/baby/${baby.id}`">{{ baby.name }}</RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "pinia";

import { useBabyStore } from "@/stores/baby";

const { fetchBabies } = useBabyStore();
export default {
  name: "BabiesView",
  computed: {
    ...mapState(useBabyStore, ["babies", "meta", "loading", "error"]),
  },
  created() {
    fetchBabies();
  },
};
</script>

<template>
  <main>
    <p v-if="loading">Loading mothers ...</p>
    <p v-if="error">{{ error.message }}</p>
    <div v-if="mothers">
      <div v-for="mother in mothers" :key="mother.id">
        <RouterLink :to="`/mother/${mother.id}`">{{ mother.name }}</RouterLink>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from "pinia";

import { useMotherStore } from "@/stores/mother";

const { fetchMothers } = useMotherStore();
export default {
  name: "MothersView",
  computed: {
    ...mapState(useMotherStore, ["mothers", "loading", "error"]),
  },
  created() {
    fetchMothers();
  },
};
</script>

<style scoped></style>

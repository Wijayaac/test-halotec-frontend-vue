<script setup>
import { RouterView } from "vue-router";

import Navbar from "@/components/Navbar.vue";
</script>

<template>
  <Navbar />
  <main class="page-wrapper">
    <RouterView />
  </main>
</template>

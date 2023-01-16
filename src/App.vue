<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink class="mx-2" to="/">Home</RouterLink>
        <RouterLink class="mx-2" to="/mothers">Mothers</RouterLink>
        <RouterLink class="mx-2" to="/mother/add">Add Mother</RouterLink>
        <RouterLink class="mx-2" to="/babies">Babies</RouterLink>
        <RouterLink class="mx-2" to="/baby/add">Add Baby</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

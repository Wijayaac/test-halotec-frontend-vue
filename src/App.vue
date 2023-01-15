<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/babies">Babies</RouterLink>
        <RouterLink to="/baby/add">Add Baby</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

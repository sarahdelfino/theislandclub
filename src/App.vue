<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderNav from './components/nav/HeaderNav.vue';
</script>

<template>
  <header>

    <div>
      <!-- <HeaderNav /> -->
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>

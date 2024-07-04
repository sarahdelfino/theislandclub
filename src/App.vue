<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderNav from './components/nav/HeaderNav.vue';
import Footer from './components/nav/Footer.vue';
</script>

<template>
<div class="app-container bg-primary">
      <HeaderNav />

  <RouterView />

  <Footer />
</div>
</template>

<style scoped>

.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}


</style>

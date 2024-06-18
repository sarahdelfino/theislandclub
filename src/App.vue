<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderNav from './components/nav/HeaderNav.vue';
import Footer from './components/nav/Footer.vue';
</script>

<template>
  <header>

    <div>
      <HeaderNav />
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav> -->
    </div>
  </header>

  <RouterView />

  <Footer />
</template>

<style scoped>

</style>

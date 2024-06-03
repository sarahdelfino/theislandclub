<template>
    <div class="nav-container">
        <button class="menu-button bg-secondary tx-primary" @click="menuClicked = !menuClicked">Menu</button>
        <span class="nav-items bg-secondary" v-if="menuClicked">
            <RouterLink @click="menuClicked = !menuClicked" v-for="item in navBar" class="nav-item tx-primary" :to="`${item.link}`">{{ item.title }}</RouterLink>
        </span>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';

import data from './data.json';

const navBar = ref();
let menuClicked = ref(false);

onMounted(() => {
    navBar.value = data.nav;
});

</script>
<style scoped>
a {
    text-decoration: none;
    /* font-weight: bold; */
    padding: 5px;
    margin-right: 2px;
}

.nav-container {
    display: flex;
    flex-direction: column;
    padding: 10px;
    /* align-items: center; */
}

.nav-items {
    width: fit-content;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 4rem;
    left: 1rem;
    z-index: 999;
    border-radius: 5px;
}

.nav-item {
    font-size: 18px;
    margin: 10px;
    width: fit-content
}

.nav-item:hover {
    background-color: #4f7faa;
    color: white;
    border-radius: 5px;
}

.menu-button {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
}

</style>
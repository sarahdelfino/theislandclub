<template>
    <div class="nav-container">
        <div class="menu-container">
        <button class="menu-button btn-primary" @click="menuClicked = !menuClicked">Menu</button>
        <span class="nav-items bg-primary" v-if="menuClicked">
            <RouterLink @click="menuClicked = !menuClicked" v-for="item in navBar" class="nav-item tx-secondary" :to="`${item.link}`">{{ item.title }}</RouterLink>
        </span>
    </div>
    <div v-if="$route.name !== 'home'" class="title-container tx-secondary">
        <h1>{{ $route.name }}</h1>
    </div>
    <div class="logo-container"></div>
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
button {
    margin: 1rem;
}

a {
    text-decoration: none;
    /* font-weight: bold; */
    padding: 5px;
    margin-right: 2px;
}

.nav-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100vw;
}

.menu-container {
    display: flex;
    flex-direction: column;
}

.nav-items {
    width: fit-content;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 4.5rem;
    left: 1rem;
    z-index: 999;
    border-radius: 5px;
    border: 1px solid #4f7faa;
}

.nav-item {
    font-size: 18px;
    margin: 10px;
}

.nav-item:hover {
    background-color: #4f7faa;
    color: white;
    border-radius: 5px;
    padding-left: auto;
    padding-right: auto;
}

.menu-button {
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.menu-button:hover {
    cursor: pointer;
    font-size: 17px;
}

.logo-container {
    width: 50px;
    height: 50px;
    margin: 5px;
}

</style>
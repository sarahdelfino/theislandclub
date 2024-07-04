<template>
    <div class="heading-container">
        <div class="text-container tx-secondary"> 
        <div class="title">
            <h1>The Island Club</h1>
        </div>
        <div class="tagline">
            <h2>A community gathering place for residents of Sullivan's Island,<br> South Carolina</h2>
        </div>
        <button style="border: 1px solid white" class="bg-primary"><RouterLink class="tx-secondary router-link" to="/membership">Membership</RouterLink></button>
        <button style="border: 1px solid #4f7faa" class="bg-secondary"><RouterLink class="tx-primary router-link" to="/donate">Donate</RouterLink></button>
    </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

h1 {
    margin-bottom: 0px;
}

h2 {
    margin-top: 10px;
}

h3 {
    margin: 10px;
}

.heading-container {
    height: 85vh;
    background-image: url('../assets/matt-benson-TzdnVuPzY1g-unsplash.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 75%;
}

.hamburger-container {
    width: fit-content;
    padding: 5px;
    background-color: white;
    border-radius: 5px;
}

.text-container {
    width: 250px;
    color: white;
    margin-top: 20px;
    text-align: right;
    position: absolute;
    right: 15px;
}

.title {
    font-size: 32px;
    line-height: 70px;
}

.tagline {
    font-size: 14px;
}

</style>
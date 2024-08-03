<template>
    <div class="heading-container">
        <div class="text-container tx-primary"> 
        <div class="title">
            <h1>The Island Club</h1>
        </div>
        <div class="tagline">
            <h2>A community gathering place for residents of Sullivan's Island,<br> South Carolina</h2>
        </div>
        <!-- <div class="alert-container">
            <div class="alert-text">
                <div class="alert-title">
                    The Island Club is expanding!
                </div>
            </div>
        </div> -->
        <div class="heading-btn-container">
        <button class="btn-primary"><RouterLink style="color: white;" class="router-link" to="/membership">Membership</RouterLink></button>
        <button class="btn-secondary"><RouterLink class="router-link" to="/capital-project">Capital Project</RouterLink></button>
    </div>
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

.text-container {
    width: 250px;
    margin-top: 20px;
    text-align: right;
    position: absolute;
    right: 3rem;
}

.title {
    font-size: 32px;
    line-height: 70px;
}

.tagline {
    font-size: 14px;
}

.heading-btn-container {
    position: fixed;
    right: 3rem;
}

@media screen and (max-width: 400px) {
    button {
        margin-top: 0;
        margin-right: 0;
    }
    .text-container {
        margin-top: 0;
        right: 1rem;
    }
}

@media screen and (min-width: 500px) {
    .heading-container {
        background-position: top 15% left 5%;
    }
}

@media screen and (min-width: 960px) {
    .text-container, .heading-btn-container {
        right: 8rem;
    }
}

</style>
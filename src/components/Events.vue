<template>
    <div class="events-container">
        <div class="events-img"></div>
        <div class="events-text tx-primary">
            <div class="events-text">
                <div class="events-tagline">
            <h2>Our goal is simple:</h2>
            <h3>We want to provide a place to bring neighbors <span style="font-weight: bold;">together.</span></h3>
            <a href="#" target="_blank"><button class="bg-primary tx-secondary">Suggest an Event</button></a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
h1 {
    margin: 0px;
}

h2 {
    margin-top: 10px;
}

.events-container {
    background-color: white;
    /* margin: 10px; */
    /* min-height: 500px; */
    border-radius: 15px;
    /* height: 85vh; */
}

.events-title {
    position: absolute;
    top: 10%;
    right: 5%;
}

.events-img {
    background-image: url("../assets/cody-silver-U_uv5Tfke9U-unsplash.jpg");
    width: 100vw;
    height: 200px;
    background-size: cover;
    background-blend-mode: lighten;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.events-text {
    padding: 5px 10px 10px 10px;
}

.events-tagline {
    text-align: center;
    margin: 20px 0px 20px 0px;
}

</style>
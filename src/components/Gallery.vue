<template>
    <div class="gallery-container">
        <div class="gallery-img"></div>
        <div class="gallery-text tx-primary">
            <div class="gallery-text">
                <div class="gallery-tagline">
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

.gallery-container {
    background-color: white;
    /* margin: 10px; */
    /* min-height: 500px; */
    border-radius: 15px;
    /* height: 85vh; */
}

.gallery-title {
    position: absolute;
    top: 10%;
    right: 5%;
}

.gallery-img {
    background-image: url("../assets/cody-silver-U_uv5Tfke9U-unsplash.jpg");
    width: 100vw;
    height: 200px;
    background-size: cover;
    background-blend-mode: lighten;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.gallery-text {
    padding: 5px 10px 10px 10px;
}

.gallery-tagline {
    text-align: center;
    margin: 20px 0px 20px 0px;
}

</style>
<template>
    <div class="about-container bg-primary">
        <div class="about-img"></div>
        <div class="about-text tx-secondary">
            <div class="about-text">
                <div class="about-tagline">
            <h2>Our goal is simple:</h2>
            <h3>We want to provide a place to bring neighbors <span style="font-weight: bold;">together.</span></h3>
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

.about-title {
    position: absolute;
    top: 10%;
    right: 5%;
}

.about-img {
    background-image: url("../assets/cody-silver-U_uv5Tfke9U-unsplash.jpg");
    width: 100vw;
    height: 200px;
    background-size: cover;
    background-blend-mode: lighten;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.about-text {
    padding: 5px 10px 10px 10px;
}

.about-tagline {
    text-align: center;
    margin: 20px 0px 20px 0px;
}

</style>
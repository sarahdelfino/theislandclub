<template>
    <div class="donate-container">
        <div class="donate-img"></div>
        <!-- <img class="donate-img" src="../assets/caroline-sterr-2hJhdrsE3hw-unsplash.jpg"> -->
        <div class="donate-text tx-primary">
            <h1 class="donate-title">Donate</h1>
            <div class="donate-text">
                <div class="donate-tagline">
            <h2>Our goal is simple:</h2>
            <h3>We want to provide a place to bring neighbors <span style="font-weight: bold;">together.</span></h3>
            <a href="https://buy.stripe.com/aEU5kmaWy9MYbew9AD" target="_blank"><button class="bg-primary tx-secondary">Donate</button></a>
        </div>
            <p>To be a successful community center, the building needs to be safe, attractive, and functional. We have
                worked with local architect Steve Herlong and David Lugo of Paverscapes to come up with a plan to
                achieve those goals:</p>
                <ul>
                    <li>Drastically improve the curb appeal, with architectural and landscaping upgrades</li>
                    <li>Restore the center door and add a porch</li>
                    <li>Improve the patio under the oak tree</li>
                    <li>Add a new ADA ramp and ada parking space</li>
                    <li>Add parking</li>
                    <li>Add a front yard by replacing the concrete with pervious pavers and grass</li>
                    <li>Complete interior update to the restrooms, bar, and fixtures and finishes</li>
                    <li>Add hot water</li>
                    <li>Add insulation</li>
                </ul>
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

.donate-container {
    background-color: white;
    /* margin: 10px; */
    /* min-height: 500px; */
    border-radius: 15px;
    /* height: 85vh; */
}

.donate-title {
    position: absolute;
    top: 10%;
}

.donate-img {
    background-image: url("../assets/cody-silver-U_uv5Tfke9U-unsplash.jpg");
    width: 100vw;
    height: 200px;
    background-size: cover;
    border-radius: 15px;
    background-blend-mode: lighten;
}

.donate-text {
    padding: 5px 10px 10px 10px;
}

.donate-tagline {
    text-align: center;
    margin: 20px 0px 20px 0px;
}

</style>
<template>
    <div class="donate-container">
        <div class="donate-img"></div>
        <!-- <img class="donate-img" src="../assets/caroline-sterr-2hJhdrsE3hw-unsplash.jpg"> -->
        <!-- <h1 class="donate-title">Donate</h1> -->
        <div class="donate-text tx-primary">
            <div class="donate-tagline">
                <h2>Our goal is simple:</h2>
                <h2>We want to provide a place to bring neighbors <span style="font-weight: bold;">together.</span>
                </h2>
                <a href="#" target="_blank"><button class="bg-secondary tx-primary">Download Plans</button></a>
                <a href="https://buy.stripe.com/aEU5kmaWy9MYbew9AD" target="_blank"><button
                        class="bg-primary tx-secondary">Donate</button></a>
            </div>
            <h3>To be a successful community center, the building needs to be safe, attractive, and functional.
            </h3>
            <h3>Our fundraising goal of $250,000 would transform the club
                into something our community can be <span style="font-weight: bold;">proud of.</span></h3>

            <hr style="border: .75px solid #4f7faa">
            <h3>We've worked with local architect Steve Herlong and David Lugo of Paverscapes to come up with a
                plan to achieve these goals</h3>
            <ul>
                <li>Restore the center door and add a porch</li>
                <li>Improve the patio under the oak tree</li>
                <li>Add a new ADA ramp and ada parking space</li>
                <li>Add a front yard by replacing the concrete with pervious pavers and grass</li>
                <li>Complete interior update to the restrooms, bar, fixtures, and furnishes</li>
                <li>Add hot water</li>
                <li>Add insulation</li>
            </ul>
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

ul {
    list-style: none;
    padding-left: 20px;
}

ul li:before {
    content: '✓';
    margin-right: 5px;
}

.donate-title {
    position: absolute;
    top: 10%;
    right: 5%;
}

.donate-img {
    background-image: url("../assets/cody-silver-U_uv5Tfke9U-unsplash.jpg");
    width: 100vw;
    height: 200px;
    background-size: cover;
    background-blend-mode: lighten;
}

.donate-text {
    background-color: #4f7faa;
    padding: 5px 20px 10px 20px;
    border-radius: 15px;
    margin: -20px 10px 10px 10px;
}

.donate-tagline {
    text-align: center;
    margin: 20px 0px 20px 0px;
}
</style>
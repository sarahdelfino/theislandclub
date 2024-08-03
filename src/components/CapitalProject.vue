<template>
    <!-- <div style="max-width: 100%; max-height: 300px;" class="capital-img"></div> -->
    <img class="top-img" src="../assets/elise-wilcox-n1MMS7zb3FI-unsplash (1).jpg">
    <div class="capital-container">
        <div class="capital-text tx-secondary">
            <div class="capital-tagline">
                <h2>Our goal is simple:</h2>
                <h2>We want to provide a place to bring neighbors <span style="font-weight: bold;">together.</span>
                </h2>
                <a href="../assets/The Island Club Posters.pdf" download="TheIslandClubPlans.pdf"
                    target="_blank"><button class="bg-secondary tx-primary">Download Plans</button></a>
                <a href="https://buy.stripe.com/aEU5kmaWy9MYbew9AD" target="_blank"><button
                        class="btn-secondary">Donate</button></a>
            </div>
            <h3>To be a successful community center, the building needs to be safe, attractive, and functional.
            </h3>
            <h3>Our fundraising goal of $250,000 would transform the club
                into something our community can be <span style="font-weight: bold;">proud of.</span></h3>
            <div class="reno-img">
                <img class="project-img" src="../assets/Island Club Renovation - Hardscape and Landscape Design Plan (Revised - 24x36).png">
            </div>
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
            <div class="reno-img">
                <img class="project-img" src="../assets/Island Club Renovations 24_0516.png">
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
h1 {
    margin: 0px;
}

h2 {
    margin-top: 10px;
}

img {
    max-width: 100%;
}

ul {
    list-style: none;
    padding-left: 20px;
}

ul li:before {
    content: '✓';
    margin-right: 5px;
}

.capital-container {
    max-width: 1200px;
    min-width: 375px;
    margin-left: auto;
    margin-right: auto;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.capital-title {
    position: absolute;
    top: 10%;
    right: 5%;
}

.capital-img {
    background-image: url("../assets/elise-wilcox-n1MMS7zb3FI-unsplash (1).jpg");
    width: 100vw;
    height: 200px;
    background-size: cover;
    background-position: top 25%;
}

.capital-img::before {
    position: absolute;
    top: 0px;
    z-index: 1;
    filter: opacity(0.9);
}

.capital-text {
    padding: 5px 20px 10px 20px;
    border-radius: 15px;
    margin: 0px 10px 10px 10px;
}

.capital-tagline {
    text-align: center;
    margin: 20px 0px 20px 0px;
}

.reno-img {
    text-align: center;
}

.project-img {
    width: -webkit-fill-available;
    display: block;
    margin: auto;
}

@media screen and (min-width: 500px) {
    img {
        max-height: 300px;
    }
}

@media screen and (min-width: 760px) {
    .project-img {
        max-height: 100%;
    }
}

</style>
<template>
    <div class="insta-container">
        <div class="title">
            <h1>Instagram</h1>
        </div>
        <div class="insta-cards">
            <div class="card">
                    <img class="card-img" src="../assets/matt-benson--GV6I8vCiFE-unsplash.jpg">
            </div>
            <div class="card">
                <img class="card-img" src="../assets/matt-benson-0LE9jQ5XK60-unsplash.jpg">
            </div>
            <div class="card">
                <img class="card-img" src="../assets/matt-benson-azBCoQCUk3Q-unsplash.jpg">
            </div>
            <div class="card">
                <img class="card-img" src="../assets/matt-benson-CVY5bjK7YqM-unsplash.jpg">
            </div>
        </div>
        <div class="insta-button">
            <button @click="imageButtonClick()" class="view-events-button bg-primary tx-secondary">View All Images</button>
        </div>
    </div>
</template>
<script setup>

function imageButtonClick() {
    console.log("image button clicked");
    window.open('https://www.instagram.com/sullivansislandclubfun/?igsh=OG5zNzcxZzJ6d29h', '_blank');
};

</script>
<style scoped>
h1,
h2,
h3 {
    margin: 0;
}

h3 {
    font-size: 16px;
}

.insta-container {
    margin: 10px;
    padding-top: 5px;
    border-radius: 15px;
    background-color: white;
    color: #4f7faa;
}

.title {
    margin-top: 5px;
    text-align: center;
    padding-bottom: 10px;
}

.insta-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.card-img {
    width: 10em;
    height: 150px;
    margin-bottom: 10px;
    border: 1px solid gray;
    border-radius: 5px;
}

/* img {
    object-fit: contain;
} */

.insta-button {
    text-align: center;
}
</style>
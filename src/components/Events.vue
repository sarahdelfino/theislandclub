<template>
    <div class="events-container">
        <div class="events-img"></div>
        <div class="events-text tx-primary">
            <button @click="suggestEventButton()" class="bg-primary tx-secondary">Suggest an Event</button>
            <div v-if="suggestClicked" class="event-form-container">
                <form class="event-form" @submit.prevent="submitEvent">
                    <input name="first_name" v-model="form.first_name" placeholder="First name" />
                    <input name="last_name" v-model="form.last_name" placeholder="Last name" />
                    <input name="email" v-model="form.email" placeholder="Email" />
                    <input name="event_name" v-model="form.event_name" placeholder="Event Name" />
                    <textarea name="event_description" v-model="form.event_description" placeholder="Event Description"></textarea>
                    <button>Submit</button>
                </form>
            </div>
            <div class="events-text">
                <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showPrint=0&showTitle=0&showCalendars=0&showTabs=0&showTz=0&src=ZGVhYmZhMWRhMTVkYmZhOWJlNjQxYjRhMDMyZTY5ZGEzZDFhNGI5MWM5NDRiMzMwNDAxMjBjZDg1MmIyNTVlMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23A79B8E" style="border-width:0" width="350" height="600" frameborder="0" scrolling="no"></iframe>


            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

let form = {
    first_name: '',
    last_name: '',
    email: '',
    event_name: '',
    event_description: ''
}

let suggestClicked = ref(false);

function suggestEventButton() {
    suggestClicked.value = !suggestClicked.value;
    console.log("suggest clicked");
}

function submitEvent() {
    console.log(form);
}

</script>

<style scoped>
h1 {
    margin: 0px;
}

h2 {
    margin-top: 10px;
}

input, textarea {
    margin: 2.5px;
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

.event-form {
    display: flex;
    flex-direction: column;
    width: 40vw;
    /* flex-wrap: wrap; */
    /* justify-content: center; */
}

</style>
<template>
    <img class="top-img" src="../assets/cody-silver-U_uv5Tfke9U-unsplash.jpg">
    <div class="membership-container">
        <!-- <div class="membership-img"></div> -->
        <h3 class="tx-secondary" style="padding: 10px;">The Island Club is open to all current and prior residents of Sullivan's Island. Membership
            allows you to attend & host events and includes one free private rental per year.</h3>
            <div class="member-buttons">
                <button @click="toggleSignup" class="btn-primary">Become a Member</button>
                <button @click="toggleRequest" class="btn-secondary">Request an Event</button>
            </div>
            <div v-if="requestFormVisible" class="membership-text">
                <form id="eventForm" ref="form" class="event-form" @submit.prevent="submitEvent">
                    <label for="first_name">First Name</label>
                    <input required id="first_name" name="first_name" v-model="first_name" />
                    <label for="last_name">Last Name</label>
                    <input required id="last_name" name="last_name" v-model="last_name" />
                    <label for="email">Email</label>
                    <input required id="email" name="email" v-model="email" />
                    <label for="event_date">Event Date</label>
                    <input required id="event_date" name="event_date" type="date"
                        v-model="event_date" />
                        <label for="event_start">Start Time</label>
                        <input required id="event_start" name="event_start" type="time"
                        v-model="event_start" />
                        <label for="event_end">End Time</label>
                        <input required id="event_end" name="event_end" type="time"
                        v-model="event_end" />
                        <label for="event_name">Event Name</label>
                    <input required id="event_name" name="event_name" v-model="event_name" />
                    <label for="event_description">Event Description</label>
                    <textarea style="margin-bottom: 8px;" required id="event_description" name="event_description" v-model="event_description" ></textarea>
                    <button style="margin-left: 0;" class="btn-primary" type="submit">Submit</button>
                </form>
            </div>
        <div v-if="signUp" class="membership-text tx-primary">
                    <Alert text="You will be sent to Stripe to complete your payment once you click submit."
                        type="info" />

                        <Alert v-if="success || error" :text="alertText" :type="success ? 'success' : 'error'"/>

                    <form id="membershipForm" ref="membershipForm" class="membership-form"
                        @submit.prevent="submitMembership">
                        <div class="radio-buttons">
                            <div class="radio-button">
                                <input required type="radio" id="indv" name="mem_type" v-model="mem_type"
                                    value="individual" />
                                <label style="text-align: center;" for="mem_indv">Individual $250</label>
                            </div>
                            <div class="radio-button">
                                <input required type="radio" id="fam" name="mem_type" v-model="mem_type"
                                    value="family" />
                                <label style="text-align: center;" for="mem_fam">Family $350</label>
                            </div>
                        </div>
                        <label for="first_name">First Name</label>
                        <input required id="first_name" name="first_name" v-model="first_name" />
                        <label for="last_name">Last Name</label>
                        <input required id="last_name" name="last_name" v-model="last_name" />
                        <label for="email">Email</label>
                        <input required id="email" name="email" v-model="email" />
                        <label for="address">Address</label>
                        <input required id="address" name="address" v-model="address" />
                        <button style="margin-left: 0;" class="bg-primary tx-secondary" type="submit">Submit</button>
                    </form>
        </div>
        <Events />
    </div>
</template>

<script setup>
import Events from '@/components/Events.vue';
import { ref, onMounted } from 'vue'
import emailjs from '@emailjs/browser';

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';


import Alert from './Alert.vue';
import requestForm from './forms.json'

const signUp = ref(false);
const requestFormVisible = ref(false);

let success = ref(false);
let error = ref(false);
let alertText = ref('');

let membershipForm = {
    mem_type: '',
    first_name: '',
    last_name: '',
    event_date: '',
    event_start: '',
    event_end: '',
    email: '',
    address: '',
    paid: false,
}

onMounted(() => {
    success.value = false;
    error.value = false;

    console.log(requestForm)
})

function toggleSignup() {
    requestFormVisible.value = false;
    signUp.value = !signUp.value;
}

function toggleRequest() {
    signUp.value = false;
    requestFormVisible.value = !requestFormVisible.value;
}

function submitMembership() {
    // submit membership to firebase
    console.log("error: ", error.value, " success: ", success.value);
        emailjs.sendForm("service_66ijhfa", "template_de4aoh4", membershipForm, {
        publicKey: 'pp0s7qlmsjt-_40XH',
    }).then(() => {
        alertText = 'Your submission has been received!';
        success.value = true;
        membershipForm.reset();
        
    },
        (error) => {
            alertText = 'We were not able to process this submission at this time. Please try again.';
            error.value = true;
            console.log('FAILED...', error.value);
        }
    );
}

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
    max-height: 300px;
}

label {
    text-align: left;
    color: #4f7faa;
}

.membership-container {
    max-width: 1200px;
    min-width: 375px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

.membership-title {
    position: absolute;
    top: 10%;
    right: 5%;
}

.membership-img {
    background-image: url("../assets/cody-silver-U_uv5Tfke9U-unsplash.jpg");
    width: 100vw;
    height: 200px;
    background-size: cover;
    background-blend-mode: lighten;
}

.member-buttons {
    margin-bottom: 20px;
}

.membership-text {
    padding: 5px 10px 10px 10px;
}

.membership-tagline {
    margin: 20px 0px 20px 0px;
}

.membership-form {
    display: flex;
    flex-direction: column;
    width: 60vw;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    /* flex-wrap: wrap; */
    /* justify-content: center; */
}

.radio-buttons {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.radio-button {
    display: flex;
    align-items: center;
    font-size: 16px;
}

.event-form {
    display: flex;
    flex-direction: column;
    width: 60vw;
    margin-left: auto;
    margin-right: auto;
    /* flex-wrap: wrap; */
    /* justify-content: center; */
}

</style>
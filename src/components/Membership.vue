<template>
    <div class="membership-container">
        <div class="membership-img"></div>
        <div class="membership-text tx-primary">
            <div class="membership-text">
                <div class="membership-tagline">
                    <h3>The Island Club is open to all current and prior residents of Sullivan's Island. Membership
                        allows you to attend & host events and includes one free private rental per year.</h3>

                    <Alert text="You will be sent to Stripe to complete your payment once you click submit."
                        type="info" />

                        <Alert v-if="success || error" :text="alertText" :type="success ? 'success' : 'error'"/>

                    <form id="membershipForm" ref="membershipForm" class="membership-form"
                        @submit.prevent="submitMembership">
                        <div class="radio-buttons">
                            <div class="radio-button">
                                <input required type="radio" id="indv" name="mem_type" v-model="mem_type"
                                    value="individual" />
                                <label for="mem_indv">Individual - $250</label>
                            </div>
                            <div class="radio-button">
                                <input required type="radio" id="fam" name="mem_type" v-model="mem_type"
                                    value="family" />
                                <label for="mem_fam">Family - $350</label>
                            </div>
                        </div>
                        <input required id="first_name" name="first_name" v-model="first_name"
                            placeholder="First name" />
                        <input required id="last_name" name="last_name" v-model="last_name" placeholder="Last name" />
                        <input required id="email" name="email" v-model="email" placeholder="Email" />
                        <input required id="address" name="address" v-model="address" placeholder="Address" />
                        <button class="bg-primary tx-secondary" type="submit">Become a Member</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import emailjs from '@emailjs/browser';

import Alert from './Alert.vue';

let success = ref(false);
let error = ref(false);
let alertText = ref('');

let membershipForm = {
    mem_type: '',
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    paid: false,
}

onMounted(() => {
    success.value = false;
    error.value = false;
})

function submitMembership() {
    // submit membership to firebase
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
            console.log('FAILED...', error.text);
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

.membership-container {
    background-color: white;
    /* margin: 10px; */
    /* min-height: 500px; */
    border-radius: 15px;
    /* height: 85vh; */
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
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
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
    /* flex-wrap: wrap; */
    /* justify-content: center; */
}

.radio-buttons {
    display: flex;
    justify-content: space-between;
}

.radio-button {
    display: flex;
    align-items: center;
    font-size: 14px;
}
</style>
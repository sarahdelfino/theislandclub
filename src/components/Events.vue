<template>
    <div class="events-container tx-primary">
        <div class="events-img"></div>
            <!-- <button @click="toggleSuggest()" class="bg-primary tx-secondary">Request an Event</button> -->
            <div class="tabs-container">
                <div @click="toggleCal()" class="tab">
                    Event Calendar
                </div>
                <div @click="toggleSuggest()" class="tx-primary tab">
                    Request an Event
                </div>
            </div>
            <!-- <div v-if="suggestFormVisible" class="event-form-container"> -->
                <iframe v-if="suggestFormVisible" src="https://docs.google.com/forms/d/e/1FAIpQLScbRTD0AN7irQaIXueoZV0m9Qly1VLTWdARt7vMrfOAeOeY6Q/viewform?embedded=true" width="380" height="800" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                <!-- <form id="eventForm" ref="form" class="event-form" @submit.prevent="submitEvent">
                    <input required id="first_name" name="first_name" v-model="first_name" placeholder="First name" />
                    <input required id="last_name" name="last_name" v-model="last_name" placeholder="Last name" />
                    <input required id="email" name="email" v-model="email" placeholder="Email" />
                    <input required id="event_datetime" name="event_datetime" type="datetime-local"
                        v-model="event_datetime" />
                    <input required id="event_name" name="event_name" v-model="event_name" placeholder="Event Name" />
                    <textarea required id="event_description" name="event_description" v-model="event_description"
                        placeholder="Event Description"></textarea>
                    <button class="bg-primary tx-secondary" type="submit">Submit</button>
                </form> -->
            <!-- </div> -->
            <div class="events-text">
                <iframe
                    v-if="!suggestFormVisible"
                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showPrint=0&showTitle=0&showCalendars=0&showTabs=0&showTz=0&src=ZGVhYmZhMWRhMTVkYmZhOWJlNjQxYjRhMDMyZTY5ZGEzZDFhNGI5MWM5NDRiMzMwNDAxMjBjZDg1MmIyNTVlMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23A79B8E"
                    style="border-width:0" width="100%" height="600px" frameborder="0" scrolling="no"></iframe>


        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import emailjs from '@emailjs/browser';

import { useEventsStore } from '@/stores/events';

const eventsStore = useEventsStore();

let events = ref();
let event = ref();
let loading = ref(false);

let form = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '867-5309',
    event_datetime: '',
    event_name: '',
    event_description: '',
    event_state: 'pending'
}

let suggestFormVisible = ref(false);

onMounted(async () => {
    console.log("getting events....");
    console.log(eventsStore.getEvents());
    await fetchEventData();
});

const fetchEventData = async () => {
    await eventsStore.getEvents().then((events) => {
        console.log(events);
    })
}

function toggleSuggest() {
    suggestFormVisible.value = !suggestFormVisible.value;
}

function toggleCal() {
    if (suggestFormVisible.value == true) {
        toggleSuggest();
    }
}

async function writeToFirestore() {
    event = {
            start: event_datetime.value,
            title: event_name.value,
            description: event_description.value,
            state: event_state,
            organizer: {
                name: first_name.value + ' ' + last_name.value,
                email: email.value
            }
    }

    eventsStore.addEvent(event);
}


function submitEvent() {
    writeToFirestore();
    loading.value = true;
    emailjs
        .sendForm('service_66ijhfa', 'template_jfj2cqe', form, {
            publicKey: 'pp0s7qlmsjt-_40XH',
        })
        .then(
            () => {
                form.reset();
                loading.value = false;
            },
            (error) => {
                loading.value = false;
                alert(error.text);
                console.log('FAILED...', error.text);
            },
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

input,
textarea {
    margin: 2.5px;
}

.events-container {
    background-color: white;
    border-radius: 15px;
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
    margin-bottom: 10px;
}

.events-text {
    padding: 5px 10px 10px 10px;
}

.events-tagline {
    text-align: center;
    margin: 20px 0px 20px 0px;
}

.tabs-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom: 20px;
}

.tab {
    border-bottom: 1px solid gray;
    border-radius: 5px;

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
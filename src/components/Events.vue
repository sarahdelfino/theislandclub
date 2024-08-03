<template>
    <div class="events-container tx-secondary">
        <h1>Events</h1>
        <!-- <div class="events-img"></div> -->
        <!-- <button @click="toggleSuggest()" class="bg-primary tx-secondary">Request an Event</button> -->
        <!--  -->
        <!-- <div @click="toggleSuggest()" class="tx-primary tab">
                Request an Event
            </div> -->
        <!-- </div> -->
        <!-- <div v-if="suggestFormVisible" class="event-form-container">
            <form id="eventForm" ref="form" class="event-form" @submit.prevent="submitEvent">
                <input required id="first_name" name="first_name" v-model="first_name" placeholder="First name" />
                <input required id="last_name" name="last_name" v-model="last_name" placeholder="Last name" />
                <input required id="email" name="email" v-model="email" placeholder="Email" />
                <input required id="event_datetime" name="event_datetime" type="datetime-local"
                    v-model="event_datetime" />
                <input required id="event_name" name="event_name" v-model="event_name" placeholder="Event Name" />
                <textarea required id="event_description" name="event_description" v-model="event_description"
                    placeholder="Event Description"></textarea>
                <button class="bg-primary tx-secondary" type="submit">Submit</button>
            </form>
        </div> -->
        <div class="calendar-container">
            <ScheduleXCalendar @click="eventClick($event)" :calendar-app="calendarApp" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import emailjs from '@emailjs/browser';
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
    createCalendar,
    viewDay,
    viewWeek,
    viewMonthGrid,
    viewMonthAgenda,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import { createEventRecurrencePlugin, createEventsServicePlugin } from "@schedule-x/event-recurrence";

import { useEventsStore } from '@/stores/events';
import { useRouter } from 'vue-router';

defineProps(['viewTab']);

const eventsService = createEventsServicePlugin();
const eventsStore = useEventsStore();
const router = useRouter();

let events = ref([]);
// let event = ref();
let loading = ref(false);
let config = {
    views: [viewMonthAgenda, viewMonthGrid, viewWeek, viewDay],
    defaultView: viewMonthAgenda.name || viewMonthGrid.name,
    plugins: [
        eventsService,
    ],
    dayBoundaries: {
        start: '08:00',
        end: '18:00',
    },
    calendars: {
        events: {
            colorName: 'island',
            lightColors: {
                    main: '#4f7faa',
                    container: '#4f7faa',
                    onContainer: 'white'
            }
        }
    },
    events: [],
};

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

const fetchEvents = async () => {
    await eventsStore.getEvents().then((result) => {
        events.value = result;
    });
    for (let ev in events.value) {
        config.events.push({
            id: events.value[ev].id,
            title: events.value[ev].title,
            start: events.value[ev].start,
            end: events.value[ev].end,
            description: events.value[ev].description,
            calendarId: 'events'
        });
    }
    eventsService.set(config.events);
}

onMounted(async () => {
    await fetchEvents();
});

const calendarApp = createCalendar(config)

const eventClick = (event) => {
    let eventTitle = event.srcElement.innerText;
    let eventId;
    if (event.target.classList.contains("sx__month-agenda-event__title")) {
        for (let ev in config.events) {
            if (config.events[ev].title === eventTitle) {
                eventId = config.events[ev].id;
            }
        }
        router.push(`/event/${eventId}`);
    }
}

// const calendarApp = createCalendar({
//   views: [viewMonthAgenda, viewMonthGrid, viewWeek, viewDay ],
//   defaultView: viewMonthAgenda.name || viewMonthGrid.name,
//   events: config.events
// //   [
// //     {
// //       id: 1,
// //       title: 'Event 1',
// //       start: '2023-12-19',
// //       end: '2023-12-19',
// //     },
// //     {
// //       id: 2,
// //       title: 'Event 2',
// //       start: '2023-12-20 12:00',
// //       end: '2023-12-20 13:00',
// //     },
// //   ],
// })

const getDate = () => {
    let d = new Date()
    console.log(d);
    return d;
}

// const fetchEventData = async () => {
//     await eventsStore.getEvents().then((events) => {
//         console.log(events);
//     })
// }

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
    margin-top: 0px;
}

h2 {
    margin-top: 10px;
    margin-bottom: 5px;
}

p {
    margin-top: 0px;
    font-size: 14px;
}

input,
textarea {
    margin: 2.5px;
}

.events-container {
    background-color: white;
    padding: 10px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
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

.tabs-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 20px;
    margin-bottom: 20px;
}

.tab {
    border-bottom: 1px solid gray;
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

.event-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 90px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: #4f7faa 8px 8px 10px -10px;
}

.event-img {
    width: 35vw;
    height: 90px;
    margin-right: 10px;
    border: 1px solid green;
    border-radius: 5px;
}

.calendar-container {
    margin-bottom: 10px;
}
</style>
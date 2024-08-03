<template>
    <div class="upcoming-events-container bg-primary">
        <div class="title">
            <h1>Upcoming Events</h1>
        </div>
        <div v-for="event in events" :key="event.id" class="upcoming-event-card">
            <RouterLink class="router-link" :to="{ name: 'event', params: { id: event.id } }"> 
            <div class="row">
                <div class="row-img"></div>
                <div class="row-text">
                    <h2 class="row-title">{{ event.title }}</h2>
                <div class="row-tagline">
                    <h3>{{ event.datetime }}</h3>
                </div>
            </div>
            <p class="arrow"></p>
            <i class="arrow pi pi-caret-right"></i>
            </div>
        </RouterLink>
            </div>
        <div class="upcoming-event-buttons">
        <button class="view-events-button btn-primary"><RouterLink style="color: white;" class="router-link" to="/events">View All Events</RouterLink></button>
        <button class="req-events-button btn-secondary">Request Event</button>
    </div>
</div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useEventsStore } from '@/stores/events';

const eventsStore = useEventsStore();
let events = ref([])

onMounted(async () => {
    // let events;
    // const response = eventsStore.getEvents();
    // console.log(response)
    events.value = await eventsStore.getEvents();
    console.log(events.value);
});

const eventClick = event => {
    console.log(event);
    $router.push({
        name: 'event',
        params: {
            event: event
        }
    })
}

</script>
<style scoped>

h1, h2, h3 {
    margin: 0;
}

h3 {
    font-size: 16px;
}

.upcoming-events-container {
    max-width: 1200px;
    margin: -150px auto 20px auto;
    padding: 10px;
    border-radius: 15px;
    color: #4f7faa;
    border: 1px solid #4f7faa;
}

.title {
    margin-top: 5px;
    margin-bottom: 10px;
    text-align: center;
}

.row {
    display: flex;
    height: 90px;
    margin-bottom: 10px;
    border: 1px solid #4f7faa;
    border-radius: 5px;
    padding: 10px;
    align-items: center;
}

.arrow {
    margin-left: auto;
    font-weight: bold;
    font-size: 18px;
}

.row-img {
    width: 25vw;
    height: 90px;
    margin-right: 10px;
    border: 1px solid #4f7faa;
    border-radius: 5px;
}

.row-title {
    font-weight: 400;
}

.row-text {
    margin: 10px 5px 10px 10px;
}

.upcoming-event-buttons {
    text-align: center;
}

@media screen and (max-width: 389px) {
    .upcoming-events-container {
        margin: -100px auto 20px auto;
    }
    
}

</style>
<template>
    <div class="event-container tx-secondary">
        <div class="event-img"></div>
        <div class="event-text-container">
        <div class="event-title-container">
            <div class="event-title">
                <h1>{{ event?.title }}</h1>
            </div>
            <div class="event-add-button">
                <a class="tx-secondary" href="#" target="_blank">Add to Calendar</a>
            </div>
        </div>
        <div class="event-info-container">
            <div class="event-info-img">
                <i class="pi pi-calendar" style="font-size: 2rem;"></i>
            </div>
            <div class="info-primary">
                <h2 style="margin-bottom: 0px;" class="info-primary">{{ event?.start }}</h2>
                <p style="margin-top: 8px" class="info-secondary">{{ event?.end }}</p>
            </div>
        </div>
        <div class="event-info-container">
            <div class="event-info-img">
                <i class="pi pi-map-marker" style="font-size: 2rem;"></i>
            </div>
            <div class="info-primary">
                <h2 style="margin-bottom: 0px;" class="info-primary">{{ event?.location}} The Island Club Lawn</h2>
                <p style="margin-top: 8px;" class="info-secondary">{{ event?.address }}420 Hollywoo Blvd</p>
            </div>
        </div>
        <div class="event-description">
            <h2 style="font-weight: 400;">Details</h2>
            <h3>Hosted by {{ event?.organizer }}</h3>
            <p>{{ event?.description }}</p>
        </div>
    </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from "vue-router";
import { useEventsStore } from '@/stores/events';

const eventsStore = useEventsStore();

const route = useRoute();
const event = ref({});

onMounted(async () => {
    event.value = await eventsStore.getEventById(route.params.id);
});


</script>
<style scoped>
.event-img {
    background-image: url("../assets/cody-silver-U_uv5Tfke9U-unsplash.jpg");
    width: 100vw;
    height: 200px;
    background-size: cover;
    background-blend-mode: lighten;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.event-text-container {
    padding: 10px;
}

.event-title-container {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
}

.event-info-container {
    width: 80vw;
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
}

.event-info-img {
    margin-right: 25px;
}

.info-primary {
    font-weight: 400;
}

</style>
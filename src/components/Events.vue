<template>
    <div class="upcoming-events-container">
        <div class="title">
            <h1>Upcoming Events</h1>
        </div>
        <div class="upcoming-event-cards">
            <div class="card">
                <div class="card-text">
                <div class="card-title">
                    <h2>Yoga</h2>
                </div>
                <div class="card-tagline">
                    <h3>9am - 10am</h3>
                    <h3>Tomorrow, May 26th</h3>
                </div>
            </div>
            </div>
            <div class="card">
                <div class="card-text">
                <div class="card-title">
                    <h2>Mahjong</h2>
                </div>
                <div class="card-tagline">
                    <h3>4pm - 5pm</h3>
                    <h3>Monday, May 27th</h3>
                </div>
            </div>
            </div>
        </div>
        <div class="upcoming-event-buttons">
        <button class="view-events-button bg-primary tx-secondary">View All Events</button>
        <button class="req-events-button bg-secondary tx-primary">Request Event</button>
    </div>
    </div>
</template>
<script>


</script>
<style scoped>

h1, h2, h3 {
    margin: 0;
}

h3 {
    font-size: 16px;
}

.upcoming-events-container {
    margin: 10px;
    margin-top: -50px;
    padding-top: 5px;
    border-radius: 15px;
    background-color: white;
}

.title {
    margin-top: 5px;
    text-align: center;
}

.upcoming-event-cards {
    padding: 10px;
}

.card {
    margin-bottom: 10px;
    border: 1px solid gray;
    border-radius: 5px;
}

.card-text {
    margin: 10px 5px 10px 10px;
}

.upcoming-event-buttons {
    text-align: center;
}

</style>
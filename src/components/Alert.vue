<template>
    <div class="alert-container" :class="{ success: type == 'success', error: type == 'error', info: type == 'info' }">
        <div class="alert-text-container">
        <!-- <div class="alert-title">{{ type }}</div> -->
        <div class="alert-text">{{ text }}</div>
    </div>
    </div>
</template>

<script setup>
defineProps(['title', 'text', 'type']);
</script>

<style scoped>
.alert-container {
    position: relative;
    width: 100%;
    border-radius: 5px;
    color: white;
}

.alert-text-container {
    padding: 10px;
}

.success {
    background-color: lightgreen;
}

.error {
    background-color: lightcoral;
}

.info {
    background-color: lightblue;
}

</style>
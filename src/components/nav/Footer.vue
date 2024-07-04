<template>
    <div style="background-color: #4f7faa;" class="footer-container">
        <div style="background-color: #4f7faa;" class="tx-primary box">
            <div class="footer-text">
                <RouterLink v-for="item in footerNav" class="footer-link router-link tx-primary" :to="item.link">{{ item.title }}</RouterLink>
                <div class="copyrights">
                    <p>Designed & Developed by Sarah Delfino</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import data from './data.json';

const footerNav = ref(data.nav);

</script>

<style scoped>
.box {
    --mask:
        radial-gradient(59.17px at 50% 81px, #000 99%, #0000 101%) calc(50% - 60px) 0/120px 100%,
        radial-gradient(59.17px at 50% -51px, #0000 99%, #000 101%) 50% 30px/120px 100% repeat-x;
    -webkit-mask: var(--mask);
            mask: var(--mask);
  }

h1 {
    margin: 0px;
}

h2 {
    margin-top: 10px;
}

p {
    font-size: .65rem;
}

.footer-container {
    position: relative;
    bottom: 0px;
    height: fit-content;
    text-align: center;
    /* margin: 10px; */
    /* min-height: 500px; */
    /* height: 85vh; */
}

.footer-text {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: white;
    text-align: center;
    margin-top: 30px;
    padding: 50px 10px 10px 10px;
}

.footer-link {
    margin: 10px 20px 10px 20px;
}

.footer-tagline {
    text-align: center;
    margin: 20px 0px 20px 0px;
}
</style>
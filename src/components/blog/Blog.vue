<template>
    <img class="top-img" src="../../assets/cody-silver-U_uv5Tfke9U-unsplash.jpg">
    <div class="blog-container tx-secondary">
        <!-- <div class="blog-img"></div> -->
        <div class="blog-posts-container">
            <div v-for="blog in posts" :key="blog.id" class="blog-post">
                <div class="blog-post-img"></div>
                <router-link class="tx-secondary" :to="{name: 'blog-post', params: { id: blog.id, post: blog } }">
                <div class="blog-text">
                <div class="blog-title">
                    <h2>{{ blog.blog_title }}</h2>
                </div>
                <div class="blog-info">
                    <p>{{ blog.post_date }}</p>
                </div>
                <div class="blog-description">
                    <p>{{ blog.blog_description }}</p>
                </div>
                </div>
            </router-link>
            <i style="align-self: center;" class="arrow pi pi-caret-right"></i>
                </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import posts from './blog_posts.json';

let blogs = ref();

onMounted(() => {
    console.log (posts);
})

</script>

<style scoped>

h2 {
    margin-bottom: 5px;
    margin-top: 10px;
}

p {
    margin-top: 0px;
    font-size: 14px;
}

.blog-container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

.blog-img {
    background-image: url("../../assets/cody-silver-U_uv5Tfke9U-unsplash.jpg");
    width: 100vw;
    height: 200px;
    background-size: cover;
    background-blend-mode: lighten;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.blog-posts-container {
    padding-top: 20px;
}

.blog-post {
    display: flex;
    margin: 8px 8px 15px 8px;
    border: 1px solid #4f7faa;
    border-radius: 5px;
    box-shadow: #4f7faa 8px 8px 10px -10px;
}

.blog-post-img {
    width: 35vw;
    height: 150px;
    margin-right: 10px;
    border: 1px solid #4f7faa;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.blog-text {
    width: 200px;
    display: flex;
    flex-direction: column;
}

.blog-info {
    font-size: 14px;
}

</style>
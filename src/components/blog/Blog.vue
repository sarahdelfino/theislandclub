<template>
    <div class="blog-container tx-primary">
        <div class="blog-img"></div>
        <div class="blog-posts-container">
            <div v-for="blog in posts" :key="blog.id" class="blog-post">
                <div class="blog-post-img"></div>
                <router-link class="tx-primary" :to="`/blog/${blog.id}`">
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
    margin: 8px;
    border: 1px solid gray;
    border-radius: 5px;
}

.blog-post-img {
    width: 35vw;
    height: 150px;
    margin-right: 10px;
    border: 1px solid red;
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
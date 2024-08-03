<template>
    <div class="blog-container tx-primary">
        <div class="blog-img"></div>
        <div class="blog-posts-container">
                <div class="blog-post-img"></div>
                <div class="blog-text">
                <div class="blog-title">
                    <!-- <h2>{{ post.title }}</h2> -->
                </div>
                <div class="blog-info">
                    <!-- <p>{{ blogPost.post_date }}</p> -->
                </div>
                <div class="blog-description">
                    <!-- <p>{{ blogPost.blog_description }}</p> -->
                </div>
                </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import posts from './blog_posts.json';

defineProps("post");

const route = useRoute();
let blogPost = ref();

onMounted(() => {
    // console.log(props.blog);
    // console.log(blog);
    // console.log(this.blog);
    // console.log(route.params.id);
    let tmp;
    posts.forEach(blog => {
        if(blog.id == route.params.id) {
            tmp = blog;
        }
    });
    blogPost = tmp;
});


</script>

<style scoped>
h1 {
    margin: 0px;
}

h2 {
    margin-top: 10px;
}

.blog-post-container {
    background-color: #4f7faa;
    /* margin: 10px; */
    /* min-height: 500px; */
    border-radius: 15px;
    /* height: 85vh; */
}

.blog-post-title {
    position: absolute;
    top: 10%;
    right: 5%;
}

.blog-post-img {
    background-image: url("../assets/cody-silver-U_uv5Tfke9U-unsplash.jpg");
    width: 100vw;
    height: 200px;
    background-size: cover;
    background-blend-mode: lighten;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.blog-post-text {
    padding: 5px 10px 10px 10px;
}

.blog-post-tagline {
    text-align: center;
    margin: 20px 0px 20px 0px;
}

</style>
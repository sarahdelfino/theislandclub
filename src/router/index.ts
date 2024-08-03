import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/events',
      name: 'Events',
      component: () => import('../views/EventsView.vue')
    },
    {
      path: '/capital-project',
      name: 'Capital Project',
      component: () => import('../components/CapitalProject.vue')
    },
    {
      path: '/event/:id',
      name: 'event',
      component: () => import('../components/Event.vue'),
      props: true
    },
    {
      path: '/membership',
      name: 'Membership',
      component: () => import('../views/MembershipView.vue')
    },
    {
      path: '/gallery',
      name: 'Gallery',
      component: () => import('../views/GalleryView.vue')
    },
    {
      path: '/blog',
      name: 'Blog',
      component: () => import('../views/BlogView.vue')
    },
    {
      path: '/blog/:id',
      name: 'blog-post',
      component: () => import('../components/blog/BlogPost.vue'),
      props: true
    }
  ]
})

export default router

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "notyf/notyf.min.css";
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'

import { createRouter, createWebHistory } from "vue-router"
// import { useGlobalStore } from "./stores/global";

import HomePage from "./pages/HomePage.vue"
import Login from "./pages/Login.vue"
// import Post from "./pages/Post.vue"
import BlogPosts from "./pages/PostCard.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {   path: "/", 
        component: HomePage 
    },
    {   path: "/login", 
        component: Login 
    },
    // {   path: "/post/:id", 
    //     component: Post 
    // },
    {   path: "/posts", 
        component: BlogPosts 
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   const store = useGlobalStore()

//   if (to.meta.requiresAdmin && !store.user.isAdmin) {
//     return next("/")
//   }

//   next()
// })

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");

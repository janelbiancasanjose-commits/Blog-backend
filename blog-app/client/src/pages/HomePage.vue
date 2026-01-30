<script setup>
import { ref, onMounted, getCurrentInstance } from "vue"
import api from "../api"
import PostCard from "../pages/PostCard.vue"

const posts = ref([])
const loading = ref(true)

const { appContext } = getCurrentInstance()
const notyf = appContext.config.globalProperties.$notyf

const getPosts = async () => {
  loading.value = true
  try {
    const res = await api.get("/posts")
    posts.value = res.data
    notyf.success("Posts loaded successfully!")
  } catch (err) {
    console.error(err)
    notyf.error("Failed to load posts")
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getPosts()
})
</script>


<template>
  <div class="container">
    <h1 class="mb-4 text-center">All Blog Posts</h1>

    <!-- Loading / Error Feedback -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border" role="status"></div>
    </div>

    <div v-if="!loading && posts.length === 0" class="alert alert-info">
      No posts available.
    </div>

    <!-- Posts Grid -->
    <div class="row">
      <div class="col-md-6 mb-3" v-for="post in posts" :key="post._id">
        <PostCard :post="post" />
      </div>
    </div>
  </div>
</template>

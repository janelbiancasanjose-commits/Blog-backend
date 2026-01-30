<script setup>
import { getCurrentInstance } from "vue"

const props = defineProps({
  post: Object
})

const { appContext } = getCurrentInstance()
const notyf = appContext.config.globalProperties.$notyf

const notifyRead = () => {
  notyf.success(`Opening post: ${props.post.title}`)
}
</script>

<template>
  <div class="card mb-3 shadow-sm">
    <div class="card-body">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">
        {{ post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content }}
      </p>

      <div class="d-flex justify-content-between align-items-center">
        <router-link :to="`/post/${post._id}`" class="btn btn-primary btn-sm" @click="notifyRead">
          Read More
        </router-link>
        <small class="text-muted">by {{ post.author.username }}</small>
      </div>
    </div>
  </div>
</template>


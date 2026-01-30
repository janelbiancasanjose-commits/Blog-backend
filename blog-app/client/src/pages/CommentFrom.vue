<script setup>
import { ref } from "vue"
import api from "../api"
import { getCurrentInstance } from "vue"

const comment = ref("")
const props = defineProps({ postId: String })
const emit = defineEmits(["added"])

const { appContext } = getCurrentInstance()
const notyf = appContext.config.globalProperties.$notyf

const submitComment = async () => {
  try {
    if (!comment.value.trim()) return
    await api.post("/comments", { postId: props.postId, comment: comment.value })
    comment.value = ""
    emit("added")
    notyf.success("Comment added successfully!")
  } catch (err) {
    console.error(err)
    notyf.error("Failed to add comment")
  }
}
</script>

<template>
  <form @submit.prevent="submitComment" class="mb-3">
    <div class="mb-2">
      <textarea 
        v-model="comment" 
        class="form-control" 
        rows="2" 
        placeholder="Write a comment..."
        required
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary btn-sm">Post Comment</button>
  </form>
</template>



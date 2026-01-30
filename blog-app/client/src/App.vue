<script>
import { onBeforeMount } from "vue"
import { useGlobalStore } from "./stores/global"
import NavbarComponent from "./components/NavbarComponent.vue"

export default {
  components: {
    NavbarComponent
  },
  setup() {
    const globalStore = useGlobalStore()

    // Fetch user details on app load if token exists
    onBeforeMount(() => {
      const token = localStorage.getItem("token")
      if (token) {
        globalStore.getUserDetails(token)
      }
    })
  }
}
</script>

<template>
  <div>
    <!-- Navbar always visible -->
    <NavbarComponent />

    <!-- Main content container -->
    <main class="container my-4">
      <router-view />
    </main>
  </div>
</template>

<style>
/* Optional global styling */
body {
  background-color: #f8f9fa; /* light gray for Bootstrap look */
  font-family: 'Arial', sans-serif;
}

main {
  min-height: 80vh; /* keeps footer at bottom if added later */
}
</style>

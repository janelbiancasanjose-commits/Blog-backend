import { defineStore } from "pinia"
import api from "../api"

export const useGlobalStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token")
  }),
  actions: {
    async login(data) {
      const res = await api.post("/auth/login", data)
      this.token = res.data.token
      localStorage.setItem("token", res.data.token)
    },
    logout() {
      localStorage.removeItem("token")
      this.token = null
    }
  }
})

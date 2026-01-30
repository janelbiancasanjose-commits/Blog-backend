<script setup>
import { watch, ref, onBeforeMount } from 'vue';
import { Notyf } from 'notyf';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../stores/global.js';
import api from '../api.js';

const email = ref("");
const password = ref("");
const confirmPass = ref("");
const isEnabled = ref(false);

const notyf = new Notyf();
const router = useRouter();
const { user } = useGlobalStore();

watch(
  [email, password, confirmPass],
  ([mail, pass, confirm]) => {
    isEnabled.value =
      mail !== "" &&
      pass !== "" &&
      confirm !== "" &&
      pass === confirm;
  }
);

async function handleSubmit() {
  try {
    const response = await api.post('/users/register', {
      email: email.value,
      password: password.value
    });

    if (response.status === 201) {
      notyf.success(response.data.message || "Registered successfully");

      email.value = "";
      password.value = "";
      confirmPass.value = "";

      router.push("/login");
    }
  } catch (e) {
    if (e.response?.status === 409) {
      notyf.error(e.response.data.error); 
    } else {
      console.error(e);
      notyf.error("Registration Failed. Please try again.");
    }
  }
}


onBeforeMount(() => {
  const token = localStorage.getItem("token");
  if (token) router.push('/movies');
});
</script>

<template>
  <div id="wrapper">
    <form @submit.prevent="handleSubmit" class="register-form">
      <h1 class="title mb-4 text-center">Register</h1>

      <div class="mb-3">
        <label for="registerEmail" class="form-label">Email</label>
        <input type="email" id="registerEmail" placeholder="Enter Email" v-model="email" />
      </div>

      <div class="mb-3">
        <label for="registerPassword" class="form-label">Password</label>
        <input type="password" id="registerPassword" placeholder="Enter Password" v-model="password" />
      </div>

      <div class="mb-3">
        <label for="registerConfirmPassword" class="form-label">Confirm Password</label>
        <input type="password" id="registerConfirmPassword" placeholder="Confirm Password" v-model="confirmPass" />
      </div>

      <button type="submit" :disabled="!isEnabled" class="btn-register">
        Register
      </button>
    </form>
  </div>
</template>

<style scoped>
#wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.register-form {
  width: 100%;
  max-width: 480px;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border-radius: 16px;
  padding: 40px 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  color: white;
}

.title {
  font-size: 2rem;
  color: white;
}

.mb-3 {
  position: relative;
  margin: 25px 0;
}

.mb-3 label {
  display: block;
  margin-bottom: 8px;
  color: white;
}

.mb-3 input {
  width: 100%;
  padding: 15px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 40px;
  background: transparent;
  color: white;
  outline: none;
  transition: border 0.3s;
}

.mb-3 input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.mb-3 input:focus {
  border-color: #C695B0;
}

.btn-register {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 40px;
  font-size: 1rem;
  font-weight: bold;
  background-color: #BA7D9D !important;
  color: white !important;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-register:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.btn-register:not(:disabled):hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(222, 178, 237, 0.5);
}

@media (max-width: 600px) {
  .register-form {
    padding: 30px 20px;
  }
}
</style>

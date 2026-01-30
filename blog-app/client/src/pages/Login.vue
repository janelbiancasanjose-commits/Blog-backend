<script setup>
import { watch, ref, onBeforeMount } from 'vue';
import { Notyf } from 'notyf';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../stores/global';
import api from '../api';

const notyf = new Notyf();
const router = useRouter();
const { getUserDetails, user } = useGlobalStore();

const email = ref("");
const password = ref("");
const isEnabled = ref(false);

watch([email, password], ([newEmail, newPassword]) => {
  isEnabled.value = newEmail !== "" && newPassword !== "";
});


async function handleSubmit() {
  try {
    const res = await api.post('/users/login', {
      email: email.value,
      password: password.value
    });

    if (res.data.access) {
      localStorage.setItem("token", res.data.access);

      notyf.success("Login Successful");
      await getUserDetails(res.data.access);

      if (user.isAdmin === true) {
        router.push("/admin/movies"); 
      } else {
        router.push("/movies"); 
      }


    email.value = "";
    password.value = "";
  }

  } catch (e) {
    if (e.response?.status === 401) {
      notyf.error(e.response.data.message);
    } else {
      console.error(e);
      notyf.error("Login Failed. Please contact administrator.");
    }
  }
}

onBeforeMount(async () => {
  if (user.token) {
    await getUserDetails(user.token);
    if (user.isAdmin === true) {
      router.push("/admin/movies");
    } else {
      router.push("/movies");
    }
  }
});


</script>

<template>
  <div id="wrapper">
    <form @submit.prevent="handleSubmit" class="login-form">
      <h1 class="title mb-4 text-center">Login</h1>

      <div class="mb-3">
        <label for="userEmail" class="form-label">Email address</label>
        <input type="text" id="userEmail" placeholder="Enter email" v-model="email" />
        <i class="bx bxs-user"></i>
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" placeholder="Password" v-model="password" />
        <i class="bx bxs-lock-alt"></i>
      </div>

      <div id="remember-forgot"> 
        <label for=""><input type="checkbox">Remember me</label>
        <a href="#">Forgot Password?</a>
      </div>

      <button type="submit" :disabled="!isEnabled" class="btn-login">
        Login
      </button>

      <div id="register-link">
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
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

.login-form {
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
  padding: 15px 45px 15px 20px;
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

.mb-3 i {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: white;
}

.btn-login {
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

.btn-login:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}

.btn-login:not(:disabled):hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(222, 178, 237, 0.5);
}

@media (max-width: 600px) {
  .login-form {
    padding: 30px 20px;
  }
}

#remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 25px 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

#remember-forgot input[type="checkbox"] {
  margin-right: 8px;
  accent-color: #C695B0;
  cursor: pointer;
}

#remember-forgot a {
  color: #C695B0;
  text-decoration: none;
  transition: color 0.3s;
}

#remember-forgot a:hover {
  color: #fff;
}

#register-link {
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

#register-link a {
  color: #C695B0;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

#register-link a:hover {
  color: #fff;
}

</style>

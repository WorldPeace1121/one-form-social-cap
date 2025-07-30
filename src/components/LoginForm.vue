<template>
  <q-card class="main-card">
    <q-card-section class="flex flex-col items-center justify-center bg-img-main h-32">
      <h1 class="text-3xl font-bold text-white">Login</h1>
      <p>Please login to continue</p>
    </q-card-section>
    <q-card-section class="space-y-5 text-center">
      <p class="lg:w-[380px] text-base">
        We need to do KYC verification on your identity, so you must log in with X, click the button below to start
        logging in!
      </p>
      <div class="flex items-center justify-center space-x-5">
        <q-btn v-if="showClose" @click="userStore.setOpenLogin(false)" label="Close" color="negative" outline rounded />
        <q-btn :loading="loading || userStore.isXCallback" @click="xLogin" unelevated label="Sign in with X"
          color="blue" rounded icon="fa-brands fa-x-twitter" />
      </div>
      <p v-if="!emptyString(userStore.loginError)" class="text-negative text-xs">{{ userStore.loginError }}</p>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { authApi } from 'src/dist/api';
import { useUserStore } from 'src/stores/user';
import { emptyString } from 'src/dist/tools';
export default defineComponent({
  name: 'LoginForm',
  setup() {
    const userStore = useUserStore();
    return {
      userStore: ref(userStore),
      loading: ref(false),
    }
  },
  props: {
    showClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    emptyString,
    xLogin() {
      this.loading = true;
      this.userStore.loginError = '';
      authApi.xLogin().then((res) => {
        window.location.href = res.data;
      }).catch((err) => {
        this.userStore.loginError = err.message
        this.loading = false;
      })
    },
  }
})
</script>

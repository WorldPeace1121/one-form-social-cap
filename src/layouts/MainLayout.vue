<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="main-toolbar py-2">
        <div class="flex items-center space-x-5 lg:space-x-10 flex-1">
          <router-link to="/">
            <q-img src="/logo.png" fit="contain" height="38px" width="110px" />
          </router-link>
          <MainMenu />
        </div>
        <UserLogin />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <footer class="pc-footer p-4 mt-10">
      <div class="container space-y-3">
        <div class="flex items-center justify-center">
          <q-btn href="https://github.com/WorldPeace1121" target="_blank" flat icon="fa-brands fa-github"
            color="white" />
        </div>
        <p class="text-center text-white text-sm">
          Copyright © 2025 Social Cap. All rights reserved.
        </p>
      </div>
    </footer>
    <q-dialog v-model="userStore.fullLoading" persistent>
      <q-card class="w-[380px]" flat>
        <div class="bg-primary p-5 flex flex-col items-center justify-center">
          <q-img src="logo.png" width="200px" fit="contain" height="100px"></q-img>
        </div>
        <q-card-section class="flex flex-col items-center justify-center p-10">
          <q-spinner-hourglass color="primary" size="4em" />
          <h5 class="text-center font-bold text-xl mt-5">{{ userStore.fullLoadingText }}</h5>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar';
import UserLogin from 'src/components/UserLogin.vue';
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user';
import { emptyString } from 'src/dist/tools';
import { authApi, userAppToken } from 'src/dist/api';
import MainMenu from 'src/components/MainMenu.vue';
export default defineComponent({
  components: {
    UserLogin,
    MainMenu,
  },
  name: 'MainLayout',
  setup: function () {
    const $q = useQuasar()
    const userStore = useUserStore()
    if (userAppToken.has()) {
      userStore.isLogin = true
      userStore.getUserInfo()
    }
    return {
      $q: ref($q),
      userStore: ref(userStore),
    }
  },
  created: function () {
    const { oauth_token, oauth_verifier } = this.$route.query
    if (!emptyString(oauth_token) && !emptyString(oauth_verifier)) {
      this.userStore.setIsXCallback(true)
      authApi.login({
        oauth_token,
        oauth_verifier
      }).then((res) => {
        this.userStore.loginSuccess(res.data)
      }).catch((err) => {
        this.userStore.loginError = err.message
      }).finally(() => {
        this.userStore.setIsXCallback(false)
      })
    }
  }
})
</script>

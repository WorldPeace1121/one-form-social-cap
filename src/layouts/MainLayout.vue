<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="main-toolbar py-2">
        <div class="flex items-center space-x-5 lg:space-x-10 flex-1">
          <router-link to="/">
            <q-img src="/logo.png" fit="contain" height="38px" width="110px" />
          </router-link>
          <q-list dense v-if="!$q.screen.lt.sm" class="main-menu">
            <q-item clickable :to="{ name: 'HomePage' }">
              <q-item-section>
                <q-item-label>Home</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable :to="{ name: 'MyProposal' }">
              <q-item-section>
                <q-item-label>My Proposal</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <UserLogin />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="px-3 py-2 shadow-lg shadow-blue-100" v-if="$q.screen.lt.sm">
      <q-list dense class="main-menu">
        <q-item class="flex-col items-center justify-center" clickable :to="{ name: 'ProposalPage' }">
          <q-item-section class="!min-w-[auto] !pr-0 mb-1" avatar>
            <q-icon name="home"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>Proposals</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="flex-col items-center justify-center" clickable :to="{ name: 'MyProposal' }">
          <q-item-section class="!min-w-[auto] !pr-0 mb-1" avatar>
            <q-icon name="list"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>My Proposal</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="flex-col items-center justify-center" clickable :to="{ name: 'SocialPage' }">
          <q-item-section class="!min-w-[auto] !pr-0 mb-1" avatar>
            <q-icon name="account_tree"></q-icon>
          </q-item-section>
          <q-item-section>
            <q-item-label>Social</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-footer>
    <footer v-else class="pc-footer p-4 mt-10">
      <div class="container space-y-3">
        <div class="flex items-center justify-center">
          <q-btn href="https://github.com/26dos" target="_blank" flat icon="fa-brands fa-github" color="white" />
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
export default defineComponent({
  components: {
    UserLogin,
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

<template>
  <q-layout view="lHh lpR lFf">
    <q-header reveal class="allocator-header">
      <q-toolbar>
        <q-btn v-if="$q.screen.lt.sm" dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="flex-1">
          {{ title }}
        </q-toolbar-title>
        <div>
          <UserLogin color="primary" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer :width="200" class="allocator-drawer" show-if-above v-model="leftDrawerOpen" side="left">
      <div class="flex flex-col space-y-10">
        <div class="pt-10 px-5 text-center">
          <router-link :to="{ name: 'AllocatorLayout' }">
            <q-img height="40px" fit="contain" src="/logo.png"></q-img>
          </router-link>
        </div>
        <q-list class="allocator-menu">
          <q-item clickable :to="{ name: 'ProposalManagement' }">
            <q-item-section avatar>
              <q-icon name="list"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>
                Proposals
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import UserLogin from 'src/components/UserLogin.vue'
import { useUserStore } from 'src/stores/user'
import { userAppToken } from 'src/dist/api'

export default defineComponent({
  name: 'AllocatorLayout',
  components: {
    UserLogin
  },
  setup() {
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
  data() {
    return {
      title: '',
    }
  },
  created() {
    this.title = this.$route.meta.title
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    }
  }
})
</script>

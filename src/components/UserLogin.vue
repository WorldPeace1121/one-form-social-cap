<template>
  <q-btn v-if="!userStore.isLogin" label="Login" color="white" outline rounded icon="account_circle"
    @click="userStore.setOpenLogin(true)" />
  <q-btn-dropdown class="user-info-btn" v-else :label="userStore.userInfo.display_name" color="white" outline rounded
    :icon="`img:${userStore.userInfo.user_img}`">
    <q-list>
      <q-item clickable @click="userStore.loginOut()">
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
  <q-dialog v-model="userStore.openLogin">
    <login-form />
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user';
import { emptyString } from 'src/dist/tools';
import LoginForm from 'src/components/LoginForm.vue';

export default defineComponent({
  name: 'UserLogin',
  components: {
    LoginForm
  },
  setup() {
    const userStore = useUserStore();
    return {
      openLogin: ref(false),
      loading: ref(false),
      userStore: ref(userStore),
    };
  },
  methods: {
    emptyString,
  },
});
</script>

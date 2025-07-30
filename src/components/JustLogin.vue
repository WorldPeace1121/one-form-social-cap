<template>
  <div class="h-screen flex flex-col items-center justify-center" v-if="!userStore.isLogin">
    <LoginForm :show-close="false" />
  </div>
  <slot name="after" v-else></slot>
</template>
<script>
import { defineComponent } from 'vue';
import { useUserStore } from 'src/stores/user';
import { emptyString } from 'src/dist/tools';
import LoginForm from 'src/components/LoginForm.vue';
export default defineComponent({
  name: 'JustLogin',
  setup: function () {
    const userStore = useUserStore()
    return {
      userStore
    }
  },
  components: {
    LoginForm
  },
  methods: {
    emptyString,
  }
})
</script>

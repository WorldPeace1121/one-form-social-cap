<template>
  <q-card class="main-card">
    <q-card-section class="flex items-center justify-between bg-blue-500 text-white">
      <div class="flex items-center space-x-3">
        <q-icon name="fa-brands fa-x-twitter" size="1.5em" />
        <h2 class="text-lg font-bold">
          KYC Verification
        </h2>
      </div>
    </q-card-section>
    <q-list>
      <q-item v-for="item in items" :key="item.title">
        <q-item-section>
          <q-item-label>{{ item.title }}</q-item-label>
          <q-item-label caption>{{ item.value }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="check_circle" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KycCard',
  data: function () {
    return {
      items: [
        {
          title: 'Registration Time',
          value: 'Social accounts must be registered for at least six months to avoid new temporary accounts or script behavior.'
        },
        {
          title: 'Fans',
          value: 'The account must have at least 50 followers to ensure it has a certain social relationship and interaction base.'
        },
        {
          title: 'Followers',
          value: 'The account should follow at least 20 other users to reflect the active participation in social networks.'
        },
        {
          title: 'Content Activity',
          value: 'The account must have published at least 30 tweets or public content to prove its activity and historical behavior record.'
        },
        {
          title: 'Basic Information Complete',
          value: 'The account should set an avatar and personal introduction, and does not accept applications for accounts without an avatar or blank introduction.'
        },
        {
          title: 'Authentication Status as a Bonus',
          value: 'If the account is a platform certified user (such as Twitter blue), some requirements can be relaxed and the trust score can be increased.'
        }
      ]
    }
  }
})
</script>

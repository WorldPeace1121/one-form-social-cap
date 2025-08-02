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
          <q-item-label class="font-bold">{{ item.title }}</q-item-label>
          <q-item-label caption class="!mt-2">{{ item.value }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="check_circle" color="green" v-if="x_verify.x_verify[item.key] === true" />
          <q-icon name="cancel" color="red" v-else />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'KycCard',
  props: {
    x_verify: {
      type: Object,
      default: () => ({
        x_verify: {}
      })
    }
  },
  data: function () {
    return {
      items: [
        {
          title: 'Registration Time',
          value: 'Social accounts must be registered for at least six months to avoid new temporary accounts or script behavior.',
          key: "register_time"
        },
        {
          title: 'Fans',
          value: 'The account must have at least 50 followers to ensure it has a certain social relationship and interaction base.',
          key: "fans_count"
        },
        {
          title: 'Followers',
          value: 'The account should follow at least 20 other users to reflect the active participation in social networks.',
          key: "follow_count"
        },
        {
          title: 'Content Activity',
          value: 'The account must have published at least 30 tweets or public content to prove its activity and historical behavior record.',
          key: "statuses_count"
        },
        {
          title: 'Basic Information Complete',
          value: 'The account should set an avatar and personal introduction, and does not accept applications for accounts without an avatar or blank introduction.',
          key: "basic_info"
        },
        {
          title: 'Authentication Status as a Bonus',
          value: 'If the account is a platform certified user (such as Twitter blue), some requirements can be relaxed and the trust score can be increased.',
          key: "verified"
        }
      ]
    }
  }
})
</script>

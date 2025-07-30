<template>
  <q-card class="main-card proposal-item">
    <q-item class="p-2" clickable :to="{ name: 'ProposalDetailPage', params: { pid: proposal.p_id } }">
      <q-item-section avatar class="!pr-0">
        <div :class="` ${proposal.bg_color} proposal-item-avatar`">
          {{ proposal.p_name[0] }}
          <span class="text-lg font-bold">
            {{ proposal.request_data_cap }}
          </span>
        </div>
      </q-item-section>
      <q-item-section class="mt-5 px-3 pb-3">
        <q-item-label lines="1" class="text-lg font-bold">
          {{ proposal.p_name }}
        </q-item-label>
        <q-item-label>
          <div class="flex items-center space-x-2">
            <q-avatar size="20px">
              <q-img :src="proposal.user.user_img" />
            </q-avatar>
            <span> {{ proposal.user.display_name }} </span>
          </div>
        </q-item-label>
        <q-item-label lines="2" class="!mt-3 leading-loose">
          {{ proposal.description }}
        </q-item-label>
        <q-item-label caption class="!mt-3">
          <div class="flex items-center no-wrap space-x-1">
            <q-chip square icon="check_circle_outline" color="green" text-color="white" class="!ml-0 text-sm"
              label="KYC verified"></q-chip>
            <q-chip square :color="constStatusConfig[proposal.status]?.color || 'grey'" text-color="white"
              class="text-sm">
              {{ constStatusConfig[proposal.status]?.label || proposal.status }}
            </q-chip>
          </div>
          <ul class="text-xs text-meta flex items-center justify-between mt-2">
            <li> Created {{ dateFromNow(proposal.created_at) }}</li>
            <li>
              <q-btn padding="0px" size="sm" color="blue-5" dense icon="fa-brands fa-x-twitter" flat
                :href="`https://x.com/${proposal.user.screen_name}`" target="_blank"
                :label="`@${proposal.user.screen_name}`" @click.stop></q-btn>
            </li>
          </ul>
        </q-item-label>
      </q-item-section>
      <q-item-section side v-if="$q.screen.lt.sm">
        <q-icon name="chevron_right" />
      </q-item-section>
    </q-item>
  </q-card>
</template>
<script>
import { dateFromNow, emptyString } from 'src/dist/tools';
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { constStatusConfig } from 'src/dist/const-data';
export default defineComponent({
  name: 'ProposalItem',
  props: {
    proposal: {
      type: Object
    },
  },
  setup: function () {
    const $q = useQuasar()
    return {
      $q
    }
  },
  data: function () {
    return {
      constStatusConfig
    }
  },
  methods: {
    dateFromNow,
    emptyString
  }
})
</script>

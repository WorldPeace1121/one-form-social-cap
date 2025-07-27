<template>
  <q-card flat class="main-card">
    <q-card-section class="bg-primary text-white flex items-center space-x-3">
      <q-icon name="fa-solid fa-clock" size="1.5em" />
      <h2 class="text-lg font-bold">
        Proposal Timeline
      </h2>
    </q-card-section>
    <q-card-section>
      <q-timeline v-if="proposal">
        <q-timeline-entry title="Created a proposal" :subtitle="formatDateTime(proposal.created_at)" icon="add_circle"
          color="positive" />
        <q-timeline-entry subtitle="Status" :title="status.label" :icon="status.icon" :color="status.color">
          <template v-if="proposal.status === 'reject'">
            <p v-html="proposal.reason_rejection"></p>
          </template>
        </q-timeline-entry>
        <q-timeline-entry v-if="!['submit', 'draft', 'reject'].includes(proposal.status)" subtitle="Staking"
          :icon="emptyString(proposal.staking_time) ? 'pending_actions' : 'check_circle'"
          :color="emptyString(proposal.staking_time) ? 'primary' : 'positive'"
          :title="emptyString(proposal.staking_time) ? 'Waiting staking' : 'Staked'">
          <p>
            Approve to get <span class="font-bold text-primary">{{ proposal.data_cap }}</span> DC quota,
            pledge <span class="font-bold text-red-500">{{ formatEther(proposal.staking_amount) }} FIL</span>
          </p>
        </q-timeline-entry>
      </q-timeline>
    </q-card-section>
  </q-card>
</template>
<script>
import { defineComponent } from 'vue';
import { formatDateTime, emptyString } from 'src/dist/tools';
import { formatEther } from 'ethers';
import { constStatusConfig } from 'src/dist/const-data';
export default defineComponent({
  name: 'StatusTimeline',
  props: {
    proposal: {
      type: Object,
      required: true,
      default: () => ({
        status: 'draft'
      })
    },
  },
  data: function () {
    return {
      constStatusConfig,
      status: {
        color: '',
        label: '',
        icon: ''
      }
    }
  },
  watch: {
    proposal: {
      handler(newVal) {
        this.status = this.constStatusConfig[newVal.status];
      },
      immediate: true,
      deep: true
    },
  },
  methods: {
    formatDateTime,
    emptyString,
    formatEther,
  },
});
</script>

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
        <template v-if="proposal.status === 'success' && proposal.plans != null && proposal.plans.length > 0">
          <q-timeline-entry v-for="value in proposal.plans" :key="value.id"
            :subtitle="constStatusConfig[value.status].capTitle" :title="`${value.data_cap} TiB`"
            :icon="constStatusConfig[value.status].icon" :color="constStatusConfig[value.status].color">
            <p>
              The plan was created on <span class="font-bold text-primary">{{ formatDateTime(value.created_at)
              }}</span>,
              automatically implemented on <span class="font-bold text-primary">{{ formatDateTime(value.execution_time)
              }}</span>,
              and issuing <span class="font-bold text-primary">{{ value.data_cap }} TiB</span>.
            </p>
          </q-timeline-entry>
        </template>
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

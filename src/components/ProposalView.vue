<template>
  <div class="grid grid-cols-12 gap-4 proposal-view">
    <div class="col-span-9 space-y-5">
      <q-card class="main-card">
        <q-card-section class=" text-primary">
          <div class="flex items-center space-x-2">
            <q-icon name="description" size="2em" />
            <h1 class="text-2xl font-bold">{{ proposal.p_name }}</h1>
          </div>
        </q-card-section>
        <q-scroll-area class="lg:h-[600px]">
          <proposal-content :proposal-content="proposalContent" />
        </q-scroll-area>
      </q-card>
      <proposal-comments :p_id="proposal.p_id" :proposal="proposal" />
    </div>
    <q-card class="main-card col-span-3">
      <q-card-section class="proposal-timeline">
        <status-timeline :proposal="proposal" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { constProposalForm } from 'src/dist/proposal-form';
import { emptyString, formatDateTime } from 'src/dist/tools';
import { constStatusConfig } from 'src/dist/const-data';
import { formatEther } from 'ethers';
import ProposalComments from 'src/components/ProposalComments.vue';
import StatusTimeline from 'src/components/StatusTimeline.vue';
import ProposalContent from 'src/components/ProposalContent.vue';
export default defineComponent({
  name: 'ProposalView',
  components: {
    ProposalComments,
    StatusTimeline,
    ProposalContent
  },
  props: {
    proposal: {
      type: Object,
      required: true,
      default: () => ({
        status: 'draft'
      })
    }
  },
  data: function () {
    return {
      proposalContent: {
        created_at: '',
      },
      constProposalForm,
      constStatusConfig,
      status: {
        color: '',
        label: '',
        icon: ''
      }
    }
  },
  methods: {
    formatDateTime,
    emptyString,
    formatEther
  },
  watch: {
    proposal: {
      handler: function (newVal) {
        if (!newVal.p_content) return;
        const obj = JSON.parse(newVal.p_content);
        obj.forEach(element => {
          this.proposalContent[element.key] = element.value;
        });
        this.status = constStatusConfig[newVal.status];
      },
      immediate: true
    }
  },
})
</script>

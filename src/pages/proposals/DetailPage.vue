<template>
  <q-page>
    <div class="proposal-view">
      <div class="home-page-header bg-img-main">
        <div class="container pb-10">
          <q-btn padding="0" icon="arrow_back" flat label="Back" @click="goBack" />
          <h1 class="lg:text-3xl text-2xl font-bold text-white uppercase mt-5">{{ proposal.p_name }}</h1>
          <p class="text-white mt-4 lg:w-[60%] text-lg leading-loose">
            {{ proposalContent.project_history }}
          </p>
          <div class="flex items-center space-x-2">
            <q-chip color="primary" :label="proposal.request_data_cap"></q-chip>
            <q-btn v-if="proposal.user" rounded size="sm" color="blue-5" icon="fa-brands fa-x-twitter" unelevated
              :href="`https://x.com/${proposal.user.screen_name}`" target="_blank"
              :label="`@${proposal.user.screen_name}`" @click.stop></q-btn>
          </div>
        </div>
      </div>
      <div class="-mt-20">
        <div class="container">
          <div class="grid lg:grid-cols-12 gap-4">
            <div class="lg:col-span-9">
              <q-card class="main-card">
                <proposal-content :proposal-content="proposalContent" />
                <proposal-comments :p_id="proposal.p_id" :proposal="proposal" />
              </q-card>
            </div>
            <div class="lg:col-span-3">
              <StatusTimeline :proposal="proposal" />
            </div>
          </div>
          <q-inner-loading color="primary" :showing="loading">
            <q-spinner-hourglass class="mx-auto" color="primary" size="3em" />
          </q-inner-loading>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { constProposalForm } from 'src/dist/proposal-form';
import { formatDateTime } from 'src/dist/tools';
import { constStatusConfig } from 'src/dist/const-data';
import { proposalApi } from 'src/dist/api';
import StatusTimeline from 'src/components/StatusTimeline.vue';
import ProposalComments from 'src/components/ProposalComments.vue';
import ProposalContent from 'src/components/ProposalContent.vue';

export default defineComponent({
  name: 'ProposalDetailPage',
  components: {
    StatusTimeline,
    ProposalComments,

    ProposalContent
  },
  data: function () {
    return {
      proposalContent: {},
      constProposalForm,
      constStatusConfig,
      status: {
        color: '',
        label: '',
        icon: ''
      },
      proposal: {
        status: 'draft',
        created_at: '',
        p_id: '',
        request_data_cap: '',
        user: undefined,
        p_content: ''
      },
      loading: true,
      tab: "proposal"
    }
  },
  methods: {
    formatDateTime,
    goBack: function () {
      this.$router.back();
    }
  },
  created: function () {
    this.loading = true;
    proposalApi.proposal(this.$route.params.pid).then(res => {
      this.proposal = res.data;
    }).finally(() => {
      this.loading = false;
    });
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

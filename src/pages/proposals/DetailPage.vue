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
        </div>
      </div>
      <div class="-mt-20">
        <div class="container">
          <q-card class="main-card">
            <q-tabs inline-label active-bg-color="primary" active-color="white" inactive-color="primary" no-caps
              align="left" v-model="tab">
              <q-tab icon="assignment" name="proposal" label="Proposal Information"></q-tab>
              <q-tab icon="calendar_month" name="timeline" label="Proposal Timeline"></q-tab>

            </q-tabs>
            <q-tab-panels v-model="tab">
              <q-tab-panel class="p-0" name="proposal">
                <template v-for="(item, index) in constProposalForm" :key="index">
                  <q-list separator class="proposal-form-list">
                    <q-item-label header class="text-xl font-bold">
                      <div class="flex items-center space-x-2">
                        <span class="h-10 w-10 bg-primary rounded-full text-white flex items-center justify-center">
                          <q-icon :name="`fa-solid fa-${index + 1}`" size="1em" />
                        </span>
                        <span class="text-primary">{{ item.group }}</span>
                      </div>
                    </q-item-label>
                    <template v-for="field in item.fields" :key="field.key">
                      <q-item :class="`item-${field.type}`">
                        <q-item-section side>
                          <q-item-label>{{ field.label }}:</q-item-label>
                        </q-item-section>
                        <q-item-section class="content">
                          <template v-if="proposalContent[field.key] !== undefined">
                            <q-item-label>{{ proposalContent[field.key] }}</q-item-label>
                          </template>
                          <template v-else>
                            <q-item-label>--</q-item-label>
                          </template>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-list>
                </template>
                <proposal-comments :p_id="proposal.p_id" :proposal="proposal" />
              </q-tab-panel>
              <q-tab-panel name="timeline">
                <q-card-section class="proposal-timeline">
                  <StatusTimeline :proposal="proposal" />
                </q-card-section>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
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
export default defineComponent({
  name: 'ProposalDetailPage',
  components: {
    StatusTimeline,
    ProposalComments
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
        console.log(this.proposalContent);
      },
      immediate: true
    }
  },
})
</script>

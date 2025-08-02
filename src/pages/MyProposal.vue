<template>
  <q-page>
    <JustLogin>
      <template #after>
        <div class="home-page-header bg-img-main">
          <div class="container !pb-20">
            <h1 class="lg:text-3xl text-2xl font-bold text-white uppercase mt-5">My Proposal</h1>
            <div class="mt-3">
              <q-chip v-if="!emptyString(userProposal.status)" :icon="constStatusConfig[userProposal.status]?.icon"
                :color="constStatusConfig[userProposal.status]?.color || 'grey'" text-color="white">
                {{ constStatusConfig[userProposal.status]?.label || userProposal.status }}
              </q-chip>
            </div>
            <div class="mt-5">
              <template v-if="['draft', 'reject'].includes(userProposal.status)">
                <q-btn icon="edit" label="Edit Proposal" push rounded color="warning"
                  :to="{ name: 'CreateProposalPage' }" />
              </template>
            </div>
          </div>
        </div>
        <div class="-mt-20">
          <div class="container">
            <q-card class="main-card">
              <div class="flex flex-col items-center justify-center space-y-4 p-5"
                v-if="userProposal.status === 'no_data'">
                <q-icon name="warning" size="4em" color="negative" />
                <p class="text-negative">You haven't submitted a proposal yet. Click the button below to create one!</p>
                <q-btn icon-right="arrow_forward" label="Create Proposal" push rounded size="lg" color="primary"
                  :to="{ name: 'CreateProposalPage' }" />
              </div>
              <template v-else-if="userProposal.status === 'reject'">
                <div class="bg-warning p-5">
                  <div class="flex items-center space-x-5">
                    <q-icon name="warning" size="4em" />
                    <h1 class="text-2xl font-bold">Rejected</h1>
                  </div>
                  <p v-html="userProposal.reason_rejection"></p>
                </div>
              </template>
              <template v-else>
                <q-card-section class="flex items-center justify-between py-0 pl-0">
                  <q-tabs inline-label indicator-color="primary" active-color="white" active-bg-color="primary"
                    align="left" v-model="pageTab">
                    <q-tab icon="assignment" label="Details" name="details"></q-tab>
                    <q-tab icon="calendar_month" label="Allocation Plan" name="allocation_plan"
                      :disable="userProposal.status !== 'approved'"></q-tab>
                  </q-tabs>
                </q-card-section>
                <div class="relative min-h-[270px]">
                  <q-tab-panels class="bg-transparent" v-model="pageTab" animated>
                    <!-- proposal -->
                    <q-tab-panel name="details" class="p-0">
                      <UserProposal :setUserProposal="setUserProposal" :setLoading="setLoading" />
                    </q-tab-panel>
                    <!-- Allocation plan -->
                    <q-tab-panel name="Allocation plan" class="p-0">
                    </q-tab-panel>
                  </q-tab-panels>
                  <q-inner-loading color="primary" :showing="loading">
                    <q-spinner-hourglass class="mx-auto" color="primary" size="3em" />
                  </q-inner-loading>
                </div>
              </template>
            </q-card>
          </div>
        </div>
      </template>
    </JustLogin>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useUserStore } from 'src/stores/user';
import { emptyString } from 'src/dist/tools';
import JustLogin from 'src/components/JustLogin.vue';
import UserProposal from 'src/components/UserProposal.vue';
import { constStatusConfig } from 'src/dist/const-data';

export default defineComponent({
  name: 'MyProposal',
  components: {
    JustLogin,
    UserProposal,
  },
  setup() {
    const userStore = useUserStore();
    return {
      userStore: ref(userStore),
    }
  },
  watch: {
  },
  data: function () {
    return {
      loading: false,
      constStatusConfig,
      pageTab: 'details',
      userProposal: {
        status: '',
      },
    }
  },
  methods: {
    emptyString,
    setLoading: function (val) {
      this.loading = val;
    },
    setUserProposal: function (val) {
      this.userProposal = val;
    }
  }
})
</script>

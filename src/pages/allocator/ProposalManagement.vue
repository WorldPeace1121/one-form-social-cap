<template>
  <q-page padding>
    <q-table :loading="loading" separator="none" :pagination="pagination" flat :columns="columns" :rows="rows">
      <template v-slot:body-cell-user="props">
        <q-td :props="props">
          <div class="flex items-center space-x-2">
            <q-avatar size="30px">
              <q-img :src="props.row.user.user_img" />
            </q-avatar>
            <span> {{ props.row.user.display_name }} </span>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-plans="props">
        <q-td :props="props">
          <q-btn @click="openPlansDialog(props.row)" rounded unelevated color="primary" label="Manage Plans" />
        </q-td>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :color="constStatusConfig[props.row.status].color">
            {{ constStatusConfig[props.row.status].label }}
          </q-badge>
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props" class="space-x-2">
          <q-btn target="_blank" :to="`/proposal/detail/${props.row.p_id}`" rounded unelevated color="primary"
            label="View" />
          <q-btn :disable="props.row.status !== 'submit'" rounded unelevated color="negative" label="Audit"
            @click="openAuditDialog(props.row)" />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="auditDialog" persistent>
      <q-card class="main-card lg:w-[400px]">
        <q-card-section class="bg-primary text-white flex items-center justify-between">
          <div class="text-4xl font-bold">Audit Proposal</div>
          <q-btn icon="close" outline round v-close-popup />
        </q-card-section>
        <q-tabs v-model="auditTab" active-color="primary" indicator-color="primary">
          <q-tab name="approve" label="Approve" />
          <q-tab name="reject" label="Reject" />
        </q-tabs>
        <q-tab-panels v-model="auditTab" animated>
          <q-tab-panel name="approve">
            <q-form class="space-y-2" @submit="handleAudit">
              <q-input :rules="[(val) => !emptyString(val) || 'Please enter a value']" label="Approved DataCap Share"
                outlined v-model="auditForm.data_cap"></q-input>
              <div class="!mt-5">
                <q-btn class="w-full" rounded unelevated size="lg" label="Submit" color="primary" type="submit" />
              </div>
            </q-form>
          </q-tab-panel>
          <q-tab-panel name="reject">
            <q-form @submit="handleRejection">
              <q-input :rules="[(val) => !emptyString(val) || 'Please enter a value']" type="textarea" label="Reason"
                outlined v-model="auditForm.reason"></q-input>
              <div class="!mt-5">
                <q-btn class="w-full" rounded unelevated size="lg" label="Submit" color="negative" type="submit" />
              </div>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
        <q-inner-loading color="primary" :showing="auditLoading">
          <q-spinner-hourglass class="mx-auto" color="primary" size="3em" />
        </q-inner-loading>
      </q-card>
    </q-dialog>
    <PlansDialog ref="plansDialog" />
  </q-page>
</template>
<script>
import { defineComponent } from 'vue';
import { proposalApi } from 'src/dist/api';
import { customAlert, emptyString } from 'src/dist/tools';
import { constStatusConfig } from 'src/dist/const-data';
import PlansDialog from './components/PlansDialog.vue';
import { formatEther } from 'ethers';
export default defineComponent({
  name: 'ProposalManagement',
  components: {
    PlansDialog
  },
  data() {
    return {
      loading: false,
      constStatusConfig,
      auditTab: 'approve',
      auditDialog: false,
      auditForm: {
        data_cap: null,
      },
      columns: [
        {
          name: 'p_name',
          label: 'Proposal Name',
          field: 'p_name',
          align: 'left',
        }, {
          name: 'user',
          label: 'User',
          align: 'left',
        }, {
          field: 'request_data_cap',
          label: 'Request Data Cap',
          align: 'left',
        }, {
          field: 'data_cap',
          label: 'Approved Data Cap',
          align: 'left',
        }, {
          field: 'plans',
          name: 'plans',
          label: 'Plans',
          align: 'left',
        }, {
          label: 'Status',
          align: 'left',
          name: 'status',
          field: 'status'
        }, {
          align: 'right',
          name: 'action'
        }
      ],
      rows: [],
      pagination: {
        rowsPerPage: 10,
        page: 1,
      },
      selectedProposal: null,
      auditLoading: false,
    }
  },
  watch: {
    'pagination.page': {
      handler() {
        this.getProposals()
      },
      immediate: true,
    },
  },
  methods: {
    emptyString,
    formatEther,
    getProposals() {
      this.loading = true;
      proposalApi.proposals().then((response) => {
        this.rows = response.data.data
      }).finally(() => {
        this.loading = false;
      })
    },
    openAuditDialog(proposal) {
      this.selectedProposal = proposal;
      this.auditForm.data_cap = proposal.request_data_cap;
      this.auditDialog = true;
    },
    handleAudit() {
      this.auditLoading = true;
      proposalApi.audit(this.selectedProposal.p_id, this.auditForm).then((res) => {
        this.updateProposal(res.data)
        customAlert.success('Audit successful');
        this.auditDialog = false;
      }).catch((error) => {
        customAlert.error(error.message);
      }).finally(() => {
        this.auditLoading = false;
      })
    },
    updateProposal(proposal) {
      const rows = this.rows
      const index = rows.findIndex((row) => row.p_id === proposal.p_id)
      rows[index] = proposal
      this.rows = rows
    },
    openPlansDialog(proposal) {
      this.$refs.plansDialog.openDialog(proposal.id)
    },
    handleRejection() {
      this.auditLoading = true;
      proposalApi.rejection(this.selectedProposal.p_id, this.auditForm).then((res) => {
        this.updateProposal(res.data)
        this.auditDialog = false;
        customAlert.success('Rejection successful');
      }).catch((error) => {
        customAlert.error(error.message);
      }).finally(() => {
        this.auditLoading = false;
      })
    }
  }
});
</script>

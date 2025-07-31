<template>
  <q-dialog v-model="open" persistent>
    <q-card class="main-card" id="plans-dialog-card">
      <q-card-section class="bg-primary text-white text-center flex justify-between items-center">
        <h1 class="text-2xl font-bold">Plans</h1>
        <q-btn round outline icon="close" color="white" v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-table hide-bottom :pagination="{ rowsPerPage: 0 }" flat :rows="plans" :columns="columns">
          <template v-slot:top-right>
            <div class="flex items-center gap-2">
              <q-btn rounded outline label="Add Plan" color="primary" @click="addPlan" />
              <q-btn rounded unelevated label="Save" color="primary" @click="savePlans" />
            </div>
          </template>
          <!-- execution_time -->
          <template v-slot:body-cell-execution_time="props">
            <q-td :props="props">
              <q-input :disable="props.row.status !== 'pending'" dense outlined v-model="props.row.execution_time"
                type="datetime-local" />
            </q-td>
          </template>
          <!-- data_cap -->
          <template v-slot:body-cell-data_cap="props">
            <q-td :props="props">
              <q-input :disable="props.row.status !== 'pending'" dense outlined v-model="props.row.data_cap"
                type="number">
                <template v-slot:append>
                  <span class="text-sm text-primary font-bold">TIB</span>
                </template>
              </q-input>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
      <q-inner-loading :showing="loading">
        <q-spinner-dots color="primary" size="40px" />
      </q-inner-loading>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import { proposalApi } from 'src/dist/api'
import { emptyString, customAlert } from 'src/dist/tools'
export default defineComponent({
  name: 'PlansDialog',
  data() {
    return {
      open: false,
      loading: false,
      plans: [],
      p_id: null,
      columns: [{
        "name": "created_at",
        "label": "Created At",
        "field": "created_at",
        "align": "left"
      }, {
        "name": "execution_time",
        "label": "Execution Time",
        "field": "execution_time",
        "align": "left"
      }, {
        "name": "data_cap",
        "label": "Data Cap",
        "field": "data_cap",
        "align": "left"
      }, {
        "name": "status",
        "label": "Status",
        "field": "status",
        "align": "left"
      }, {
        "name": "tx_hash",
        "label": "TX Hash",
        "field": "allocate_tx",
        "align": "left"
      }]
    }
  },
  methods: {
    openDialog(p_id) {
      this.open = true
      this.p_id = p_id
      this.getPlans()
    },
    getPlans() {
      this.loading = true
      proposalApi.plans(this.p_id).then(res => {
        this.plans = res.data
      }).finally(() => {
        this.loading = false
      })
    },
    close() {
      this.open = false
    },
    addPlan() {
      this.plans.push({
        "created_at": "--",
        "execution_time": undefined,
        "data_cap": 0,
        "status": "pending",
        "allocate_tx": null,
      })
    },
    async savePlans() {
      if (this.plans.length <= 0) {
        return
      }
      let data = []
      for (let i = 0; i < this.plans.length; i++) {
        const plan = this.plans[i]
        if (plan.status != 'pending') {
          continue
        }
        if (emptyString(plan.execution_time)) {
          customAlert.warning('Execution time is required')
          return
        }
        if (emptyString(plan.data_cap)) {
          customAlert.warning('Data cap is required')
          return
        }
        data.push({
          "execution_time": plan.execution_time,
          "data_cap": plan.data_cap,
          "id": plan.id
        })
      }
      if (data.length <= 0) {
        customAlert.warning('No plans to save')
        return
      }
      try {
        this.loading = true
        await proposalApi.createPlan(this.p_id, {
          plans: data
        })
        customAlert.success('Plans saved successfully')
        this.getPlans()
      } catch (error) {
        customAlert.error(error.message)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>

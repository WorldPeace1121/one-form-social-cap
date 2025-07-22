<template>
  <q-page>
    <JustLogin>
      <template #after>
        <div class="home-page-header bg-img-main">
          <div class="container !pb-20">
            <q-btn padding="0" icon="arrow_back" flat label="Back" @click="goBack" />
            <h1 class="lg:text-3xl text-2xl font-bold text-white uppercase mt-5">Create Proposal</h1>
            <p class="text-white mt-4 lg:w-[60%] text-lg leading-loose">
              Fill out the form below to create a proposal. Click the "Submit Review" button and we will review your
              proposal. After the review is successful, a DC allocation plan will be created for you!
            </p>
          </div>
        </div>
        <div class="container -mt-20 space-y-5">
          <q-card class="main-card">
            <q-stepper v-model="step" vertical color="primary" animated>
              <q-step icon="badge" :name="0" title="KYC Certification"></q-step>
              <template v-for="(group, index) in constProposalForm" :key="group.group">
                <q-step :done="step > index + 1" :icon="`fa-solid fa-${index + 1}`" :name="index + 1"
                  :title="group.group" done-color="positive">
                  <q-form @submit="nextStep(index)">
                    <q-card flat>
                      <q-card-section class="space-y-4">
                        <div class="grid grid-cols-12 gap-4">
                          <div v-for="field in group.fields" :key="field.label"
                            :class="field.col ? `cols-${field.col}` : 'cols-12'">
                            <q-input outlined dense v-model="form[field.key]" :label="field.label" :type="field.type"
                              v-if="field.type != 'select' && field.type != 'checkbox'" :hint="field.hint"
                              :rules="field.rules">
                              <template v-slot:prepend v-if="field.required">
                                <span class="text-red-500 text-base">*</span>
                              </template>
                            </q-input>
                            <q-select outlined dense v-model="form[field.key]" :label="field.label"
                              :options="field.options" v-if="field.type == 'select'" :hint="field.hint"
                              :rules="field.rules">
                              <template v-slot:prepend v-if="field.required">
                                <span class="text-red-500 text-base">*</span>
                              </template>
                            </q-select>
                            <div v-if="field.type == 'checkbox'" class="space-y-2">
                              <div class="flex items-center space-x-2">
                                <h5 class="font-bold">{{ field.label }}</h5>
                                <span class="text-red-500 text-base" v-if="field.required">*</span>
                              </div>
                              <q-checkbox outlined dense v-model="form[field.key]" :label="field.data"></q-checkbox>
                              <p class="text-xs text-gray-500">{{ field.hint }}</p>
                            </div>
                          </div>
                        </div>
                      </q-card-section>
                      <q-card-section>
                        <div class="flex items-center justify-end space-x-5">
                          <q-btn icon="save" rounded label="Save Draft" type="button" @click="handleSubmit('draft')"
                            color="primary" outline />
                          <q-btn icon-right="arrow_forward" rounded unelevated label="Next" type="submit"
                            color="primary" />
                        </div>
                        <p v-if="!emptyString(error)" class="text-red-500 text-right text-xs mt-2">
                          {{ error }}
                        </p>
                      </q-card-section>
                    </q-card>
                  </q-form>
                </q-step>
              </template>
              <q-step icon="check_circle" :name="10" title="Submit successfully">
                <q-card class="bg-green-500 text-white main-card">
                  <q-card-section>
                    <div class="flex items-center space-x-5">
                      <q-icon name="check_circle" size="2em" color="white" />
                      <p class="text-lg font-bold">
                        The current proposal has been submitted, please wait for our team to review!
                        <q-btn label="View Detail" outline rounded text-color="white" :to="{ name: 'PledgeRecord' }" />
                      </p>
                    </div>
                  </q-card-section>
                </q-card>
              </q-step>
            </q-stepper>
            <q-inner-loading color="primary" :showing="loading">
              <q-spinner-hourglass class="mx-auto" color="primary" size="3em" />
            </q-inner-loading>
          </q-card>
          <q-inner-loading color="primary" :showing="pageLoading">
            <q-spinner-hourglass class="mx-auto" color="primary" size="3em" />
          </q-inner-loading>
        </div>
      </template>
    </JustLogin>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { constProposalForm } from 'src/dist/proposal-form';
import { proposalApi } from 'src/dist/api';
import { useUserStore } from 'src/stores/user';
import JustLogin from 'src/components/JustLogin.vue';
import { customAlert, emptyString } from 'src/dist/tools';


export default defineComponent({
  name: 'CreateProposal',
  setup: function () {
    const userStore = useUserStore()
    return {
      userStore: ref(userStore)
    }
  },
  components: {
    JustLogin
  },
  data: function () {
    return {
      constProposalForm,
      form: {
        custom_multisig: false,
        is_public_dataset: false,
        data_owner_name: undefined,
        datacap_amount: undefined,
      },
      loading: false,
      error: undefined,
      pageLoading: false,
      saveProposal: {
        status: 'draft'
      },
      step: 1
    }
  },
  watch: {
    'userStore.userInfo': {
      handler: function (newVal) {
        if (newVal) {
          this.getProposal()
        }
      },
      deep: true,
      immediate: true,
    }
  },
  methods: {
    emptyString,
    goBack: function () {
      this.$router.back();
    },
    getProposal: function () {
      this.pageLoading = true
      proposalApi.myProposals().then((res) => {
        this.saveProposal = res.data;
        const proposal = JSON.parse(res.data.p_content);
        proposal.forEach(item => {
          this.form[item.key] = item.value;
        });
      }).finally(() => {
        this.pageLoading = false
      })
    },
    nextStep: function (index) {

      this.step = (index + 1) + 1;
    },
    handleSubmit: function (type) {
      this.error = undefined
      this.loading = true
      let data = [];
      for (const key in this.form) {
        data.push({
          key,
          value: this.form[key]
        })
      }
      if (type !== 'draft') {
        type = 'submit'
      }
      proposalApi.create({
        data: JSON.stringify(data),
        submit_type: type,
        p_name: this.form.data_owner_name,
        request_data_cap: this.form.datacap_amount
      }).then(() => {
        if (type == 'draft') {
          customAlert.success('Proposal saved successfully!')
          return;
        }
        customAlert.success('Proposal submitted successfully!')
        this.$router.push({
          name: 'PledgeRecord',
        })
      }).catch((err) => {
        if (err.code == 61) {
          this.dAppStore.setOpenLogin(true, () => {
            this.handleSubmit(type)
          })
          return;
        }
        this.error = err.message
      }).finally(() => {
        this.loading = false
      })
    }
  }
});
</script>

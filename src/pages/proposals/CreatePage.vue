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
          <div class="flex gap-4">
            <div class="flex-1">
              <q-card class="main-card" v-if="userStore.userInfo.x_verify.kyc_status == 'verified'">
                <q-stepper v-model="step" vertical color="primary" animated>
                  <template v-for="(group, index) in constProposalForm" :key="group.group">
                    <q-step :done="step > index" :icon="`fa-solid fa-${index + 1}`" :name="index" :title="group.group"
                      done-color="positive">
                      <q-form @submit="nextStep(index)">
                        <q-card flat>
                          <q-card-section>
                            <div class="grid grid-cols-12 gap-4">
                              <div v-for="field in group.fields" :key="field.label"
                                :class="field.col ? `cols-${field.col}` : 'cols-12'">
                                <q-input outlined dense v-model="form[field.key]" :label="field.label"
                                  :type="field.type" v-if="field.type != 'select' && field.type != 'files'"
                                  :hint="field.hint" :rules="field.rules">
                                  <template v-slot:prepend v-if="field.required">
                                    <span class="text-red-500 text-base">*</span>
                                  </template>
                                </q-input>
                                <div v-if="field.type == 'files'" class="space-y-3 relative">
                                  <h5 class="font-bold text-base flex items-center space-x-2">
                                    <span class="text-red-500 text-base">*</span>
                                    <span>{{ field.label }}</span>
                                  </h5>
                                  <div :class="`grid grid-${field.max} gap-4`">
                                    <div v-for="(file, index) in form[field.key]" :key="index">
                                      <div class="flex flex-col items-center rounded-lg p-2 space-y-2" :class="{
                                        'bg-page-color text-meta': typeof file == 'object',
                                        'bg-green-200 text-green-500': typeof file == 'string'
                                      }">
                                        <template v-if="typeof file == 'string'">
                                          <q-img height="50px" width="50px" v-if="mediaIsImage(file)" :src="file"
                                            fit="contain" />
                                        </template>
                                        <q-icon v-else name="file_open" size="3em" />
                                        <div class="text-sm font-bold">
                                          {{ file.name }}
                                        </div>
                                        <div class="flex items-center space-x-2">
                                          <q-btn label="Delete" size="sm" color="red" unelevated outline
                                            @click="handleFileDelete(field, index)" />
                                          <q-btn label="Upload" size="sm" color="primary" unelevated
                                            v-if="typeof file == 'object'" @click="handleFileUpload(field, index)" />
                                        </div>
                                      </div>
                                    </div>
                                    <template v-if="form[field.key].length < field.max">
                                      <q-btn color="primary" unelevated @click="handleFileClick(field)">
                                        <div class="flex items-center space-x-2 flex-col">
                                          <q-icon name="add" size="2em" />
                                          <p class="text-sm">Add File</p>
                                        </div>
                                      </q-btn>
                                      <input type="file" :ref="`fileInput-${field.key}`" class="hidden"
                                        @change="handleFileChange(field, $event)" />
                                    </template>
                                  </div>
                                  <p class="text-xs text-gray-500">{{ field.hint }}</p>
                                  <q-inner-loading color="primary" :showing="uploadLoading[field.key] == true">
                                    <q-spinner-hourglass class="mx-auto" color="primary" size="3em" />
                                  </q-inner-loading>
                                </div>
                                <q-select outlined dense v-model="form[field.key]" :label="field.label"
                                  :options="field.options" v-if="field.type == 'select'" :hint="field.hint"
                                  :rules="field.rules" :multiple="field.multiple">
                                  <template v-slot:prepend v-if="field.required">
                                    <span class="text-red-500 text-base">*</span>
                                  </template>
                                </q-select>
                              </div>
                            </div>
                          </q-card-section>
                          <q-card-section>
                            <div class="flex items-center justify-end space-x-5">
                              <q-btn icon="save" rounded label="Save Draft" type="button" @click="handleSubmit('draft')"
                                color="primary" outline />
                              <q-btn icon-right="arrow_forward" rounded unelevated
                                :label="index < 2 ? 'Next' : 'Submit'" type="submit" color="primary" />
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
                            <q-btn label="View Detail" outline rounded text-color="white"
                              :to="{ name: 'PledgeRecord' }" />
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
              <q-card class="main-card" v-else>
                <q-card-section class="text-center">
                  <q-icon name="warning" size="6em" color="red" />
                </q-card-section>
                <q-card-section class="leading-loose text-base space-y-3">
                  <p>Sorry, your X account does not meet our KYC verification requirements and you will be unable to
                    create a proposal. For more information, check the <span class="font-bold text-red-500">[KYC
                      Verification]</span>
                    panel.</p>
                  <p>If you have met the certification requirements, <span class="font-bold text-red-500">you can log
                      out and log in again</span>. We will re-examine whether you meet the KYC verification requirements
                    the next time you log in.</p>
                </q-card-section>
              </q-card>
            </div>
            <div class="lg:w-[300px]">
              <KycCard :x_verify="userStore.userInfo.x_verify" />
            </div>
          </div>
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
import { mediaApi, proposalApi } from 'src/dist/api';
import { useUserStore } from 'src/stores/user';
import JustLogin from 'src/components/JustLogin.vue';
import { customAlert, emptyString, mediaIsImage } from 'src/dist/tools';
import KycCard from 'src/components/KycCard.vue';
import { constMediaServer } from 'src/dist/const-data';

export default defineComponent({
  name: 'CreateProposal',
  setup: function () {
    const userStore = useUserStore()
    return {
      userStore: ref(userStore)
    }
  },
  components: {
    JustLogin,
    KycCard
  },
  data: function () {
    return {
      constProposalForm,
      form: {
        custom_multisig: false,
        is_public_dataset: false,
        data_owner_name: undefined,
        datacap_amount: undefined,
        volume_files: []
      },
      loading: false,
      error: undefined,
      pageLoading: false,
      saveProposal: {
        status: 'draft'
      },
      uploadLoading: {},
      step: 0
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
    mediaIsImage,
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
          if (item.key == 'volume_files') {
            this.form.volume_files = item.value.split(',');
          }
          if (item.multiple) {
            this.form[item.key] = item.value.split(',');
          }
        });
      }).finally(() => {
        this.pageLoading = false
      })
    },
    nextStep: function (index) {
      this.error = undefined
      if (index === 1) {
        if (this.form.volume_files.length == 0) {
          customAlert.error('Please upload at least one file!')
          return;
        }
        // file typeof no string
        if (this.form.volume_files.some(file => typeof file !== 'string')) {
          console.log("not string")
          customAlert.error('Please upload only files from the media server!')
          return;
        }
        // file url first part no include https://media.filplussocialcap.top
        const notMediaServerFiles = this.form.volume_files.filter(file => {
          return !file.startsWith(constMediaServer)
        })
        if (notMediaServerFiles.length > 0) {
          console.log("not media server")
          customAlert.error('Please upload only files from the media server!')
          return;
        }
      }
      if (index === 2) {
        this.handleSubmit('submit')
        return;
      }
      this.step = index + 1
    },
    handleFileDelete: function (field, index) {
      this.form[field.key].splice(index, 1);
    },
    handleFileUpload: function (field, index) {
      const file = this.form[field.key][index];
      this.uploadLoading[field.key] = true;
      const formData = new FormData();
      formData.append('file', file);
      mediaApi.upload(formData).then((res) => {
        this.form[field.key][index] = res.data;
      }).catch((err) => {
        customAlert.error(err.message)
      }).finally(() => {
        this.uploadLoading[field.key] = false;
      })
    },
    handleFileClick: function (field) {
      this.$refs[`fileInput-${field.key}`][0].click();
    },
    handleFileChange: function (field, event) {
      const file = event.target.files[0];
      this.form[field.key].push(file);
    },
    handleSubmit: function (type) {
      this.error = undefined
      this.loading = true
      const data = Object.entries(this.form).map(([key, value]) => ({
        key,
        value: Array.isArray(value) ? value.join(',') : value
      }));
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
          name: 'MyProposal',
        })
      }).catch((err) => {
        if (err.code == 61) {
          this.userStore.setOpenLogin(true, () => {
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

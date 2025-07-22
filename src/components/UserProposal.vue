<template>
  <template v-for="(item, index) in constProposalForm" :key="index">
    <q-list separator class="proposal-form-list">
      <q-item-label header class="text-xl font-bold">
        <div class="flex items-center space-x-2">
          <span class="h-10 w-10 bg-primary rounded-full text-white flex items-center justify-center">
            <q-icon :name="`fa-solid fa-${index + 1}`" size="1em" />
          </span>
          <span>{{ item.group }}</span>
        </div>
      </q-item-label>
      <template v-for="field in item.fields" :key="field.key">
        <q-item :class="`item-${field.type}`">
          <q-item-section avatar>
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
</template>
<script>
import { defineComponent } from 'vue';
import { proposalApi } from 'src/dist/api';
import { constProposalForm } from 'src/dist/proposal-form';
import { constStatusConfig } from 'src/dist/const-data';
export default defineComponent({
  name: 'UserProposal',
  components: {

  },
  setup: function () {

    return {

    }
  },
  props: {
    setLoading: {
      type: Function,
      required: true,
    },
    setUserProposal: {
      type: Function,
      required: true,
    },
  },
  data: function () {
    return {
      constStatusConfig,
      constProposalForm,
      userProposal: {
        status: '',
        wallet: {
          wallet: '',
        }
      },
      proposalContent: {}
    }
  },
  created: function () {
    this.getProposal();
  },
  methods: {
    getProposal: async function () {
      try {
        this.setLoading(true);
        const res = await proposalApi.myProposals();
        this.userProposal = res.data;
        const proposalContent = JSON.parse(res.data.p_content);
        proposalContent.forEach(item => {
          this.proposalContent[item.key] = item.value;
        });
        this.setUserProposal(res.data);
      } catch (error) {
        if (error.code == 65) {
          this.setUserProposal({
            status: 'no_data',
          });
        }
      } finally {
        this.setLoading(false);
      }
    },
    openStakingDialog() {
      this.$refs.stakingCard.openStakingDialog();
    }
  }
});
</script>
